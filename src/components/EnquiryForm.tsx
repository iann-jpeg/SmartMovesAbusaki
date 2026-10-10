import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { enquiryCategories } from "@/config/site";

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be under 255 characters"),
  phone: z.string().trim().max(30, "Phone number must be under 30 characters").optional().or(z.literal("")),
  organization: z.string().trim().max(150, "Organization must be under 150 characters").optional().or(z.literal("")),
  category: z.enum(enquiryCategories.map((c) => c.value) as [string, ...string[]], {
    errorMap: () => ({ message: "Please choose an enquiry category" }),
  }),
  subject: z.string().trim().min(1, "Please enter a subject").max(150, "Subject must be under 150 characters"),
  message: z.string().trim().min(10, "Please tell us a little more (at least 10 characters)").max(2000, "Message must be under 2000 characters"),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy to continue" }) }),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

type EnquiryData = z.infer<typeof enquirySchema>;
type FormErrors = Partial<Record<keyof EnquiryData, string>>;

interface EnquiryFormProps {
  defaultCategory?: string;
  heading?: string;
  intro?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({ defaultCategory = "general", heading, intro }: EnquiryFormProps) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    category: defaultCategory,
    subject: "",
    message: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const set = (field: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const v = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setValues((prev) => ({ ...prev, [field]: v }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return; // prevent duplicate submissions

    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof EnquiryData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message ?? "The enquiry could not be submitted.");
      }
      if (data?.ok) {
        setStatus("success");
        setServerMessage(data.message ?? "Your enquiry has been received. We will get back to you.");
      } else {
        setStatus("error");
        setServerMessage(data?.message ?? "Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setStatus("error");
      setServerMessage(
        "We could not submit your enquiry just now. Please try again, or reach us directly by email or phone using the details on this page."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="card-surface p-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-primary">Thank you</h3>
        <p className="mt-2 text-muted-foreground">{serverMessage}</p>
      </div>
    );
  }

  const inputClass = (hasError?: string) =>
    `w-full rounded-md border bg-input-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
      hasError ? "border-destructive" : "border-input"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface space-y-5 p-6 sm:p-8">
      {heading && <h3 className="font-heading text-xl font-bold text-primary">{heading}</h3>}
      {intro && <p className="text-sm text-muted-foreground">{intro}</p>}

      {/* Honeypot — hidden from humans, catches simple bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Full name <span className="text-destructive" aria-hidden>*</span>
          </label>
          <input id="name" type="text" required maxLength={100} autoComplete="name" className={inputClass(errors.name)} value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <p id="name-error" className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email address <span className="text-destructive" aria-hidden>*</span>
          </label>
          <input id="email" type="email" required maxLength={255} autoComplete="email" className={inputClass(errors.email)} value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <p id="email-error" className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
            Phone number <span className="text-muted-foreground">(optional)</span>
          </label>
          <input id="phone" type="tel" maxLength={30} autoComplete="tel" className={inputClass(errors.phone)} value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errors.phone && <p id="phone-error" className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="organization" className="mb-1.5 block text-sm font-medium text-foreground">
            Organization <span className="text-muted-foreground">(optional)</span>
          </label>
          <input id="organization" type="text" maxLength={150} autoComplete="organization" className={inputClass(errors.organization)} value={values.organization} onChange={set("organization")} aria-invalid={!!errors.organization} aria-describedby={errors.organization ? "org-error" : undefined} />
          {errors.organization && <p id="org-error" className="mt-1 text-xs text-destructive">{errors.organization}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-foreground">
          Enquiry category <span className="text-destructive" aria-hidden>*</span>
        </label>
        <select id="category" required className={inputClass(errors.category)} value={values.category} onChange={set("category")} aria-invalid={!!errors.category} aria-describedby={errors.category ? "category-error" : undefined}>
          {enquiryCategories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        {errors.category && <p id="category-error" className="mt-1 text-xs text-destructive">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
          Subject <span className="text-destructive" aria-hidden>*</span>
        </label>
        <input id="subject" type="text" required maxLength={150} className={inputClass(errors.subject)} value={values.subject} onChange={set("subject")} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} />
        {errors.subject && <p id="subject-error" className="mt-1 text-xs text-destructive">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message <span className="text-destructive" aria-hidden>*</span>
        </label>
        <textarea id="message" required rows={5} maxLength={2000} className={inputClass(errors.message)} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message && <p id="message-error" className="mt-1 text-xs text-destructive">{errors.message}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-foreground">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-input accent-[#0B5D3B]"
            checked={values.consent}
            onChange={set("consent")}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I agree to my details being used to respond to this enquiry, as described in the{" "}
            <Link to="/privacy-policy" className="font-medium text-accent underline underline-offset-2">Privacy Policy</Link>. <span className="text-destructive" aria-hidden>*</span>
          </span>
        </label>
        {errors.consent && <p id="consent-error" className="mt-1 text-xs text-destructive">{errors.consent}</p>}
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
