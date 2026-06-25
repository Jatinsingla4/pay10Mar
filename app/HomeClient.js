'use client'

import HeroHomeBanner from './components/ui/HeroHomeBanner';
import TextCenterBlock from './components/ui/TextCenterBlock';
import BannerBreaker from './components/ui/BannerBreaker';
import JourneySection from './components/ui/blocks/JourneySection';
import FeatureBlock from './components/ui/FeatureBlock';
import CertificationHero from './components/ui/CertificationHero';
import CertificationLicensing from './components/ui/CertificationLicensing';
import CBUAELicenseFeatures from './components/ui/CBUAELicenseFeatures';
import SuperAppSection from './components/ui/SuperAppSection';
import ConsumerAppFeature from './components/ui/ConsumerAppFeature';
import MerchantAppFeature from './components/ui/MerchantAppFeature';
import HomeSecuritySection from './components/ui/HomeSecuritySection';
import MerchantTestimonialVideos from './components/ui/MerchantTestimonialVideos';
import MerchantLogosCTA from './components/ui/MerchantLogosCTA';

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

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient() {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const elements = containerRef.current.querySelectorAll('[data-animation]');

      elements.forEach((el) => {
        const animationType = el.getAttribute('data-animation');
        const delayRaw = el.getAttribute('data-anim-delay');
        const delay = delayRaw ? parseInt(delayRaw) / 1000 : 0;

        if (animationType === 'fade-up') {
          gsap.fromTo(el, 
            { y: 50, opacity: 0 },
            { 
              y: 0, opacity: 1, duration: 0.8, delay: delay, ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        } else if (animationType === 'opacity-up') {
          gsap.fromTo(el, 
            { y: 30, opacity: 0 },
            { 
              y: 0, opacity: 1, duration: 0.8, delay: delay, ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    }
  }, []);

  return (
    <main ref={containerRef}>
      <HeroHomeBanner
        eyebrow={undefined}
        title={undefined}
        description={undefined}
        ctaLabel={null}
        heroImage={null}
        decorations={[]}
      />
      <CBUAELicenseFeatures />
      <SuperAppSection />
      <ConsumerAppFeature />
      <MerchantAppFeature />
      <HomeSecuritySection />
      <MerchantTestimonialVideos />
      <MerchantLogosCTA />
    </main>
  );
}
