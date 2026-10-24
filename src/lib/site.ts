/**
 * Single source of truth for Weylin Cleaning Services LLC business data.
 * Pulled from the project brief (brand data) — do not invent values here.
 */

export const site = {
  name: "Weylin Cleaning Services LLC",
  shortName: "Weylin Cleaning Services",
  tagline: "Clean Spaces, Happier Lives.",
  legalName: "Weylin Cleaning Services LLC",
  state: "New Jersey",
  stateAbbr: "NJ",
  // Update to the real production domain before launch.
  url: "https://www.weylincleaningservices.com",
  description:
    "Weylin Cleaning Services LLC provides reliable residential and commercial cleaning across North Jersey — standard, deep, recurring, move-in/out, and more. Trusted, local, and detail-obsessed.",
  phone: {
    display: "(862) 900-9777",
    e164: "+18629009777",
    href: "tel:+18629009777",
  },
  email: {
    address: "weylincleaningservicesllc@gmail.com",
    href: "mailto:weylincleaningservicesllc@gmail.com",
  },
  instagram: {
    handle: "@wylclaeaningservicesllc",
    url: "https://www.instagram.com/wylclaeaningservicesllc",
  },
  /** Hours are unconfirmed by the client — shown as flexible scheduling until provided. */
  hours: {
    confirmed: false,
    display: "By appointment — flexible scheduling 7 days a week",
  },
} as const;

/** 13 service-area cities (brief). */
export const serviceAreas = [
  "Edgewater",
  "Hoboken",
  "Jersey City",
  "Fort Lee",
  "Hackensack",
  "Englewood",
  "Clifton",
  "Passaic",
  "Montclair",
  "Bloomfield",
  "North Arlington",
  "Garfield",
  "Lodi",
] as const;

export const counties = ["Hudson", "Bergen", "Passaic", "Essex"] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Recurring", href: "/recurring-cleaning" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
