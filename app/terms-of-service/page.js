import TermsClient from './TermsClient';
import { fetchPageData } from '../lib/fetchPageData';

export const metadata = {
  title: "Terms of Service \u2013 Pay 10",
  description: "Read the Terms of Service for Pay10 Payment Services Provider LLC, covering general consumer terms, bill payment, cards, and WPS employee rules.",
  alternates: {
    canonical: "https://pay10.ae/terms-of-service",
  },
};

export default async function TermsOfServicePage() {
  const pageData = await fetchPageData('terms-of-service');
  return (
    <main style={{ backgroundColor: '#ffffff' }}>
      <TermsClient pageData={pageData} />
    </main>
  );
}
