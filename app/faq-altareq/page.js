import FaqsAltareqClient from './FaqsAltareqClient';
import { fetchPageData } from '../lib/fetchPageData';

export const metadata = {
  title: 'Al Tareq FAQ | Pay10',
  description: 'Frequently Asked Questions about Al Tareq Open Finance on Pay10',
};

export default async function FaqAltareqPage() {
  const pageData = await fetchPageData('faq-altareq');
  return (
    <main style={{ backgroundColor: 'var(--body-bg)', paddingTop: '80px', paddingBottom: '80px' }}>
      <FaqsAltareqClient pageData={pageData} />
    </main>
  );
}
