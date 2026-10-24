import { site, serviceAreas } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["HouseCleaningService", "LocalBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    email: site.email.address,
    image: `${site.url}/og.png`,
    logo: `${site.url}/images/logo-512.png`,
    slogan: site.tagline,
    priceRange: "$$",
    areaServed: serviceAreas.map((city) => ({
      "@type": "City",
      name: `${city}, NJ`,
    })),
    address: {
      "@type": "PostalAddress",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    sameAs: [site.instagram.url],
    knowsAbout: [
      "House Cleaning",
      "Deep Cleaning",
      "Move-Out Cleaning",
      "Recurring Cleaning",
      "Commercial Cleaning",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
