import { z } from "zod";

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const cleaningTypes = [
  "Standard Cleaning",
  "Deep Cleaning",
  "Recurring Cleaning",
  "Move-In / Move-Out",
  "Post-Construction",
  "Airbnb / Short-Term Rental",
  "Commercial Cleaning",
  "Not sure yet",
] as const;

export const frequencies = [
  "One-time",
  "Weekly",
  "Bi-weekly",
  "Monthly",
] as const;

export const utmSchema = z.object({
  utm_source: z.string().optional().default(""),
  utm_medium: z.string().optional().default(""),
  utm_campaign: z.string().optional().default(""),
  utm_content: z.string().optional().default(""),
  utm_term: z.string().optional().default(""),
  referrer: z.string().optional().default(""),
  page: z.string().optional().default(""),
});

export const quoteSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").max(60),
    lastName: z.string().max(60).optional().default(""),
    phone: z
      .string()
      .min(1, "Phone is required")
      .regex(phoneRegex, "Enter a valid phone number"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    zip: z
      .string()
      .min(1, "ZIP code is required")
      .regex(/^\d{5}$/, "Enter a 5-digit ZIP"),
    city: z.string().min(1, "Please select a city"),
    cleaningType: z.enum(cleaningTypes, "Please choose a cleaning type"),
    bedrooms: z.string().min(1, "Required"),
    bathrooms: z.string().min(1, "Required"),
    squareFeet: z.string().max(10).optional().default(""),
    frequency: z.enum(frequencies).optional(),
    preferredDate: z.string().optional().default(""),
    notes: z.string().max(1500).optional().default(""),
    // Optional, separate SMS consents (A2P 10DLC / TCPA)
    smsTransactional: z.boolean().optional().default(false),
    smsPromotional: z.boolean().optional().default(false),
    // Honeypot — must stay empty
    company: z.string().max(0).optional().default(""),
  })
  .extend(utmSchema.shape);

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteOutput = z.output<typeof quoteSchema>;

export const joinSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").max(60),
    lastName: z.string().max(60).optional().default(""),
    phone: z
      .string()
      .min(1, "Phone is required")
      .regex(phoneRegex, "Enter a valid phone number"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    city: z.string().min(1, "Please select a city"),
    experience: z.string().min(1, "Please select your experience"),
    availability: z.string().min(1, "Please select your availability"),
    message: z.string().max(1500).optional().default(""),
    smsTransactional: z.boolean().optional().default(false),
    company: z.string().max(0).optional().default(""),
  })
  .extend(utmSchema.shape);

export type JoinInput = z.input<typeof joinSchema>;
export type JoinOutput = z.output<typeof joinSchema>;

export const experienceOptions = [
  "No experience — eager to learn",
  "Less than 1 year",
  "1–3 years",
  "3+ years",
] as const;

export const availabilityOptions = [
  "Full-time",
  "Part-time",
  "Weekdays only",
  "Weekends only",
  "Flexible",
] as const;
