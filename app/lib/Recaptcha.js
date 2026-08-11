"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

let activeWidgetId = null;

export function resetRecaptcha() {
  if (activeWidgetId !== null && window.grecaptcha?.reset) {
    window.grecaptcha.reset(activeWidgetId);
  }
}

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
    activeWidgetId = widgetIdRef.current;
  };

  useEffect(() => {
    if (!siteKey) return;
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
      if (activeWidgetId === widgetIdRef.current) activeWidgetId = null;
    };
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
