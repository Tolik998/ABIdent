import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/ServiceDetail";
import { services, localize } from "@/lib/clinic";
import { serviceSchema } from "@/lib/schema";

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = services.find((item) => item.slug === slug); if (!service) return {};
  return { title: localize(service.name, "ru"), description: localize(service.description, "ru") };
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = services.find((item) => item.slug === slug); if (!service) notFound();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, "ru")) }} /><ServiceDetail service={service} locale="ru" /></>;
}
