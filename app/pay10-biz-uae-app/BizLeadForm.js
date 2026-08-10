"use client";

import { useState } from "react";
import Style from "./page.module.scss";
import Recaptcha, { resetRecaptcha } from "../lib/Recaptcha";
import { getCsrfToken } from "../lib/csrf";

const INITIAL = {
  business_name: "",
  name: "",
  phone: "",
  email: "",
  address: "",
  business_type: "",
};

const BizLeadForm = () => {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

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

  const validate = () => {
    const errs = {};
    if (!form.business_name.trim()) errs.business_name = "Business name is required";
    if (!form.name.trim()) errs.name = "Your name is required";
    else if (!/^[\p{L}\s'.-]+$/u.test(form.name.trim())) errs.name = "Name should only contain letters";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address";
    if (!form.address.trim()) errs.address = "Business address is required";
    if (!form.business_type) errs.business_type = "Select a business type";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setStatus("error");
      setMessage("Please complete the security check above before submitting.");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Backend only accepts a fixed set of `type` values — derive the closest
    // match from the business type the merchant picked.
    const enquiryType = form.business_type === "Enterprise" ? "enterprise sales" : "sme sales";

    try {
      const res = await fetch("/api/proxy/contact/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": getCsrfToken() },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.business_name,
          address: form.address,
          business_type: form.business_type,
          message: `Business type: ${form.business_type}. Address: ${form.address}`,
          type: enquiryType,
          recaptcha_token: recaptchaToken,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Thank you! We'll be in touch soon.");
        setForm(INITIAL);
      } else if (data.errors) {
        const mapped = { ...data.errors };
        if (mapped.company) { mapped.business_name = mapped.company; delete mapped.company; }
        setErrors((prev) => ({ ...prev, ...mapped }));
        setStatus("idle");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      // Single-use token is spent — reset so a follow-up submit gets a fresh one.
      setRecaptchaToken("");
      resetRecaptcha();
    }
  };

  return (
    <form className={Style.biz_lead_form} onSubmit={handleSubmit} noValidate>
      <div className={Style.biz_lead_row}>
        <div className={Style.biz_lead_group}>
          <input
            type="text"
            name="business_name"
            placeholder="Name of the business*"
            value={form.business_name}
            onChange={handleChange}
            maxLength={200}
            className={errors.business_name ? Style.biz_lead_input_error : ""}
          />
          {errors.business_name && <span className={Style.biz_lead_error}>{errors.business_name}</span>}
        </div>
        <div className={Style.biz_lead_group}>
          <input
            type="text"
            name="name"
            placeholder="Your name*"
            value={form.name}
            onChange={handleChange}
            maxLength={150}
            className={errors.name ? Style.biz_lead_input_error : ""}
          />
          {errors.name && <span className={Style.biz_lead_error}>{errors.name}</span>}
        </div>
      </div>

      <div className={Style.biz_lead_row}>
        <div className={Style.biz_lead_group}>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number*"
            value={form.phone}
            onChange={handleChange}
            onKeyDown={handlePhoneKeyDown}
            maxLength={16}
            inputMode="numeric"
            className={errors.phone ? Style.biz_lead_input_error : ""}
          />
          {errors.phone && <span className={Style.biz_lead_error}>{errors.phone}</span>}
        </div>
        <div className={Style.biz_lead_group}>
          <input
            type="email"
            name="email"
            placeholder="Email ID*"
            value={form.email}
            onChange={handleChange}
            maxLength={254}
            className={errors.email ? Style.biz_lead_input_error : ""}
          />
          {errors.email && <span className={Style.biz_lead_error}>{errors.email}</span>}
        </div>
      </div>

      <div className={Style.biz_lead_row}>
        <div className={Style.biz_lead_group}>
          <input
            type="text"
            name="address"
            placeholder="Address of the business*"
            value={form.address}
            onChange={handleChange}
            maxLength={300}
            className={errors.address ? Style.biz_lead_input_error : ""}
          />
          {errors.address && <span className={Style.biz_lead_error}>{errors.address}</span>}
        </div>
        <div className={Style.biz_lead_group}>
          <select
            name="business_type"
            value={form.business_type}
            onChange={handleChange}
            className={errors.business_type ? Style.biz_lead_input_error : ""}
          >
            <option value="">Business type*</option>
            <option value="Micro Merchant">Micro Merchant</option>
            <option value="SME">SME</option>
            <option value="Enterprise">Enterprise</option>
          </select>
          {errors.business_type && <span className={Style.biz_lead_error}>{errors.business_type}</span>}
        </div>
      </div>

      <Recaptcha onVerify={setRecaptchaToken} onExpire={() => setRecaptchaToken("")} />

      <button type="submit" className={Style.biz_lead_submit} disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Submit"}
      </button>

      {status === "success" && <div className={Style.biz_lead_success}>{message}</div>}
      {status === "error" && <div className={Style.biz_lead_error_box}>{message}</div>}
    </form>
  );
};

export default BizLeadForm;
