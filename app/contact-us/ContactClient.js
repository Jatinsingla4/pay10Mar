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
        <div className={Style.wrapper}>
          <div className={Style.contact_banner_headings}>
            <h5 data-animation="opacity-up"></h5>
            <h1 data-animation="opacity-up"></h1>
          </div>
        </div>
        <div className={Style.contact_tabs_container} data-animation="opacity-up">
          <div className={Style.contact_tabs}>
            {STATIC_TABS.map((tab) => (
              <button
                key={tab.id}
                className={`${Style.contact_tab} ${
                  activeTab === tab.id ? Style.active : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {currentData && (
          <div className={Style.contact_map_section}>
            <div className={Style.map_container} data-animation="opacity-up">
              <iframe
                src={currentData.map || MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${currentData.name || "Pay10"} Location Map`}
              ></iframe>
            </div>

            <div className={Style.contact_info_overlay}>
              <div className={Style.contact_info_box} data-animation="opacity-up">
                <div className={Style.contact_info_icon}>
                  <Icon icon="weui:location-outlined" />
                </div>
                <div className={Style.contact_info_content}>
                  <h4>Address</h4>
                  <p style={{ whiteSpace: "pre-line" }}>{currentData.address}</p>
                </div>
              </div>

              {currentData.emails?.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className={Style.contact_info_box}
                  data-animation="opacity-up"
                >
                  <div className={Style.contact_info_icon}>
                    <Icon icon="ic:outline-email" />
                  </div>
                  <div className={Style.contact_info_content}>
                    <h4>{item.label}</h4>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}

              {currentData.phones?.length > 0 && (
                <div className={Style.contact_info_box} data-animation="opacity-up">
                  <div className={Style.contact_info_icon}>
                    <Icon icon="prime:mobile" />
                  </div>
                  <div className={Style.contact_info_content}>
                    <h4>Phone</h4>
                    {currentData.phones.map((item, index) => (
                      <p key={`${item.label}-${index}`}>
                        {item.label}: {item.value}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={Style.wrapper}>
          <div className={Style.contact_form_section} data-animation="opacity-up">
            <div className={Style.contact_form_background}></div>
            <div className={Style.contact_form_container}>
              <h2 className={Style.contact_form_title} data-animation="opacity-up">Reach out to our sales team</h2>
              <form className={Style.contact_form} onSubmit={handleSubmit}>
                {/* Success/Error Message */}
                {formSubmitStatus && (
                  <div
                    className={`${Style.form_message} ${
                      formSubmitStatus === "success"
                        ? Style.form_message_success
                        : Style.form_message_error
                    }`}
                    data-animation="opacity-up"
                  >
                    {formSubmitMessage}
                  </div>
                )}

                <div className={Style.form_row}>
                  <div className={Style.form_group} data-animation="opacity-up">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      className={`${Style.form_input} ${
                        formErrors.name ? Style.form_input_error : ""
                      }`}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {formErrors.name && (
                      <span className={Style.form_error}>{formErrors.name}</span>
                    )}
                  </div>
                  <div className={Style.form_group} data-animation="opacity-up">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      className={`${Style.form_input} ${
                        formErrors.email ? Style.form_input_error : ""
                      }`}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && (
                      <span className={Style.form_error}>{formErrors.email}</span>
                    )}
                  </div>
                </div>
                <div className={Style.form_row}>
                  <div className={Style.form_group} data-animation="opacity-up">
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number *"
                      className={`${Style.form_input} ${
                        formErrors.mobile ? Style.form_input_error : ""
                      }`}
                      value={formData.mobile}
                      onChange={handleInputChange}
                      maxLength={15}
                      inputMode="numeric"
                    />
                    {formErrors.mobile && (
                      <span className={Style.form_error}>{formErrors.mobile}</span>
                    )}
                  </div>
                  <div className={Style.form_group} data-animation="opacity-up">
                    <input
                      type="text"
                      name="company_name"
                      placeholder="Company *"
                      className={`${Style.form_input} ${
                        formErrors.company_name ? Style.form_input_error : ""
                      }`}
                      value={formData.company_name}
                      onChange={handleInputChange}
                    />
                    {formErrors.company_name && (
                      <span className={Style.form_error}>
                        {formErrors.company_name}
                      </span>
                    )}
                  </div>
                </div>
                <div className={Style.form_row} data-animation="opacity-up">
                  <div className={Style.form_group}>
                    <textarea
                      name="message"
                      placeholder="Message *"
                      rows="6"
                      className={`${Style.form_textarea} ${
                        formErrors.message ? Style.form_textarea_error : ""
                      }`}
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                    {formErrors.message && (
                      <span className={Style.form_error}>{formErrors.message}</span>
                    )}
                  </div>
                </div>
                <div data-animation="scale-up" style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className={Style.form_submit_btn}
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactClient;
