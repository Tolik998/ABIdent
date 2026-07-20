import { ClinicPage } from "@/components/ClinicPage";
import { clinicSchema } from "@/lib/schema";

export default function HomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema("ru")) }} /><ClinicPage locale="ru" /></>;
}
