import React from "react";
import MerchantPortalClient from "./MerchantPortalClient";

export const metadata = {
  title: "Merchant Portal | Pay10",
  description: "A dedicated merchant portal with your own secure credentials giving you complete visibility of transactions, settlements, VAT reports, and live API integration with your ERP system.",
  alternates: {
    canonical: "https://pay10.ae/merchant-portal",
  },
};

const page = () => {
  return <MerchantPortalClient />;
};

export default page;
