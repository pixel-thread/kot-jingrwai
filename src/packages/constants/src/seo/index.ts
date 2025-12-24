export const SEO = {
  // Basic App Info
  name: process.env.NEXT_PUBLIC_APP_NAME,
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Your Ultimate Song Collection App`,
  desc: "Discover, organize, and enjoy thousands of songs and choruses. Access your favorite hymns, spiritual songs, and worship music in multiple languages with our comprehensive digital songbook.",
  keywords: [
    "songs",
    "hymns",
    "worship music",
    "spiritual songs",
    "digital songbook",
    "church music",
    "christian songs",
    "religious music",
    "khasi songs",
    "multilingual songs",
  ],

  // URLs and Domain
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000",
  canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000",

  // Images for Social Sharing
  ogImage: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/og/og-image.png`,
  ogImage2: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/og/og-image-alt.png`,
  logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
  favicon: "/favicon.ico",

  // Open Graph Properties
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["kha_IN", "hi_IN"], // Add your supported locales
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Digital Songbook & Worship Music Collection`,
    description:
      "Access thousands of songs, hymns, and choruses in our comprehensive digital songbook. Perfect for worship, study, and spiritual enrichment.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_APP_NAME} - Digital Songbook`,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/og/og-image.png`,
        width: 800,
        height: 800,
        alt: `${process.env.NEXT_PUBLIC_APP_NAME} - Digital Songbook`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@yourhandle", // Add your Twitter handle
    creator: "@yourhandle",
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Digital Songbook`,
    description:
      "Your ultimate collection of songs, hymns, and worship music. Available in multiple languages with search and organize features.",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/og/og-image.png`,
    imageAlt: `${process.env.NEXT_PUBLIC_APP_NAME} - Digital Songbook Interface`,
  },

  // App-specific Meta
  applicationName: process.env.NEXT_PUBLIC_APP_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: process.env.NEXT_PUBLIC_APP_NAME,
  },

  // PWA Manifest
  manifest: "/manifest.json",

  // Schema.org Structured Data
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: process.env.NEXT_PUBLIC_APP_NAME,
    description:
      "Digital songbook application for worship music, hymns, and spiritual songs",
    applicationCategory: "MusicApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Pixel-Thread",
    },
    publisher: {
      "@type": "Organization",
      name: "Pixel-Thread",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/globe.svg`,
      },
    },
  },

  // Robots and Crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Language and Localization
  language: "en",
  alternateLanguages: [
    { hreflang: "en", href: `${process.env.NEXT_PUBLIC_BASE_URL}/en` },
    { hreflang: "kha", href: `${process.env.NEXT_PUBLIC_BASE_URL}/kha` },
    { hreflang: "x-default", href: process.env.NEXT_PUBLIC_BASE_URL },
  ],

  // Technical SEO
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#667eea",
  backgroundColor: "#ffffff",

  // Contact and Business Info
  contact: {
    email: "contact@yourdomain.com",
    phone: "+1234567890", // Optional
  },

  // Social Media Links
  social: {
    facebook: "https://facebook.com/yourpage",
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
    youtube: "https://youtube.com/yourchannel",
  },

  // Additional Meta Tags
  additionalMetaTags: [
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "msapplication-TileColor",
      content: "#667eea",
    },
    {
      name: "msapplication-config",
      content: "/browserconfig.xml",
    },
  ],

  // Page-specific SEO helpers
  generatePageSEO: (
    pageTitle: string,
    pageDesc?: string,
    pagePath?: string,
  ) => ({
    title: `${pageTitle} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: pageDesc || SEO.desc,
    canonical: `${SEO.url}${pagePath || ""}`,
    openGraph: {
      ...SEO.openGraph,
      title: `${pageTitle} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
      description: pageDesc || SEO.desc,
      url: `${SEO.url}${pagePath || ""}`,
    },
  }),
};

// Helper function for dynamic song pages
export const generateSongSEO = (
  songTitle: string,
  songNumber: number,
  composer?: string,
) => ({
  title: `${songTitle} - Song #${songNumber} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `View lyrics and details for "${songTitle}" (Song #${songNumber})${composer ? ` by ${composer}` : ""}. Part of our comprehensive digital songbook collection.`,
  canonical: `${SEO.url}/songs/${songNumber}`,
  openGraph: {
    ...SEO.openGraph,
    title: `${songTitle} - Song #${songNumber}`,
    description: `View lyrics for "${songTitle}" (Song #${songNumber}) in our digital songbook.`,
    type: "article",
    url: `${SEO.url}/songs/${songNumber}`,
  },
});
