"use client";

import Image from "next/image";
import { useState } from "react";
import { GripVertical, Images } from "lucide-react";
import { galleryCases, localize, type Locale } from "@/lib/clinic";

function Comparison({ before,after,title,locale }:{before:string;after:string;title:string;locale:Locale}) {
  const [position,setPosition]=useState(50); const isRu=locale==="ru";
  return <article className="premium-card overflow-hidden rounded-[28px]"><div className="relative aspect-[16/10] select-none overflow-hidden bg-slate-100"><Image src={after} alt={`${title} — ${isRu?"после":"кейін"}`} fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover"/><div className="absolute inset-0 overflow-hidden" style={{clipPath:`inset(0 ${100-position}% 0 0)`}}><Image src={before} alt={`${title} — ${isRu?"до":"дейін"}`} fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover saturate-[.72] sepia-[.22]"/></div><div className="absolute inset-y-0 w-0.5 bg-white shadow" style={{left:`${position}%`}}><span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-ink text-gold shadow-xl"><GripVertical size={20}/></span></div><input aria-label={isRu?"Сравнение до и после":"Дейін және кейін салыстыру"} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" type="range" min="5" max="95" value={position} onChange={e=>setPosition(Number(e.target.value))}/><span className="absolute left-4 top-4 rounded-full bg-ink/82 px-3 py-1.5 text-xs font-bold text-white">{isRu?"До":"Дейін"}</span><span className="absolute right-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-bold text-ink">{isRu?"После":"Кейін"}</span></div><div className="p-5 sm:p-6"><h3 className="text-lg font-extrabold">{title}</h3><p className="mt-2 flex gap-2 text-xs leading-5 text-slate-500"><Images className="mt-0.5 shrink-0" size={14}/>{isRu?"Демонстрационные фото. Реальные кейсы добавляются после согласования.":"Демонстрациялық фотолар. Нақты кейстер келісілгеннен кейін қосылады."}</p></div></article>;
}

export function BeforeAfterGallery({locale}:{locale:Locale}) { return <div className="grid gap-6 lg:grid-cols-2">{galleryCases.map((item)=><Comparison key={item.before} {...item} title={localize(item.title,locale)} locale={locale}/>)}</div>; }
