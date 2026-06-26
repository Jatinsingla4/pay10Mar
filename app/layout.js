import Script from "next/script";
import "@/styles/globals.scss";
import "./variables.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalInViewInitializer from "./components/GlobalInViewInitializer";
import { ResponsiveProvider } from "./contexts/ResponsiveContext";
import { defaultMetadata } from "./lib/metadata";

export const metadata = defaultMetadata;

import { Outfit } from "next/font/google";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Staging: SEO / analytics disabled — uncomment for production */}
        {/* <meta name="google-site-verification" content="m239GpVidYc7ALtaO5uiw-xich8btnIfKmGh9m2Pync" /> */}
        {/* Google tag (gtag.js) — GA4 G-RJ4PL9DES1 */}
        {/* <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RJ4PL9DES1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RJ4PL9DES1');
          `}
        </Script> */}

        {/* Google Tag Manager */}
        {/* <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TK6G3CFR');
          `}
        </Script> */}
      </head>
      <body className={`${outfit.variable}`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TK6G3CFR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript> */}
        <ResponsiveProvider>
          <GlobalInViewInitializer />
          <Header />
          {children}
          <Footer />
        </ResponsiveProvider>
      </body>
    </html>
  );
}
