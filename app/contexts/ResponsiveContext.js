'use client'

import { createContext, useContext, useEffect, useState } from 'react';

const ResponsiveContext = createContext({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  headerHeight:0,
});

export const ResponsiveProvider = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    headerHeight:0,

  });

  useEffect(() => {
    const headerElem = document.querySelector('header');
    const handleResize = () => {
      const width = window.innerWidth;
      const headerHeight = headerElem.getBoundingClientRect().height;
      setBreakpoint({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 992,
        isDesktop: width >= 992,
        headerHeight : headerHeight,
      });
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={breakpoint}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => useContext(ResponsiveContext);
