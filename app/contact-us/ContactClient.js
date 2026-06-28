"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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

const VALID_FORM_TYPES = ["General Inquiry", "SME Sales", "Enterprise Sales", "Channel Partner"];

const ContactClient = ({ pageData = null }) => {
  const searchParams = useSearchParams();
  const [activeFormType, setActiveFormType] = useState(() => {
    const type = searchParams.get("type");
    return VALID_FORM_TYPES.includes(type) ? type : "General Inquiry";
  });
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
    const fd = new FormData();
    fd.append("name", formData.name.trim());
    fd.append("email", formData.email.trim());
    fd.append("mobile", mobileValue.trim());
    fd.append("form_type", activeFormType);

    if (activeFormType !== "Channel Partner") {
      fd.append("company_name", formData.company_name.trim());
    }

    if (activeFormType === "General Inquiry") {
      fd.append("message", formData.message.trim());
    } else if (activeFormType === "SME Sales") {
      fd.append("position", formData.position.trim());
      fd.append("location", formData.location.trim());
      fd.append("industry", formData.industry.trim());
    } else if (activeFormType === "Enterprise Sales") {
      fd.append("position", formData.position.trim());
      fd.append("location", formData.location.trim());
      fd.append("industry", formData.industry.trim());
      fd.append("company_size", formData.company_size);
    } else if (activeFormType === "Channel Partner") {
      fd.append("country", formData.country.trim());
      fd.append("emirate", formData.emirate.trim());
      fd.append("company_website", formData.company_website.trim());
      fd.append("partnership_model", formData.partnership_model);
    }

    const response = await fetch("/api/proxy/form_post", {
      method: "POST",
      body: fd,
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
    let { name, value } = e.target;
    if (name === "mobile") {
      value = value.replace(/[^\d+]/g, "");
      if (value.indexOf("+") > 0) value = value.replace(/\+/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
    if (formSubmitStatus) {
      setFormSubmitStatus(null);
      setFormSubmitMessage("");
    }
  };

  const handleMobileKeyDown = (e) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];
    if (allowed.includes(e.key)) return;
    if (e.key === "+" && e.target.selectionStart === 0 && !formData.mobile.startsWith("+")) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
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

      if (!result?.status && /^800\d{5}$/.test(formData.mobile.trim()) && (result?.errors?.phone || "").toLowerCase().includes("invalid")) {
        ({ response, result } = await submitContactForm(`971${formData.mobile.trim()}`));
      }

      if (response.ok && result?.status) {
        setFormSubmitStatus("success");
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
          const mapped = Array.isArray(result.errors)
            ? result.errors.reduce((acc, e) => { if (e.field) acc[e.field] = e.message; return acc; }, {})
            : { ...result.errors };
          if (mapped.phone) { mapped.mobile = mapped.phone; delete mapped.phone; }
          setFormErrors((prev) => ({ ...prev, ...mapped }));
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
        <section
          className={Style.heroBanner}
          style={pageData?.banner_image ? { backgroundImage: `url(${pageData.banner_image})` } : undefined}
        >
          <div className={Style.heroOverlay}></div>
          <div className={Style.heroContent}>
            <h1 data-animation="opacity-up">{pageData?.page_title || "Contact Us"}</h1>
            {pageData?.page_description ? (
              <div
                data-animation="opacity-up"
                dangerouslySetInnerHTML={{ __html: pageData.page_description }}
              />
            ) : (
              <p data-animation="opacity-up">
                Need assistance or have questions? Reach out to us anytime. Our team is always happy to help.
              </p>
            )}
          </div>
        </section>

        {/* Info Cards Section */}
        <section className={Style.infoCardsSection}>
          <div className={Style.infoCardsGrid}>
            {pageData?.contact_cards?.length > 0 ? (
              pageData.contact_cards.map((card, idx) => (
                <div
                  key={idx}
                  className={Style.infoCard}
                  data-animation="opacity-up"
                  data-anim-delay={idx * 50}
                >
                  {card.icon && (
                    <div className={Style.infoCardIcon}>
                      <img src={card.icon} alt={card.title} />
                    </div>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: card.content }} />
                </div>
              ))
            ) : (
              <>
                <div className={Style.infoCard} data-animation="opacity-up">
                  <div className={Style.infoCardIcon}><Icon icon="mdi:headset" /></div>
                  <h3>Customer Support</h3>
                  <p>24/7 Human Multi-Language Support</p>
                  <p>Toll Free: <a href="tel:80072910" className={Style.phoneLink}>800 729 10</a></p>
                  <p><a href="mailto:support@pay10.ae" className={Style.emailLink}>support@pay10.ae</a></p>
                </div>
                <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="50">
                  <div className={Style.infoCardIcon}><Icon icon="mdi:store-outline" /></div>
                  <h3>Merchant Support</h3>
                  <p>24/7 Human Multi-Language Support</p>
                  <p>Toll Free: <a href="tel:800729110" className={Style.phoneLink}>800 729 110</a></p>
                  <p><a href="mailto:merchant.support@pay10.ae" className={Style.emailLink}>merchant.support@pay10.ae</a></p>
                </div>
                <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="100">
                  <div className={Style.infoCardIcon}><Icon icon="mdi:briefcase-outline" /></div>
                  <h3>SME Merchants</h3>
                  <p>Register Your SME Business with Pay10</p>
                  <p><a href="mailto:sales@pay10.ae" className={Style.emailLink}>sales@pay10.ae</a></p>
                </div>
                <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="150">
                  <div className={Style.infoCardIcon}><Icon icon="mdi:office-building-outline" /></div>
                  <h3>Enterprise Merchants</h3>
                  <p>Contact our Enterprise Team for Enterprise Solutions</p>
                  <p><a href="mailto:enterprisesales@pay10.ae" className={Style.emailLink}>enterprisesales@pay10.ae</a></p>
                </div>
                <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="200">
                  <div className={Style.infoCardIcon}><Icon icon="mdi:handshake-outline" /></div>
                  <h3>Channel Partners</h3>
                  <p>Contact us to become a Pay10 Channel Partner</p>
                  <p><a href="mailto:channelpartners@pay10.ae" className={Style.emailLink}>channelpartners@pay10.ae</a></p>
                </div>
                <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="250">
                  <div className={Style.infoCardIcon}><Icon icon="mdi:microphone-outline" /></div>
                  <h3>Media &amp; PR</h3>
                  <p>Contact our PR Team</p>
                  <p><a href="mailto:pr@pay10.ae" className={Style.emailLink}>pr@pay10.ae</a></p>
                </div>
                <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="300">
                  <div className={Style.infoCardIcon}><Icon icon="mdi:bullhorn-outline" /></div>
                  <h3>Marketing &amp; Events</h3>
                  <p>Contact our Marketing Team</p>
                  <p><a href="mailto:marketing@pay10.ae" className={Style.emailLink}>marketing@pay10.ae</a></p>
                </div>
                <div className={Style.infoCard} data-animation="opacity-up" data-anim-delay="350">
                  <div className={Style.infoCardIcon}><Icon icon="mdi:information-outline" /></div>
                  <h3>General Inquiries</h3>
                  <p>Contact our Team for General Inquiries</p>
                  <p><a href="mailto:info@pay10.ae" className={Style.emailLink}>info@pay10.ae</a></p>
                </div>
              </>
            )}
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
                  <span>{pageData?.address || "1004, 10th Floor, U-Bora Tower, Business Bay, Dubai, United Arab Emirates"}</span>
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
                {formSubmitStatus === "error" && (
                  <div className={`${Style.formMessage} ${Style.formMessageError}`}>
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
                      placeholder="+971501234567"
                      className={`${Style.formInput} ${formErrors.mobile ? Style.formInputError : ""}`}
                      value={formData.mobile}
                      onChange={handleInputChange}
                      onKeyDown={handleMobileKeyDown}
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

                {formSubmitStatus === "success" && (
                  <div className={`${Style.formMessage} ${Style.formMessageSuccess}`}>
                    Thank you! We&apos;ll be in touch soon.
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
