// components/Head.tsx
import { SEO } from "@repo/constants";

export type HeadMetaProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  pagePath?: string;
  schemaData?: object;
  noIndex?: boolean;
  alternateLanguages?: Array<{ href: string; hreflang: string }>;
  customMeta?: Array<{ name?: string; property?: string; content: string }>;
};

export default function HeadMeta({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogTitle,
  pagePath = "",
  schemaData,
  noIndex = false,
  alternateLanguages,
  customMeta = [],
}: HeadMetaProps) {
  // Use SEO defaults if not provided
  const pageTitle = title || SEO.title;
  const pageDescription = description || SEO.desc;
  const pageKeywords = keywords || SEO.keywords;
  const pageCanonical = canonicalUrl || `${SEO.url}${pagePath}`;
  const pageOgImage = ogImage || SEO.ogImage;
  const pageAlternateLanguages = alternateLanguages || SEO.alternateLanguages;
  const pageSchema = schemaData || SEO.structuredData;

  // Ensure image URL is absolute
  const fullImageUrl = pageOgImage.startsWith("http") ? pageOgImage : `${SEO.url}${pageOgImage}`;

  return (
    <head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords.join(", ")} />
      <meta name="author" content={SEO.name} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="viewport" content={SEO.viewport} />
      <meta name="theme-color" content={SEO.themeColor} />
      <meta name="application-name" content={SEO.applicationName} />

      {/* Canonical URL */}
      <link rel="canonical" href={pageCanonical} />

      {/* Favicon and Icons */}
      <link rel="icon" href={SEO.favicon} />
      <link rel="shortcut icon" href={SEO.favicon} />
      <link rel="apple-touch-icon" href={SEO.logo} />

      {/* PWA Manifest */}
      <link rel="manifest" href={SEO.manifest} />

      {/* Alternate Languages */}
      {pageAlternateLanguages.map((lang, index) => (
        <link key={index} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}

      {/* Open Graph Tags */}
      <meta property="og:type" content={SEO.openGraph.type} />
      <meta property="og:site_name" content={SEO.openGraph.siteName} />
      <meta property="og:locale" content={SEO.openGraph.locale} />
      <meta property="og:title" content={ogTitle || pageTitle} key="og-title" />
      <meta property="og:description" content={pageDescription} key="og-desc" />
      <meta property="og:url" content={pageCanonical} key="og-url" />
      <meta property="og:image" content={fullImageUrl} key="og-image" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />

      {/* Additional Open Graph alternate locales */}
      {SEO.openGraph.alternateLocale.map((locale, index) => (
        <meta key={index} property="og:locale:alternate" content={locale} />
      ))}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={SEO.twitter.card} />
      <meta name="twitter:site" content={SEO.twitter.site} />
      <meta name="twitter:creator" content={SEO.twitter.creator} />
      <meta name="twitter:title" content={ogTitle || pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={pageTitle} />

      {/* Apple Web App Meta Tags */}
      <meta name="apple-mobile-web-app-capable" content={SEO.appleWebApp.capable ? "yes" : "no"} />
      <meta name="apple-mobile-web-app-status-bar-style" content={SEO.appleWebApp.statusBarStyle} />
      <meta name="apple-mobile-web-app-title" content={SEO.appleWebApp.title} />

      {/* Additional Meta Tags from SEO config */}
      {SEO.additionalMetaTags.map((meta, index) => (
        <meta key={index} name={meta.name} content={meta.content} />
      ))}

      {/* Custom Meta Tags passed as props */}
      {customMeta.map((meta, index) => (
        <meta
          key={`custom-${index}`}
          {...(meta.name ? { name: meta.name } : {})}
          {...(meta.property ? { property: meta.property } : {})}
          content={meta.content}
        />
      ))}

      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Structured Data (Schema.org) */}
      {pageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSchema),
          }}
        />
      )}
    </head>
  );
}
