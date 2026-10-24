import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Weylin",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8fe",
    theme_color: "#6e45b5",
    icons: [
      { src: "/images/logo-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
