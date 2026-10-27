# Deploy — Spotlyn Cleaning (EC2 t3.micro + Caddy + HTTPS)

Production runs two containers behind Caddy, which terminates TLS and reverse-proxies to the
Next.js app:

```
Internet ──▶ Caddy (80/443, auto HTTPS) ──▶ web (Next.js :3000, internal only)
```

- Domain: **wylcleaning.com** (DNS at Cloudflare)
- Server: **EC2 t3.micro**, Ubuntu 24.04, x86_64, 1 GB RAM + **2 GB swap**
- The image is **built off-server** (1 GB RAM is not enough for `next build`) and pulled from **ghcr.io**.

---

## 1. Build & push the image

### Option A — Automatic (recommended)

Pushing to `main` (or tagging `vX.Y.Z`) triggers `.github/workflows/ghcr-publish.yml`, which builds for
`linux/amd64` and pushes to **`ghcr.io/<owner>/weylin-cleaning-services`**. Auth uses the built-in
`GITHUB_TOKEN` — **no secrets to configure**.

- Tags produced: `latest` (on `main`), `sha-<commit>`, branch name, and `X.Y.Z` / `X.Y` on version tags.
- Optional: set repo **variable** `NEXT_PUBLIC_SITE_URL` (Settings → Secrets and variables → Actions →
  Variables) to override the baked site URL. Defaults to `https://wylcleaning.com`.
- After the first run, open the package in GitHub → **Package settings** and set visibility to **Public**
  (so the server can pull without logging in), or keep it **Private** and `docker login ghcr.io` on the server.

### Option B — Manual (from your machine)

> The image must be `linux/amd64` (EC2 is x86_64). Build with Buildx so you can target that platform
> regardless of your local arch.

```bash
# One-time: log in to GitHub Container Registry with a PAT (classic) that has `write:packages`
export CR_PAT=ghp_xxxxxxxxxxxxxxxxxxxx
echo "$CR_PAT" | docker login ghcr.io -u <github-username> --password-stdin

# One-time: a buildx builder
docker buildx create --use --name wyl 2>/dev/null || docker buildx use wyl

# Build for linux/amd64 and push (owner MUST be lowercase)
docker buildx build \
  --platform linux/amd64 \
  --build-arg NEXT_PUBLIC_SITE_URL=https://wylcleaning.com \
  -t ghcr.io/<owner>/weylin-cleaning-services:latest \
  -t ghcr.io/<owner>/weylin-cleaning-services:"$(git rev-parse --short HEAD)" \
  --push .
```

In GitHub → your package → **Package settings**, set visibility to **Public** (no server login needed)
or keep it **Private** (then you must `docker login ghcr.io` on the server too).

---

## 2. EC2 setup

### 2.1 Networking
- Allocate an **Elastic IP** and associate it with the instance (so the IP survives reboots).
- **Security group** inbound rules:
  - TCP **22** from *your IP only* (SSH)
  - TCP **80** from `0.0.0.0/0` (HTTP + ACME challenge)
  - TCP **443** from `0.0.0.0/0` (HTTPS)
  - UDP **443** from `0.0.0.0/0` (HTTP/3)

### 2.2 Install Docker (Ubuntu 24.04)
```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"   # then log out & back in for the group to apply
```

### 2.3 Create 2 GB swap (critical on 1 GB RAM)
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
# Prefer RAM, use swap only under pressure
echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-swappiness.conf
sudo sysctl -p /etc/sysctl.d/99-swappiness.conf
free -h   # confirm swap is active
```

### 2.4 Log in to ghcr (only if the package is private)
```bash
echo "$CR_PAT" | docker login ghcr.io -u <github-username> --password-stdin
```

### 2.5 Copy the deploy files and create `.env`
From your machine:
```bash
scp docker-compose.prod.yml Caddyfile ubuntu@<ELASTIC_IP>:~/wyl/
```
On the server:
```bash
mkdir -p ~/wyl && cd ~/wyl
cp .env.example .env   # if you copied it, otherwise create it
nano .env
```
Set in `.env`:
```
NEXT_PUBLIC_SITE_URL=https://wylcleaning.com
WEB_IMAGE=ghcr.io/<owner>/weylin-cleaning-services:latest
RESEND_API_KEY=...        # your Resend key (leave empty = log mode, no emails)
EMAIL_FROM=Spotlyn Cleaning <no-reply@wylcleaning.com>
EMAIL_TO=you@yourbusiness.com
```

### 2.6 Start it
```bash
cd ~/wyl
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f caddy   # watch certificate issuance
```

---

## 3. Cloudflare DNS

1. **DNS → Records** — create two **A** records pointing to the **Elastic IP**:
   - `@`   → `<ELASTIC_IP>`
   - `www` → `<ELASTIC_IP>`
2. **Set both to "DNS only" (grey cloud) first.** Caddy needs the HTTP-01 challenge to reach the
   server directly to issue the Let's Encrypt certificate. Wait for DNS to propagate, confirm the site
   loads over HTTPS, and that Caddy logs show a certificate was obtained.
3. Then switch both records to **"Proxied" (orange cloud)**.
4. **SSL/TLS → Overview → set encryption mode to "Full (strict)".** This keeps the connection encrypted
   end-to-end and validates Caddy's real certificate.

> ⚠️ **Never use "Flexible".** It makes Cloudflare talk to your origin over plain HTTP, which causes
> redirect loops with HSTS and is insecure. Always use **Full (strict)** with Caddy.

---

## 4. Updating the site

After pushing a new image (step 1) with the same `:latest` tag:
```bash
cd ~/wyl
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
docker image prune -f        # remove dangling old images
```
To free more space occasionally:
```bash
docker image prune -a -f     # removes all images not used by a running container
```

---

## 5. Operations

```bash
# Status & health
docker compose -f docker-compose.prod.yml ps

# Logs
docker compose -f docker-compose.prod.yml logs -f web
docker compose -f docker-compose.prod.yml logs -f caddy

# Restart / stop
docker compose -f docker-compose.prod.yml restart
docker compose -f docker-compose.prod.yml down

# Reload Caddyfile after editing it (no full restart)
docker compose -f docker-compose.prod.yml exec caddy caddy reload --config /etc/caddy/Caddyfile
```

**Notes**
- TLS certificates live in the `caddy_data` volume and survive restarts — don't delete it.
- `web` uses `expose` (no `ports`), so it is **never reachable directly from the internet** — only Caddy can reach it on the internal `appnet` network.
- Memory is capped (`web` 512 MB, `caddy` 128 MB) to stay safe on 1 GB RAM + 2 GB swap.
