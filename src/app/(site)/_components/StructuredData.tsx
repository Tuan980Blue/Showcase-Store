import React from 'react';

interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint?: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string;
  };
  sameAs?: string[];
}

interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  potentialAction: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "LocalBusiness" | "Store";
  name: string;
  image: string;
  description: string;
  address?: {
    "@type": "PostalAddress";
    addressCountry: string;
    addressLocality: string;
    addressRegion?: string;
    streetAddress?: string;
  };
  telephone?: string;
  priceRange?: string;
  openingHours?: string;
}

interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

interface StructuredDataProps {
  type: 'organization' | 'website' | 'localBusiness' | 'breadcrumb';
  data: OrganizationSchema | WebSiteSchema | LocalBusinessSchema | BreadcrumbSchema;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helper functions to create common schemas
export function createOrganizationSchema(
  name: string,
  url: string,
  logo: string,
  description: string,
  phone?: string,
  socialLinks?: string[]
): OrganizationSchema {
  const schema: OrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
  };

  if (phone) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    };
  }

  if (socialLinks && socialLinks.length > 0) {
    schema.sameAs = socialLinks;
  }

  return schema;
}

export function createWebSiteSchema(
  name: string,
  url: string,
  searchUrl: string = "/search?q={search_term_string}"
): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}${searchUrl}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function createLocalBusinessSchema(
  name: string,
  image: string,
  description: string,
  address?: {
    country: string;
    locality: string;
    region?: string;
    streetAddress?: string;
  },
  phone?: string,
  priceRange?: string,
  openingHours?: string
): LocalBusinessSchema {
  const schema: LocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name,
    image,
    description,
  };

  if (address) {
    schema.address = {
      "@type": "PostalAddress",
      addressCountry: address.country,
      addressLocality: address.locality,
      ...(address.region && { addressRegion: address.region }),
      ...(address.streetAddress && { streetAddress: address.streetAddress }),
    };
  }

  if (phone) schema.telephone = phone;
  if (priceRange) schema.priceRange = priceRange;
  if (openingHours) schema.openingHours = openingHours;

  return schema;
}

export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

