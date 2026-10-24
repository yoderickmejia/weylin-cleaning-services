"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Field } from "@/components/forms/field";
import {
  ConsentCheckbox,
  transactionalConsentText,
  promotionalConsentText,
  PrivacyNotice,
} from "@/components/forms/sms-consent";
import {
  quoteSchema,
  type QuoteInput,
  type QuoteOutput,
  cleaningTypes,
  frequencies,
} from "@/lib/schemas";
import { serviceAreas } from "@/lib/site";
import { useUtm } from "@/lib/use-utm";

const bedrooms = ["Studio", "1", "2", "3", "4", "5", "6+"];
const bathrooms = ["1", "1.5", "2", "2.5", "3", "3.5", "4+"];

export function QuoteForm() {
  const utm = useUtm();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm<QuoteInput, unknown, QuoteOutput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      zip: "",
      city: "",
      bedrooms: "",
      bathrooms: "",
      squareFeet: "",
      preferredDate: "",
      notes: "",
      smsTransactional: false,
      smsPromotional: false,
      company: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    (Object.keys(utm) as (keyof typeof utm)[]).forEach((k) =>
      setValue(k, utm[k]),
    );
  }, [utm, setValue]);

  const onSubmit = async (data: QuoteOutput) => {
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("submit_failed");
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-brand-100 bg-surface-soft px-6 py-14 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-ink">Request received — thank you!</h3>
        <p className="mt-2 max-w-md text-ink-soft">
          We&apos;ve got your details and will reach out shortly with your free quote.
          For anything urgent, feel free to give us a call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" htmlFor="firstName" required error={errors.firstName?.message}>
          <Input id="firstName" autoComplete="given-name" aria-invalid={!!errors.firstName} {...register("firstName")} />
        </Field>
        <Field label="Last name" htmlFor="lastName" error={errors.lastName?.message}>
          <Input id="lastName" autoComplete="family-name" {...register("lastName")} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone" required error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" placeholder="(862) 900-9777" aria-invalid={!!errors.phone} {...register("phone")} />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" placeholder="you@email.com" aria-invalid={!!errors.email} {...register("email")} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="ZIP code" htmlFor="zip" required error={errors.zip?.message}>
          <Input id="zip" inputMode="numeric" autoComplete="postal-code" placeholder="07030" maxLength={5} aria-invalid={!!errors.zip} {...register("zip")} />
        </Field>
        <Field label="City" htmlFor="city" required error={errors.city?.message}>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="city" aria-invalid={!!errors.city}>
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {serviceAreas.map((c) => (
                    <SelectItem key={c} value={c}>{c}, NJ</SelectItem>
                  ))}
                  <SelectItem value="Other">Other / nearby</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <Field label="Type of cleaning" htmlFor="cleaningType" required error={errors.cleaningType?.message}>
        <Controller
          control={control}
          name="cleaningType"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="cleaningType" aria-invalid={!!errors.cleaningType}>
                <SelectValue placeholder="What do you need cleaned?" />
              </SelectTrigger>
              <SelectContent>
                {cleaningTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Bedrooms" htmlFor="bedrooms" required error={errors.bedrooms?.message}>
          <Controller
            control={control}
            name="bedrooms"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="bedrooms" aria-invalid={!!errors.bedrooms}>
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  {bedrooms.map((b) => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field label="Bathrooms" htmlFor="bathrooms" required error={errors.bathrooms?.message}>
          <Controller
            control={control}
            name="bathrooms"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="bathrooms" aria-invalid={!!errors.bathrooms}>
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  {bathrooms.map((b) => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field label="Square feet" htmlFor="squareFeet" hint="Optional" error={errors.squareFeet?.message}>
          <Input id="squareFeet" inputMode="numeric" placeholder="e.g. 1200" {...register("squareFeet")} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Frequency" htmlFor="frequency" error={errors.frequency?.message}>
          <Controller
            control={control}
            name="frequency"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="How often?" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((f) => (<SelectItem key={f} value={f}>{f}</SelectItem>))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field label="Preferred date" htmlFor="preferredDate" hint="Optional" error={errors.preferredDate?.message}>
          <Input id="preferredDate" type="date" {...register("preferredDate")} />
        </Field>
      </div>

      <Field label="Anything else we should know?" htmlFor="notes" error={errors.notes?.message}>
        <Textarea id="notes" rows={4} placeholder="Pets, parking, areas to focus on, access instructions…" {...register("notes")} />
      </Field>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {/* Consent */}
      <div className="space-y-2.5">
        <Controller
          control={control}
          name="smsTransactional"
          render={({ field }) => (
            <ConsentCheckbox id="smsTransactional" checked={!!field.value} onCheckedChange={field.onChange}>
              {transactionalConsentText()}
            </ConsentCheckbox>
          )}
        />
        <Controller
          control={control}
          name="smsPromotional"
          render={({ field }) => (
            <ConsentCheckbox id="smsPromotional" checked={!!field.value} onCheckedChange={field.onChange}>
              {promotionalConsentText()}
            </ConsentCheckbox>
          )}
        />
      </div>

      {isSubmitted && !isSubmitSuccessful && !isSubmitting && (
        <p className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
          <AlertCircle className="size-4 shrink-0" />
          Something went wrong sending your request. Please try again, or call us at (862) 900-9777.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request my free quote
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>

      <PrivacyNotice />
    </form>
  );
}
