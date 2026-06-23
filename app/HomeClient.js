'use client'

import HeroHomeBanner from './components/ui/HeroHomeBanner';
import TextCenterBlock from './components/ui/TextCenterBlock';
import BannerBreaker from './components/ui/BannerBreaker';
import JourneySection from './components/ui/blocks/JourneySection';
import FeatureBlock from './components/ui/FeatureBlock';
import CertificationHero from './components/ui/CertificationHero';
import CertificationLicensing from './components/ui/CertificationLicensing';


const walletFeatures = [
  {
    title: "Send Love, Not just Money",
    description: "Add your frequent recipients for quicker, seamless UPI payments - whether sending or requesting money from your loved ones.",
  },
  {
    title: "Pay with UPI in seconds.",
    description: "Simply scan a QR and complete your payment - no manual entry, no errors, just frictionless and convenient transfers.",
  },
  {
    title: "Tap Away the due dates",
    description: "Select the bill category, tap to pay, and your UPI transaction is done in moments.",
  },
  {
    title: "Move funds instantly through Pay10 UPI",
    description: "Instantly transfer funds from your bank account to your wallet, reduce fees, and track your expenses with ease.",
  },
  {
    title: "Schedule Payments",
    description: "Schedule upcoming payments in advance and let UPI take care of the rest - no missed dates, no follow-ups.",
  },
];

export default function HomeClient() {
  return (
    <main>
      <HeroHomeBanner
        eyebrow={undefined}
        title={undefined}
        description={undefined}
        ctaLabel="Get In Touch"
        heroImage={{
          src: '/images/home/hero-mobile-2.png',
          alt: 'Pay10 App',
          width: 360,
          height: 640,
        }}
      />
      <TextCenterBlock
        heading="We enable businesses and people to send and receive money instantly and securely."
        description=""
      />
      <BannerBreaker
        title={undefined}
        description={undefined}
        backgroundDesktop={undefined}
        backgroundMobile={undefined}
        ctaLabel="Get In Touch"
        ctaHref="/contact-us"
      />
      <JourneySection
        mode="accordion"
        journeyData={walletFeatures}
        rightImage="/images/new_fixed_img.png"
      />
      <FeatureBlock
        heading={undefined}
        description={undefined}
        backgroundImage={undefined}
        features={undefined}
      />
      <CertificationHero imageSrc={undefined} />
      <CertificationLicensing
        heading={undefined}
        centralBankImage={undefined}
        licensedByHeading={undefined}
        licenseImages={[]}
      />

    </main>
  );
}
