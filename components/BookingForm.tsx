"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, ChevronLeft, ChevronRight, MessageCircle, ShieldCheck, Stethoscope } from "lucide-react";
import { useMemo, useState } from "react";
import { clinic, localize, services, whatsappUrl, type Locale } from "@/lib/clinic";

export function BookingForm({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(1);
  const [doctor, setDoctor] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const isRu = locale === "ru";
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const labels = isRu ? ["Врач", "Услуга", "Время"] : ["Дәрігер", "Қызмет", "Уақыт"];

  function next() {
    if (step === 1 && !doctor) return setError(isRu ? "Выберите врача или ближайшего свободного." : "Дәрігерді немесе бос маманды таңдаңыз.");
    if (step === 2 && !service) return setError(isRu ? "Выберите услугу." : "Қызметті таңдаңыз.");
    setError(""); setStep((value) => Math.min(3, value + 1));
  }
  function submit() {
    if (!date || !time || !name.trim() || !phone.trim()) return setError(isRu ? "Заполните дату, время, имя и телефон." : "Күнді, уақытты, аты-жөніңізді және телефонды толтырыңыз.");
    const serviceName = service === "consultation" ? (isRu ? "Бесплатная консультация" : "Тегін консультация") : localize(services.find((item) => item.slug === service)!.name, locale);
    const doctorName = doctor === "any" ? (isRu ? "Ближайший свободный врач" : "Жақын бос дәрігер") : (isRu ? "Специалист по направлению" : "Бағыт бойынша маман");
    const message = isRu
      ? `Здравствуйте! Хочу записаться в ${clinic.name}.\n\nВрач: ${doctorName}\nУслуга: ${serviceName}\nДата: ${date}\nВремя: ${time}\nИмя: ${name}\nТелефон: ${phone}`
      : `Сәлеметсіз бе! ${clinic.name} клиникасына жазылғым келеді.\n\nДәрігер: ${doctorName}\nҚызмет: ${serviceName}\nКүні: ${date}\nУақыты: ${time}\nАты: ${name}\nТелефон: ${phone}`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return <div className="dark-card rounded-[32px] p-5 text-white sm:p-8 lg:p-10">
    <div className="mb-8 flex items-center gap-3">
      {labels.map((label, index) => <div key={label} className="flex min-w-0 flex-1 items-center gap-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-xs font-extrabold ${step > index + 1 ? "border-gold bg-gold text-ink" : step === index + 1 ? "border-white bg-white text-ink" : "border-white/15 text-white/35"}`}>{step > index + 1 ? <Check size={15}/> : index + 1}</span><span className={`hidden text-xs font-bold uppercase tracking-[.12em] sm:block ${step === index + 1 ? "text-white" : "text-white/32"}`}>{label}</span>{index < 2 ? <span className="h-px flex-1 bg-white/10"/> : null}</div>)}
    </div>
    <div className="mb-8 h-1 overflow-hidden rounded-full bg-white/8"><motion.div className="h-full bg-gradient-to-r from-gold to-white" animate={{ width: `${step / 3 * 100}%` }}/></div>
    <div className="min-h-[390px]">
      <AnimatePresence mode="wait" initial={false}>
        {step === 1 && <motion.div key="d" initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-24}}>
          <Stethoscope className="text-gold"/><h3 className="mt-5 text-3xl font-semibold tracking-[-.04em]">{isRu ? "К кому вас записать?" : "Кімге жазу керек?"}</h3><p className="mt-3 text-sm leading-6 text-white/52">{isRu ? "Имена врачей будут опубликованы после официального подтверждения клиникой." : "Дәрігерлердің аты-жөні клиника растағаннан кейін жарияланады."}</p>
          <div className="mt-7 grid gap-3">{[
            ["specialist", isRu ? "Специалист по направлению" : "Бағыт бойынша маман", isRu ? "Администратор подберёт профильного врача" : "Әкімші тиісті дәрігерді таңдайды"],
            ["any", isRu ? "Ближайший свободный" : "Жақын бос маман", isRu ? "Если важнее удобное время" : "Егер ыңғайлы уақыт маңызды болса"],
          ].map(([value,title,note]) => <button type="button" key={value} onClick={()=>{setDoctor(value);setError("")}} className={`focus-ring flex items-center gap-4 rounded-2xl border p-5 text-left transition ${doctor===value ? "border-gold/60 bg-gold/10" : "border-white/12 hover:border-white/30"}`}><span className={`grid h-6 w-6 place-items-center rounded-full border ${doctor===value ? "border-gold bg-gold text-ink" : "border-white/25"}`}>{doctor===value ? <Check size={13}/> : null}</span><span><b className="block">{title}</b><small className="mt-1 block text-white/45">{note}</small></span></button>)}</div>
        </motion.div>}
        {step === 2 && <motion.div key="s" initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-24}}>
          <ShieldCheck className="text-gold"/><h3 className="mt-5 text-3xl font-semibold tracking-[-.04em]">{isRu ? "Что вас беспокоит?" : "Сізді не мазалайды?"}</h3>
          <div className="mt-7 grid max-h-[315px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2"><button type="button" onClick={()=>setService("consultation")} className={`focus-ring rounded-2xl border p-4 text-left text-sm font-bold ${service==="consultation" ? "border-gold bg-gold/10" : "border-white/12"}`}>{isRu ? "Бесплатная консультация" : "Тегін консультация"}</button>{services.map((item)=><button type="button" key={item.slug} onClick={()=>setService(item.slug)} className={`focus-ring rounded-2xl border p-4 text-left text-sm font-bold transition ${service===item.slug ? "border-gold bg-gold/10" : "border-white/12 hover:border-white/30"}`}>{localize(item.short,locale)}</button>)}</div>
        </motion.div>}
        {step === 3 && <motion.div key="t" initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-24}}>
          <CalendarDays className="text-gold"/><h3 className="mt-5 text-3xl font-semibold tracking-[-.04em]">{isRu ? "Удобное время" : "Ыңғайлы уақыт"}</h3>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">{[
            ["date",isRu?"Дата":"Күні",date,setDate],["time",isRu?"Время":"Уақыты",time,setTime],["text",isRu?"Ваше имя":"Атыңыз",name,setName],["tel",isRu?"Телефон":"Телефон",phone,setPhone],
          ].map(([type,label,value,setter],i)=><label key={String(label)} className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.14em] text-white/50">{String(label)}</span>{i===1?<select value={String(value)} onChange={(e)=>{(setter as (v:string)=>void)(e.target.value);setError("")}} className="focus-ring h-13 w-full rounded-xl border border-white/15 bg-white px-4 text-ink"><option value="">—</option>{["09:30","11:00","14:00","16:30","18:00"].map(v=><option key={v}>{v}</option>)}</select>:<input type={String(type)} min={i===0?minDate:undefined} value={String(value)} onChange={(e)=>{(setter as (v:string)=>void)(e.target.value);setError("")}} className="focus-ring h-13 w-full rounded-xl border border-white/15 bg-white px-4 text-ink"/>}</label>)}</div>
        </motion.div>}
      </AnimatePresence>
    </div>
    {error && <p role="alert" className="mt-4 rounded-xl bg-red-400/12 px-4 py-3 text-sm text-red-200">{error}</p>}
    <div className="mt-7 flex items-center justify-between gap-3"><button type="button" disabled={step===1} onClick={()=>{setStep(v=>v-1);setError("")}} className="focus-ring inline-flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-bold text-white/55 disabled:opacity-0"><ChevronLeft size={17}/>{isRu?"Назад":"Артқа"}</button>{step<3?<button type="button" onClick={next} className="focus-ring inline-flex h-12 items-center gap-2 rounded-xl bg-gold px-6 text-sm font-extrabold text-ink transition hover:-translate-y-0.5">{isRu?"Далее":"Келесі"}<ChevronRight size={17}/></button>:<button type="button" onClick={submit} className="focus-ring inline-flex h-12 items-center gap-2 rounded-xl bg-[#22a66b] px-5 text-sm font-extrabold text-white"><MessageCircle size={17}/>{isRu?"Отправить":"Жіберу"}</button>}</div>
  </div>;
}
