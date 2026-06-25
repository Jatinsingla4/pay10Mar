import BillPaymentClient from "./BillPaymentClient";

export const metadata = {
  title: "Bill Payment App - Pay10",
  description: "Never miss a bill. Never switch apps again. All your UAE bills paid from one place.",
  alternates: {
    canonical: "https://pay10.ae/bill-payment",
  },
};

export default function BillPaymentPage() {
  return <BillPaymentClient />;
}
