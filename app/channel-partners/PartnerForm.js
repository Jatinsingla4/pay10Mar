"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./ecosystem.module.scss";
import Recaptcha, { resetRecaptcha } from "../lib/Recaptcha";
import { getCsrfToken } from "../lib/csrf";

const API_URL = "/api/proxy/partners";

const INITIAL = {
  name: "",
  company_name: "",
  designation: "",
  email: "",
  phone: "",
  monthly_transaction_volume: "",
  integration_type: "",
};

export default function PartnerForm() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [successMsg, setSuccessMsg] = useState("");
  const [serverError, setServerError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone") {
      value = value.replace(/[^\d+]/g, "");
      if (value.indexOf("+") > 0) value = value.replace(/\+/g, "");
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneKeyDown = (e) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];
    if (allowed.includes(e.key)) return;
    if (e.key === "+" && e.target.selectionStart === 0 && !form.phone.startsWith("+")) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  // Blocks digits and other punctuation at the keystroke, not just on submit —
  // same letters/spaces/apostrophe/hyphen/period set as the submit-time check.
  const handleNameKeyDown = (e) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];
    if (allowed.includes(e.key) || e.ctrlKey || e.metaKey || e.key.length !== 1) return;
    if (!/^[\p{L}\s'.-]$/u.test(e.key)) e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Letters from any language plus spaces, apostrophes, hyphens and periods
    // (initials like "J.") — rejects digits and other punctuation. Emptiness
    // is left to the server's required-field check, same as every other field here.
    if (form.name.trim() && !/^[\p{L}\s'.-]+$/u.test(form.name.trim())) {
      setErrors((prev) => ({ ...prev, name: "Name should only contain letters" }));
      return;
    }

    // 8-15 digits: the real-world floor for a mobile number including country
    // code (a bare 7-digit number is always landline-style local, never mobile).
    if (form.phone.trim() && !/^\+?\d{8,15}$/.test(form.phone.trim())) {
      setErrors((prev) => ({ ...prev, phone: "Please enter a valid mobile number" }));
      return;
    }

    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setRecaptchaError("Please verify the captcha");
      return;
    }
    setRecaptchaError("");

    setStatus("loading");
    setErrors({});
    setServerError("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": getCsrfToken() },
        body: JSON.stringify({
          name: form.name,
          company_name: form.company_name,
          designation: form.designation,
          email: form.email,
          phone: form.phone,
          monthly_transaction_volume: form.monthly_transaction_volume,
          integration_type: form.integration_type,
          recaptcha_token: recaptchaToken,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success === true) {
        setStatus("success");
        setSuccessMsg(data.message);
        setForm(INITIAL);
      } else if (data.errors && Object.keys(data.errors).length > 0) {
        const mapped = { ...data.errors };
        if (mapped.mobile) { mapped.phone = mapped.mobile; delete mapped.mobile; }
        setErrors(mapped);
        setStatus("idle");
      } else {
        setServerError(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    } finally {
      // Single-use token is spent — reset so a follow-up submit gets a fresh one.
      setRecaptchaToken("");
      resetRecaptcha();
    }
  };

  return (
    <form className={styles.partner_form} onSubmit={handleSubmit} noValidate>
      <div className={styles.form_card_header}>
        <div className={styles.form_card_bar} />
        <p className={styles.form_card_label}>Tech Partner Programme</p>
        <h3 className={styles.form_card_title}>Apply Now</h3>
        <p className={styles.form_card_sub}>Fill in your details and we'll be in touch within one business day.</p>
      </div>

      <div className={styles.form_row}>
        <Field label="Full Name" error={errors.name}>
          <div className={styles.input_wrapper}>
            <Icon icon="mdi:account-outline" className={styles.input_icon} />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onKeyDown={handleNameKeyDown}
              placeholder="John Smith"
              maxLength={150}
              className={errors.name ? styles.input_error : ""}
            />
          </div>
        </Field>

        <Field label="Company Name" error={errors.company_name}>
          <div className={styles.input_wrapper}>
            <Icon icon="mdi:office-building-outline" className={styles.input_icon} />
            <input
              type="text"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              placeholder="Acme Corp"
              maxLength={200}
              className={errors.company_name ? styles.input_error : ""}
            />
          </div>
        </Field>
      </div>

      <div className={styles.form_row}>
        <Field label="Designation" error={errors.designation}>
          <div className={styles.input_wrapper}>
            <Icon icon="mdi:briefcase-outline" className={styles.input_icon} />
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="CEO / CTO / Director"
              maxLength={150}
              className={errors.designation ? styles.input_error : ""}
            />
          </div>
        </Field>

        <Field label="Work Email" error={errors.email}>
          <div className={styles.input_wrapper}>
            <Icon icon="mdi:email-outline" className={styles.input_icon} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              maxLength={254}
              className={errors.email ? styles.input_error : ""}
            />
          </div>
        </Field>
      </div>

      <div className={styles.form_row}>
        <Field label="Phone Number" error={errors.phone}>
          <div className={styles.input_wrapper}>
            <Icon icon="mdi:phone-outline" className={styles.input_icon} />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onKeyDown={handlePhoneKeyDown}
              placeholder="+971501234567"
              maxLength={16}
              className={errors.phone ? styles.input_error : ""}
            />
          </div>
        </Field>

        <Field label="Monthly Transaction Volume" error={errors.monthly_transaction_volume}>
          <div className={styles.input_wrapper}>
            <Icon icon="mdi:cash-multiple" className={styles.input_icon} />
            <div className={styles.select_inner}>
              <select
                name="monthly_transaction_volume"
                value={form.monthly_transaction_volume}
                onChange={handleChange}
                className={errors.monthly_transaction_volume ? styles.input_error : ""}
              >
                <option value="">Select volume</option>
                <option value="Under AED 500K">Under AED 500K</option>
                <option value="AED 500K - AED 2Mn">AED 500K - AED 2Mn</option>
                <option value="AED 2Mn - AED 5Mn">AED 2Mn - AED 5Mn</option>
                <option value="AED 5Mn - AED 10Mn">AED 5Mn - AED 10Mn</option>
                <option value="AED 10Mn - AED 50Mn">AED 10Mn - AED 50Mn</option>
                <option value="AED 50Mn+">AED 50Mn+</option>
              </select>
              <Icon icon="mdi:chevron-down" className={styles.select_chevron} />
            </div>
          </div>
        </Field>
      </div>

      <Field label="Integration Type" error={errors.integration_type}>
        <div className={styles.input_wrapper}>
          <Icon icon="mdi:api" className={styles.input_icon} />
          <div className={styles.select_inner}>
            <select
              name="integration_type"
              value={form.integration_type}
              onChange={handleChange}
              className={errors.integration_type ? styles.input_error : ""}
            >
              <option value="">Select integration type</option>
              <option value="Pay with Pay10 (DQR)">Pay with Pay10 (DQR)</option>
            </select>
            <Icon icon="mdi:chevron-down" className={styles.select_chevron} />
          </div>
        </div>
      </Field>

      {serverError && (
        <div className={styles.server_error_box}>
          <Icon icon="mdi:alert-circle-outline" width={18} />
          <span>{serverError}</span>
        </div>
      )}

      {status === "success" && (
        <div className={styles.form_message_success}>
          <Icon icon="mdi:check-circle-outline" width={18} />
          Thank you! We&apos;ll be in touch soon.
        </div>
      )}

      <div className={styles.form_group}>
        <Recaptcha
          onVerify={(token) => { setRecaptchaToken(token); setRecaptchaError(""); }}
          onExpire={() => setRecaptchaToken("")}
        />
        {recaptchaError && (
          <span className={styles.field_error}>
            <Icon icon="mdi:alert-circle-outline" width={12} />
            {recaptchaError}
          </span>
        )}
      </div>

      <button type="submit" className={styles.submit_btn} disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Icon icon="mdi:loading" className={styles.btn_spinner} width={20} />
            Submitting…
          </>
        ) : (
          <>
            Submit Application
            <Icon icon="mdi:arrow-right" width={20} />
          </>
        )}
      </button>

      <p className={styles.form_disclaimer}>
        <Icon icon="mdi:lock-outline" width={13} />
        Your information is encrypted and never shared with third parties.
      </p>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <div className={styles.form_group}>
      <label>{label}</label>
      {children}
      {error && <span className={styles.field_error}><Icon icon="mdi:alert-circle-outline" width={12} />{Array.isArray(error) ? error[0] : error}</span>}
    </div>
  );
}
