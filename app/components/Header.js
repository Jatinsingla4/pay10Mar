'use client'

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useResponsive } from '../contexts/ResponsiveContext'
import { usePathname } from 'next/navigation'
import '@/styles/components/_header.scss'
import ContactCtaBtn from './ui/ContactCtaBtn'

// Navigation data structure - can be easily replaced with API data
const navigationData = {
  logo: {
    text: 'Pay10',
    href: '/',
  },
  productsMega: {
    groups: [
      {
        id: 'prepaid',
        label: 'Digital Wallet',
        icon: '/images/header/prepaid.svg',
        items: [
          {
            label: 'Consumer App',
            href: '/products/consumer-app',
            icon: '/images/header/pay-10-app.svg',
          },
          {
            label: 'Open Finance Al Tareq',
            href: '/products/open-finance-altareq',
            icon: '/images/header/sf.svg',
          },
          {
            label: 'Merchant App',
            href: '/products/merchant-app',
            icon: '/images/header/pay-10-biz.svg',
          },
        ],
      },
      {
        id: 'payments',
        label: 'Payments',
        icon: '/images/header/payments.svg',
        items: [
          {
            label: 'Integration Methods',
            href: '/products/integration-methods',
            icon: '/images/header/integration-method.svg',
          },
        ],
      },
      // {
      //   id: 'pay10-world',
      //   label: 'Pay10 World',
      //   icon: '/images/header/pay10-world.svg',
      //   items: [
      //     // {
      //     //   label: 'Collect from India',
      //     //   href: '/products/accept-international-payments-from-india',
      //     //   icon: '/images/header/collect-india.svg',
      //     // },
      //     {
      //       label: 'Pay Globally',
      //       href: '/products/international-payments',
      //       icon: '/images/header/collect-world.svg',
      //     },
      //   ],
      // },
    ],
  },
  links: [
    {
      label: 'Company',
      href: '/company',
      hasDropdown: true,
      items: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Vision & Mission', href: '/vision-mission' },
        // { label: 'Corporate information', href: '/corporate-information' },
      ],
    },
    {
      label: 'Products',
      href: '/products',
      hasDropdown: true,
      type: 'productsMega',
    },
    {
      label: 'Resources',
      href: '/resources',
      hasDropdown: true,
      items: [
        // { label: 'News', href: '/news' },
        // { label: 'Blogs', href: '/blog' },
        // { label: 'Events', href: '/events' },
        { label: 'Careers', href: '/careers' },
      ],
    },
  ],
  appStoreLinks: {
    appStore: '#', // Replace with actual App Store link
    googlePlay: '#', // Replace with actual Google Play link
  },
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState({})
  const [hoveredItem, setHoveredItem] = useState(null)
  const [activeProductsGroupId, setActiveProductsGroupId] = useState(
    navigationData.productsMega?.groups?.[0]?.id ?? null
  )
  const [hasMounted, setHasMounted] = useState(false)
  const { isMobile, isTablet } = useResponsive()
  const pathname = usePathname()
  const headerRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const lastScrollY = useRef(0)
  const scrollDirection = useRef('up')

  // Initial subtle fade/slide in on mount
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Hide on scroll down, show on scroll up (after 100px)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      const headerEl = headerRef.current
      if (!headerEl) {
        lastScrollY.current = currentY
        return
      }

      if (currentY > 100 && delta > 0) {
        // scrolling down past threshold
        scrollDirection.current = 'down'
        headerEl.classList.add('header--hide')
        headerEl.classList.remove('header--show')
      } else if (delta < 0) {
        // scrolling up
        scrollDirection.current = 'up'
        headerEl.classList.add('header--show')
        headerEl.classList.remove('header--hide')
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !headerRef.current?.contains(event.target)
      ) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.body.classList.add('scrollBlock')
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.body.classList.remove('scrollBlock')
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.classList.remove('scrollBlock')
    }
  }, [mobileMenuOpen])

  // Close dropdowns when clicking outside (desktop)
  useEffect(() => {
    if (isMobile || isTablet) return

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdowns({})
        setHoveredItem(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobile, isTablet])

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
    setOpenDropdowns({})
  }, [])

  // Toggle dropdown (mobile)
  const toggleDropdown = useCallback((linkLabel) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [linkLabel]: !prev[linkLabel],
    }))
  }, [])

  // Handle desktop dropdown hover
  const handleMouseEnter = useCallback((linkLabel) => {
    if (!isMobile && !isTablet) {
      setHoveredItem(linkLabel)
      setOpenDropdowns((prev) => ({ ...prev, [linkLabel]: true }))
    }
  }, [isMobile, isTablet])

  const handleMouseLeave = useCallback(() => {
    if (!isMobile && !isTablet) {
      setHoveredItem(null)
      setOpenDropdowns({})
    }
  }, [isMobile, isTablet])

  // Handle navigation click (close mobile menu)
  const handleNavClick = useCallback(() => {
    setOpenDropdowns({})
    setHoveredItem(null)
    if (isMobile || isTablet) {
      setMobileMenuOpen(false)
    }
  }, [isMobile, isTablet])

  // Keep Products mega-menu group selection stable while open; reset to first group when (re)opened
  useEffect(() => {
    const productsOpen = openDropdowns?.Products || hoveredItem === 'Products'
    if (!productsOpen) return
    if (!activeProductsGroupId) {
      setActiveProductsGroupId(navigationData.productsMega?.groups?.[0]?.id ?? null)
    }
  }, [openDropdowns, hoveredItem, activeProductsGroupId])

  // Check if path is active
  const isActivePath = useCallback(
    (href) => {
      if (href === '/') {
        return pathname === '/'
      }
      return pathname?.startsWith(href)
    },
    [pathname]
  )

  // Render logo
  const renderLogo = useMemo(() => {
    return (
      <Link href={navigationData.logo.href} className="header__logo" onClick={handleNavClick}>
        <span className="header__logo-text">
          <Image width={98} height={61} src="/images/common/logo.png" alt="" />
        </span>
      </Link>
    )
  }, [handleNavClick])

  // Render navigation links
  const renderNavLinks = useCallback(
    (isMobile = false) => {
      return navigationData.links.map((link) => {
        const isOpen = openDropdowns[link.label] || hoveredItem === link.label
        const isActive = isActivePath(link.href)
        const isProductsMega = link.type === 'productsMega'
        const dropdownActiveClass = isActive && !isProductsMega ? 'is-active' : ''
        const productsGroups = navigationData.productsMega?.groups ?? []
        const activeGroup =
          productsGroups.find((g) => g.id === activeProductsGroupId) ?? productsGroups[0]

        return (
          <div
            key={link.label}
            className={`header__nav-item ${isOpen ? 'is-open' : ''} ${isActive ? 'is-active' : ''} ${link.label === 'Products' ? 'header__nav-item--products' : ''}`}
            onMouseEnter={() => handleMouseEnter(link.label)}
            onMouseLeave={handleMouseLeave}
            data-nav-item={link.label.toLowerCase()}
          >
            {link.hasDropdown ? (
              <>
                <button
                  className={`header__nav-link header__nav-link--dropdown ${isOpen ? 'is-open' : ''} ${dropdownActiveClass}`}
                  onClick={() => (isMobile || isTablet ? toggleDropdown(link.label) : null)}
                  onFocus={() => handleMouseEnter(link.label)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  <span>{link.label}</span>
                  <Icon
                    icon="mdi:chevron-down"
                    className="header__nav-chevron"
                  />
                </button>
                {isOpen && (
                  <>
                    {isProductsMega ? (
                      <div className={`header__dropdown header__dropdown--products-mega ${isMobile ? 'header__dropdown--mobile' : ''}`}>
                        {/* Desktop mega menu */}
                        {!isMobile && !isTablet ? (
                          <div className="header__products-mega" role="menu" aria-label="Products menu">
                            <div className="header__products-mega-left" role="presentation">
                              {productsGroups.map((group) => {
                                const isGroupActive = group.id === (activeGroup?.id ?? productsGroups?.[0]?.id)
                                return (
                                  <button
                                    key={group.id}
                                    type="button"
                                    className={`header__products-mega-group ${isGroupActive ? 'is-active' : ''}`}
                                    onMouseEnter={() => setActiveProductsGroupId(group.id)}
                                    onFocus={() => setActiveProductsGroupId(group.id)}
                                  >
                                    <span className="header__products-mega-group-icon" aria-hidden="true">
                                      <Image src={group.icon} alt="" width={22} height={22} />
                                    </span>
                                    <span className="header__products-mega-group-label">{group.label}</span>
                                    <Icon icon="mdi:chevron-right" className="header__products-mega-group-chevron" />
                                  </button>
                                )
                              })}
                            </div>
                            <div className="header__products-mega-right" role="presentation">
                              <div className="header__products-mega-title">{activeGroup?.label}</div>
                              <div className="header__products-mega-items">
                                {(activeGroup?.items ?? []).map((item) => {
                                  const itemIsActive = isActivePath(item.href)
                                  if (item.target === true) {
                                    return (
                                      <a
                                        key={item.label}
                                        href={item.href}
                                        className={`header__products-mega-item ${itemIsActive ? 'is-active' : ''}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={handleNavClick}
                                      >
                                        <span className="header__products-mega-item-icon" aria-hidden="true">
                                            <Image src={item.icon} alt="" width={22} height={22} />
                                        </span>
                                        <span className="header__products-mega-item-label">{item.label}</span>
                                      </a>
                                    )
                                  }

                                  return (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      className={`header__products-mega-item ${itemIsActive ? 'is-active' : ''}`}
                                      onClick={handleNavClick}
                                    >
                                      <span className="header__products-mega-item-icon" aria-hidden="true">
                                          <Image src={item.icon} alt="" width={22} height={22} />
                                      </span>
                                      <span className="header__products-mega-item-label">{item.label}</span>
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Mobile sectioned list */
                          <div className="header__products-mobile" aria-label="Products menu">
                            {productsGroups.map((group) => (
                              <div key={group.id} className="header__products-mobile-group">
                                <div className="header__products-mobile-group-title">{group.label}</div>
                                <div className="header__products-mobile-items">
                                  {(group.items ?? []).map((item) => {
                                    const itemIsActive = isActivePath(item.href)
                                    if (item.target === true) {
                                      return (
                                        <a
                                          key={item.label}
                                          href={item.href}
                                          className={`header__products-mobile-item ${itemIsActive ? 'is-active' : ''}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={handleNavClick}
                                        >
                                          <span className="header__products-mobile-item-icon" aria-hidden="true">
                                            <Image src={item.icon} alt="" width={28} height={28} />
                                          </span>
                                          <span className="header__products-mobile-item-label">{item.label}</span>
                                        </a>
                                      )
                                    }

                                    return (
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`header__products-mobile-item ${itemIsActive ? 'is-active' : ''}`}
                                        onClick={handleNavClick}
                                      >
                                        <span className="header__products-mobile-item-icon" aria-hidden="true">
                                          <Image src={item.icon} alt="" width={28} height={28} />
                                        </span>
                                        <span className="header__products-mobile-item-label">{item.label}</span>
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`header__dropdown ${isMobile ? 'header__dropdown--mobile' : ''}`}>
                        {link.items?.map((item) => {
                          const hasNestedItems = item.items && item.items.length > 0
                          const itemIsActive = isActivePath(item.href)

                          // Enable target _blank and rel for the Integration Methods link only
                          if (item.target === true) {
                            return (
                              <div key={item.label} className="header__dropdown-item">
                                <a
                                  href={item.href}
                                  className={`header__dropdown-link ${itemIsActive ? 'is-active' : ''}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={handleNavClick}
                                >
                                  <span>{item.label}</span>
                                </a>
                              </div>
                            )
                          }

                          return (
                            <div
                              key={item.label}
                              className="header__dropdown-item"
                              onMouseEnter={() => {
                                if (!isMobile && !isTablet && hasNestedItems) {
                                  setOpenDropdowns((prev) => ({ ...prev, [item.label]: true }))
                                }
                              }}
                              onMouseLeave={() => {
                                if (!isMobile && !isTablet && hasNestedItems) {
                                  setOpenDropdowns((prev) => {
                                    const newState = { ...prev }
                                    delete newState[item.label]
                                    return newState
                                  })
                                }
                              }}
                            >
                              {hasNestedItems ? (
                                <>
                                  <button
                                    className={`header__dropdown-link ${itemIsActive ? 'is-active' : ''} ${openDropdowns[item.label] ? 'is-open' : ''}`}
                                    onClick={() => (isMobile || isTablet ? toggleDropdown(item.label) : null)}
                                    aria-expanded={openDropdowns[item.label]}
                                  >
                                    <span>{item.label}</span>
                                    <Icon
                                      icon="mdi:chevron-right"
                                      className="header__dropdown-chevron"
                                    />
                                  </button>
                                  {openDropdowns[item.label] && item.items && (
                                    <div
                                      className={`header__dropdown-nested ${isMobile || isTablet ? 'header__dropdown-nested--mobile' : ''}`}
                                      onMouseEnter={() => {
                                        if (!isMobile && !isTablet && hasNestedItems) {
                                          setOpenDropdowns((prev) => ({ ...prev, [item.label]: true }))
                                        }
                                      }}
                                      onMouseLeave={() => {
                                        if (!isMobile && !isTablet && hasNestedItems) {
                                          setOpenDropdowns((prev) => {
                                            const newState = { ...prev }
                                            delete newState[item.label]
                                            return newState
                                          })
                                        }
                                      }}
                                    >
                                      {item.items.map((nestedItem) => (
                                        <Link
                                          key={nestedItem.label}
                                          href={nestedItem.href}
                                          className={`header__dropdown-link ${
                                            isActivePath(nestedItem.href) ? 'is-active' : ''
                                          }`}
                                          onClick={handleNavClick}
                                        >
                                          <span>{nestedItem.label}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={item.href}
                                  className={`header__dropdown-link ${itemIsActive ? 'is-active' : ''}`}
                                  onClick={handleNavClick}
                                >
                                  <span>{item.label}</span>
                                </Link>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                className={`header__nav-link ${isActive ? 'is-active' : ''}`}
                onClick={handleNavClick}
              >
                <span>{link.label}</span>
              </Link>
            )}
          </div>
        )
      })
    },
    [
      openDropdowns,
      hoveredItem,
      activeProductsGroupId,
      isActivePath,
      isTablet,
      handleMouseEnter,
      handleMouseLeave,
      toggleDropdown,
      handleNavClick,
    ]
  )

  // Render app store buttons
  const renderAppStoreButtons = useMemo(() => {
    return (
      <div className="header__app-store">
        {/* <a
          href={navigationData.appStoreLinks.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="header__app-store-btn header__app-store-btn--apple"
          aria-label="Download on the App Store"
        >
          <Image
            width={158}
            height={58}
            src="/images/common/app-store.svg"
            alt="App Store"
            className="footer__app-store-icon"
          />
        </a>
        <a
          href={navigationData.appStoreLinks.googlePlay}
          target="_blank"
          rel="noopener noreferrer"
          className="header__app-store-btn header__app-store-btn--google"
          aria-label="Get it on Google Play"
        >
           <Image
           width={158}
           height={58}
            src="/images/common/google-play.svg"
            alt="Google Play"
            className="footer__app-store-icon"
          />
        </a> */}
        {/* <ContactCtaBtn /> */}
      </div>
    )
  }, [])

  return (
    <header
      ref={headerRef}
      className={`header ${hasMounted ? 'header--enter' : ''}`}
    >
      <div className="header__container">
        {/* Logo */}
        {renderLogo}

        {/* Desktop Navigation */}
        <nav className="header__nav header__nav--desktop" aria-label="Main navigation">
          {renderNavLinks(false)}
        </nav>

        {/* App Store Buttons - Desktop */}
        <div className="header__app-store--desktop">{renderAppStoreButtons}</div>

        {/* Mobile Menu Toggle */}
        <button
          className={`header__mobile-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <div className="hamburger__wrap" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="header__mobile-overlay"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        ref={mobileMenuRef}
        className={`header__mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="header__nav header__nav--mobile" aria-label="Main navigation">
          {renderNavLinks(true)}
        </nav>
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
