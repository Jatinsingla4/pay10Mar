import FaqsClient from './FaqsClient';

export const metadata = {
  title: "Faqs \u2013 Pay 10",
  description: "Find answers to frequently asked questions about Pay10 bill payments, card issuing, fraud reporting, WPS salary transfer, and apps.",
  alternates: {
    canonical: "https://pay10.ae/faqs",
  },
};

export default function FaqsPage() {
  return <FaqsClient />;
}
