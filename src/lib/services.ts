import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  SprayCan,
  Repeat,
  Truck,
  HardHat,
  KeyRound,
  Building2,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  includes: string[];
  bestFor: string;
  icon: LucideIcon;
  image?: { src: string; alt: string };
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "standard-cleaning",
    name: "Standard Cleaning",
    short: "Your regular refresh",
    tagline: "A cleaner home, more peace of mind.",
    description:
      "Our most popular service keeps your home consistently fresh. We cover the everyday living spaces — dusting, floors, surfaces, kitchen and bathrooms — so you come home to a space that simply feels good to be in.",
    includes: [
      "Dust and wipe all reachable surfaces",
      "Vacuum and mop all floors",
      "Kitchen counters, sink, and exterior of appliances",
      "Bathrooms: toilets, sinks, mirrors, showers, tubs",
      "Empty trash and tidy common areas",
      "Fresh, streak-free finish throughout",
    ],
    bestFor: "Maintained homes that need a dependable regular clean.",
    icon: Sparkles,
    image: { src: "/images/living-room-bright", alt: "A bright, freshly cleaned living room in North Jersey" },
    featured: true,
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    short: "The extra-care reset",
    tagline: "The extra care your home deserves.",
    description:
      "A top-to-bottom reset that reaches the places everyday cleaning misses. Ideal as a first visit or a seasonal refresh — we detail baseboards, fixtures, grout, and build-up so your whole home feels brand new.",
    includes: [
      "Everything in a Standard Cleaning",
      "Baseboards, door frames, and trim detailed",
      "Scrub tile grout and remove soap scum",
      "Cabinet fronts and backsplash degreased",
      "Light fixtures, vents, and switch plates wiped",
      "Interior window sills and reachable glass",
    ],
    bestFor: "First-time cleans, seasonal resets, or homes that need a little extra love.",
    icon: SprayCan,
    image: { src: "/images/bathroom", alt: "A spotless, deep-cleaned bathroom with polished fixtures" },
    featured: true,
  },
  {
    slug: "recurring-cleaning",
    name: "Recurring Cleaning",
    short: "Clean that stays clean",
    tagline: "Set it, and never think about it again.",
    description:
      "Weekly, bi-weekly, or monthly visits on a schedule that fits your life. The same careful standard every time, with priority booking and friendly cleaners who get to know your home.",
    includes: [
      "Weekly, bi-weekly, or monthly plans",
      "Consistent, detail-checked results every visit",
      "Priority scheduling and easy rescheduling",
      "A plan customized to your home and routine",
      "Simple, transparent recurring pricing",
    ],
    bestFor: "Busy households that want to stop thinking about cleaning for good.",
    icon: Repeat,
    image: { src: "/images/hero-bedroom", alt: "A serene, well-kept bedroom maintained by recurring cleaning" },
    featured: true,
  },
  {
    slug: "move-in-move-out",
    name: "Move-In / Move-Out Cleaning",
    short: "Fresh starts, spotless spaces",
    tagline: "Fresh starts, spotless spaces.",
    description:
      "Moving is stressful enough. We make sure the place you're leaving is handover-ready and the place you're arriving to is truly move-in clean — inside cabinets, appliances, and all.",
    includes: [
      "Full deep clean of an empty home",
      "Inside cabinets, drawers, and closets",
      "Inside oven, fridge, and microwave",
      "Detailed bathrooms and kitchen",
      "Baseboards, doors, and interior windows",
      "Final walkthrough-ready finish",
    ],
    bestFor: "Renters, buyers, sellers, realtors, and property managers.",
    icon: Truck,
    image: { src: "/images/living-room-fireplace", alt: "An empty, move-in ready living room cleaned to detail" },
  },
  {
    slug: "post-construction",
    name: "Post-Construction Cleaning",
    short: "From dust to done",
    tagline: "The final step before you settle in.",
    description:
      "After a renovation or build, fine dust settles everywhere. We remove construction debris and that stubborn film from every surface so your new space is safe, polished, and ready to enjoy.",
    includes: [
      "Fine construction dust removed from all surfaces",
      "Debris and material residue cleared",
      "Windows, tracks, and sills detailed",
      "Fixtures, vents, and hardware polished",
      "Floors vacuumed, washed, and finished",
      "Final detail pass for a show-ready result",
    ],
    bestFor: "Homeowners, contractors, and builders after a project wraps.",
    icon: HardHat,
    image: { src: "/images/service-postconstruction", alt: "A bright, freshly finished open-plan home ready to move in" },
  },
  {
    slug: "airbnb-short-term",
    name: "Airbnb & Short-Term Rental",
    short: "Five-star turnovers",
    tagline: "Guest-ready, every single time.",
    description:
      "Reliable turnovers that protect your ratings. We reset your rental to hotel-clean between stays, restock the essentials, and flag anything that needs your attention — on a schedule that keeps pace with your bookings.",
    includes: [
      "Full turnover clean between guests",
      "Fresh linens and beds made (linens provided by host)",
      "Restock of supplies and amenities",
      "Staged, photo-ready presentation",
      "Damage and low-inventory reporting",
      "Flexible, booking-synced scheduling",
    ],
    bestFor: "Airbnb, VRBO, and short-term rental hosts across North Jersey.",
    icon: KeyRound,
    image: { src: "/images/service-airbnb", alt: "A cozy, guest-ready staged living room for a short-term rental" },
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    short: "Clean spaces for business",
    tagline: "Clean spaces for your business.",
    description:
      "A workplace that's spotless makes a quiet, powerful impression. We clean offices, studios, and small commercial spaces on a schedule that works around your business hours.",
    includes: [
      "Offices, studios, salons, and small retail",
      "Desks, common areas, and break rooms",
      "Restroom sanitizing and restocking",
      "Floors, glass, and high-touch surfaces",
      "After-hours or early-morning scheduling",
      "Recurring plans with consistent crews",
    ],
    bestFor: "Small businesses and offices that want to impress clients and staff.",
    icon: Building2,
    image: { src: "/images/service-commercial", alt: "A clean, orderly, well-kept interior space" },
  },
];

export const specialties = [
  { name: "Kitchen Cleaning", note: "Clean surfaces, healthy spaces." },
  { name: "Bathroom Cleaning", note: "Fresh, clean & sanitized." },
  { name: "Interior Windows", note: "Crystal-clear results." },
  { name: "Pet-Friendly Cleaning", note: "Safe for your family and your pets." },
] as const;

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
