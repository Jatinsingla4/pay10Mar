import React from "react";
import OpenFinanceAltareqClient from "./OpenFinanceAltareqClient";

export const metadata = {
  title: "Open Finance Al Tareeq \u2013 Pay 10",
  description: "Connect to the Open Finance Al Tareeq platform by Pay10 for secure financial data sharing and interoperability in the UAE.",
  alternates: {
    canonical: "https://pay10.ae/open-finance-altareq",
  },
};

const page = () => {
  return <OpenFinanceAltareqClient />;
};

export default page;
