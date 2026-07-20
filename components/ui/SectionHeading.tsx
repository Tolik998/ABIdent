import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, text, dark = false, side }: { eyebrow: string; title: string; text?: string; dark?: boolean; side?: ReactNode }) {
  return <div className="grid gap-7 lg:grid-cols-[1fr_.72fr] lg:items-end"><div><p className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>{eyebrow}</p><h2 className="section-title mt-6 max-w-4xl">{title}</h2></div>{side ?? (text ? <p className={`max-w-xl text-lg font-semibold leading-8 ${dark ? "text-white/62" : "text-slate-600"}`}>{text}</p> : null)}</div>;
}
