/**
 * ⚠️  SAMPLE / PLACEHOLDER CONTENT — FOR DESIGN APPROVAL ONLY.
 *
 * These testimonials are NOT real customer reviews. They exist so the client can
 * preview the testimonials design before launch. Avatars are tasteful initial
 * monograms (not photos of real-looking people) to avoid presenting fabricated
 * faces as genuine customers.
 *
 * BEFORE GOING LIVE: replace `testimonials` with real, verifiable reviews and/or
 * set `TESTIMONIALS_ENABLED = false`. Publishing fabricated reviews as real is
 * deceptive and prohibited under the FTC fake-reviews rule (16 CFR Part 465).
 */

export const TESTIMONIALS_ENABLED = true;
export const TESTIMONIALS_ARE_SAMPLE = true;

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  service: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I came home to a spotless apartment and the whole place smelled fresh. They were on time, careful with everything, and clearly took pride in the work.",
    name: "Sample Review",
    location: "Hoboken, NJ",
    service: "Deep Cleaning",
    rating: 5,
  },
  {
    quote:
      "We've had them every two weeks for months now. It's the one chore I never think about anymore. Consistent, friendly, and reliable every single time.",
    name: "Sample Review",
    location: "Jersey City, NJ",
    service: "Recurring Cleaning",
    rating: 5,
  },
  {
    quote:
      "Used them for a move-out and got my full deposit back. The inside of the oven and cabinets looked brand new. Highly recommend to anyone in the area.",
    name: "Sample Review",
    location: "Montclair, NJ",
    service: "Move-Out Cleaning",
    rating: 5,
  },
];
