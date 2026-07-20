"use client";

import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import kk from "@/messages/kk.json";
import ru from "@/messages/ru.json";

export function IntlProvider({ locale, children }: { locale: "ru" | "kk"; children: ReactNode }) {
  return (
    <NextIntlClientProvider locale={locale} messages={locale === "kk" ? kk : ru} timeZone="Asia/Almaty">
      {children}
    </NextIntlClientProvider>
  );
}
