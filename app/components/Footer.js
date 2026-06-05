'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useResponsive } from '../contexts/ResponsiveContext'
import '@/styles/components/_footer.scss'

const footerData = {
  logo: {
    src: '/images/common/logo.png',
    alt: 'Pay10',
    href: '/',
  },
  logoAr: {
    src: '/images/common/logo.png',
    alt: 'Pay10',
    href: '/ar/home-ar/',
  },
  navigation: {
    company: {
      label: 'Company',
      items: [
        { label: 'About Us', href: '/about-us', hrefAr: '/ar/about-us-2/' },
        { label: 'Vision & Mission', href: '/vision-mission', hrefAr: '/ar/vision-mission-2/' },
        { label: 'Career', href: '/careers', hrefAr: '/ar/careers/' }, // careers Slug
      ],
    },
    products: {
      label: 'Products',
      items: [
        {
          label: 'Digital Wallet',
          subItems: [
            { label: 'Consumer App', href: '/consumer-app', hrefAr: '/ar/consumer-app-2/' },
            { label: 'Merchant App', href: '/merchant-app', hrefAr: '/ar/merchant-app-2/' },
          ],
        },
        {
          label: 'Payments',
          subItems: [
            { label: 'Integration Methods', href: '/integration-methods', hrefAr: '/ar/integration-methods/' },
          ],
        },
      ],
    },
    legal: {
      label: 'Legal',
      items: [
        { label: 'Terms of Services', href: '/terms-of-service', hrefAr: '/ar/terms-of-service-ar/' },
        { label: 'Privacy Policy', href: '/privacy-policy', hrefAr: '/ar/privacy-policy-ar/' },
        { label: 'Key Facts Statement', href: '/key-fact-statement', hrefAr: '/ar/kfs-bizz-app-ar/', hrefArAlt: '/ar/kfs-customer-wallet-ar/' },
        { label: 'FAQ', href: '/faqs', hrefAr: '/ar/faq-customer-app-ar/', hrefArAlt: '/ar/faq-pay10-biz-app-ar/' },
      ],
    },
    resources: {
      label: 'Resources',
      items: [
        { label: 'Brand Guidelines', href: 'https://pay10.ae/wp-content/uploads/2026/05/Pay10-Ext-Brandguidelines-21-May-2026.pdf', external: true },
      ],
    },
  },
  socialMedia: {
    linkedin: 'https://www.linkedin.com/company/pay10-uae',
  },
  appStoreLinks: {
    appStore: '/coming-soon',
    googlePlay: '/coming-soon',
  },
}

const Footer = () => {
  const [openSections, setOpenSections] = useState({})
  const { isMobile, isTablet } = useResponsive()

  const toggleSection = useCallback((sectionKey) => {
    if (isMobile || isTablet) {
      setOpenSections((prev) => ({
        ...prev,
        [sectionKey]: !prev[sectionKey],
      }))
    }
  }, [isMobile, isTablet])

  const renderNavLinks = () => {
    const { navigation } = footerData

    return (
      <>
        {/* Company Column */}
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
                    <Link key={item.label} href={item.href} className="footer__nav-sublink">
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
                  <Link key={item.label} href={item.href} className="footer__nav-sublink">
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Products Column */}
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
                      <span className="footer__nav-sublink">{item.label}</span>
                      {item.subItems && (
                        <div className="footer__nav-subsubitems">
                          {item.subItems.map((subItem) => (
                            <Link key={subItem.label} href={subItem.href} className="footer__nav-subsublink">
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
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
                    <span className="footer__nav-sublink" style={{ fontWeight: 'bold' }}>{item.label}</span>
                    {item.subItems && (
                      <div className="footer__nav-subsubitems" style={{ paddingLeft: 0, marginTop: '0.25rem' }}>
                        {item.subItems.map((subItem) => (
                          <Link key={subItem.label} href={subItem.href} className="footer__nav-subsublink">
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Legal Column */}
        <div className="footer__nav-item">
          {isMobile || isTablet ? (
            <>
              <button
                className="footer__nav-link footer__nav-link--accordion"
                onClick={() => toggleSection('legal')}
                aria-expanded={openSections.legal}
              >
                <span>{navigation.legal.label}</span>
                <Icon
                  icon={openSections.legal ? 'mdi:chevron-up' : 'mdi:chevron-right'}
                  className="footer__nav-chevron"
                />
              </button>
              {openSections.legal && (
                <div className="footer__nav-subitems">
                  {navigation.legal.items.map((item) => (
                    <Link key={item.label} href={item.href} className="footer__nav-sublink">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="footer__nav-heading">{navigation.legal.label}</div>
              <div className="footer__nav-subitems">
                {navigation.legal.items.map((item) => (
                  <Link key={item.label} href={item.href} className="footer__nav-sublink">
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Resources Column */}
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
                    item.external ? (
                      <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="footer__nav-sublink">
                        {item.label}
                      </a>
                    ) : (
                      <Link key={item.label} href={item.href} className="footer__nav-sublink">
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="footer__nav-heading">{navigation.resources.label}</div>
              <div className="footer__nav-subitems">
                {navigation.resources.items.map((item) => (
                  item.external ? (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="footer__nav-sublink">
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.label} href={item.href} className="footer__nav-sublink">
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </>
          )}
        </div>

        {/* Contact Us */}
        <div className="footer__nav-item">
          {isMobile || isTablet ? (
            <Link href="/contact-us" className="footer__nav-link">
              Contact Us
            </Link>
          ) : (
            <Link href="/contact-us" className="footer__contact-btn" style={{
              background: 'transparent',
              border: '2px solid var(--white)',
              borderRadius: '24px',
              padding: '8px 24px',
              color: 'var(--white)',
              textDecoration: 'none',
              fontFamily: 'medium, sans-serif',
              textAlign: 'center',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              marginTop: '1rem',
              alignSelf: 'flex-start'
            }}>
              Contact Us
            </Link>
          )}
        </div>
      </>
    )
  }

  const renderAppStoreButtons = () => {
    const { appStoreLinks } = footerData

    return (
      <div className="footer__app-store" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
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
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo */}
        <div className="footer__logo">
          <Link href={footerData.logo.href}>
            <Image className="footer__logo-img" width={98} height={61} src={footerData.logo.src} alt={footerData.logo.alt} />
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

        {/* Social Media - Desktop */}
        <div className="footer__actions footer__actions--desktop">
          <div className="footer__social">
            <a href={footerData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
              <Image width={24} height={24} src="/images/common/linkedin.svg" alt="LinkedIn" className="footer__social-icon" />
            </a>
          </div>
          {renderAppStoreButtons()}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          {/* Legal Links (English) */}
          <div className="footer__bottom-left">
            <div className="footer__address" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/terms-of-service" className="footer__legal-link">Term of Services</Link>
              <span className="footer__legal-separator">|</span>
              <Link href="/privacy-policy" className="footer__legal-link">Privacy Policy</Link>
              <span className="footer__legal-separator">|</span>
              <Link href="/key-fact-statement" className="footer__legal-link">Key Facts Statement</Link>
              <span className="footer__legal-separator">|</span>
              <Link href="/faqs" className="footer__legal-link">FAQ</Link>
            </div>
          </div>

          {/* Legal Links (Arabic) */}
          <div className="footer__bottom-right footer__bottom-right--arabic-links" style={{ direction: 'rtl', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/ar/privacy-policy-ar/" className="footer__legal-link">سياسة الخصوصية</Link>
            <span className="footer__legal-separator">|</span>
            <Link href="/ar/terms-of-service-ar/" className="footer__legal-link">شروط الخدمات</Link>
            <span className="footer__legal-separator">|</span>
            <Link href="/ar/kfs-bizz-app-ar/" className="footer__legal-link">بيان الحقائق الرئيسية تطبيق Pay10 Merchant App للشركات</Link>
            <span className="footer__legal-separator">|</span>
            <Link href="/ar/kfs-customer-wallet-ar/" className="footer__legal-link">بيان الحقائق الرئيسية تطبيق Pay10 للعملاء</Link>
            <span className="footer__legal-separator">|</span>
            <Link href="/ar/faq-customer-app-ar/" className="footer__legal-link">الأسئلة الشائعة تطبيق Pay10 للعملاء</Link>
            <span className="footer__legal-separator">|</span>
            <Link href="/ar/faq-pay10-biz-app-ar/" className="footer__legal-link">الأسئلة الشائعة تطبيق Pay10 Merchant App للشركات</Link>
          </div>

          {/* Arabic Address */}
          <div className="footer__bottom-right footer__bottom-right--arabic-address" style={{ direction: 'rtl' }}>
            <span>© PAY10 | مكتب 1004، الدور 10 , برج أوبورا للأعمال، الخليج التجاري - دبي، الإمارات العربية المتحدة</span>
          </div>

          {/* English Address */}
          <div className="footer__address footer__address--en">
            © PAY10 | Find us at: 1004, 10th Floor, U-Bora Tower, Business Bay, Dubai, United Arab Emirates
          </div>
        </div>
      </div>

      {/* Social Media - Mobile */}
      <div className="footer__actions footer__actions--mobile">
        <div className="footer__social">
          <a href={footerData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
            <Image width={24} height={24} src="/images/common/linkedin.svg" alt="LinkedIn" className="footer__social-icon" />
          </a>
        </div>
        {renderAppStoreButtons()}
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
