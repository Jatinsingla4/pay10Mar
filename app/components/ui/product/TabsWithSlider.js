"use client";

import React, { useEffect, useState } from "react";
import Style from "./TabsWithSlider.module.scss";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const resolveImageSrc = (raw, imageBase = "") => {
  if (!raw) return "";
  const src = String(raw);
  if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
  return `${imageBase}${src}`;
};

const normalizePlugins = (list, imageBase) =>
  (Array.isArray(list) ? list : []).map((it) => ({
    name: it?.Title || it?.name || "",
    image: resolveImageSrc(it?.Image || it?.image, imageBase),
    href: it?.Link || it?.href || "",
    download: it?.Download || it?.download || "",
  }));

const defaultTabData = [
  {
    label: "Server Integration",
    value: "server",
    plugins: [
      { name: "PHP", image: "/images/product_page_images/integration_methods_images/php.svg" },
      { name: ".Net", image: "/images/product_page_images/integration_methods_images/dotnet.svg" },
      { name: "Java", image: "/images/product_page_images/integration_methods_images/java.svg" },
      { name: "Python", image: "/images/product_page_images/integration_methods_images/python.svg" },
    ],
  },
  {
    label: "E-Commerce",
    value: "ecommerce",
    plugins: [
      { name: "WooCommerce", image: "/images/product_page_images/integration_methods_images/php.svg" },
      { name: "Magento", image: "/images/product_page_images/integration_methods_images/dotnet.svg" },
      { name: "Shopify", image: "/images/product_page_images/integration_methods_images/java.svg" },
      { name: "OpenCart", image: "/images/product_page_images/integration_methods_images/python.svg" },
    ],
  },
  {
    label: "Mobile Setup",
    value: "mobile",
    plugins: [
      { name: "Android", image: "/images/product_page_images/integration_methods_images/php.svg" },
      { name: "iOS", image: "/images/product_page_images/integration_methods_images/java.svg" },
      { name: "Flutter", image: "/images/product_page_images/integration_methods_images/python.svg" },
      { name: "React Native", image: "/images/product_page_images/integration_methods_images/dotnet.svg" },
    ],
  },
];

const TabsWithSlider = ({
  heading = "Pay10 Plugins",
  section4,
  imageBase = "",
  initialTab = "server",
  hideTabs = false,
  activeTabHeading = false,
  compactCards = false,
}) => {
  const apiTabs = section4
    ? [
        {
          label: "Server Integration",
          value: "server",
          plugins: normalizePlugins(section4?.server_integration_list, imageBase),
        },
        {
          label: "E-Commerce",
          value: "ecommerce",
          plugins: normalizePlugins(section4?.ecommerce_list, imageBase),
        },
        {
          label: "Mobile Setup",
          value: "mobile",
          plugins: normalizePlugins(section4?.mobile_setup_list, imageBase),
        },
      ].filter((t) => t.plugins.length > 0)
    : [];

  const tabData = apiTabs.length ? apiTabs : defaultTabData;
  const defaultActiveTab =
    tabData.find((tab) => tab.value === initialTab)?.value || tabData[0]?.value || "server";
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1200px)");
    const updateDesktopFlag = () => setIsDesktop(mediaQuery.matches);

    updateDesktopFlag();
    mediaQuery.addEventListener("change", updateDesktopFlag);
    return () => mediaQuery.removeEventListener("change", updateDesktopFlag);
  }, []);

  const currentTab = tabData.find((tab) => tab.value === activeTab);
  const pluginsCount = currentTab?.plugins?.length || 0;
  const shouldShowArrows = isDesktop ? pluginsCount > 4 : pluginsCount > 1;

  const renderTabs = () => (
    <div className={Style.tabRow}>
      {!hideTabs ? (
        <div className={Style.tabButtons}>
          {tabData.map((tab) => (
            <button
              key={tab.value}
              className={`${Style.tabButton} ${
                activeTab === tab.value ? Style.activeTabButton : ""
              }`}
              onClick={() => handleTabClick(tab.value)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : (
        <div />
      )}

      {/* Navigation Arrows */}
      {shouldShowArrows ? (
        <div className={Style.navigationButtons}>
          <button
            className={`${Style.navButton} swiper-prev-${activeTab}`}
            type="button"
          >
            <Icon icon="mdi:chevron-left" width={24} height={24} />
          </button>
          <button
            className={`${Style.navButton} swiper-next-${activeTab}`}
            type="button"
          >
            <Icon icon="mdi:chevron-right" width={24} height={24} />
          </button>
        </div>
      ) : null}
    </div>
  );

  const renderSwiper = () => {
    const currentTab = tabData.find((tab) => tab.value === activeTab);
    if (!currentTab) return null;

    const navPrev = `swiper-prev-${activeTab}`;
    const navNext = `swiper-next-${activeTab}`;

    return (
      <div className={Style.swiperWrapper}>
        <div className={Style.swiperContainer}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: shouldShowArrows ? `.${navPrev}` : null,
              nextEl: shouldShowArrows ? `.${navNext}` : null,
            }}
            loop={true}
            slidesPerView={4}
            spaceBetween={24}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
              },
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3.2,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
     
            {currentTab.plugins.map((plugin, i) => (
              <SwiperSlide key={i}>
                <div className={`${Style.pluginCard} ${compactCards ? Style.pluginCardCompact : ""}`}>
                  {plugin.href ? (
                    <a
                      href={plugin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={Style.pluginLink}
                    >
                      {plugin.image ? <img src={plugin.image} alt={plugin.name} /> : null}
                      <p>{plugin.name}</p>
                    </a>
                  ) : (
                    <>
                      {plugin.image ? <img src={plugin.image} alt={plugin.name} /> : null}
                      <p>{plugin.name}</p>
                    </>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };

  const headingText = activeTabHeading ? currentTab?.label || heading : heading;

  return (
    <div className={Style.plugins_main}>
      <div className={Style.plugins_container_box}>
        {hideTabs ? (
          <div className={Style.headingRow} data-animation="opacity-up">
            <h2>{headingText}</h2>
            {shouldShowArrows ? (
              <div className={Style.navigationButtons}>
                <button
                  className={`${Style.navButton} swiper-prev-${activeTab}`}
                  type="button"
                >
                  <Icon icon="mdi:chevron-left" width={24} height={24} />
                </button>
                <button
                  className={`${Style.navButton} swiper-next-${activeTab}`}
                  type="button"
                >
                  <Icon icon="mdi:chevron-right" width={24} height={24} />
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div data-animation="opacity-up">
            <h2>{headingText}</h2>
          </div>
        )}
        <div data-animation="opacity-up">
            {hideTabs ? null : renderTabs()}
        </div>
        <div data-animation="opacity-up">
            {renderSwiper()}
        </div>
      </div>
    </div>
  );
};

export default TabsWithSlider;
