"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

// Google issues single-use tokens: once the server has verified one, replaying it
// fails. Forms must therefore reset the widget after every submit attempt so the
// next attempt carries a fresh token. Only one widget is rendered per page, so
// tracking its id at module scope is enough for callers to reset it.
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
    // Mount-once: the widget is rendered a single time and reset imperatively.
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
