import React from "react";
import MerchantAppClient from "./MerchantAppClient";

export const metadata = {
  title: "Merchant App \u2013 Pay 10",
  description: "Download the Pay10 Bizz App to manage your merchant account, track transactions, and accept digital payments.",
  alternates: {
    canonical: "https://pay10.ae/merchant-app",
  },
};

const page = () => {
  return <MerchantAppClient />;
};

export default page;
