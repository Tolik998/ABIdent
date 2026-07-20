import type { Metadata } from "next";
import localFont from "next/font/local";
import { IntlProvider } from "@/components/IntlProvider";
import "./globals.css";

const manrope = localFont({
  src: [
    { path: "../node_modules/@fontsource-variable/manrope/files/manrope-cyrillic-wght-normal.woff2", style: "normal" },
    { path: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abi-dent.site"),
  title: { default: "ABI Dent — стоматология премиум-класса в Караганде", template: "%s | ABI Dent" },
  description: "Ортопедия, хирургия, имплантация и цифровая стоматология в Караганде. Рейтинг 5.0 в 2ГИС.",
  openGraph: { title: "ABI Dent", description: "Стоматология премиум-класса в Караганде", locale: "ru_KZ", type: "website", images: [{ url: "/og.png", width: 1536, height: 1024, alt: "ABI Dent — стоматология премиум-класса" }] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${manrope.variable} antialiased`}>
        <IntlProvider locale="ru">{children}</IntlProvider>
      </body>
    </html>
  );
}
