"use client";

import ConsumerHero from "@/app/components/ui/product/ConsumerHero";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import ConsumerSecuritySection from "./ConsumerSecuritySection";
import Style from "./page.module.scss";

const CustomerAppClient = () => {
  const featureSectionsData = [
    {
      // 2nd Section
      heading: "Link your bank account. Once. Done. Forever.",
      subheading: "Powered by Al Tareq - the UAE's Open Finance infrastructure. Connect your Account via AL TAREQ and start transacting. Download Pay10 UAE app, Link Bank Accounts. Look at your stopwatch, all it took was 20 seconds.",
      points: [
        "Connect once - Pay10 remembers. No re-linking, ever",
        "Pay directly from your bank account - no card needed",
        "Real-time, secure connection - bank-grade encryption, your consent, always",
        "Track and monitor all linked accounts and transactions in one place"
      ],
      imageSrc: "/images/prod_imports/consumer-app-phone.png",
      imageAlt: "Link bank account",
      isReversed: false,
      isGreyBg: true,
    },
    {
      // 3rd Section
      heading: "Scan. Tap. Done.",
      subheading: "Pay10 merchants use the UAE's first Dynamic QR POS device - built for instant, secure in-person payments.",
      points: [
        "Payment confirmed in under 2 seconds - faster than handing over cash.",
        "No card. No cash. No waiting. Just open Pay10 UAE App, scan the code, and walk away paid.",
        "Scan & Pay at thousands of merchants across all 7 Emirates - retail, restaurants, services, and more."
      ],
      imageSrc: "/images/prod_imports/consumer-app-phone.png",
      imageAlt: "Dynamic QR POS",
      isReversed: true,
      isGreyBg: true,
    },
    {
      // 4th Section
      heading: "Bank transfers the way they should have always worked.",
      points: [
        "Just enter the IBAN - to yourself or anyone else. No extra steps, no approvals, no waiting.",
        "Behind every Pay10 bank transfer is Aani - the CBUAE real-time payments network. Instant. 24/7.",
        "Transfer any time - midnight, weekend, public holiday. Pay10 doesn't keep banking hours because your life doesn't either."
      ],
      imageSrc: "/images/prod_imports/consumer-app-phone.png",
      imageAlt: "Bank Transfer",
      isReversed: false,
      isGreyBg: true,
    },
    {
      // 5th Section
      heading: "Send money. All you need is their mobile number.",
      points: [
        "Open Pay10. Enter their UAE mobile number. Send. Done.",
        "Already on Pay10? Money lands in their app instantly.",
        "Not on Pay10 yet? They get an SMS to join and claim what you sent - it waits for them.",
        "Send to anyone in the UAE - no bank details, no IBAN, no awkward \"what's your account number\" conversation."
      ],
      imageSrc: "/images/prod_imports/consumer-app-phone.png",
      imageAlt: "Send money",
      isReversed: true,
      isGreyBg: true,
    },
    {
      // 6th Section
      heading: "Pay Bill. In Any Emirate",
      points: [
        "Utilities, telecom, transportation and even gift cards - every bill category, every provider, across all 7 Emirates.",
        "One login. One app. No more switching between portals, websites, or queues."
      ],
      imageSrc: "/images/prod_imports/consumer-app-phone.png",
      imageAlt: "Pay Bill",
      isReversed: false,
      isGreyBg: true,
    },
    {
      // 7th Section
      heading: "Send Money Abroad (Coming Soon)",
      points: [
        "Transfers reach your loved ones instantly - no waiting, no processing days, no checking if it arrived.",
        "No more adding beneficiaries and waiting for approvals. Enter once. Send anytime.",
        "Whether it's rent, school fees, or just because - your money moves the moment you decide."
      ],
      imageSrc: "/images/prod_imports/consumer-app-phone.png",
      imageAlt: "Send Money Abroad",
      isReversed: true,
      isGreyBg: true,
    },
    {
      // 8th Section
      heading: "Pay10 Card, Is all you need (Coming Soon)",
      points: [
        "Pay10 Card (Jaywan) The first UAE local Debit Card accredited by the Central Bank of the UAE - linked to your Pay10 UAE App. instant, secure, and seamless by design.",
        "Built for WPS employees and banked professionals - because everyone who earns in the UAE deserves a card that works here.",
        "Withdraw cash at any UAE ATM. Pay at all Jaywan-enabled POS devices across all 7 Emirates.",
        "Pay10 Card is coming. The UAE's first CBUAE-accredited local debit card - and it's worth the wait."
      ],
      imageSrc: "/images/prod_imports/consumer-app-phone.png",
      imageAlt: "Pay10 Card",
      isReversed: false,
      isGreyBg: true,
    },
    {
      // 9th Section
      heading: "Transaction History : Every Emirati Dirham. Every detail. Right here.",
      points: [
        "Tap any transaction to see the full details - amount, merchant, time, status. Nothing hidden, nothing missing.",
        "Need a record? Filter by date and export your history as a PDF - exactly the way you need it.",
        "Pull up to 60 days of transactions instantly, in-app, anytime.",
        "Need more than 60 days? Our multi-language, human support team is available 24/7 - no bots, no wait times, just answers."
      ],
      imageSrc: "/images/prod_imports/consumer-app-phone.png",
      imageAlt: "Transaction History",
      isReversed: true,
      isGreyBg: true,
    }
  ];

  return (
    <main>
      <ConsumerHero />

      <div className={Style.bg_circle_wrapper}>
        {featureSectionsData.map((section, index) => (
          <ConsumerFeatureSection
            key={index}
            heading={section.heading}
            subheading={section.subheading}
            points={section.points}
            imageSrc={section.imageSrc}
            imageAlt={section.imageAlt}
            isReversed={section.isReversed}
            isGreyBg={section.isGreyBg}
            isTransparent={true}
          />
        ))}
      </div>

      <ConsumerSecuritySection />
    </main>
  );
};

export default CustomerAppClient;
