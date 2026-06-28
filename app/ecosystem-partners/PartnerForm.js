"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./ecosystem.module.scss";

const API_URL = "/api/partners";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setServerError("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success !== false) {
        setStatus("success");
        setSuccessMsg(data.message || "Thank you! We'll be in touch soon.");
        setForm(INITIAL);
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setServerError(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <form className={styles.partner_form} onSubmit={handleSubmit} noValidate>
      {status === "success" && (
        <div className={styles.form_message_success}>
          <Icon icon="mdi:check-circle-outline" width={18} />
          {successMsg}
        </div>
      )}

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
              placeholder="John Smith"
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
              maxLength={15}
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
                <option value="AED 2Mn - AED 5 Mn">AED 2Mn - AED 5Mn</option>
                <option value="AED 5 Mn - AED 10 Mn">AED 5Mn - AED 10Mn</option>
                <option value="AED 10Mn - AED 50 Mn">AED 10Mn - AED 50Mn</option>
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
      {error && <span className={styles.field_error}><Icon icon="mdi:alert-circle-outline" width={12} />{error[0]}</span>}
    </div>
  );
}
