'use client'

import { useState, useEffect } from 'react';
import useApiAuth from './components/hooks/useApiAuth';

import HeroHomeBanner from './components/ui/HeroHomeBanner';
import TextCenterBlock from './components/ui/TextCenterBlock';
import BannerBreaker from './components/ui/BannerBreaker';
import JourneySection from './components/ui/blocks/JourneySection';
import FeatureBlock from './components/ui/FeatureBlock';
import CertificationHero from './components/ui/CertificationHero';
import CertificationLicensing from './components/ui/CertificationLicensing';
import PageLoader from './components/ui/PageLoader';
import { cmsImageSrc } from './lib/cmsImageSrc';


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
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall('/home');

        if (!isMounted) return;

        // console.log(result);

        if (result?.status) {
          setHomeData(result);
        } else {
          setHomeData(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
          setHomeData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [makeApiCall]);

  const heroContent = homeData?.page_data || {};
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || '';
  const heroEyebrow = heroContent.top_sub_heading || undefined;
  const heroTitle = heroContent.top_heading || undefined;
  const heroDescription = heroContent.top_description || undefined;
  const heroSrc = heroContent.image ? cmsImageSrc(heroContent.image, imageBase) : null;
  const heroImage = heroSrc
    ? {
        src: heroSrc,
        alt: heroContent.name || 'Pay10 hero',
        width: heroContent.image_width || 360,
        height: heroContent.image_height || 640,
      }
    : undefined;

  const section2 = homeData?.custom_data?.section2 || {};
  const section3 = homeData?.custom_data?.section3 || {};
  const section4 = homeData?.custom_data?.section4 || {};
  const section6 = homeData?.custom_data?.section6 || {};
  const section7 = homeData?.custom_data?.section7 || {};

  const section4JourneyData = Array.isArray(section4.features_list)
    ? section4.features_list.map((item, index) => ({
        title: item?.title ?? item?.Title ?? '',
        description: item?.description ?? item?.Description ?? '',
        id: item?.id ?? item?._id ?? `section4-feature-${index}`,
      }))
    : [];
  const section3Image = section3.image ? cmsImageSrc(section3.image, imageBase) : undefined;
  const section6Background = section6.image ? cmsImageSrc(section6.image, imageBase) : undefined;
  const section6Description = (section6.content || '').replace(/<[^>]+>/g, '');
  const section6Features = Array.isArray(section6.list)
    ? section6.list.map((item, index) => ({
        id: item.Name || `feature-${index}`,
        icon: item.Image ? cmsImageSrc(item.Image, imageBase) : undefined,
        text: item.Name || '',
      }))
    : undefined;
  const section7Image = section7.image ? cmsImageSrc(section7.image, imageBase) : undefined;
  const section8 = homeData?.custom_data?.section8 || {};
  const section9 = homeData?.custom_data?.section9 || {};
  const section8Image = section8.image ? cmsImageSrc(section8.image, imageBase) : undefined;
  const section9Images = Array.isArray(section9.images)
    ? section9.images
        .map((item) => {
          const raw = item?.Image ?? item?.image;
          const src = raw ? cmsImageSrc(raw, imageBase) : null;
          return src ? { Image: src } : null;
        })
        .filter(Boolean)
    : [];

  if (loading && !homeData) {
    return <PageLoader />;
  }

  return (
    <main>
      <HeroHomeBanner
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDescription}
        ctaLabel="Get In Touch"
        heroImage={heroImage}
      />
      <TextCenterBlock
        heading={homeData?.custom_data?.section2?.heading}
        description={homeData?.custom_data?.section2?.content}
      />
      <BannerBreaker
        title={section3.heading}
        description={section3.content}
        backgroundDesktop={section3Image}
        backgroundMobile={section3Image}
        ctaLabel="Get In Touch"
        ctaHref="/contact-us"
      />
      <JourneySection
        mode="accordion"
        journeyData={section4JourneyData.length ? section4JourneyData : walletFeatures}
        rightImage="/images/new_fixed_img.png"
      />
      <FeatureBlock
        heading={section6.heading || undefined}
        description={section6Description || undefined}
        backgroundImage={section6Background || undefined}
        features={section6Features}
      />
      <CertificationHero imageSrc={section7Image} />
      <CertificationLicensing
        heading={section8.heading}
        centralBankImage={section8Image}
        licensedByHeading={section9.heading}
        licenseImages={section9Images}
      />

    </main>
  );
}
