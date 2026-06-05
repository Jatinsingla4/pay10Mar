import React, { useRef, useState, useEffect, useCallback } from 'react'
import Style from './AboutTeamMember.module.scss'
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// This component expects `section5` and `imageBase` to be passed as props.
// For compatibility with usage in app/about/page.js, we'll accept them as optional props,
// and render API members only.

const AboutTeamMember = ({
  section5,
  imageBase = "",
  section5Heading
}) => {
  // Safely handle API data
  const teamMembers = section5 &&
    Array.isArray(section5.our_team_list) &&
    section5.our_team_list.length > 0
    ? section5.our_team_list.map((item) => {
        // If _isLocal is set or path starts with '/', use as-is (local /public path)
        const isLocal = item._isLocal || (item.Image && item.Image.startsWith('/'));
        const imageUrl = isLocal ? item.Image : `${imageBase}${item.Image}`;
        // Handle "Designation " with trailing space
        const designation = item['Designation '] || item.Designation || '';
        return {
          name: item.Name || '',
          role: designation.trim(),
          description: item.Description || '',
          image: imageUrl,
        };
      })
    : [];

  // Needed for Swiper navigation/pagination refs
  const teamSwiperNavPrev = useRef(null);
  const teamSwiperNavNext = useRef(null);
  const teamSwiperPagination = useRef(null);
  const teamSwiperRef = useRef(null);

  const [showNavArrows, setShowNavArrows] = useState(false);

  const syncNavVisibility = useCallback((swiper) => {
    if (!swiper || teamMembers.length === 0) {
      setShowNavArrows(false);
      return;
    }
    setShowNavArrows(!swiper.isLocked);
  }, [teamMembers.length]);

  useEffect(() => {
    const s = teamSwiperRef.current;
    if (!s) return;
    requestAnimationFrame(() => {
      s.update();
      syncNavVisibility(s);
    });
  }, [teamMembers.length, syncNavVisibility]);

  return (
    <div className={Style.board_members_main}>
      <div className={Style.board_header} data-animation="opacity-up">
        <div>
          <h2>{section5Heading}</h2>
        </div>
        <div
          className={`${Style.nav_group} ${!showNavArrows ? Style.nav_groupHidden : ''}`}
          aria-hidden={!showNavArrows}
        >
          <button
            aria-label="Previous slide"
            ref={teamSwiperNavPrev}
            className={`team-prev ${Style.nav_btn}`}
            type="button"
            tabIndex={showNavArrows ? 0 : -1}
          >
            <Icon
              icon="fa6-solid:angle-right"
              width={16}
              height={16}
              style={{ transform: "rotate(180deg)" }}
            />
          </button>
          <button
            aria-label="Next slide"
            ref={teamSwiperNavNext}
            className={`team-next ${Style.nav_btn}`}
            type="button"
            tabIndex={showNavArrows ? 0 : -1}
          >
            <Icon icon="fa6-solid:angle-right" width={16} height={16} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        watchOverflow
        spaceBetween={16}
        slidesPerView={1.1}
        speed={1000}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = teamSwiperNavPrev.current;
          swiper.params.navigation.nextEl = teamSwiperNavNext.current;
          swiper.params.pagination.el = teamSwiperPagination.current;
        }}
        onSwiper={(swiper) => {
          teamSwiperRef.current = swiper;
          syncNavVisibility(swiper);
        }}
        onBreakpoint={(swiper) => {
          syncNavVisibility(swiper);
        }}
        onResize={(swiper) => {
          syncNavVisibility(swiper);
        }}
        navigation={{
          prevEl: teamSwiperNavPrev.current,
          nextEl: teamSwiperNavNext.current,
        }}
        // To enable dot pagination, uncomment this and the pagination div below
        pagination={{
          el: teamSwiperPagination.current,
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1.4, spaceBetween: 18 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 22 },
          1280: { slidesPerView: 3.5, spaceBetween: 24 },
        }}
        className={Style.team_swiper}
        data-animation="opacity-up"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index} className={Style.team_slide}>
            <div className={Style.member_card}>
              <div className={Style.member_image}>
                <img src={member.image} alt={member.name} />
              </div>
              <div className={Style.member_meta}>
                <div className={Style.member_identity}>
                  <h4>{member.name}</h4>
                  <p className={Style.member_role}>{member.role}</p>
                </div>
                <p className={Style.member_description}>
                  {member.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={teamSwiperPagination}
        className={`team-pagination ${Style.team_pagination}`}
      />
    </div>
  )
}

export default AboutTeamMember
