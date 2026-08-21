import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Preloader from "@/components/Preloader";

const SITE_URL = "https://dannyrodriguez.online";
const GA_MEASUREMENT_ID = "G-Z7685YJWNV";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Danny Rodriguez — Pattern-Recognition Operator",
    template: "%s — Danny Rodriguez",
  },
  description:
    "Danny Rodriguez reads patterns in growth, retention, AI and operations, then builds the systems around them. 25+ years across CPG, retail, distribution and sales in the U.S., Latin America and the Caribbean.",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "mdQFvsHwmJFha4BWn4EZp2UwhaoBV7VJ--ZudswuG6Y",
  },
  icons: {
    icon: [
      { url: "/assets/favicon.ico" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Danny Rodriguez — Pattern-Recognition Operator",
    description:
      "Danny Rodriguez reads patterns in growth, retention, AI and operations, then builds the systems around them.",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: "/assets/danny-rodriguez-og.jpg",
        width: 1200,
        height: 630,
        alt: "Danny Rodriguez — Pattern-Recognition Operator.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danny Rodriguez — Pattern-Recognition Operator",
    description:
      "Danny Rodriguez reads patterns in growth, retention, AI and operations, then builds the systems around them.",
    images: ["/assets/danny-rodriguez-og.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Danny Rodriguez",
  url: SITE_URL,
  jobTitle: "Pattern-Recognition Operator",
  description:
    "Danny Rodriguez reads patterns in growth, retention, AI and operations, then builds the systems around them. 25+ years across CPG, retail, distribution and sales in the U.S., Latin America and the Caribbean.",
  image: "/assets/danny-rodriguez-og.jpg",
  sameAs: ["https://www.linkedin.com/in/dannyrodriguez/"],
};

// NOTE: fonts are loaded via classic <link> tags rather than next/font/google. This sandbox's
// network egress blocks fonts.googleapis.com at build time (next/font fetches + self-hosts at
// build time, which failed here with a 403 on the CONNECT tunnel) — untested whether Danny's
// real build environment (his machine / VPS / CI) has the same restriction. The <link> approach
// matches the original site exactly and has zero build-time network dependency, so it's the
// safe default. Swapping to next/font/google later is a clean, low-risk perf upgrade once it's
// confirmed to build somewhere with unrestricted access to Google Fonts.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Manrope:wght@200;300;400;500;600;700&family=Space+Mono:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        {/* Google tag (gtag.js) — GA4 property for dannyrodriguez.online */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Preloader />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
