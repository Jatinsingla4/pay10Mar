import React from "react";
import CustomerAppClient from "./CustomerAppClient";

export const metadata = {
  title: "Consumer App | Pay 10",
  description: "Download the Pay10 Consumer App to manage your bills, cards, and WPS salary transfers on the go.",
  alternates: {
    canonical: "https://pay10.ae/consumer-app",
  },
};

const page = () => {
  return <CustomerAppClient />;
};

export default page;
