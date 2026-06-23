"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Style from "./about.module.scss";
import JourneySection from "../components/ui/blocks/JourneySection";
import AboutBanner from "../components/ui/about/AboutBanner";
import AboutSecondSection from "../components/ui/about/AboutSecondSection";
import WhereWeScoreSection from "../components/ui/about/WhereWeScoreSection";
import AboutTeamMember from "../components/ui/about/AboutTeamMember";

// Default fallback journey data
const journeyData = [
  {
    year: "2023",
    description:
      "Pay10 opened its new headquarter in Dubai, UAE to expand globally.",
    image: "/images/about_images/journey-2023.png",
  },
  {
    year: "2024",
    description:
      "<p>Pay10 UAE received licenses from The Central Bank of the UAE (CBUAE) under Payment Services & Card Schemes (RPSCS Category II) and Stored Value Facilities (SVF) frameworks.</p><p>Together, these licenses authorize Pay10 to offer Merchant Acquiring Services, Account Issuing, Payment Aggregation Services, Domestic Fund Transfer Services, Cross Border Remittances and Opening & Maintaining Digital Wallets—further reinforcing its position as a leader in digital-first financial services across the region.</p>",
    image: "/images/about_images/journey-2024.png",
  },
  {
    year: "2025",
    description:
      "<p>Pay10 UAE received approval as the country's first licensed Third-Party Provider (TPP) under the Central Bank of the UAE's (CBUAE) Open Finance framework.</p><p>In August 2025, Pay10 successfully performed the first ever live transaction on CBUAE's Open Finance Platform.</p>",
    image: "/images/about_images/journey-2025.png",
  },
  {
    year: "2026",
    description:
      "Pay10 UAE received from The Central Bank of the UAE (CBUAE) the License to Conduct Exchange Business Activity (Category 4) – Cross Border Remittances",
    image: "/images/about_images/board_members/board_member1.jpg",
  },
];

// Hardcoded board members
const hardcodedBoardMembers = [
  {
    Name: "Harry Gill",
    "Designation ": "Founder and Chairman",
    Description:
      "Mr. Prabhpreet Singh Gill (Harry Gill) is a visionary business mogul and the Chairman of Pay10. His journey is marked by a remarkable ability to envision the bigger picture, his unwavering discipline, and a genuine affinity for fintech, IT, and agriculture. His strength lies in his passion for all things technical, especially fintech, where he thrives. Through his pioneering ventures, he seeks to create a lasting business legacy, one built on unshakable foundations of integrity, reliability, and unwavering commitment. He envisions a future for his team that resounds with abundance and financial strength for centuries to come.",
    Image: "/images/prod_imports/harry-gill.jpg",
    _isLocal: true,
  },
  {
    Name: "Osama Al Rahma",
    "Designation ": "Board Member",
    Description:
      "Osama Al Rahma has performed leadership roles across the financial sector and other organizations and currently at Emirates Investment Bank as Head of Business Development and Wealth Management. He has over 30 years of experience in the financial services. Prior to Emirates Investment Bank, Osama worked at Al Fardan Exchange LLC and Al Fardan Group since 1993 in many leadership roles and was CEO since 2011 and Director at the Group. He has occupied other roles such as EX-Chairman of Foreign Exchange and Remittance Group (FERG) under Dubai Chamber of Commerce and currently act as Advisor to the board. He was a former Vice Chairman of Dubai Quality Group. He is an Independent Director and Advisor to other Fintech and payment companies. He holds a degree in Electronics Engineering and a Postgraduate Diploma in Management Studies from the University of Hull. He is also an alumnus of J.F. Kennedy School of Governments Executive Program in Leadership of Harvard University and holds a Harvard Fintech Certificate. He has Diploma in Corporate Governance from the Corporate Governance Institute in Dublin.",
    Image: "/images/prod_imports/osama-al-rahma.jpeg",
    _isLocal: true,
  },
  {
    Name: "Saad Kaleem",
    "Designation ": "Board Member",
    Description:
      "A forward-thinking leader with extensive expertise in fintech, payments, and business transformation, Saad Kaleem is known for his strategic vision and ability to drive impactful results, successfully leading organisations through periods of rapid growth and innovation. Leveraging his extensive experiences, Saad is charting a path for global expansion and is well on his way to positioning Pay10 as a forerunner in the fintech landscape. He is passionate about building strong teams, driving operational excellence, and creating value for client, partners, and stakeholders in an ever-evolving digital economy.",
    Image: "/images/prod_imports/saad-kaleem.jpg",
    _isLocal: true,
  },
  {
    Name: "Shweta Sood",
    "Designation ": "Board Member",
    Description:
      "Shweta Sood is a senior fintech risk and governance professional with over 19 years of experience in regulated environments, specializing in enterprise risk management, regulatory compliance, and operational resilience. She currently serves as Chief Risk Officer – Global at Pay10, where she oversees group-wide risk strategy, governance frameworks, and regulatory alignment across international operations, ensuring scalable and compliant growth. Shweta holds a master's degree in International Tourism Management, a BSc in Hotel, Motel & Restaurant Management, and is a Certified Risk Management Professional (CRMP).",
    Image: "/images/prod_imports/shweta-sood.jpg",
    _isLocal: true,
  },
  {
    Name: "Temi Labor",
    "Designation ": "Board Member",
    Description:
      "An accomplished Governance, Risk, and Compliance (GRC) leader, she brings extensive experience across governance, internal audit, regulatory affairs, financial crime, and risk management within the financial services and fintech sectors. Driven by a passion for ethical leadership and sustainable growth, she combines strategic insight with operational excellence to enhance governance frameworks, organisational performance, and regulatory trust.",
    Image: "/images/prod_imports/temi-labor.jpeg",
    _isLocal: true,
  },
];

const finalBoardMembers = hardcodedBoardMembers.map((item) => ({
  name: item.Name,
  role: item["Designation "].trim(),
  description: item.Description,
  image: item.Image,
}));

const mergedMembersSection = {
  our_team_list: finalBoardMembers.map((m) => ({
    Name: m.name,
    "Designation ": m.role,
    Description: m.description,
    Image: m.image,
    _isLocal: true,
  })),
};

const mergedMembersHeading = "Meet Our Board";

const AboutClient = () => {
  return (
    <main>
      <div className={Style.about_page_bg}>
        <section>
            <AboutBanner
              topSubHeading={undefined}
              topHeading={undefined}
              topDescription={undefined}
            />
        </section>

        {/* ABOUT----SECOND----SECTION */}

        <section className={Style.about_bg_circle}>
          <div className={Style.wrapper}>
            <AboutSecondSection
              section2Image={undefined}
              section2Heading={undefined}
              section2Content={undefined}
            />

            <WhereWeScoreSection
              section3Heading={undefined}
              section3={{}}
            />
          </div>

          <div className={Style.second_bg_circle}>
            <div className={Style.wrapper2}>
              <AboutTeamMember
                section5Heading={mergedMembersHeading}
                section5={mergedMembersSection}
                imageBase=""
              />
            </div>
          </div>

          {/* Our Journey So Far Section */}
          <JourneySection
            journeyData={journeyData}
            heading={undefined}
            largeDescriptionText={true}
          />
        </section>
      </div>
    </main>
  );
};

export default AboutClient;
