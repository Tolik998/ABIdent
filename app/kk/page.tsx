import type { Metadata } from "next";
import { ClinicPage } from "@/components/ClinicPage";
import { clinicSchema } from "@/lib/schema";

export const metadata: Metadata = { title: "Қарағандыдағы премиум стоматология", description: "ABI Dent — ортопедия, хирургия, имплантация және цифрлық стоматология." };

export default function KazakhPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema("kk")) }} /><ClinicPage locale="kk" /></>;
}
