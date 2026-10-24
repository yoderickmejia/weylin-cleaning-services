export type Area = {
  city: string;
  county: string;
  slug: string;
  blurb: string;
};

const mk = (city: string, county: string, blurb: string): Area => ({
  city,
  county,
  slug: city.toLowerCase().replace(/\s+/g, "-"),
  blurb,
});

export const areas: Area[] = [
  mk("Edgewater", "Bergen", "From waterfront condos to townhomes along River Road, we keep Edgewater living spaces bright, fresh, and move-in ready."),
  mk("Hoboken", "Hudson", "Brownstones, walk-ups, and high-rises alike — we handle the realities of Hoboken living, from tight staircases to busy schedules."),
  mk("Jersey City", "Hudson", "Serving everything from Downtown high-rises to Heights multi-families, with cleaning that fits big-city life in Jersey City."),
  mk("Fort Lee", "Bergen", "Luxury towers and family homes near the GWB — Fort Lee residents trust us for detailed, dependable cleaning."),
  mk("Hackensack", "Bergen", "Busy households and professionals across Hackensack rely on our consistent, careful recurring and deep cleaning."),
  mk("Englewood", "Bergen", "Spacious single-family homes in Englewood get the thorough, white-glove attention they deserve."),
  mk("Clifton", "Passaic", "One of New Jersey's largest cities — we bring reliable residential and commercial cleaning to every Clifton neighborhood."),
  mk("Passaic", "Passaic", "Families and landlords across Passaic count on us for move-in/out turnarounds and steady recurring service."),
  mk("Montclair", "Essex", "From historic homes to modern builds, Montclair's design-minded residents love our detail-first approach."),
  mk("Bloomfield", "Essex", "Dependable, friendly cleaning for Bloomfield's close-knit neighborhoods and busy family homes."),
  mk("North Arlington", "Bergen", "A hometown favorite — we keep North Arlington homes spotless with flexible weekly and bi-weekly plans."),
  mk("Garfield", "Bergen", "Honest pricing and careful work for Garfield households, rentals, and small businesses."),
  mk("Lodi", "Bergen", "Thorough, trustworthy cleaning for Lodi homes and apartments, scheduled around your week."),
];
