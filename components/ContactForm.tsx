"use client";

import { useRef, useState } from "react";

const WEB3FORMS_ACCESS_KEY = "ac441053-87eb-48b5-9c0a-1fc46edce0e9";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_SUBJECT = "DannyRodriguez.online — New Contact";

// Client-side validation runs first (custom, not native bubbles, so the error styling matches
// the rest of the page and stays fully accessible; noValidate on the form suppresses the
// browser's own inconsistent bubble UI in favor of this). Only once validation passes does the
// form submit to Web3Forms, which relays it to the business inbox and sets Reply-To to the
// visitor's own email. The public Form Access Key below is not a secret — Web3Forms is designed
// to have this key embedded in client-side code; it is a rate-limited, domain-scoped
// identifier, not an SMTP credential.
export default function ContactForm() {
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const confirmRef = useRef<HTMLParagraphElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError("");

    const name = nameRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const message = messageRef.current?.value.trim() ?? "";

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = "Please add your name.";
    if (!email) {
      nextErrors.email = "Please add your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "That email doesn't look right.";
    }
    if (!message) nextErrors.message = "Let me know what you're working through.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: WEB3FORMS_SUBJECT,
          name,
          email,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSent(true);
        window.setTimeout(() => confirmRef.current?.focus(), 0);
      } else {
        throw new Error((result && result.message) || "Submission failed");
      }
    } catch {
      // Network failure or a non-success response from Web3Forms. Leave the form exactly as
      // the visitor filled it in — do not hide it or clear any field.
      setSubmitError("That didn't go through — nothing you entered was lost. Please try sending it again.");
      setIsSubmitting(false);
    }
  }

  function clearError(field: "name" | "email" | "message") {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <>
      <form
        id="contact-form"
        className={`contact-form${isSent ? " is-hidden" : ""}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className={`field${errors.name ? " has-error" : ""}`}>
          <label htmlFor="contact-name">Name</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            autoComplete="name"
            aria-describedby="name-error"
            aria-invalid={errors.name ? "true" : undefined}
            ref={nameRef}
            onInput={() => clearError("name")}
          />
          <span className="field-error" id="name-error" aria-live="polite">
            {errors.name}
          </span>
        </div>
        <div className={`field${errors.email ? " has-error" : ""}`}>
          <label htmlFor="contact-email">Email</label>
          <input
            type="email"
            id="contact-email"
            name="email"
            autoComplete="email"
            aria-describedby="email-error"
            aria-invalid={errors.email ? "true" : undefined}
            ref={emailRef}
            onInput={() => clearError("email")}
          />
          <span className="field-error" id="email-error" aria-live="polite">
            {errors.email}
          </span>
        </div>
        <div className={`field${errors.message ? " has-error" : ""}`}>
          <label htmlFor="contact-message">What are you working through?</label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            aria-describedby="message-error"
            aria-invalid={errors.message ? "true" : undefined}
            ref={messageRef}
            onInput={() => clearError("message")}
          />
          <span className="field-error" id="message-error" aria-live="polite">
            {errors.message}
          </span>
        </div>
        <button type="submit" className="btn contact-submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send note"}
        </button>
        <p className={`form-submit-error${submitError ? " active" : ""}`} id="form-submit-error" role="alert" aria-live="polite">
          {submitError}
        </p>
      </form>
      <p
        className={`contact-confirm${isSent ? " active" : ""}`}
        id="contact-confirm"
        tabIndex={isSent ? -1 : undefined}
        ref={confirmRef}
      >
        Got it — thank you. I&apos;ll read this and get back to you soon.
      </p>
    </>
  );
}
