import React from "react";
import Pay10UAEAppClient from "./Pay10UAEAppClient";

export const metadata = {
  title: "Pay10 UAE App | Pay10 UAE",
  description: "Download the Pay10 UAE App to manage your bills, cards, and WPS salary transfers on the go.",
  alternates: {
    canonical: "https://pay10.ae/pay10-uae-app",
  },
};

const page = () => {
  return <Pay10UAEAppClient />;
};

export default page;
