import { NextResponse } from "next/server";

const BACKEND_API = "https://pay10d.grapesmobile.com/api/contact/enquiry";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("mobile") || "";
    // Channel Partner has no company_name — fall back to website
    const company = formData.get("company_name") || formData.get("company_website") || "";
    const message = formData.get("message") || "";
    const formType = formData.get("form_type") || "General Inquiry";

    // Map form_type to API type value
    const typeMap = {
      "General Inquiry": "general inquiry",
      "SME Sales": "sme sales",
      "Enterprise Sales": "enterprise sales",
      "Channel Partner": "channel partner",
    };
    const type = typeMap[formType] || formType.toLowerCase();

    // For form types with no message textarea, build one from extra fields
    let finalMessage = message;
    if (!finalMessage) {
      const position = formData.get("position") || "";
      const location = formData.get("location") || "";
      const industry = formData.get("industry") || "";
      const companySize = formData.get("company_size") || "";
      const country = formData.get("country") || "";
      const emirate = formData.get("emirate") || "";
      const website = formData.get("company_website") || "";
      const partnershipModel = formData.get("partnership_model") || "";

      const parts = [
        position && `Position: ${position}`,
        location && `Location: ${location}`,
        industry && `Industry: ${industry}`,
        companySize && `Company Size: ${companySize}`,
        country && `Country: ${country}`,
        emirate && `Emirate: ${emirate}`,
        website && `Website: ${website}`,
        partnershipModel && `Partnership Model: ${partnershipModel}`,
      ].filter(Boolean);

      finalMessage = parts.length > 0 ? parts.join(", ") : `${formType} enquiry`;
    }

    const payload = { name, email, phone, company, message: finalMessage, type };

    const response = await fetch(BACKEND_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json({ status: true, message: data.message }, { status: 200 });
    }

    return NextResponse.json(
      {
        status: false,
        message: data.message || "Submission failed. Please try again.",
        ...(data.errors ? { errors: data.errors } : {}),
      },
      { status: response.status }
    );
  } catch (err) {
    console.error("Contact proxy error:", err);
    return NextResponse.json(
      { status: false, message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
