"use client";



import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Style from "./about.module.scss";
import JourneySection from "../components/ui/blocks/JourneySection";
import useApiAuth from "../components/hooks/useApiAuth";
import AboutBanner from "../components/ui/about/AboutBanner";
import AboutSecondSection from "../components/ui/about/AboutSecondSection";
import WhereWeScoreSection from "../components/ui/about/WhereWeScoreSection";
import MeetBoardMembersSection from "../components/ui/about/MeetBoardMembersSection";
import UaeAdvisorSection from "../components/ui/about/UaeAdvisorSection";
import AboutTeamMember from "../components/ui/about/AboutTeamMember";
import PageLoader from "../components/ui/PageLoader";
import { cmsImageSrc } from "../lib/cmsImageSrc";

const AboutClient = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall('/page/about-us');

        // console.log(result)
        if (!isMounted) return;


        if (result?.status) {
          setAboutData(result);
        } else {
          setAboutData(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
          setAboutData(null);
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

  // Extract data from API response
  const pageData = aboutData?.page_data || {};
  const section2 = aboutData?.custom_data?.section2 || {};
  const section3 = aboutData?.custom_data?.section3 || {};
  const section4 = aboutData?.custom_data?.section4 || {};
  const section5 = aboutData?.custom_data?.section5 || {};
  const section6 =
    aboutData?.custom_data?.section6 ||
    aboutData?.custom_data?.Section6 ||
    {};
  const section7 = aboutData?.custom_data?.section7 || {};
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || '';
  const section2Image = section2.image ? `${imageBase}${section2.image}` : undefined;

  // API-driven values only
  const topSubHeading = pageData.top_sub_heading || undefined;
  const topHeading = pageData.top_heading || undefined;
  const topDescription = pageData.top_description || undefined;
  const section2Heading = section2.heading || undefined;
  const section2Content = section2.content || undefined;
  const section3Heading = section3.heading || undefined;
  const section5Heading = section5.heading || undefined;
  const section4Heading = section4.heading || undefined;
  const section7Heading = section7.heading || undefined;

  // Default gridArea values for boxes (maintains layout structure)
  const defaultGridAreas = ["volume", "frictionless", "support", "risk", "secure", "updates"];

  // Default fallback boxes
  const defaultBoxes = [
    {
      icon: <img src="/images/icons/payment.png" alt="" />,
      text: (
        <>
          <h5>
            Large payment volume <br /> capacity
          </h5>
        </>
      ),
      gridArea: "volume",
    },
    {
      icon: <img src="/images/icons/frictionless.png" alt="" />,
      text: (
        <>
          <h5>
            Frictionless Payment <br /> Experience
          </h5>
        </>
      ),
      gridArea: "frictionless",
    },
    {
      icon: <img src="/images/icons/service.png" alt="" />,
      text: (
        <>
          <h5>
            Far-reaching Customer <br /> Support
          </h5>
        </>
      ),
      gridArea: "support",
    },
    {
      icon: <img src="/images/icons/report_box.png" alt="" />,
      text: (
        <>
          <h5>
            In-house risk management to <br /> monitor transactions
          </h5>
        </>
      ),
      gridArea: "risk",
    },
    {
      icon: <img src="/images/icons/lock.png" alt="" />,
      text: (
        <>
          <h5>
            Simple, Secure, and <br /> reliable payment process
          </h5>
        </>
      ),
      gridArea: "secure",
    },
    {
      icon: <img src="/images/icons/frame.png" alt="" />,
      text: (
        <>
          <h5>
            Frequent merchant <br /> updates
          </h5>
        </>
      ),
      gridArea: "updates",
    },
  ];

  // Transform API data into boxes format
  const boxes = Array.isArray(section3.list) && section3.list.length > 0
    ? section3.list.map((item, index) => {
        const gridArea = defaultGridAreas[index] || `item-${index}`;
        const fallbackBox = defaultBoxes[index] || defaultBoxes[0];
        const imageUrl = item.Image ? `${imageBase}${item.Image}` : (fallbackBox?.icon?.props?.src || '/images/icons/payment.png');
        const title = item.Title || '';

        // Add line break in the middle for long titles (similar to original design)
        const words = title.split(' ');
        const midPoint = Math.ceil(words.length / 2);
        const firstPart = words.slice(0, midPoint).join(' ');
        const secondPart = words.slice(midPoint).join(' ');

        return {
          icon: <img src={imageUrl} alt={item.Title || ''} />,
          text: (
            <>
              <h5>
                {words.length > 3 ? (
                  <>
                    {firstPart} <br /> {secondPart}
                  </>
                ) : (
                  title
                )}
              </h5>
            </>
          ),
          gridArea: gridArea,
        };
      })
    : defaultBoxes;

  const boardSwiperNavPrev = useRef(null);
  const boardSwiperNavNext = useRef(null);
  const boardSwiperPagination = useRef(null);
  const teamSwiperNavPrev = useRef(null);
  const teamSwiperNavNext = useRef(null);
  const teamSwiperPagination = useRef(null);

  // Default fallback journey data
  const defaultJourneyData = [
    {
      year: "2023",
      description:
        "Opened a new headquarters in Dubai, UAE, marking the beginning of its global expansion.",
      image: "/images/about_images/team/team_member1.png",
    },
    {
      year: "2024",
      description:
        "Innovated with digital wallet solutions focusing on domestic payment schemes and local methods. Additionally, received full regulatory licenses from the Central Bank of the UAE and a Payment Aggregator Cross Border license from the Reserve Bank of India.",
      image: "/images/about_images/board_members/board_member1.jpg",
    },
    {
      year: "2025",
      description:
        "<p>Pay10 UAE received approval as the country's first licensed Third-Party Provider (TPP) under the Central Bank of the UAE's (CBUAE) Open Finance framework.</p><br /><p>In August 2025, Pay10 successfully performed the first ever live transaction on CBUAE's Open Finance Platform.</p>",
      image: "/images/about_images/team/team_member1.png",
    },
    {
      year: "2026",
      description:
        "Pay10 UAE received from The Central Bank of the UAE (CBUAE) the License to Conduct Exchange Business Activity (Category 4) – Cross Border Remittances",
      image: "/images/about_images/board_members/board_member1.jpg",
    },
  ];

  const pickCmsJourneyList = () => {
    const fromKey = (...keys) => {
      for (const k of keys) {
        const arr = section6[k];
        if (Array.isArray(arr) && arr.length > 0) return arr;
      }
      return null;
    };

    let list =
      fromKey('journey_list', 'journey_List', 'Journey_List') ||
      fromKey('journeys');

    if (!list && Array.isArray(section6.list) && section6.list.length > 0) {
      const sample = section6.list[0];
      const looksLikeJourney =
        sample &&
        (sample.Image != null ||
          sample.image != null ||
          sample.Year != null ||
          sample.Name != null);
      if (looksLikeJourney) list = section6.list;
    }

    return list || [];
  };

  const cmsJourneyList = pickCmsJourneyList();

  const pickCmsJourneyImage = (cmsItem) => {
    if (!cmsItem) return null;
    const raw =
      cmsItem.Image ??
      cmsItem.image ??
      cmsItem.section?.Image ??
      cmsItem.section?.image ??
      cmsItem.section?.img ??
      cmsItem.img;
    return raw != null && String(raw).trim() !== '' ? raw : null;
  };

  // About page: default year + description copy; images from CMS when present (no milestone titles).
  const journeyData = defaultJourneyData.map((def, index) => {
    const cmsItem = cmsJourneyList[index];
    const rawImage = pickCmsJourneyImage(cmsItem);
    const imageUrl = rawImage ? cmsImageSrc(rawImage, imageBase) : null;

    return {
      year: def.year,
      description: def.description,
      image: imageUrl || def.image,
    };
  });

  // const boardMembers = [
  //   {
  //     name: "Shradha Nawani",
  //     role: "Chief Business Officer",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque varius.",
  //     image: "/images/about_images/board_members/board_member1.jpg",
  //   },
  //   {
  //     name: "Sara Ali",
  //     role: "Head of Partnerships",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque varius.",
  //     image: "/images/about_images/board_members/board_member1.jpg",
  //   },
  //   {
  //     name: "Amitabh Saxena",
  //     role: "Chief Executive Officer",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque varius.",
  //     image: "/images/about_images/board_members/board_member1.jpg",
  //   },
  //   {
  //     name: "Elena Fischer",
  //     role: "Chief Operations Officer",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque varius.",
  //     image: "/images/about_images/board_members/board_member1.jpg",
  //   },
  //   {
  //     name: "Marina Petrov",
  //     role: "Chief Product Officer",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque varius.",
  //     image: "/images/about_images/board_members/board_member1.jpg",
  //   },
  // ];

  // No text fallback board members
  const defaultBoardMembersBox = [];

  // Transform API data into boardMembersBox format
  // Always use default image regardless of API image field, because image from API is not visible
  const boardMembersBox = Array.isArray(section4.board_team_list) && section4.board_team_list.length > 0
    ? section4.board_team_list.map((item) => {
        // Ignore item.Image on purpose
        const imageUrl = '/images/about_images/board_members/board_member1.jpg';
        // Handle "Designation " with trailing space
        const designation = item['Designation '] || item.Designation || '';

        return {
          nme: item.Name || '',
          role: designation.trim(),
          desc: item.Description || '',
          img: imageUrl,
        };
      })
    : [];

  // Default fallback team members
  // const defaultTeamMembers = [
  //   {
  //     name: "Rahul Mehta",
  //     role: "Head of Engineering",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque varius.",
  //     image: "/images/about_images/team/team_member1.png",
  //   },
  //   {
  //     name: "Priya Kapoor",
  //     role: "Lead Product Manager",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque varius.",
  //     image: "/images/about_images/team/team_member2.png",
  //   },
  //   {
  //     name: "Ananya Singh",
  //     role: "Head of Marketing",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque varius.",
  //     image: "/images/about_images/team/team_member3.png",
  //   },
  //   {
  //     name: "Vikram Rao",
  //     role: "Head of Customer Success",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque varius.",
  //     image: "/images/about_images/team/team_member4.jpg",
  //   },
  //   {
  //     name: "Neha Sharma",
  //     role: "Head of Design",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque varius.",
  //     image: "/images/about_images/team/team_member1.png",
  //   },
  // ];

  // Transform API data into teamMembers format
  // const teamMembers = Array.isArray(section5.our_team_list) && section5.our_team_list.length > 0
  //   ? section5.our_team_list.map((item) => {
  //       const imageUrl = item.Image ? `${imageBase}${item.Image}` : '/images/about_images/team/team_member1.png';
  //       // Handle "Designation " with trailing space
  //       const designation = item['Designation '] || item.Designation || '';

  //       return {
  //         name: item.Name || '',
  //         role: designation.trim(),
  //         description: item.Description || '',
  //         image: imageUrl,
  //       };
  //     })
  //   : defaultTeamMembers;

  if (loading && !aboutData) {
    return <PageLoader />;
  }

  return (
    <main>
      <div className={Style.about_page_bg}>
        <section>
            <AboutBanner
              topSubHeading={topSubHeading}
              topHeading={topHeading}
              topDescription={topDescription}
            />
        </section>

        {/* ABOUT----SECOND----SECTION */}

        <section className={Style.about_bg_circle}>
          <div className={Style.wrapper}>
            <AboutSecondSection
              section2Image={section2Image}
              section2Heading={section2Heading}
              section2Content={section2Content}
            />

            <WhereWeScoreSection
              section3Heading={section3Heading}
              section3={section3}
            />
          </div>

          <div className={Style.second_bg_circle}>
            <div className={Style.wrapper}>
            <MeetBoardMembersSection
              section4Heading={section4Heading}
              section4={section4}
            />
            </div>
            <div className={Style.wrapper}>
            <UaeAdvisorSection
              section7Heading={section7Heading}
              section7={section7}
            />
            </div>
            <div className={Style.wrapper2}>

              {/* Core Team */}
              <AboutTeamMember
                section5Heading={section5Heading}
                section5={section5}
                imageBase={imageBase}
              />
            </div>
          </div>

          {/* Our Journey So Far Section */}
          <JourneySection journeyData={journeyData} title={false} />
        </section>
      </div>
    </main>
  );
};

export default AboutClient;
