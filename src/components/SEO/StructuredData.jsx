export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HydraNexa Energy",
    "legalName": "HydraNexa Energy Pvt. Ltd.",
    "url": "https://hydranexa.com",
    "logo": "https://hydranexa.com/assets/logo/logo.png",
    "foundingDate": "2020",
    "description": "Leading hydropower company in Nepal providing sustainable and renewable energy solutions through innovative hydroelectric projects.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kathmandu",
      "addressLocality": "Kathmandu",
      "addressRegion": "Bagmati",
      "postalCode": "44600",
      "addressCountry": "NP"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+977-1-XXXXXXX",
      "contactType": "customer service",
      "email": "info@hydranexa.com",
      "areaServed": "NP",
      "availableLanguage": ["English", "Nepali"]
    },
    "sameAs": [
      "https://www.facebook.com/hydranexa",
      "https://www.twitter.com/hydranexa",
      "https://www.linkedin.com/company/hydranexa",
      "https://www.instagram.com/hydranexa"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}