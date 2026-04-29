"use client";

import React, { useState, useEffect } from "react";
import Style from "./contact.module.scss";
import { Icon } from "@iconify/react";
import useApiAuth from "../components/hooks/useApiAuth";
import PageLoader from "../components/ui/PageLoader";

// Hardcoded Google Maps embed URL
const MAP_EMBED_URL = "https://www.google.com/maps?q=Pay10+India+Pvt+Ltd&output=embed";

const ContactClient = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const { makeApiCall } = useApiAuth();

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

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall("/page/contact-us");

        if (!isMounted) return;

        // console.log(result);

        if (result?.status) {
          setContactData(result);
          // Set first office as active tab
          const offices = result?.custom_data?.section2?.offices || [];
          if (offices.length > 0) {
            const firstOffice = offices[0];
            // Create unique slug for first office
            const firstTabId = firstOffice.Name
              ? firstOffice.Name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "")
              : "office-0";
            setActiveTab(firstTabId);
          }
        } else {
          setContactData(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
          setContactData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [makeApiCall]);

  // Helper function to parse phone number
  const parsePhoneNumber = (phone) => {
    if (!phone) return { queries: "", business: "" };

    const phoneStr = phone.trim();
    const lines = phoneStr.split(/\r?\n/).filter(line => line.trim());

    if (lines.length === 0) return { queries: "", business: "" };

    // Check if it contains "For Pay10 Queries" and "For Pay10 Business Queries"
    const queriesMatch = phoneStr.match(/For Pay10 Queries[:\s]*([^\r\n]+)/i);
    const businessMatch = phoneStr.match(/For Pay10 Business Queries[:\s]*([^\r\n]+)/i);

    if (queriesMatch && businessMatch) {
      return {
        queries: queriesMatch[1].trim(),
        business: businessMatch[1].trim(),
      };
    }

    // If only one line, use it as queries
    if (lines.length === 1) {
      return { queries: lines[0], business: "" };
    }

    // If multiple lines, use first as queries, second as business
    return {
      queries: lines[0] || "",
      business: lines[1] || "",
    };
  };

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

  const validateMobile = (mobile) => {
    if (!mobile || mobile.trim() === "") {
      return "Mobile number is required";
    }
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return "Mobile number must be exactly 10 digits";
    }
    return "";
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

    const mobileError = validateMobile(formData.mobile);
    if (mobileError) errors.mobile = mobileError;

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

    // For mobile, only allow digits
    if (name === "mobile") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      // Clear error when user starts typing
      if (formErrors.mobile) {
        setFormErrors((prev) => ({ ...prev, mobile: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (formErrors[name]) {
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
      }
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
      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("mobile", formData.mobile.trim());
      formDataToSend.append("company_name", formData.company_name.trim());
      formDataToSend.append("message", formData.message.trim());
      formDataToSend.append("form_type", "Contact");

      // Make API call - need to override headers for FormData
      const apiBaseUrl = '/api/proxy';
      const url = `${apiBaseUrl}/form_post`;

      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
        // Don't set Content-Type, let browser set it with boundary for FormData
        // X-API-Key removed for security. Added via proxy.
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result?.status) {
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
        // Set field errors if provided
        if (result?.errors && Array.isArray(result.errors)) {
          const apiErrors = {};
          result.errors.forEach((error) => {
            if (error.field) {
              apiErrors[error.field] = error.message;
            }
          });
          setFormErrors((prev) => ({ ...prev, ...apiErrors }));
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

  // Helper to create a unique slug from office name
  const createOfficeSlug = (name) => {
    if (!name) return "office-0";
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Process offices data from API
  const processOfficesData = () => {
    if (!contactData?.custom_data?.section2?.offices) return {};

    const offices = contactData.custom_data.section2.offices;
    const processed = {};

    offices.forEach((office, index) => {
      // Use a unique slug based on office name, fallback to index
      const tabId = createOfficeSlug(office.Name) || `office-${index}`;
      const phoneData = parsePhoneNumber(office.Phone);

      processed[tabId] = {
        name: office.Name || "",
        address: office.Address || "",
        email: office.Email?.trim() || "",
        phone: phoneData,
      };
    });

    return processed;
  };

  // Get tabs from API data
  const getTabs = () => {
    if (!contactData?.custom_data?.section2?.offices) return [];

    return contactData.custom_data.section2.offices.map((office, index) => {
      const tabId = createOfficeSlug(office.Name) || `office-${index}`;
      return {
        id: tabId,
        label: office.Name || "",
      };
    });
  };

  const officesData = processOfficesData();
  const tabs = getTabs();
  const currentData = activeTab ? officesData[activeTab] : null;

  const pageData = contactData?.page_data || {};
  const topSubHeading = pageData.top_sub_heading || undefined;
  const topHeading = pageData.top_heading || undefined;

  if (loading && !contactData) {
    return <PageLoader />;
  }

  return (
    <>
      <main>
        <div className={Style.wrapper}>
          <div className={Style.contact_banner_headings}>
            <h5 data-animation="opacity-up">{topSubHeading}</h5>
            <h2 data-animation="opacity-up">{topHeading}</h2>
          </div>
        </div>
        {tabs.length > 0 && (
          <div className={Style.contact_tabs_container} data-animation="opacity-up">
            <div className={Style.contact_tabs}>
              {tabs.map((tab) => (
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
        )}

        {currentData && (
          <div className={Style.contact_map_section}>
            <div className={Style.map_container} data-animation="opacity-up">
              <iframe
                src={MAP_EMBED_URL}
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
                  <h4>Corporate Address</h4>
                  <p style={{ whiteSpace: "pre-line" }}>{currentData.address}</p>
                </div>
              </div>

              {currentData.email && (
                <div className={Style.contact_info_box} data-animation="opacity-up">
                  <div className={Style.contact_info_icon}>
                    <Icon icon="ic:outline-email" />
                  </div>
                  <div className={Style.contact_info_content}>
                    <h4>Email Address</h4>
                    <p>{currentData.email}</p>
                  </div>
                </div>
              )}

              {(currentData.phone.queries || currentData.phone.business) && (
                <div className={Style.contact_info_box} data-animation="opacity-up">
                  <div className={Style.contact_info_icon}>
                    <Icon icon="prime:mobile" />
                  </div>
                  <div className={Style.contact_info_content}>
                    <h4>Phone Number</h4>
                    {currentData.phone.queries && (
                      <p>For Pay10 Queries: {currentData.phone.queries}</p>
                    )}
                    {currentData.phone.business && (
                      <p>For Pay10 Business Queries: {currentData.phone.business}</p>
                    )}
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
              <h2 className={Style.contact_form_title} data-animation="opacity-up">Send Us a Message</h2>
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
                      placeholder="Mobile Number (10 digits) *"
                      className={`${Style.form_input} ${
                        formErrors.mobile ? Style.form_input_error : ""
                      }`}
                      value={formData.mobile}
                      onChange={handleInputChange}
                      maxLength={10}
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
