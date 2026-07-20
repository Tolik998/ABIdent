import { clinic, localize, type Locale, type Service } from "./clinic";

export function clinicSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalClinic"],
    name: clinic.name,
    description: localize(clinic.tagline, locale),
    url: locale === "kk" ? "https://abi-dent.site/kk" : "https://abi-dent.site",
    telephone: clinic.phone,
    sameAs: [clinic.twoGisCanonical, `https://www.instagram.com/${clinic.instagram}/`],
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "kk" ? "Абай көшесі, 44" : "ул. Абая, 44",
      addressLocality: locale === "kk" ? "Қарағанды" : "Караганда",
      addressCountry: "KZ",
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: clinic.rating, ratingCount: clinic.reviewsCount, bestRating: 5 },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "18:00" },
    ],
    isAccessibleForFree: true,
    // TODO: add medicalLicense only after ABI Dent supplies a scan or registry proof.
    ...(clinic.licenseVerified ? { medicalLicense: clinic.licenseNumber } : {}),
  };
}

export function serviceSchema(service: Service, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: localize(service.name, locale),
    description: localize(service.longDescription, locale),
    provider: { "@type": "Dentist", name: clinic.name, telephone: clinic.phone },
  };
}
