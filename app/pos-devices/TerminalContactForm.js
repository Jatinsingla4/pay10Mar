"use client";

import { useState } from "react";
import Style from "../contact-us/contact.module.scss";
import posStyles from "./pos.module.scss";
import CustomSelect from "../components/ui/CustomSelect";
import Recaptcha, { resetRecaptcha } from "../lib/Recaptcha";
import { getCsrfToken, CSRF_HEADER_NAME } from "../lib/csrf";
import { RECAPTCHA_TOKEN_FIELD, CONTACT_ENQUIRY_URL } from "../lib/proxyConstants";
import { validateName, validateEmail, validateMobile, HTML_TAG_REGEX } from "../lib/formValidators";

const DEVICE_OPTIONS = [
  { value: "P5", label: "P5" },
  { value: "POS10", label: "POS10" },
  { value: "P10", label: "P10" },
  { value: "P15", label: "P15" },
  { value: "P12", label: "P12" },
];

const EMPTY_FORM_DATA = { name: "", email: "", mobile: "", company_name: "", device: "", message: "" };

// Lightweight lead-capture form embedded directly under the compare grid, so
// a visitor can request a terminal without leaving the page. Reuses the same
// validators/Recaptcha/CSRF/proxy endpoint as the full contact-us page, just
// with a shorter field set - submits as a "general inquiry" (device folded
// into the message) rather than adding a new backend-facing enquiry type.
const TerminalContactForm = () => {
  const [formData, setFormData] = useState(EMPTY_FORM_DATA);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);
  const [formSubmitMessage, setFormSubmitMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "mobile") {
      value = value.replace(/[^\d+]/g, "");
      if (value.indexOf("+") > 0) value = value.replace(/\+/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (typeof value === "string" && HTML_TAG_REGEX.test(value)) {
      setFormErrors((prev) => ({ ...prev, [name]: "Les balises HTML ne sont pas autorisées" }));
    } else if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (formSubmitStatus) {
      setFormSubmitStatus(null);
      setFormSubmitMessage("");
    }
  };

  const validateForm = () => {
    const errors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === "string" && HTML_TAG_REGEX.test(value)) errors[key] = "Les balises HTML ne sont pas autorisées";
    }
    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;
    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;
    const mobileError = validateMobile(formData.mobile);
    if (mobileError) errors.mobile = mobileError;
    if (!formData.company_name.trim()) errors.company_name = "Le nom de l'entreprise est requis";
    if (!formData.device) errors.device = "Veuillez sélectionner un terminal";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsValid = validateForm();
    const captchaMissing = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !recaptchaToken;
    setRecaptchaError(captchaMissing ? "Veuillez valider le captcha" : "");
    if (!fieldsValid || captchaMissing) {
      setFormSubmitStatus(null);
      setFormSubmitMessage("");
      return;
    }

    setFormSubmitting(true);
    setFormSubmitStatus(null);
    setFormSubmitMessage("");

    try {
      const mobile = formData.mobile.trim();
      const message = `Terminal souhaité: ${formData.device}` + (formData.message.trim() ? ` - ${formData.message.trim()}` : "");
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: /^800\d{5}$/.test(mobile) ? `971${mobile}` : mobile,
        company: formData.company_name.trim(),
        message,
        type: "general inquiry",
        [RECAPTCHA_TOKEN_FIELD]: recaptchaToken,
      };

      const response = await fetch(CONTACT_ENQUIRY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", [CSRF_HEADER_NAME]: getCsrfToken() },
        body: JSON.stringify(payload),
      });
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : { status: false, message: await response.text() };

      if (response.ok) {
        setFormSubmitStatus("success");
        setFormSubmitMessage(result?.message || "Merci ! Nous vous contacterons rapidement.");
        setFormData(EMPTY_FORM_DATA);
        setFormErrors({});
      } else {
        setFormSubmitStatus("error");
        setFormSubmitMessage(result?.message || "Échec de l'envoi. Veuillez réessayer.");
        if (result?.errors && typeof result.errors === "object") {
          const mapped = Array.isArray(result.errors)
            ? result.errors.reduce((acc, e) => { if (e.field) acc[e.field] = e.message; return acc; }, {})
            : { ...result.errors };
          if (mapped.phone) { mapped.mobile = mapped.phone; delete mapped.phone; }
          setFormErrors((prev) => ({ ...prev, ...mapped }));
        }
      }
    } catch (error) {
      console.error("Error submitting terminal contact form:", error);
      setFormSubmitStatus("error");
      setFormSubmitMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setFormSubmitting(false);
      setRecaptchaToken("");
      resetRecaptcha();
    }
  };

  return (
    <form className={Style.contactForm} onSubmit={handleSubmit} noValidate>
      <div className={Style.formRow}>
        <div className={Style.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Nom complet*"
            className={`${Style.formInput} ${posStyles.white_field} ${formErrors.name ? Style.formInputError : ""}`}
            value={formData.name}
            onChange={handleInputChange}
            required
            maxLength={100}
          />
          {formErrors.name && <span className={Style.formError}>{formErrors.name}</span>}
        </div>
        <div className={Style.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            className={`${Style.formInput} ${posStyles.white_field} ${formErrors.email ? Style.formInputError : ""}`}
            value={formData.email}
            onChange={handleInputChange}
            required
            maxLength={254}
          />
          {formErrors.email && <span className={Style.formError}>{formErrors.email}</span>}
        </div>
      </div>

      <div className={Style.formRow}>
        <div className={Style.formGroup}>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile*"
            className={`${Style.formInput} ${posStyles.white_field} ${formErrors.mobile ? Style.formInputError : ""}`}
            value={formData.mobile}
            onChange={handleInputChange}
            required
            maxLength={16}
          />
          {formErrors.mobile && <span className={Style.formError}>{formErrors.mobile}</span>}
        </div>
        <div className={Style.formGroup}>
          <input
            type="text"
            name="company_name"
            placeholder="Entreprise*"
            className={`${Style.formInput} ${posStyles.white_field} ${formErrors.company_name ? Style.formInputError : ""}`}
            value={formData.company_name}
            onChange={handleInputChange}
            required
            maxLength={100}
          />
          {formErrors.company_name && <span className={Style.formError}>{formErrors.company_name}</span>}
        </div>
      </div>

      <div className={Style.formRow}>
        <div className={Style.formGroup}>
          <CustomSelect
            name="device"
            value={formData.device}
            onChange={handleInputChange}
            placeholder="Terminal souhaité*"
            error={formErrors.device}
            options={DEVICE_OPTIONS}
            styles={Style}
            className={posStyles.white_field}
          />
          {formErrors.device && <span className={Style.formError}>{formErrors.device}</span>}
        </div>
        <div className={Style.formGroup}>
          <input
            type="text"
            name="message"
            placeholder="Message (optionnel)"
            className={`${Style.formInput} ${posStyles.white_field}`}
            value={formData.message}
            onChange={handleInputChange}
            maxLength={500}
          />
        </div>
      </div>

      <div className={Style.formGroup}>
        <Recaptcha
          onVerify={(token) => { setRecaptchaToken(token); setRecaptchaError(""); }}
          onExpire={() => setRecaptchaToken("")}
        />
        {recaptchaError && <span className={Style.formError}>{recaptchaError}</span>}
      </div>

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button type="submit" className={Style.formSubmitBtn} disabled={formSubmitting}>
          {formSubmitting ? "Envoi en cours..." : "Envoyer"}
        </button>
      </div>

      {formSubmitStatus === "success" && (
        <div className={`${Style.formMessage} ${Style.formMessageSuccess}`}>{formSubmitMessage}</div>
      )}
      {formSubmitStatus === "error" && (
        <div className={`${Style.formMessage} ${Style.formMessageError}`}>{formSubmitMessage}</div>
      )}
    </form>
  );
};

export default TerminalContactForm;
