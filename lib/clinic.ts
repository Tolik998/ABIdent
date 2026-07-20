export type Locale = "ru" | "kk";
export type Localized = Record<Locale, string>;

export interface Service {
  slug: string;
  name: Localized;
  short: Localized;
  description: Localized;
  longDescription: Localized;
  priceFrom: number | null;
  duration: Localized;
  stages: Localized[];
  icon: "crown" | "surgery" | "implant" | "gum" | "scan" | "urgent";
}

const steps = {
  diagnosis: { ru: "Диагностика и цифровой план", kk: "Диагностика және цифрлық жоспар" },
  discussion: { ru: "Обсуждение вариантов и результата", kk: "Нұсқалар мен нәтижені талқылау" },
  treatment: { ru: "Лечение по согласованному протоколу", kk: "Келісілген хаттама бойынша емдеу" },
  control: { ru: "Контроль и рекомендации", kk: "Бақылау және ұсыныстар" },
};

export const services: Service[] = [
  {
    slug: "orthopedics",
    name: { ru: "Ортопедическая стоматология", kk: "Ортопедиялық стоматология" },
    short: { ru: "Ортопедия", kk: "Ортопедия" },
    description: { ru: "Коронки, виниры и восстановление функции с точным цифровым планированием.", kk: "Коронкалар, винирлер және цифрлық жоспарлаумен функцияны қалпына келтіру." },
    longDescription: { ru: "Ортопедическое лечение помогает вернуть эстетику, комфорт и правильное распределение нагрузки. План формируется после осмотра, снимков и оценки прикуса — без универсальных решений.", kk: "Ортопедиялық емдеу эстетиканы, жайлылықты және жүктеменің дұрыс бөлінуін қайтарады. Жоспар тексеру, түсірілім және тістесуді бағалаудан кейін құрылады." },
    priceFrom: null,
    duration: { ru: "по индивидуальному плану", kk: "жеке жоспар бойынша" },
    stages: [steps.diagnosis, steps.discussion, steps.treatment, steps.control],
    icon: "crown",
  },
  {
    slug: "surgery",
    name: { ru: "Хирургическая стоматология", kk: "Хирургиялық стоматология" },
    short: { ru: "Хирургия", kk: "Хирургия" },
    description: { ru: "Бережные хирургические вмешательства и продуманный послеоперационный контроль.", kk: "Ұқыпты хирургиялық ем және операциядан кейінгі мұқият бақылау." },
    longDescription: { ru: "Хирургическое лечение начинается с диагностики и оценки рисков. Врач объясняет показания, варианты обезболивания и восстановление после процедуры.", kk: "Хирургиялық емдеу диагностикадан және тәуекелдерді бағалаудан басталады. Дәрігер көрсетілімдерді, жансыздандыруды және қалпына келуді түсіндіреді." },
    priceFrom: null,
    duration: { ru: "зависит от клинической ситуации", kk: "клиникалық жағдайға байланысты" },
    stages: [steps.diagnosis, steps.discussion, steps.treatment, steps.control],
    icon: "surgery",
  },
  {
    slug: "implantation",
    name: { ru: "Имплантация зубов", kk: "Тіс имплантациясы" },
    short: { ru: "Имплантация", kk: "Имплантация" },
    description: { ru: "Восстановление утраченных зубов с учётом эстетики, функции и долгосрочного прогноза.", kk: "Эстетика, функция және ұзақ мерзімді болжамды ескеріп жоғалған тістерді қалпына келтіру." },
    longDescription: { ru: "Имплантация планируется по данным диагностики. Итоговая стоимость зависит от системы импланта, объёма подготовки и будущей ортопедической конструкции.", kk: "Имплантация диагностика деректерімен жоспарланады. Құны имплант жүйесіне, дайындыққа және ортопедиялық құрылымға байланысты." },
    priceFrom: null,
    duration: { ru: "этапно, по плану врача", kk: "кезеңмен, дәрігер жоспары бойынша" },
    stages: [steps.diagnosis, steps.discussion, steps.treatment, steps.control],
    icon: "implant",
  },
  {
    slug: "periodontology",
    name: { ru: "Пародонтология", kk: "Пародонтология" },
    short: { ru: "Пародонтология", kk: "Пародонтология" },
    description: { ru: "Диагностика и лечение тканей вокруг зубов, забота о здоровье дёсен.", kk: "Тіс айналасындағы тіндерді диагностикалау және емдеу, қызыл иек күтімі." },
    longDescription: { ru: "Пародонтологическая программа подбирается после оценки состояния дёсен и уровня гигиены. Цель — снизить воспаление и создать понятный план домашнего ухода.", kk: "Пародонтологиялық бағдарлама қызыл иек пен гигиена жағдайын бағалағаннан кейін таңдалады." },
    priceFrom: null,
    duration: { ru: "по результатам диагностики", kk: "диагностика нәтижесі бойынша" },
    stages: [steps.diagnosis, steps.discussion, steps.treatment, steps.control],
    icon: "gum",
  },
  {
    slug: "digital-diagnostics",
    name: { ru: "Цифровая диагностика", kk: "Цифрлық диагностика" },
    short: { ru: "Диагностика", kk: "Диагностика" },
    description: { ru: "Прицельный снимок зуба и данные для точного клинического решения.", kk: "Тістің нысаналы түсірілімі және нақты клиникалық шешімге арналған деректер." },
    longDescription: { ru: "Диагностика помогает увидеть то, что невозможно оценить только при осмотре, и составить аргументированный план лечения.", kk: "Диагностика тексеруде көрінбейтін жағдайды бағалап, негізделген емдеу жоспарын құруға көмектеседі." },
    priceFrom: null,
    duration: { ru: "обычно до 30 минут", kk: "әдетте 30 минутқа дейін" },
    stages: [steps.diagnosis, steps.discussion, steps.control],
    icon: "scan",
  },
  {
    slug: "emergency",
    name: { ru: "Неотложная помощь взрослым", kk: "Ересектерге шұғыл көмек" },
    short: { ru: "Неотложка", kk: "Шұғыл көмек" },
    description: { ru: "Помощь при острой боли и состояниях, которые не стоит откладывать.", kk: "Қатты ауырсыну және кейінге қалдыруға болмайтын жағдайлар кезінде көмек." },
    longDescription: { ru: "При острой боли свяжитесь с клиникой заранее: администратор уточнит симптомы и ближайшее доступное время. В экстренной ситуации обращайтесь в службу 112.", kk: "Қатты ауырсынуда клиникаға алдын ала хабарласыңыз. Төтенше жағдайда 112 қызметіне қоңырау шалыңыз." },
    priceFrom: null,
    duration: { ru: "по срочности и расписанию", kk: "шұғылдық пен кестеге байланысты" },
    stages: [steps.diagnosis, steps.discussion, steps.treatment, steps.control],
    icon: "urgent",
  },
];

export const clinic = {
  name: "ABI Dent",
  tagline: { ru: "Стоматология премиум-класса", kk: "Премиум-класс стоматологиясы" },
  address: { ru: "ул. Абая, 44, Караганда", kk: "Абай көшесі, 44, Қарағанды" },
  district: { ru: "Новый город м-н, район Казыбек Би", kk: "Жаңа қала шағын ауданы, Қазыбек Би ауданы" },
  phone: "+7 (7212) 56-37-35",
  secondaryPhone: "+7 (7212) 56-57-27",
  mobilePhone: "+7 747 490-69-85",
  whatsappNumber: "77474906985",
  workingHours: [
    { days: { ru: "Понедельник — пятница", kk: "Дүйсенбі — жұма" }, value: "09:00–19:00" },
    { days: { ru: "Суббота", kk: "Сенбі" }, value: "10:00–18:00" },
    { days: { ru: "Воскресенье", kk: "Жексенбі" }, value: { ru: "Выходной", kk: "Демалыс" } },
  ],
  rating: 5.0,
  reviewsCount: 278,
  nominee: "2026",
  licenseNumber: "24016326",
  licenseVerified: false,
  licenseIssuer: "Департамент Комитета медицинского и фармацевтического контроля МЗ РК",
  licenseTodo: "TODO: запросить скан и подтвердить принадлежность ABI Dent. В открытой карточке номер расположен внутри рекламы One Dent.",
  instagram: "abi_dental.krg",
  twoGisLink: "https://go.2gis.com/G8aph",
  twoGisCanonical: "https://2gis.kz/karaganda/firm/70000001051682226",
  accessibility: true,
  services,
  promotions: [
    { title: "Севоран: первый час бесплатно", dates: "TODO: проверить актуальность", status: "unverified" as const },
    { title: "Брекеты 1+1 — 100 000 ₸", dates: "01.04.2026–30.10.2026", status: "unverified" as const },
  ],
};

export const doctors = [
  { specialty: { ru: "Стоматолог-ортопед", kk: "Стоматолог-ортопед" }, initials: "01" },
  { specialty: { ru: "Стоматолог-хирург · имплантолог", kk: "Стоматолог-хирург · имплантолог" }, initials: "02" },
  { specialty: { ru: "Стоматолог-пародонтолог", kk: "Стоматолог-пародонтолог" }, initials: "03" },
];

export const galleryCases = [
  { title: { ru: "Реставрация передних зубов", kk: "Алдыңғы тістерді қалпына келтіру" }, before: "/images/smile-1-before.webp", after: "/images/smile-1-after.webp" },
  { title: { ru: "Профессиональная гигиена", kk: "Кәсіби гигиена" }, before: "/images/smile-2-before.webp", after: "/images/smile-2-after.webp" },
  { title: { ru: "Протезирование коронками", kk: "Коронкалармен протездеу" }, before: "/images/smile-3-before.webp", after: "/images/smile-3-after.webp" },
];

export const treatmentOptions = services.map((service) => ({ id: service.slug, name: service.short }));

export function localize(value: Localized, locale: Locale) {
  return value[locale];
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function serviceHref(slug: string, locale: Locale) {
  return locale === "kk" ? `/kk/services/${slug}` : `/services/${slug}`;
}
