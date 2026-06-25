import FaqsAltareqClient from './FaqsAltareqClient';

export const metadata = {
  title: 'Al Tareq FAQ | Pay10',
  description: 'Frequently Asked Questions about Al Tareq Open Finance on Pay10',
};

export default function FaqAltareqPage() {
  return (
    <main style={{ backgroundColor: 'var(--body-bg)', paddingTop: '80px', paddingBottom: '80px' }}>
      <FaqsAltareqClient />
    </main>
  );
}
