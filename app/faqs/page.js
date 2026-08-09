import { Suspense } from 'react';
import FaqsClient from './FaqsClient';
import { fetchPageData } from '../lib/fetchPageData';

export const metadata = {
  title: "Faqs \u2013 Pay 10",
  description: "Find answers to frequently asked questions about Pay10 bill payments, card issuing, fraud reporting, WPS salary transfer, and apps.",
  alternates: {
    canonical: "https://pay10.ae/faqs",
  },
};

export default async function FaqsPage() {
  const pageData = await fetchPageData('faq');
  return (
    <main style={{ backgroundColor: 'var(--body-bg)' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px 0' }}>Loading FAQs...</div>}>
        <FaqsClient pageData={pageData} />
      </Suspense>
    </main>
  );
}
