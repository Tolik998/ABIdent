"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ClipboardList, Info, MessageCircle, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { clinic, localize, treatmentOptions, whatsappUrl, type Locale } from "@/lib/clinic";

export function CostPlanner({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<string[]>([]);
  const isRu = locale === "ru";
  const picked = useMemo(() => treatmentOptions.filter((item) => selected.includes(item.id)), [selected]);
  function toggle(id:string) { setSelected((current)=>current.includes(id)?current.filter((item)=>item!==id):[...current,id]); }
  function send() {
    if (!picked.length) return;
    const list = picked.map((item)=>`• ${localize(item.name,locale)}`).join("\n");
    const message = isRu ? `Здравствуйте! Хочу получить расчёт лечения в ${clinic.name}.\n\nВыбранные направления:\n${list}\n\nПонимаю, что точная стоимость определяется после консультации.` : `Сәлеметсіз бе! ${clinic.name} клиникасында емдеу құнын білгім келеді.\n\nТаңдалған бағыттар:\n${list}\n\nНақты құн консультациядан кейін анықталатынын түсінемін.`;
    window.open(whatsappUrl(message),"_blank","noopener,noreferrer");
  }
  return <div className="grid gap-6 lg:grid-cols-[1.12fr_.88fr]">
    <div className="premium-card rounded-[30px] p-5 sm:p-7"><div className="grid gap-3 sm:grid-cols-2">{treatmentOptions.map((item)=>{const active=selected.includes(item.id);return <button key={item.id} type="button" aria-pressed={active} onClick={()=>toggle(item.id)} className={`focus-ring flex items-center gap-4 rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${active?"border-sapphire bg-blue-50 shadow-lg":"border-slate-200 bg-white hover:border-sapphire/35"}`}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border ${active?"border-sapphire bg-sapphire text-white":"border-slate-300"}`}>{active?<Check size={15}/>:null}</span><span><b className="block text-sm">{localize(item.name,locale)}</b><small className="mt-1 block text-slate-400">{isRu?"Цена уточняется":"Бағасы нақтыланады"}</small></span></button>})}</div></div>
    <div className="rounded-[30px] bg-ink p-7 text-white shadow-[0_30px_80px_rgba(7,17,38,.22)] sm:p-9"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/8 text-gold"><ClipboardList/></span><span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55">{isRu?`Выбрано: ${selected.length}`:`Таңдалды: ${selected.length}`}</span></div><div className="mt-7 min-h-40"><AnimatePresence initial={false}>{picked.length?<motion.ul initial={{opacity:0}} animate={{opacity:1}} className="space-y-3">{picked.map(item=><motion.li layout key={item.id} className="border-b border-white/10 pb-3 text-sm text-white/68">{localize(item.name,locale)}</motion.li>)}</motion.ul>:<p className="rounded-2xl border border-dashed border-white/15 p-5 text-sm leading-6 text-white/42">{isRu?"Выберите процедуры — мы соберём аккуратный запрос для администратора.":"Процедураларды таңдаңыз — әкімшіге сұраныс дайындаймыз."}</p>}</AnimatePresence></div><div className="mt-7 border-t border-white/10 pt-6"><p className="text-xs uppercase tracking-[.16em] text-white/36">{isRu?"Предварительный итог":"Алдын ала қорытынды"}</p><p className="mt-2 text-3xl font-semibold">{isRu?"После консультации":"Консультациядан кейін"}</p></div><button type="button" disabled={!picked.length} onClick={send} className="focus-ring mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#22a66b] text-sm font-extrabold disabled:opacity-35"><MessageCircle size={18}/>{isRu?"Отправить запрос":"Сұраныс жіберу"}</button><button type="button" disabled={!selected.length} onClick={()=>setSelected([])} className="mt-2 inline-flex h-10 w-full items-center justify-center gap-2 text-xs text-white/45 disabled:opacity-0"><RotateCcw size={14}/>{isRu?"Очистить":"Тазалау"}</button><p className="mt-4 flex gap-2 text-xs leading-5 text-white/38"><Info className="mt-0.5 shrink-0" size={14}/>{isRu?"Публичный прайс клиники не найден. Мы не подставляем вымышленные суммы.":"Клиниканың ашық прайсы табылмады. Ойдан шығарылған сомалар көрсетілмейді."}</p></div>
  </div>;
}
