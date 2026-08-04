import SocClient from './SocClient';
import { fetchPageData } from '../lib/fetchPageData';

export const metadata = {
  title: "Schedule of Charges – Pay 10",
  description: "Read the Schedule of Charges for Pay10 products and services, including fees for top-ups, withdrawals, Send Abroad, Bill Payment, and Pay10 Card.",
  alternates: {
    canonical: "https://pay10.ae/schedule-of-charges",
  },
};

export default async function ScheduleOfChargesPage() {
  const pageData = await fetchPageData('schedule-of-charges');
  return <SocClient pageData={pageData} />;
}
