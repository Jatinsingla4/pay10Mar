"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

// Google reCAPTCHA v2 (checkbox) widget. Renders nothing (and blocks nothing)
// if the site key isn't configured, so local/dev environments without a key still work.
export default function Recaptcha({ onVerify, onExpire }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const renderWidget = () => {
    if (!siteKey || !containerRef.current || !window.grecaptcha?.render || widgetIdRef.current !== null) return;
    widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      "expired-callback": () => onExpire?.(),
      "error-callback": () => onExpire?.(),
    });
  };

  useEffect(() => {
    if (!siteKey) return;
    // The script may already be cached/preloaded by the time this mounts, so
    // next/script's onReady can fire before or after this — poll instead of
    // relying on it alone.
    const interval = setInterval(() => {
      if (window.grecaptcha?.render) {
        clearInterval(interval);
        renderWidget();
      }
    }, 200);
    return () => {
      clearInterval(interval);
      if (widgetIdRef.current !== null && window.grecaptcha?.reset) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} />
    </>
  );
}
