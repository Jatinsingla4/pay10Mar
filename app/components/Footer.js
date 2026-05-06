'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useResponsive } from '../contexts/ResponsiveContext'
import '@/styles/components/_footer.scss'

// Footer data structure - can be easily replaced with API data
const footerData = {
  logo: {
    src: 'images/common/logo-bg.svg',
    alt: 'Pay10',
    href: '/',
  },
  navigation: {
    home: {
      label: 'Home',
      href: '/',
    },
    company: {
      label: 'Company',
      items: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Vision & Mission', href: '/vision-mission' },
        // { label: 'Corporate information', href: '/corporate-information' },
      ],
    },
    products: {
      label: 'Products',
      items: [
        {
          label: 'Prepaid Payment Instruments',
          subItems: [
            { label: 'Pay10 App', href: '/products/consumer-app' },
            { label: 'Pay10 BIZ', href: '/products/bizapp' },
          ],
        },
        {
          label: 'Payments',
          subItems: [
            { label: 'Payment Gateway', href: '/products/payment-gateway' },
            { label: 'Integration Methods', href: '/products/integration-methods' },
          ],
        },
        {
          label: 'Pay10 World',
          subItems: [
            // { label: 'Collect from India', href: '/products/accept-international-payments-from-india' },
            { label: 'Pay Globally', href: '/products/international-payments' },
          ],
        },
      ],
    },
    resources: {
      label: 'Resources',
      items: [
        // { label: 'Blogs', href: '/blog' },
        // { label: 'News', href: '/news' },
        // { label: 'Events', href: '/events' },
        { label: 'Careers', href: '/careers' },
        // { label: 'FAQ', href: '/faq-customer-app' },
        // { label: 'KFS', href: '/kfs-biz-app' },
      ],
    },
    contact: {
      label: 'Contact Us',
      href: '/contact-us',
    },
  },
  socialMedia: {
    facebook: 'https://www.facebook.com/Pay10IN/',
    linkedin: 'https://www.linkedin.com/company/pay10india/',
    instagram: 'https://www.instagram.com/pay10india/',
    twitter: 'https://x.com/Pay10India',
  },
  appStoreLinks: {
    appStore: '/coming-soon',
    googlePlay: '/coming-soon',
  },
  address: '© PAY10 | Find us at: 1004, 10th Floor, U-Bora Tower, Business Bay, Dubai, United Arab Emirates',
  legal: {
    terms: '/terms-and-conditions',
    privacy: '/privacy-policy',
    grievances: '/customer-grievances-policy',
    kfsBiz: '/kfs-biz-app',
    kfsCustomer: '/kfs-customer-wallet',
    faqMerchant: '/faq-merchant-bizz-app',
    faqCustomer: '/faq-customer-app',
  },
}

const Footer = () => {
  const [openSections, setOpenSections] = useState({})
  const { isMobile, isTablet } = useResponsive()

  // Toggle accordion sections (mobile/tablet only)
  const toggleSection = useCallback((sectionKey) => {
    if (isMobile || isTablet) {
      setOpenSections((prev) => ({
        ...prev,
        [sectionKey]: !prev[sectionKey],
      }))
    }
  }, [isMobile, isTablet])

  // Render navigation links
  const renderNavLinks = useCallback(() => {
    const { navigation } = footerData

    return (
      <>
        {/* Home */}
        <div className="footer__nav-item">
          <Link href={navigation.home.href} className="footer__nav-link">
            {navigation.home.label}
          </Link>
        </div>

        {/* Company */}
        <div className="footer__nav-item">
          {isMobile || isTablet ? (
            <>
              <button
                className="footer__nav-link footer__nav-link--accordion"
                onClick={() => toggleSection('company')}
                aria-expanded={openSections.company}
              >
                <span>{navigation.company.label}</span>
                <Icon
                  icon={openSections.company ? 'mdi:chevron-up' : 'mdi:chevron-right'}
                  className="footer__nav-chevron"
                />
              </button>
              {openSections.company && (
                <div className="footer__nav-subitems">
                  {navigation.company.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="footer__nav-sublink"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="footer__nav-heading">{navigation.company.label}</div>
              <div className="footer__nav-subitems">
                {navigation.company.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="footer__nav-sublink"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Products */}
        <div className="footer__nav-item">
          {isMobile || isTablet ? (
            <>
              <button
                className="footer__nav-link footer__nav-link--accordion"
                onClick={() => toggleSection('products')}
                aria-expanded={openSections.products}
              >
                <span>{navigation.products.label}</span>
                <Icon
                  icon={openSections.products ? 'mdi:chevron-up' : 'mdi:chevron-right'}
                  className="footer__nav-chevron"
                />
              </button>
              {openSections.products && (
                <div className="footer__nav-subitems">
                  {navigation.products.items.map((item) => (
                    <div key={item.label} className="footer__nav-subitem">
                      {item.subItems ? (
                        <>
                          <button
                            className="footer__nav-sublink footer__nav-sublink--accordion"
                            onClick={() => toggleSection(`products-${item.label}`)}
                            aria-expanded={openSections[`products-${item.label}`]}
                          >
                            <span>{item.label}</span>
                            <Icon
                              icon={
                                openSections[`products-${item.label}`]
                                  ? 'mdi:chevron-up'
                                  : 'mdi:chevron-right'
                              }
                              className="footer__nav-chevron"
                            />
                          </button>
                          {openSections[`products-${item.label}`] && (
                            <div className="footer__nav-subsubitems">
                              {item.subItems.map((subItem) => {
                                // Enable `target="_blank"` and `rel="noopener noreferrer"` ONLY for 'Integration Methods'
                                if (
                                  subItem.label === 'Integration Methods' &&
                                  subItem.target === true
                                ) {
                                  return (
                                    <a
                                      key={subItem.label}
                                      href={subItem.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="footer__nav-subsublink"
                                    >
                                      {subItem.label}
                                    </a>
                                  )
                                }
                                return (
                                  <Link
                                    key={subItem.label}
                                    href={subItem.href}
                                    className="footer__nav-subsublink"
                                  >
                                    {subItem.label}
                                  </Link>
                                )
                              })}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link href={item.href} className="footer__nav-sublink">
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="footer__nav-heading">{navigation.products.label}</div>
              <div className="footer__nav-subitems">
                {navigation.products.items.map((item) => (
                  <div key={item.label} className="footer__nav-subitem">
                    {item.href ? (
                      <Link href={item.href} className="footer__nav-sublink">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="footer__nav-sublink">{item.label}</span>
                    )}
                    {item.subItems && (
                      <div className="footer__nav-subsubitems">
                        {item.subItems.map((subItem) => {
                          // Enable `target="_blank"` and `rel="noopener noreferrer"` ONLY for 'Integration Methods'
                          if (
                            subItem.label === 'Integration Methods' &&
                            subItem.target === true
                          ) {
                            return (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer__nav-subsublink"
                              >
                                {subItem.label}
                              </a>
                            )
                          }
                          return (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="footer__nav-subsublink"
                            >
                              {subItem.label}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Resources */}
        <div className="footer__nav-item">
          {isMobile || isTablet ? (
            <>
              <button
                className="footer__nav-link footer__nav-link--accordion"
                onClick={() => toggleSection('resources')}
                aria-expanded={openSections.resources}
              >
                <span>{navigation.resources.label}</span>
                <Icon
                  icon={openSections.resources ? 'mdi:chevron-up' : 'mdi:chevron-right'}
                  className="footer__nav-chevron"
                />
              </button>
              {openSections.resources && (
                <div className="footer__nav-subitems">
                  {navigation.resources.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="footer__nav-sublink"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="footer__nav-heading">{navigation.resources.label}</div>
              <div className="footer__nav-subitems">
                {navigation.resources.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="footer__nav-sublink"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Contact */}
        <div className="footer__nav-item">
          <Link href={navigation.contact.href} className="footer__nav-link">
            {navigation.contact.label}
          </Link>
        </div>
      </>
    )
  }, [isMobile, isTablet, openSections, toggleSection])

  // Render social media icons
  const renderSocialMedia = useCallback(() => {
    const { socialMedia } = footerData

    return (
      <div className="footer__social">
        <a
          href={socialMedia.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-link"
          aria-label="Facebook"
        >
          <Image
            width={24}
            height={24}
            src="/images/common/facebook.svg"
            alt="Facbook icon"
            className="footer__social-icon"
          />
        </a>
        <a
          href={socialMedia.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-link"
          aria-label="LinkedIn"
        >
          <Image
            width={24}
            height={24}
            src="/images/common/linkedin.svg"
            alt="Linkedin"
            className="footer__social-icon"
          />
        </a>
        <a
          href={socialMedia.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-link"
          aria-label="Instagram"
        >
          <Image
            width={24}
            height={24}
            src="/images/common/instagram.svg"
            alt="Linkedin"
            className="footer__social-icon"
          />
        </a>
        <a
          href={socialMedia.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-link"
          aria-label="Twitter"
        >
          <Image
            width={24}
            height={24}
            src="/images/common/x.svg"
            alt="Linkedin"
            className="footer__social-icon"
          />
        </a>
      </div>
    )
  }, [])

  // Render app store buttons
  const renderAppStoreButtons = useCallback(() => {
    const { appStoreLinks } = footerData

    return (
      <div className="footer__app-store">
        <a
          href={appStoreLinks.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__app-store-btn footer__app-store-btn--apple"
          aria-label="Download on the App Store"
        >
          <Image
            width={128}
            height={36}
            src="/images/common/foo-app1.svg"
            alt="App Store"
            className="footer__app-store-icon"
          />
        </a>
        <a
          href={appStoreLinks.googlePlay}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__app-store-btn footer__app-store-btn--google"
          aria-label="Get it on Google Play"
        >
          <Image
            width={128}
            height={36}
            src="/images/common/foo-app2.svg"
            alt="Google Play"
            className="footer__app-store-icon"
          />
        </a>
      </div>
    )
  }, [])

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo */}
        <div className="footer__logo">
          <Link href={footerData.logo.href}>
            <Image className="footer__logo-img" width={98} height={61} src="/images/common/logo.svg" alt="" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="footer__nav footer__nav--desktop" aria-label="Footer navigation">
          {renderNavLinks()}
        </nav>

        {/* Mobile Navigation */}
        <nav className="footer__nav footer__nav--mobile" aria-label="Footer navigation">
          {renderNavLinks()}
        </nav>

        {/* Social Media & App Store - Desktop */}
        <div className="footer__actions footer__actions--desktop">
          {renderSocialMedia()}
          {renderAppStoreButtons()}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          {/* Copyright & Address */}
          <div className="footer__bottom-left">
            <div className="footer__address">
              © PAY10 | Find us at: 1004, 10th Floor, U-Bora Tower, Business Bay, Dubai, United Arab Emirates
            </div>
            <div className="footer__address">
              <Link href={footerData.legal.terms} className="footer__legal-link">
                Terms & Conditions
              </Link>
              <span className="footer__legal-separator">|</span>
              <Link href={footerData.legal.privacy} className="footer__legal-link">
                Privacy Policy
              </Link>
              <span className="footer__legal-separator">|</span>
              <Link href={footerData.legal.kfsBiz} className="footer__legal-link">
                KFS - Bizz App
              </Link>
              <span className="footer__legal-separator">|</span>
              <Link href={footerData.legal.kfsCustomer} className="footer__legal-link">
                KFS - Customer Wallet
              </Link>
              <span className="footer__legal-separator">|</span>
              <Link href={footerData.legal.faqCustomer} className="footer__legal-link">

                FAQ Pay10 Customer App
              </Link>
              <span className="footer__legal-separator">|</span>
              <Link href={footerData.legal.faqMerchant} className="footer__legal-link">
                FAQ Pay10 Merchant Biz App
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="footer__bottom-right">
            © PAY10
            |
            مكتب 1004، الدور 10 , برج أوبورا للأعمال، الخليج التجاري - دبي، الإمارات العربية المتحدة
          </div>
          <div className="footer__bottom-right">
            <Link href={footerData.legal.terms} className="footer__legal-link">
              شروط الخدمات
            </Link>
            <span className="footer__legal-separator">|</span>
            <Link href={footerData.legal.privacy} className="footer__legal-link">
              سياسة الخصوصية
            </Link>
            <span className="footer__legal-separator">|</span>
            <Link href={footerData.legal.kfsBiz} className="footer__legal-link">
              للشركات Pay10 BizzApp بيان الحقائق الرئيسية  تطبيق
            </Link>
            <span className="footer__legal-separator">|</span>
            <Link href={footerData.legal.kfsCustomer} className="footer__legal-link">
              للعملاء Pay10 بيان الحقائق الرئيسية تطبيق
            </Link>
            <span className="footer__legal-separator">|</span>
            <Link href={footerData.legal.faqCustomer} className="footer__legal-link">
              للعملاء Pay10 الأسئلة الشائعة تطبيق
            </Link>
            <span className="footer__legal-separator">|</span>
            <Link href={footerData.legal.faqMerchant} className="footer__legal-link">
              للشركات Pay10 BizzApp الأسئلة الشائعة تطبيق
            </Link>
          </div>
        </div>
      </div>

      {/* Social Media & App Store - Mobile */}
      <div className="footer__actions footer__actions--mobile">
        {renderSocialMedia()}
        {renderAppStoreButtons()}
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
