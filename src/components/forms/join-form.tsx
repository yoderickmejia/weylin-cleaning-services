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
  PrivacyNotice,
} from "@/components/forms/sms-consent";
import {
  joinSchema,
  type JoinInput,
  type JoinOutput,
  experienceOptions,
  availabilityOptions,
} from "@/lib/schemas";
import { serviceAreas } from "@/lib/site";
import { useUtm } from "@/lib/use-utm";

export function JoinForm() {
  const utm = useUtm();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm<JoinInput, unknown, JoinOutput>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      city: "",
      experience: "",
      availability: "",
      message: "",
      smsTransactional: false,
      company: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    (Object.keys(utm) as (keyof typeof utm)[]).forEach((k) => setValue(k, utm[k]));
  }, [utm, setValue]);

  const onSubmit = async (data: JoinOutput) => {
    const res = await fetch("/api/join", {
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
        <h3 className="mt-5 text-2xl font-semibold text-ink">Application received!</h3>
        <p className="mt-2 max-w-md text-ink-soft">
          Thanks for your interest in joining the Weylin team. If it looks like a fit,
          we&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" htmlFor="jFirst" required error={errors.firstName?.message}>
          <Input id="jFirst" autoComplete="given-name" aria-invalid={!!errors.firstName} {...register("firstName")} />
        </Field>
        <Field label="Last name" htmlFor="jLast" error={errors.lastName?.message}>
          <Input id="jLast" autoComplete="family-name" {...register("lastName")} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" htmlFor="jPhone" required error={errors.phone?.message}>
          <Input id="jPhone" type="tel" autoComplete="tel" placeholder="(862) 900-9777" aria-invalid={!!errors.phone} {...register("phone")} />
        </Field>
        <Field label="Email" htmlFor="jEmail" required error={errors.email?.message}>
          <Input id="jEmail" type="email" autoComplete="email" placeholder="you@email.com" aria-invalid={!!errors.email} {...register("email")} />
        </Field>
      </div>

      <Field label="City" htmlFor="jCity" required error={errors.city?.message}>
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="jCity" aria-invalid={!!errors.city}>
                <SelectValue placeholder="Where are you based?" />
              </SelectTrigger>
              <SelectContent>
                {serviceAreas.map((c) => (<SelectItem key={c} value={c}>{c}, NJ</SelectItem>))}
                <SelectItem value="Other">Other / nearby</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Cleaning experience" htmlFor="jExp" required error={errors.experience?.message}>
          <Controller
            control={control}
            name="experience"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="jExp" aria-invalid={!!errors.experience}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {experienceOptions.map((e) => (<SelectItem key={e} value={e}>{e}</SelectItem>))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field label="Availability" htmlFor="jAvail" required error={errors.availability?.message}>
          <Controller
            control={control}
            name="availability"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="jAvail" aria-invalid={!!errors.availability}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((a) => (<SelectItem key={a} value={a}>{a}</SelectItem>))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <Field label="Tell us about yourself" htmlFor="jMsg" error={errors.message?.message}>
        <Textarea id="jMsg" rows={4} placeholder="A little about your experience, why you'd be a great fit, transportation, etc." {...register("message")} />
      </Field>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor="jCompany">Company</label>
        <input id="jCompany" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <Controller
        control={control}
        name="smsTransactional"
        render={({ field }) => (
          <ConsentCheckbox id="jSms" checked={!!field.value} onCheckedChange={field.onChange}>
            {transactionalConsentText()}
          </ConsentCheckbox>
        )}
      />

      {isSubmitted && !isSubmitSuccessful && !isSubmitting && (
        <p className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
          <AlertCircle className="size-4 shrink-0" />
          Something went wrong. Please try again, or call us at (862) 900-9777.
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
            Submit application
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>

      <PrivacyNotice />
    </form>
  );
}
