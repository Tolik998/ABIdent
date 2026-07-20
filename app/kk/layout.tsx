import { IntlProvider } from "@/components/IntlProvider";

export default function KazakhLayout({ children }: { children: React.ReactNode }) {
  return <IntlProvider locale="kk">{children}</IntlProvider>;
}
