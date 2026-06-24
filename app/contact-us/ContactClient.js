"use client";

import React, { useState } from "react";
import Style from "./contact.module.scss";
import { Icon } from "@iconify/react";

// Hardcoded Google Maps embed URL
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.6651841438556!2d55.270962999999995!3d25.1807808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6978338fd387%3A0xb7eeb833237a2ede!2sUbora%20Office%20Tower!5e0!3m2!1sen!2sin!4v1778165481176!5m2!1sen!2sin";

// Static office data
const STATIC_OFFICES = {
  "dubai-uae": {
    name: "Dubai, UAE",
    address: "Ubora Office Tower, Business Bay, Dubai, UAE",
    emails: [
      { label: "Email Address", value: "info@pay10.ae" },
    ],
    phones: [
      { label: "For Pay10 Queries", value: "+971 4 123 4567" },
    ],
    map: MAP_EMBED_URL,
  },
};

const STATIC_TABS = [
  { id: "dubai-uae", label: "Dubai, UAE" },
];

const ContactClient = () => {
  const [activeTab, setActiveTab] = useState("dubai-uae");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company_name: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitStatus, setFormSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [formSubmitMessage, setFormSubmitMessage] = useState("");

  // Form validation functions
  const validateName = (name) => {
    if (!name || name.trim() === "") {
      return "Name is required";
    }
    if (/\d/.test(name)) {
      return "Name should not contain numbers";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email || email.trim() === "") {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const submitContactForm = async (mobileValue) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name.trim());
    formDataToSend.append("email", formData.email.trim());
    formDataToSend.append("mobile", mobileValue.trim());
    formDataToSend.append("company_name", formData.company_name.trim());
    formDataToSend.append("message", formData.message.trim());
    formDataToSend.append("form_type", "Contact");

    const response = await fetch("/api/proxy/form_post", {
      method: "POST",
      body: formDataToSend,
    });

    const contentType = response.headers.get("content-type") || "";
    const result = contentType.includes("application/json")
      ? await response.json()
      : { status: false, message: await response.text() };

    return { response, result };
  };

  const validateCompany = (company) => {
    if (!company || company.trim() === "") {
      return "Company name is required";
    }
    return "";
  };

  const validateMessage = (message) => {
    if (!message || message.trim() === "") {
      return "Message is required";
    }
    return "";
  };

  // Validate all form fields
  const validateForm = () => {
    const errors = {};

    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    if (!formData.mobile || formData.mobile.trim() === "") {
      errors.mobile = "Mobile number is required";
    }

    const companyError = validateCompany(formData.company_name);
    if (companyError) errors.company_name = companyError;

    const messageError = validateMessage(formData.message);
    if (messageError) errors.message = messageError;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear submit status when user starts typing
    if (formSubmitStatus) {
      setFormSubmitStatus(null);
      setFormSubmitMessage("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      setFormSubmitStatus("error");
      setFormSubmitMessage("Please fix the errors in the form");
      return;
    }

    setFormSubmitting(true);
    setFormSubmitStatus(null);
    setFormSubmitMessage("");

    try {
      let { response, result } = await submitContactForm(formData.mobile);

      // Fallback for UAE toll-free format if backend rejects 800XXXXX
      if (
        !result?.status &&
        /^800\d{5}$/.test(formData.mobile.trim()) &&
        (result?.errors?.mobile || "").toLowerCase().includes("invalid mobile")
      ) {
        ({ response, result } = await submitContactForm(`971${formData.mobile.trim()}`));
      }

      if (response.ok && result?.status) {
        setFormSubmitStatus("success");
        setFormSubmitMessage(result.message || "Successfully sent");
        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          company_name: "",
          message: "",
        });
        setFormErrors({});
      } else {
        setFormSubmitStatus("error");
        setFormSubmitMessage(
          result?.message || "Failed to submit form. Please try again."
        );
        // Set field errors if provided (supports array and object formats)
        if (result?.errors && typeof result.errors === "object") {
          if (Array.isArray(result.errors)) {
            const apiErrors = {};
            result.errors.forEach((error) => {
              if (error.field) apiErrors[error.field] = error.message;
            });
            setFormErrors((prev) => ({ ...prev, ...apiErrors }));
          } else {
            setFormErrors((prev) => ({ ...prev, ...result.errors }));
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormSubmitStatus("error");
      setFormSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const currentData = activeTab ? STATIC_OFFICES[activeTab] : null;

  return (
    <>
      <main>
        {/* Hero Banner */}
        <section className={Style.heroBanner}>
          <div className={Style.heroOverlay}></div>
          <div className={Style.heroContent}>
            <h5 data-animation="opacity-up">GET IN TOUCH</h5>
            <h1 data-animation="opacity-up">Contact Us</h1>
            <p data-animation="opacity-up">
              Need assistance or have questions? Reach out to us anytime. Our team are always happy to help.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className={Style.infoCardsSection}>
          <div className={Style.infoCardsGrid}>
            {/* Address */}
            <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="0">
              <div className={Style.infoCardIcon}>
                <Icon icon="weui:location-outlined" />
              </div>
              <h3>Address</h3>
              <p>1004, 10th Floor, U-Bora Tower, Business Bay, Dubai, United Arab Emirates</p>
            </div>

            {/* Email */}
            <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="150">
              <div className={Style.infoCardIcon}>
                <Icon icon="ic:outline-email" />
              </div>
              <h3>Email</h3>
              <p>
                <a href="mailto:info@pay10.ae" className={Style.emailLink}>info@pay10.ae</a>
              </p>
            </div>

            {/* Merchant Support */}
            <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="300">
              <div className={Style.infoCardIcon}>
                <Icon icon="ic:outline-support-agent" />
              </div>
              <h3>Merchant Support</h3>
              <p>
                <a href="mailto:merchant.support@pay10.ae" className={Style.emailLink}>merchant.support@pay10.ae</a>
              </p>
            </div>

            {/* Phone */}
            <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="450">
              <div className={Style.infoCardIcon}>
                <Icon icon="prime:mobile" />
              </div>
              <h3>Phone</h3>
              <p>
                For Pay10 Queries:<br />
                <a href="tel:80072910" className={Style.phoneLink}>80072910</a>
              </p>
              <p>
                For Pay10 Business Queries:<br />
                <a href="tel:800729110" className={Style.phoneLink}>800729110</a>
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className={Style.mapSection} data-animation="opacity">
          <iframe
            src={currentData?.map || MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Pay10 Location Map"
          ></iframe>
        </section>

        {/* Contact Form Section */}
        <section className={Style.formSection}>
          <div className={Style.formInner}>
            {/* Left: Info */}
            <div className={Style.formLeft}>
              <span className={Style.formLeftLabel} data-animation="opacity-up">SEND A MESSAGE</span>
              <h2 className={Style.formLeftHeading} data-animation="opacity-up" data-anim-delay="100">Reach Out to Our Sales Team</h2>
              <p className={Style.formLeftDesc} data-animation="opacity-up" data-anim-delay="200">
                Whether you&apos;re a business looking to integrate payments or a customer needing support, we&apos;d love to hear from you.
              </p>
              <ul className={Style.formLeftInfo} data-animation="opacity-up" data-anim-delay="300">
                <li>
                  <Icon icon="weui:location-outlined" className={Style.formLeftInfoIcon} />
                  <span>1004, 10th Floor, U-Bora Tower, Business Bay, Dubai, United Arab Emirates</span>
                </li>
                <li>
                  <Icon icon="ic:outline-email" className={Style.formLeftInfoIcon} />
                  <span>info@pay10.ae</span>
                </li>
                <li>
                  <Icon icon="prime:mobile" className={Style.formLeftInfoIcon} />
                  <span>80072910</span>
                </li>
              </ul>
            </div>

            {/* Right: Form */}
            <div className={Style.formRight} data-animation="opacity-up" data-anim-delay="150">
              <form className={Style.contactForm} onSubmit={handleSubmit}>
                {/* Success/Error Message */}
                {formSubmitStatus && (
                  <div
                    className={`${Style.formMessage} ${
                      formSubmitStatus === "success"
                        ? Style.formMessageSuccess
                        : Style.formMessageError
                    }`}
                    data-animation="opacity-up"
                  >
                    {formSubmitMessage}
                  </div>
                )}

                <div className={Style.formRow}>
                  <div className={Style.formGroup} data-animation="opacity-up">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      className={`${Style.formInput} ${
                        formErrors.name ? Style.formInputError : ""
                      }`}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {formErrors.name && (
                      <span className={Style.formError}>{formErrors.name}</span>
                    )}
                  </div>
                  <div className={Style.formGroup} data-animation="opacity-up">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      className={`${Style.formInput} ${
                        formErrors.email ? Style.formInputError : ""
                      }`}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && (
                      <span className={Style.formError}>{formErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className={Style.formRow}>
                  <div className={Style.formGroup} data-animation="opacity-up">
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number *"
                      className={`${Style.formInput} ${
                        formErrors.mobile ? Style.formInputError : ""
                      }`}
                      value={formData.mobile}
                      onChange={handleInputChange}
                      maxLength={15}
                      inputMode="numeric"
                    />
                    {formErrors.mobile && (
                      <span className={Style.formError}>{formErrors.mobile}</span>
                    )}
                  </div>
                  <div className={Style.formGroup} data-animation="opacity-up">
                    <input
                      type="text"
                      name="company_name"
                      placeholder="Company *"
                      className={`${Style.formInput} ${
                        formErrors.company_name ? Style.formInputError : ""
                      }`}
                      value={formData.company_name}
                      onChange={handleInputChange}
                    />
                    {formErrors.company_name && (
                      <span className={Style.formError}>
                        {formErrors.company_name}
                      </span>
                    )}
                  </div>
                </div>

                <div className={Style.formRow} data-animation="opacity-up">
                  <div className={`${Style.formGroup} ${Style.formGroupFull}`}>
                    <textarea
                      name="message"
                      placeholder="Message *"
                      rows="6"
                      className={`${Style.formTextarea} ${
                        formErrors.message ? Style.formTextareaError : ""
                      }`}
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                    {formErrors.message && (
                      <span className={Style.formError}>{formErrors.message}</span>
                    )}
                  </div>
                </div>

                <div data-animation="scale-up" style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className={Style.formSubmitBtn}
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactClient;
