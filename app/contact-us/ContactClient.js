"use client";

import React, { useState, useRef, useEffect } from "react";
import Style from "./contact.module.scss";
import { Icon } from "@iconify/react";

// Hardcoded Google Maps embed URL
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.6651841438556!2d55.270962999999995!3d25.1807808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6978338fd387%3A0xb7eeb833237a2ede!2sUbora%20Office%20Tower!5e0!3m2!1sen!2sin!4v1778165481176!5m2!1sen!2sin";

// Static office data
const STATIC_OFFICES = {
  "dubai-uae": {
    name: "Dubai, UAE",
    address: "Ubora Office Tower, Business Bay, Dubai, UAE",
    map: MAP_EMBED_URL,
  },
};

const CustomSelect = ({ options, value, onChange, placeholder, name, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className={Style.customSelectWrapper} ref={wrapperRef}>
      <div 
        className={`${Style.formInput} ${Style.customSelectTrigger} ${error ? Style.formInputError : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? Style.customSelectValue : Style.customSelectPlaceholder}>
          {value ? options.find(o => o.value === value)?.label || value : placeholder}
        </span>
        <Icon icon="mdi:chevron-down" className={`${Style.customSelectIcon} ${isOpen ? Style.customSelectIconOpen : ""}`} />
      </div>
      {isOpen && (
        <ul className={Style.customSelectMenu}>
          {options.map((option, idx) => (
            <li 
              key={idx} 
              className={`${Style.customSelectOption} ${value === option.value ? Style.customSelectOptionActive : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ContactClient = () => {
  const [activeFormType, setActiveFormType] = useState("General Inquiry");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Form state holding all possible fields across 4 forms
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company_name: "",
    message: "",
    position: "",
    location: "",
    industry: "",
    company_size: "",
    country: "",
    emirate: "",
    company_website: "",
    partnership_model: "",
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);
  const [formSubmitMessage, setFormSubmitMessage] = useState("");

  const handleTabChange = (type) => {
    setActiveFormType(type);
    setFormErrors({});
    setFormSubmitStatus(null);
    setFormSubmitMessage("");
    // We optionally keep formData intact or reset it. Keeping it prevents losing data on misclick.
  };

  // Form validation functions
  const validateName = (name) => {
    if (!name || name.trim() === "") return "Name is required";
    if (/\d/.test(name)) return "Name should not contain numbers";
    return "";
  };

  const validateEmail = (email) => {
    if (!email || email.trim() === "") return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const submitContactForm = async (mobileValue) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name.trim());
    formDataToSend.append("email", formData.email.trim());
    formDataToSend.append("mobile", mobileValue.trim());
    
    if (activeFormType !== "Channel Partner") {
      formDataToSend.append("company_name", formData.company_name.trim());
    }

    if (activeFormType === "General Inquiry") {
      formDataToSend.append("message", formData.message.trim());
    } else if (activeFormType === "SME Sales") {
      formDataToSend.append("position", formData.position.trim());
      formDataToSend.append("location", formData.location.trim());
      formDataToSend.append("industry", formData.industry.trim());
    } else if (activeFormType === "Enterprise Sales") {
      formDataToSend.append("position", formData.position.trim());
      formDataToSend.append("location", formData.location.trim());
      formDataToSend.append("industry", formData.industry.trim());
      formDataToSend.append("company_size", formData.company_size);
    } else if (activeFormType === "Channel Partner") {
      formDataToSend.append("country", formData.country.trim());
      formDataToSend.append("emirate", formData.emirate.trim());
      formDataToSend.append("company_website", formData.company_website.trim());
      formDataToSend.append("partnership_model", formData.partnership_model);
    }

    formDataToSend.append("form_type", activeFormType);

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

  const validateForm = () => {
    const errors = {};

    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    if (!formData.mobile || formData.mobile.trim() === "") {
      errors.mobile = "Mobile number is required";
    }

    if (activeFormType !== "Channel Partner") {
      if (!formData.company_name || formData.company_name.trim() === "") {
        errors.company_name = "Company name is required";
      }
    }

    if (activeFormType === "General Inquiry") {
      if (!formData.message || formData.message.trim() === "") {
        errors.message = "Message is required";
      }
    }

    if (activeFormType === "SME Sales" || activeFormType === "Enterprise Sales") {
      if (!formData.position.trim()) errors.position = "Position is required";
      if (!formData.location.trim()) errors.location = "Location is required";
      if (!formData.industry.trim()) errors.industry = "Industry is required";
    }

    if (activeFormType === "Enterprise Sales") {
      if (!formData.company_size) errors.company_size = "Please select company size";
    }

    if (activeFormType === "Channel Partner") {
      if (!formData.country.trim()) errors.country = "Country is required";
      if (!formData.emirate.trim()) errors.emirate = "Emirate/Locality is required";
      if (!formData.company_website.trim()) errors.company_website = "Website is required";
      if (!formData.partnership_model) errors.partnership_model = "Please select a partnership model";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
    if (formSubmitStatus) {
      setFormSubmitStatus(null);
      setFormSubmitMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Just return, validateForm() already sets individual field errors.
      // We clear any existing global submit messages so they don't linger.
      setFormSubmitStatus(null);
      setFormSubmitMessage("");
      return;
    }

    setFormSubmitting(true);
    setFormSubmitStatus(null);
    setFormSubmitMessage("");

    try {
      let { response, result } = await submitContactForm(formData.mobile);

      if (!result?.status && /^800\d{5}$/.test(formData.mobile.trim()) && (result?.errors?.mobile || "").toLowerCase().includes("invalid mobile")) {
        ({ response, result } = await submitContactForm(`971${formData.mobile.trim()}`));
      }

      if (response.ok && result?.status) {
        setFormSubmitStatus("success");
        setFormSubmitMessage(result.message || "Successfully sent");
        setFormData({
          name: "", email: "", mobile: "", company_name: "", message: "",
          position: "", location: "", industry: "", company_size: "",
          country: "", emirate: "", company_website: "", partnership_model: "",
        });
        setFormErrors({});
      } else {
        setFormSubmitStatus("error");
        setFormSubmitMessage(result?.message || "Failed to submit form. Please try again.");
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

  const getContactEmail = () => {
    switch (activeFormType) {
      case "SME Sales": return "sales@pay10.ae";
      case "Enterprise Sales": return "enterprisesales@pay10.ae";
      case "Channel Partner": return "channelpartners@pay10.ae";
      default: return "info@pay10.ae";
    }
  };

  const getButtonText = () => {
    switch (activeFormType) {
      case "SME Sales":
      case "Enterprise Sales": return "Send Business Inquiry";
      case "Channel Partner": return "Submit Request";
      default: return "Send Inquiry";
    }
  };

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
              Need assistance or have questions? Reach out to us anytime. Our team is always happy to help.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className={Style.infoCardsSection}>
          <div className={Style.infoCardsGrid}>
            <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="0">
              <div className={Style.infoCardIcon}><Icon icon="weui:location-outlined" /></div>
              <h3>Address</h3>
              <p>1004, 10th Floor, U-Bora Tower, Business Bay, Dubai, United Arab Emirates</p>
            </div>
            <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="150">
              <div className={Style.infoCardIcon}><Icon icon="ic:outline-email" /></div>
              <h3>Email</h3>
              <p><a href="mailto:info@pay10.ae" className={Style.emailLink}>info@pay10.ae</a></p>
            </div>
            <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="300">
              <div className={Style.infoCardIcon}><Icon icon="ic:outline-support-agent" /></div>
              <h3>Merchant Support</h3>
              <p><a href="mailto:merchant.support@pay10.ae" className={Style.emailLink}>merchant.support@pay10.ae</a></p>
            </div>
            <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="450">
              <div className={Style.infoCardIcon}><Icon icon="prime:mobile" /></div>
              <h3>Phone</h3>
              <p>For Pay10 Queries:<br /><a href="tel:80072910" className={Style.phoneLink}>80072910</a></p>
              <p>For Pay10 Business Queries:<br /><a href="tel:800729110" className={Style.phoneLink}>800729110</a></p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className={Style.mapSection} data-animation="opacity">
          <iframe
            src={STATIC_OFFICES["dubai-uae"].map}
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
              <h2 className={Style.formLeftHeading} data-animation="opacity-up" data-anim-delay="100">
                {activeFormType === "General Inquiry" ? "Reach Out to Our Team" : `Reach Out to ${activeFormType}`}
              </h2>
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
                  <span>{getContactEmail()}</span>
                </li>
                <li>
                  <Icon icon="prime:mobile" className={Style.formLeftInfoIcon} />
                  <span>80072910</span>
                </li>
              </ul>
            </div>

            {/* Right: Form */}
            <div className={Style.formRight} data-animation="opacity-up" data-anim-delay="150">
              
              <div className={Style.formCategoryTabs} data-animation="opacity-up">
                {["General Inquiry", "SME Sales", "Enterprise Sales", "Channel Partner"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`${Style.categoryTab} ${activeFormType === type ? Style.categoryTabActive : ""}`}
                    onClick={() => handleTabChange(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <form className={Style.contactForm} onSubmit={handleSubmit}>
                {formSubmitStatus && (
                  <div
                    className={`${Style.formMessage} ${
                      formSubmitStatus === "success" ? Style.formMessageSuccess : Style.formMessageError
                    }`}
                  >
                    {formSubmitMessage}
                  </div>
                )}

                {/* Row 1: Name & Email */}
                <div className={Style.formRow}>
                  <div className={Style.formGroup}>
                    <input
                      type="text"
                      name="name"
                      placeholder={activeFormType === "Channel Partner" ? "Name*" : "Full Name*"}
                      className={`${Style.formInput} ${formErrors.name ? Style.formInputError : ""}`}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {formErrors.name && <span className={Style.formError}>{formErrors.name}</span>}
                  </div>
                  <div className={Style.formGroup}>
                    <input
                      type="email"
                      name="email"
                      placeholder={activeFormType === "Channel Partner" ? "Work Email*" : "Email*"}
                      className={`${Style.formInput} ${formErrors.email ? Style.formInputError : ""}`}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && <span className={Style.formError}>{formErrors.email}</span>}
                  </div>
                </div>

                {/* Row 2: Mobile & conditional Company/Country */}
                <div className={Style.formRow}>
                  <div className={Style.formGroup}>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number*"
                      className={`${Style.formInput} ${formErrors.mobile ? Style.formInputError : ""}`}
                      value={formData.mobile}
                      onChange={handleInputChange}
                      maxLength={15}
                      inputMode="numeric"
                    />
                    {formErrors.mobile && <span className={Style.formError}>{formErrors.mobile}</span>}
                  </div>
                  
                  {activeFormType !== "Channel Partner" ? (
                    <div className={Style.formGroup}>
                      <input
                        type="text"
                        name="company_name"
                        placeholder="Company Name*"
                        className={`${Style.formInput} ${formErrors.company_name ? Style.formInputError : ""}`}
                        value={formData.company_name}
                        onChange={handleInputChange}
                      />
                      {formErrors.company_name && <span className={Style.formError}>{formErrors.company_name}</span>}
                    </div>
                  ) : (
                    <div className={Style.formGroup}>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country*"
                        className={`${Style.formInput} ${formErrors.country ? Style.formInputError : ""}`}
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                      {formErrors.country && <span className={Style.formError}>{formErrors.country}</span>}
                    </div>
                  )}
                </div>

                {/* Dynamic fields based on form type */}

                {/* SME & Enterprise */}
                {(activeFormType === "SME Sales" || activeFormType === "Enterprise Sales") && (
                  <div className={Style.formRow}>
                    <div className={Style.formGroup}>
                      <input
                        type="text"
                        name="position"
                        placeholder="Position (Title)*"
                        className={`${Style.formInput} ${formErrors.position ? Style.formInputError : ""}`}
                        value={formData.position}
                        onChange={handleInputChange}
                      />
                      {formErrors.position && <span className={Style.formError}>{formErrors.position}</span>}
                    </div>
                    <div className={Style.formGroup}>
                      <input
                        type="text"
                        name="location"
                        placeholder="Location*"
                        className={`${Style.formInput} ${formErrors.location ? Style.formInputError : ""}`}
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                      {formErrors.location && <span className={Style.formError}>{formErrors.location}</span>}
                    </div>
                  </div>
                )}

                {(activeFormType === "SME Sales" || activeFormType === "Enterprise Sales") && (
                  <div className={Style.formRow}>
                    <div className={Style.formGroup}>
                      <input
                        type="text"
                        name="industry"
                        placeholder="Industry*"
                        className={`${Style.formInput} ${formErrors.industry ? Style.formInputError : ""}`}
                        value={formData.industry}
                        onChange={handleInputChange}
                      />
                      {formErrors.industry && <span className={Style.formError}>{formErrors.industry}</span>}
                    </div>
                    {activeFormType === "Enterprise Sales" && (
                      <div className={Style.formGroup}>
                        <CustomSelect
                          name="company_size"
                          value={formData.company_size}
                          onChange={handleInputChange}
                          placeholder="Company Size*"
                          error={formErrors.company_size}
                          options={[
                            { value: "0-50 Employees", label: "0-50 Employees" },
                            { value: "100-500 Employees", label: "100-500 Employees" },
                            { value: "500-5000 Employees", label: "500-5000 Employees" },
                            { value: "5000 + Employees", label: "5000 + Employees" },
                          ]}
                        />
                        {formErrors.company_size && <span className={Style.formError}>{formErrors.company_size}</span>}
                      </div>
                    )}
                  </div>
                )}

                {/* Channel Partner */}
                {activeFormType === "Channel Partner" && (
                  <>
                    <div className={Style.formRow}>
                      <div className={Style.formGroup}>
                        <input
                          type="text"
                          name="emirate"
                          placeholder="Emirate / Locality*"
                          className={`${Style.formInput} ${formErrors.emirate ? Style.formInputError : ""}`}
                          value={formData.emirate}
                          onChange={handleInputChange}
                        />
                        {formErrors.emirate && <span className={Style.formError}>{formErrors.emirate}</span>}
                      </div>
                      <div className={Style.formGroup}>
                        <input
                          type="url"
                          name="company_website"
                          placeholder="Company Website*"
                          className={`${Style.formInput} ${formErrors.company_website ? Style.formInputError : ""}`}
                          value={formData.company_website}
                          onChange={handleInputChange}
                        />
                        {formErrors.company_website && <span className={Style.formError}>{formErrors.company_website}</span>}
                      </div>
                    </div>
                    <div className={Style.formRow}>
                      <div className={`${Style.formGroup} ${Style.formGroupFull}`}>
                        <CustomSelect
                          name="partnership_model"
                          value={formData.partnership_model}
                          onChange={handleInputChange}
                          placeholder="Which partnership model you are Interested in?*"
                          error={formErrors.partnership_model}
                          options={[
                            { value: "Referral", label: "Referral" },
                            { value: "Building tech integration and solutions", label: "Building tech integration and solutions" },
                          ]}
                        />
                        {formErrors.partnership_model && <span className={Style.formError}>{formErrors.partnership_model}</span>}
                      </div>
                    </div>
                  </>
                )}

                {/* Message (General Inquiry Only) */}
                {activeFormType === "General Inquiry" && (
                  <div className={Style.formRow}>
                    <div className={`${Style.formGroup} ${Style.formGroupFull}`}>
                      <textarea
                        name="message"
                        placeholder="Inquiry Message*"
                        rows="6"
                        className={`${Style.formTextarea} ${formErrors.message ? Style.formTextareaError : ""}`}
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                      {formErrors.message && <span className={Style.formError}>{formErrors.message}</span>}
                    </div>
                  </div>
                )}

                <div style={{ textAlign: "center", marginTop: "16px" }}>
                  <button
                    type="submit"
                    className={Style.formSubmitBtn}
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? "Sending..." : getButtonText()}
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
