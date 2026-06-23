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
    title: "Send Money to Family and Friends",
    description: "Supporting your family or sharing expenses with friends? Add them to your list of regulars for speedy transfers.",
  },
  {
    title: "Shop",
    description: "Scan a QR code and tap to pay. It doesn't get simpler than that. No manual data entry. No errors. No fuss.",
  },
  {
    title: "Pay Bills",
    description: "Settle your bills in minutes. Just select the relevant icon and tap to pay.",
  },
  {
    title: "Link Your Bank Account",
    description: "Transfer funds instantly from your bank into your wallet, save on fees, and track your spending.",
  },
  {
    title: "Schedule Payments",
    description: "Never miss a payment again. Simply add your regular payments into the calendar and leave the rest to us.",
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
      <CertificationHero imageSrc="/images/home/feature-circle.png" />
      <CertificationLicensing
        heading={undefined}
        centralBankImage={undefined}
        licensedByHeading={undefined}
        licenseImages={[]}
      />

    </main>
  );
}
