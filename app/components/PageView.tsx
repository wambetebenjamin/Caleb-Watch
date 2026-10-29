"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/app/lib/i18n";

type PageKey = "home" | "hazards" | "relays" | "drills" | "templates" | "regions" | "join" | "about" | "method" | "contact" | "privacy" | "terms" | "group";

const hazardsByLocale = {
  en: [
    { id: "flood", icon: "fa-water", name: "Flooding", intro: "Heavy rain, overflowing rivers and blocked drainage can make routes unsafe quickly.", action: "Move to higher ground when advised. Keep away from rivers, drains and moving water. Never walk or drive through floodwater. Check on neighbours only from a safe place.", sign: "Local signs: fast-rising water, overflowing drains, blocked culverts or official alerts.", photo: "/images/flooded-burundi.jpg", alt: "A small lakeside shelter partly surrounded by floodwater in Burundi" },
    { id: "drought", icon: "fa-sun", name: "Drought and water stress", intro: "Long dry periods can affect household water, crops, livestock, health and school routines.", action: "Follow local water and public-health guidance. Agree on safe water points, protect stored water and share verified information about support. Avoid unsafe wells and unverified treatments.", sign: "Local signs: drying water sources, unusual crop stress, longer water queues or official notices.", photo: "/images/namibia-dryland.jpg", alt: "Arid grassland and distinct hills in Namibia beneath a soft sky" },
    { id: "disease", icon: "fa-heartbeat", name: "Disease outbreak", intro: "Illness can spread quickly when people cannot get clear, trusted health information.", action: "Use updates from national and county health authorities. Encourage handwashing and safe water practices. Refer people who feel unwell to qualified local health services. Do not forward unverified claims or identify patients.", sign: "Local signs: a health authority advisory, unusual illness reports or a request from a health worker.", photo: "/images/community-meeting.jpg", alt: "Community members gathered together outdoors" },
    { id: "wind", icon: "fa-cloud", name: "Wind and storms", intro: "Strong winds and storms can damage roofs, trees, power lines and exposed routes.", action: "Secure loose items before conditions worsen. Follow local shelter or evacuation instructions. Stay clear of damaged power lines, unstable walls and large trees during strong winds.", sign: "Local signs: official weather alerts, fast-changing skies or strong gusts that affect trees and roofs.", photo: "/images/rainy-village.jpg", alt: "A child walks on a wet village path during rain" }
  ],
  sw: [
    { id: "flood", icon: "fa-water", name: "Mafuriko", intro: "Mvua kubwa, mito kufurika na mifereji kuziba vinaweza kufanya njia kuwa hatari haraka.", action: "Nenda sehemu ya juu unapoelekezwa. Kaa mbali na mito, mifereji na maji yanayotembea. Usitembee wala kuendesha gari kwenye maji ya mafuriko. Wasaidie majirani ukiwa sehemu salama.", sign: "Dalili: maji kupanda haraka, mifereji kufurika au tahadhari rasmi.", photo: "/images/flooded-burundi.jpg", alt: "Makazi madogo kandokando ya ziwa yaliyozungukwa kwa sehemu na maji" },
    { id: "drought", icon: "fa-sun", name: "Ukame na upungufu wa maji", intro: "Vipindi virefu vya ukame vinaweza kuathiri maji ya nyumbani, mazao, mifugo na shule.", action: "Fuata ushauri wa maji na afya ya eneo lako. Kubalianeni kuhusu vyanzo salama, hifadhi maji vizuri na shiriki taarifa zilizothibitishwa kuhusu msaada.", sign: "Dalili: vyanzo vya maji kukauka, mazao kunyauka au foleni ndefu za maji.", photo: "/images/namibia-dryland.jpg", alt: "Mandhari kame ya nyasi na vilima chini ya mawingu" },
    { id: "disease", icon: "fa-heartbeat", name: "Mlipuko wa ugonjwa", intro: "Ugonjwa unaweza kuenea haraka bila taarifa wazi na zinazoaminika za afya.", action: "Tumia taarifa za mamlaka za afya za kitaifa na kaunti. Himiza kunawa mikono na matumizi salama ya maji. Elekeza wagonjwa kwa huduma za afya zilizoidhinishwa. Usisambaze uvumi.", sign: "Dalili: tangazo la mamlaka ya afya au maelekezo kutoka kwa mhudumu wa afya.", photo: "/images/community-meeting.jpg", alt: "Wanajamii wamekusanyika nje" },
    { id: "wind", icon: "fa-cloud", name: "Upepo na dhoruba", intro: "Upepo mkali unaweza kuharibu paa, miti, nyaya za umeme na njia za wazi.", action: "Funga vitu visivyobana kabla hali haijawa mbaya. Fuata maelekezo ya kujisitiri au kuhama. Kaa mbali na nyaya zilizoharibika, kuta zisizo imara na miti mikubwa.", sign: "Dalili: tahadhari rasmi ya hali ya hewa, mawingu kubadilika haraka au upepo mkali.", photo: "/images/rainy-village.jpg", alt: "Njia ya kijijini yenye mvua" }
  ],
  fr: [
    { id: "flood", icon: "fa-water", name: "Inondation", intro: "Les fortes pluies, les rivières en crue et les caniveaux bouchés peuvent rendre les routes dangereuses rapidement.", action: "Rejoignez un terrain plus élevé si les autorités le demandent. Éloignez-vous des rivières, caniveaux et eaux en mouvement. Ne traversez jamais une zone inondée à pied ou en voiture.", sign: "Signes locaux : montée rapide des eaux, caniveaux débordants ou alerte officielle.", photo: "/images/flooded-burundi.jpg", alt: "Un abri au bord d’un lac partiellement entouré par les eaux" },
    { id: "drought", icon: "fa-sun", name: "Sécheresse et manque d’eau", intro: "Les longues périodes sèches peuvent affecter l’eau des ménages, les cultures, le bétail et les écoles.", action: "Suivez les conseils locaux sur l’eau et la santé publique. Repérez les points d’eau sûrs, protégez l’eau stockée et partagez les informations vérifiées sur l’aide.", sign: "Signes locaux : sources qui s’assèchent, cultures sous stress ou longues files d’attente.", photo: "/images/namibia-dryland.jpg", alt: "Paysage aride et collines sous un ciel doux en Namibie" },
    { id: "disease", icon: "fa-heartbeat", name: "Épidémie", intro: "La maladie peut se propager rapidement si les informations sanitaires fiables manquent.", action: "Suivez les communications des autorités sanitaires. Encouragez le lavage des mains et l’usage sûr de l’eau. Orientez les personnes malades vers des services de santé qualifiés. Ne relayez pas les rumeurs.", sign: "Signes locaux : avis sanitaire ou consigne d’un professionnel de santé.", photo: "/images/community-meeting.jpg", alt: "Des membres de la communauté réunis en plein air" },
    { id: "wind", icon: "fa-cloud", name: "Vent et tempête", intro: "Les vents violents et les tempêtes peuvent endommager les toits, les arbres et les voies exposées.", action: "Attachez les objets mobiles avant l’aggravation des conditions. Suivez les consignes d’abri ou d’évacuation. Éloignez-vous des lignes électriques tombées et des structures fragiles.", sign: "Signes locaux : alerte météo, ciel changeant ou rafales fortes.", photo: "/images/rainy-village.jpg", alt: "Un enfant marche sur un chemin de village sous la pluie" }
  ]
};

const relaySteps = [
  { icon: "fa-bullhorn", title: "1. Receive", body: "Choose trusted sources in advance: local authorities, health teams, school leaders and official national alert channels." },
  { icon: "fa-check-circle", title: "2. Check", body: "Confirm the source, location, time and requested action. If details are uncertain, say so and check before forwarding." },
  { icon: "fa-share-alt", title: "3. Relay", body: "Send one short message through the agreed phone tree, WhatsApp group or notice point. Include a next update time." },
  { icon: "fa-users", title: "4. Confirm", body: "Ask each relay lead to acknowledge receipt. Share accessibly, check on people who may need support and report gaps." }
];
const relayStepsSw = [
  { icon: "fa-bullhorn", title: "1. Pokea", body: "Chagueni vyanzo vya kuaminika mapema: mamlaka za eneo, wahudumu wa afya, viongozi wa shule na njia rasmi za tahadhari." },
  { icon: "fa-check-circle", title: "2. Hakiki", body: "Thibitisha chanzo, mahali, muda na hatua inayohitajika. Maelezo yasipojulikana, sema hivyo na uyahakiki." },
  { icon: "fa-share-alt", title: "3. Sambaza", body: "Tuma ujumbe mmoja mfupi kupitia mnyororo wa simu, WhatsApp au sehemu ya matangazo. Taja muda wa taarifa inayofuata." },
  { icon: "fa-users", title: "4. Thibitisha", body: "Omba kila kiongozi athibitishe kupokea. Shiriki kwa njia inayofikika na tambua watu wanaohitaji msaada." }
];
const relayStepsFr = [
  { icon: "fa-bullhorn", title: "1. Recevoir", body: "Choisissez à l’avance des sources fiables : autorités locales, équipes de santé, responsables d’école et alertes officielles." },
  { icon: "fa-check-circle", title: "2. Vérifier", body: "Confirmez la source, le lieu, l’heure et l’action demandée. Si un détail est incertain, vérifiez avant de transmettre." },
  { icon: "fa-share-alt", title: "3. Relayer", body: "Envoyez un message bref par la chaîne téléphonique, le groupe WhatsApp ou le panneau convenu. Indiquez la prochaine mise à jour." },
  { icon: "fa-users", title: "4. Confirmer", body: "Demandez aux relais de confirmer la réception. Vérifiez les besoins d’accessibilité et signalez les lacunes." }
];

const regions = [
  { country: "Kenya", hazard: "River flooding, drought and intense urban rainfall", prep: "Map safe routes that avoid river crossings. Agree on water-saving practices and use Kenya Meteorological Department and county guidance." },
  { country: "Uganda", hazard: "Lake and river flooding, heavy rain and slope risks", prep: "Identify high ground, safe school routes and trusted local radio or authority channels before heavy rain." },
  { country: "Tanzania", hazard: "Heavy rainfall, coastal storm impacts and dry spells", prep: "Include coastal and inland needs in plans. Follow Tanzania Meteorological Authority and district communications." },
  { country: "Rwanda and Burundi", hazard: "Heavy rain, flooding and steep-slope hazards", prep: "Keep routes away from unstable slopes and waterways. Use official district and national instructions." },
  { country: "Malawi", hazard: "Flooding near rivers and lakes, dry spells and strong winds", prep: "Plan for safe movement, school continuity and household water needs with district civil-protection information." },
  { country: "Mozambique", hazard: "Coastal storms, cyclones and river flooding", prep: "Know official evacuation directions and safe shelters. Share only confirmed updates from national and local authorities." }
];

const templateItems = [
  { id: "flood-alert", icon: "fa-water", title: "Flood safety message", type: "Community message", file: "/downloads/flood-safety-message.txt", text: "Heavy rain is affecting [local area]. Move away from rivers and floodwater. Do not cross flooded roads. Follow the latest instructions from local authorities. Check on neighbours from a safe place. Next update: [time]." },
  { id: "all-clear", icon: "fa-check-circle", title: "Verified all-clear update", type: "Follow-up message", file: "/downloads/all-clear-update.txt", text: "Update for [local area], [date and time]. [Named authority or trusted source] has shared that [specific area or route] is [status]. This is not an all-clear for other locations. Continue to follow official instructions. Next update: [time or source]." },
  { id: "meeting", icon: "fa-calendar", title: "Community check-in invitation", type: "Meeting notice", file: "/downloads/community-check-in.txt", text: "Community preparedness check-in. Date: [date]. Time: [time]. Place: [accessible meeting point]. We will confirm relay leads, safe meeting places and next drill steps. Bring questions. Contact: [local group contact]." },
  { id: "poster", icon: "fa-file-alt", title: "Preparedness notice poster", type: "Print handout", file: "/downloads/community-poster.html", text: "SEE EARLY. ACT TOGETHER. Know your trusted source. Know your safe route. Share only verified information. Check on neighbours safely. Always follow official alerts and local authorities." }
];

function Picture({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return <div className={`cw-photo ${className}`}><Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" /></div>;
}

function Intro({ page }: { page: PageKey }) {
  const { t } = useLocale();
  return <section className="cw-page-intro"><div className="container"><div className="row"><div className="col-lg-9"><div className="section-tittle animated fadeIn"><span className="cw-eyebrow">{page === "home" ? "COMMUNITY EARLY WARNING" : "CALEB WATCH FIELD GUIDE"}</span><h1>{t.pageTitles[page] ?? t.homeTitle}</h1><p>{t.pageIntros[page] ?? t.homeIntro}</p></div></div></div></div></section>;
}

function HomePage() {
  const { t } = useLocale();
  const featuredHazards = hazardsByLocale.en;
  return <main id="main-content">
    <section className="trending-area fix cw-home-hero"><div className="container"><div className="trending-main">
      <div className="row"><div className="col-lg-12"><div className="trending-tittle"><strong>FIELD NOTE</strong><div className="trending-animated"><p className="cw-ticker-copy">A simple relay can help a school, church or neighbourhood act sooner.</p></div></div></div></div>
      <div className="row">
        <div className="col-lg-8"><div className="trending-top mb-30"><div className="trend-top-img cw-home-feature animated fadeIn">
          <Picture src="/images/school-community.jpg" alt="An adult stands with a large group of school children outside a rural school" priority />
          <div className="trend-top-cap"><span className="color3">{t.tagline}</span><h2>{t.homeTitle}</h2><p>{t.homeIntro}</p><div className="cw-hero-actions"><Link className="cw-template-button" href="/join">{t.joinGroup}</Link><Link className="cw-hero-text-link" href="/hazards">{t.seeHazards} <span aria-hidden="true">›</span></Link></div></div>
        </div></div></div>
        <div className="col-lg-4"><aside className="cw-hero-side"><div className="cw-side-heading"><span className="cw-eyebrow">START HERE</span><h2>{t.sectionHow}</h2><p>{t.howIntro}</p></div>
          <div className="cw-side-link"><span className="cw-side-number">01</span><div><strong>Know your local risks</strong><p>Start with a hazard that affects your place and season.</p></div><Link href="/hazards" aria-label="Explore hazards">›</Link></div>
          <div className="cw-side-link"><span className="cw-side-number">02</span><div><strong>Choose the relay leads</strong><p>Agree who receives, checks and shares a message.</p></div><Link href="/relays" aria-label="Set up a relay">›</Link></div>
          <div className="cw-side-link"><span className="cw-side-number">03</span><div><strong>Practice the next step</strong><p>Run a short drill before a warning is urgent.</p></div><Link href="/drills" aria-label="Plan a drill">›</Link></div>
        </aside></div>
      </div>
    </div></div></section>

    <section className="weekly-news-area pt-50 cw-section"><div className="container"><div className="section-tittle mb-30"><span className="cw-eyebrow">A PRACTICAL START</span><h3>Why local early warning matters</h3><p>Warnings work best when people understand what they mean for their own street, school or gathering place. A small trusted network can turn clear information into a safer next step.</p></div>
      <div className="row cw-principles"><div className="col-lg-4 col-md-6"><article className="cw-principle"><span className="fas fa-bell" aria-hidden="true"/><h4>Trust is local</h4><p>People are more likely to act when a message comes through someone they know and trust.</p></article></div><div className="col-lg-4 col-md-6"><article className="cw-principle"><span className="fas fa-comment-alt" aria-hidden="true"/><h4>Clarity saves time</h4><p>Who is affected, where to go, what to do and when to check again should be easy to find.</p></article></div><div className="col-lg-4 col-md-6"><article className="cw-principle"><span className="fas fa-hands-helping" aria-hidden="true"/><h4>Practice makes it familiar</h4><p>Short, inclusive drills reveal gaps while there is still time to improve the plan.</p></article></div></div>
    </div></section>

    <section className="weekly-news-area pt-50 cw-section cw-hazard-preview"><div className="container"><div className="section-tittle mb-30"><span className="cw-eyebrow">PREPAREDNESS BASICS</span><h3>Featured hazards</h3><p>Start with simple, practical actions. Always check current information from official local sources.</p></div><div className="row">
      {featuredHazards.map((hazard, index) => <div className="col-lg-3 col-md-6" key={hazard.id}><article className="single-bottom mb-35 cw-hazard-card"><Link href={`/hazards#${hazard.id}`}><div className="trend-bottom-img mb-30"><Picture src={hazard.photo} alt={hazard.alt} className="cw-card-image" /></div><div className="trend-bottom-cap"><span className={`color${index === 0 ? "3" : index === 1 ? "2" : "1"}`}>{hazard.name}</span><h4>{hazard.intro}</h4><span className="cw-read-link">{t.readPrimer} <span aria-hidden="true">›</span></span></div></Link></article></div>)}
    </div></div></section>

    <section className="weekly-news-area pt-50 cw-section cw-how-section"><div className="container"><div className="row align-items-center"><div className="col-lg-5"><Picture src="/images/community-gathering.jpg" alt="Community members meet under a tree in a village setting" className="cw-how-photo" /></div><div className="col-lg-7"><div className="section-tittle cw-how-copy"><span className="cw-eyebrow">A RELAY IN FOUR STEPS</span><h3>{t.sectionHow}</h3><p>{t.howIntro}</p><ol className="cw-four-steps"><li><strong>Listen</strong><span>Receive a message from a source your group trusts.</span></li><li><strong>Check</strong><span>Confirm place, time and requested action.</span></li><li><strong>Share</strong><span>Send the same clear message through your agreed channels.</span></li><li><strong>Follow up</strong><span>Confirm who received it and when the next update comes.</span></li></ol><Link className="cw-template-button" href="/relays">See relay templates</Link></div></div></div></div></section>

    <section className="cw-home-cta"><div className="container"><div className="row align-items-center"><div className="col-lg-8"><span className="cw-eyebrow">MAKE A PLAN THAT FITS YOUR PLACE</span><h2>Preparedness grows one trusted connection at a time.</h2><p>Gather your group, choose a first step and practice it together.</p></div><div className="col-lg-4 cw-cta-actions"><Link href="/join" className="cw-template-button">{t.joinGroup}</Link><Link href="/templates" className="cw-cta-secondary">Browse templates</Link></div></div></div></section>
  </main>;
}

function HazardsPage() {
  const { locale, t } = useLocale();
  const hazards = hazardsByLocale[locale];
  return <main id="main-content"><Intro page="hazards"/><section className="cw-section"><div className="container"><div className="row">
    {hazards.map((hazard, index) => <div className="col-lg-6" key={hazard.id}><article className="cw-hazard-detail" id={hazard.id}><Picture src={hazard.photo} alt={hazard.alt} className="cw-detail-photo"/><div className="cw-hazard-detail-copy"><div className="cw-hazard-heading"><span className="cw-hazard-icon"><span className={`fas ${hazard.icon}`} aria-hidden="true"/></span><div><span className={`color${index === 0 ? "3" : index === 1 ? "2" : "1"} cw-hazard-tag`}>0{index + 1}</span><h2>{hazard.name}</h2></div></div><p>{hazard.intro}</p><h3>{t.localAction}</h3><p>{hazard.action}</p><p className="cw-local-sign"><strong>Watch for:</strong> {hazard.sign}</p></div></article></div>)}
  </div><p className="cw-source-note"><span className="fas fa-info-circle" aria-hidden="true"/> {t.sourceNote}</p><div className="cw-authority-note"><strong>Always follow official alerts.</strong><p>These primers do not replace instructions from government, emergency services or qualified health professionals. Do not enter dangerous areas to verify a report.</p></div></div></section></main>;
}

function RelaysPage() {
  const { locale } = useLocale();
  const steps = locale === "sw" ? relayStepsSw : locale === "fr" ? relayStepsFr : relaySteps;
  const templates = [
    { title: locale === "sw" ? "Mnyororo wa simu" : locale === "fr" ? "Chaîne téléphonique" : "Phone tree", body: locale === "sw" ? "Gawanya majirani katika vikundi vidogo. Kila kiongozi awasiliane na watu wachache, kisha athibitishe ujumbe umefika." : locale === "fr" ? "Répartissez les personnes en petits groupes. Chaque relais contacte quelques personnes puis confirme la réception." : "Break neighbours into small groups. Each relay lead contacts a few people and confirms the message arrived." },
    { title: "WhatsApp", body: locale === "sw" ? "Tumia kikundi kilichokubaliwa, ujumbe mfupi na msimamizi mmoja wa taarifa. Weka ujumbe muhimu kwa maandishi pia." : locale === "fr" ? "Utilisez un groupe convenu, un message court et une personne chargée des mises à jour. Gardez aussi le message important à l’écrit." : "Use an agreed group, short messages and one update lead. Keep important instructions in text as well as audio." },
    { title: locale === "sw" ? "Ubao wa matangazo" : locale === "fr" ? "Panneau d’information" : "Notice point", body: locale === "sw" ? "Chagueni sehemu yenye kivuli na inayofikika. Weka tarehe na muda kwenye kila karatasi, na ondoa taarifa zilizopitwa na wakati." : locale === "fr" ? "Choisissez un lieu accessible et abrité. Datez chaque avis et retirez les informations périmées." : "Choose a sheltered, accessible place. Date every notice and remove information that is out of date." }
  ];
  return <main id="main-content"><Intro page="relays"/><section className="cw-section"><div className="container"><div className="cw-relay-notice"><span className="fas fa-info-circle" aria-hidden="true"/><p>{locale === "sw" ? "Mawasiliano ya dharura yapangwe pamoja na njia za mamlaka rasmi. Mnyororo wa jamii haupaswi kuchelewesha huduma za dharura." : locale === "fr" ? "Un relais communautaire complète les voies officielles et ne doit jamais retarder les services d’urgence." : "A community relay complements official channels. It must never delay emergency services or replace national alerts."}</p></div><div className="row cw-relay-steps">{steps.map((step) => <div className="col-lg-3 col-md-6" key={step.title}><article className="cw-step-card"><span className={`fas ${step.icon}`} aria-hidden="true"/><h2>{step.title}</h2><p>{step.body}</p></article></div>)}</div>
    <div className="section-tittle mb-30 cw-subheading"><span className="cw-eyebrow">CHOOSE A CHANNEL THAT WORKS</span><h3>{locale === "sw" ? "Chaguzi za kawaida" : locale === "fr" ? "Options simples" : "Simple relay options"}</h3></div><div className="row">{templates.map((item, index) => <div className="col-lg-4" key={item.title}><article className="cw-channel-card"><span className={`cw-channel-index color${index === 0 ? "3" : index === 1 ? "2" : "1"}`}>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article></div>)}</div>
    <div className="cw-message-structure"><div><span className="cw-eyebrow">MESSAGE CHECK</span><h3>Five details to include</h3><p>Keep the wording short and repeatable. Read it once before sharing.</p></div><ol><li>Source and date</li><li>Location affected</li><li>Action to take now</li><li>Who may need extra support</li><li>Where or when the next update comes</li></ol></div><Link href="/templates" className="cw-template-button">Use a message template</Link></div></section></main>;
}

const drillItems = [
  "Choose one hazard and one realistic scenario with local leaders.",
  "Tell participants the exercise start and finish time. Do not use a real emergency number or alarm without permission.",
  "Confirm an accessible route, safe meeting point and alternate route.",
  "Assign a lead, sweep role, attendance checker and communication contact.",
  "Include learners and people who may need extra time, support or a different message format.",
  "Practice the signal, movement and headcount without running or putting anyone at risk.",
  "Review what worked, what was unclear and who will update the plan."
];
const drillItemsSw = ["Chagueni hatari moja na hali ya mazoezi pamoja na viongozi wa eneo.", "Wajulishe washiriki muda wa kuanza na kumaliza. Msitumie namba ya dharura au kengele bila ruhusa.", "Thibitisheni njia inayofikika, sehemu salama ya kukutana na njia mbadala.", "Teueni kiongozi, msaidizi wa mwisho, mkaguzi wa mahudhurio na mwasiliani.", "Jumuisheni wanafunzi na watu wanaoweza kuhitaji muda au msaada zaidi.", "Fanyeni mazoezi ya ishara, mwendo na kuhesabu watu bila kukimbia au kuhatarisha mtu.", "Jadili kilichofanya kazi na nani atasasisha mpango." ];
const drillItemsFr = ["Choisissez un risque et un scénario réaliste avec les responsables locaux.", "Indiquez les heures de début et de fin. N’utilisez pas de numéro d’urgence ni d’alarme réelle sans autorisation.", "Confirmez un itinéraire accessible, un point de rencontre sûr et une option de rechange.", "Désignez un responsable, une personne en fin de groupe, un contrôleur de présence et un contact.", "Incluez les élèves et les personnes qui peuvent avoir besoin de temps ou d’aide supplémentaire.", "Répétez le signal, le déplacement et le comptage sans courir ni mettre quelqu’un en danger.", "Faites le bilan et désignez la personne qui mettra le plan à jour."];

function DrillChecklist() {
  const { locale, t } = useLocale();
  const [checked, setChecked] = useState<boolean[]>(Array(7).fill(false));
  const items = locale === "sw" ? drillItemsSw : locale === "fr" ? drillItemsFr : drillItems;
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = localStorage.getItem("caleb-watch-drill-checklist");
      if (saved) {
        try { const parsed = JSON.parse(saved) as boolean[]; if (parsed.length === 7) setChecked(parsed); } catch { localStorage.removeItem("caleb-watch-drill-checklist"); }
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const toggle = (index: number) => setChecked((current) => {
    const next = current.map((value, position) => position === index ? !value : value);
    localStorage.setItem("caleb-watch-drill-checklist", JSON.stringify(next));
    return next;
  });
  return <div className="cw-checklist"><p>{t.checklistLabel}</p><ul>{items.map((item, index) => <li key={item}><label><input type="checkbox" checked={checked[index]} onChange={() => toggle(index)}/><span>{item}</span></label></li>)}</ul><button className="cw-reset-checklist" type="button" onClick={() => { setChecked(Array(7).fill(false)); localStorage.removeItem("caleb-watch-drill-checklist"); }}>Reset checklist</button></div>;
}

function DrillsPage() {
  const { locale } = useLocale();
  return <main id="main-content"><Intro page="drills"/><section className="cw-section"><div className="container"><div className="row"><div className="col-lg-7"><div className="section-tittle"><span className="cw-eyebrow">SCHOOL AND CHURCH DRILL</span><h3>{locale === "sw" ? "Orodha ya maandalizi" : locale === "fr" ? "Liste de préparation" : "Before the drill"}</h3><p>{locale === "sw" ? "Panga mazoezi na uongozi wa shule au kanisa na washirika wa eneo." : locale === "fr" ? "Planifiez l’exercice avec la direction de l’école ou de l’église et les partenaires locaux." : "Plan with school or church leadership and local partners. Keep the practice calm, inclusive and clearly identified as an exercise."}</p></div><DrillChecklist/></div><div className="col-lg-5"><aside className="cw-schedule-card"><span className="cw-eyebrow">SIMPLE RHYTHM</span><h3>One term, three check-ins</h3><ol><li><strong>Week 1</strong><span>Review contact tree and safe routes.</span></li><li><strong>Mid-term</strong><span>Run a short tabletop scenario.</span></li><li><strong>End of term</strong><span>Practice movement and gather feedback.</span></li></ol><p>Adapt timing to your school calendar, faith community and local guidance. Do not conduct a drill during a real emergency or severe weather.</p><button type="button" className="cw-print-button" onClick={() => window.print()}><span className="fas fa-print" aria-hidden="true"/> Print this checklist</button></aside></div></div></div></section></main>;
}

function SavedTemplateButton({ id }: { id: string }) {
  const { t } = useLocale();
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const list = JSON.parse(localStorage.getItem("caleb-watch-saved-templates") || "[]") as string[];
      setSaved(list.includes(id));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [id]);
  const toggle = () => {
    const list = JSON.parse(localStorage.getItem("caleb-watch-saved-templates") || "[]") as string[];
    const next = saved ? list.filter((item) => item !== id) : [...list, id];
    localStorage.setItem("caleb-watch-saved-templates", JSON.stringify(next));
    setSaved(!saved);
  };
  return <button className={`cw-save-button${saved ? " is-saved" : ""}`} type="button" onClick={toggle} aria-pressed={saved}><span className={`far ${saved ? "fa-bookmark" : "fa-bookmark"}`} aria-hidden="true"/> {saved ? t.saved : t.save}</button>;
}

function TemplatesPage() {
  const { locale } = useLocale();
  return <main id="main-content"><Intro page="templates"/><section className="cw-section"><div className="container"><div className="cw-template-note"><span className="fas fa-edit" aria-hidden="true"/><p>{locale === "sw" ? "Kabla ya kutuma, hakiki kila ujumbe na jaza maelezo ya eneo na muda. Usisambaze taarifa zisizothibitishwa." : locale === "fr" ? "Avant l’envoi, vérifiez chaque message et complétez les détails du lieu et de l’heure. Ne diffusez pas d’information non vérifiée." : "Before sending, verify every message and complete the local place and time details. Do not forward unverified information."}</p></div><div className="row">{templateItems.map((item, index) => <div className="col-lg-6" key={item.id}><article className="cw-template-card"><div className="cw-template-card-top"><span className={`cw-template-icon color${index === 0 ? "3" : index === 1 ? "2" : "1"}`}><span className={`fas ${item.icon}`} aria-hidden="true"/></span><div><span className="cw-template-type">{item.type}</span><h2>{item.title}</h2></div></div><p className="cw-template-preview">{item.text}</p><div className="cw-template-card-actions"><a className="cw-download-link" href={item.file} download><span className="fas fa-download" aria-hidden="true"/> Download</a><SavedTemplateButton id={item.id}/></div></article></div>)}</div><div className="cw-disclaimer cw-template-disclaimer"><strong>{locale === "sw" ? "Kumbuka" : locale === "fr" ? "À retenir" : "Remember"}</strong><p>{locale === "sw" ? "Violezo hivi havibadilishi tahadhari rasmi. Tumia lugha rahisi na inayofikika." : locale === "fr" ? "Ces modèles ne remplacent pas les alertes officielles. Utilisez un langage simple et accessible." : "Templates do not replace official alerts. Use clear, accessible language and identify the authority behind an update."}</p></div></div></section></main>;
}

function RegionsPage() {
  const { t } = useLocale();
  return <main id="main-content"><Intro page="regions"/><section className="cw-section"><div className="container"><div className="row">{regions.map((region, index) => <div className="col-lg-4 col-md-6" key={region.country}><article className="cw-region-card"><span className={`cw-region-number color${index % 2 === 0 ? "3" : "2"}`}>{String(index + 1).padStart(2, "0")}</span><h2>{region.country}</h2><h3>{region.hazard}</h3><p>{region.prep}</p></article></div>)}</div><div className="cw-source-note"><span className="fas fa-info-circle" aria-hidden="true"/> {t.regionExamples} Consult the relevant national meteorological, disaster-management and health authorities for current information.</div><Picture src="/images/namibia-dryland.jpg" alt="Arid grassland and hills in Namibia beneath a soft sky" className="cw-region-landscape"/></div></section></main>;
}

function JoinForm() {
  const { locale, t } = useLocale();
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  useEffect(() => {
    if (!siteKey) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return () => script.remove();
  }, [siteKey]);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setPending(true);
    setStatus("");
    const form = new FormData(event.currentTarget);
    const registration = {
      groupName: String(form.get("groupName") || "").trim(),
      groupType: String(form.get("groupType") || ""),
      country: String(form.get("country") || "").trim(),
      county: String(form.get("county") || "").trim(),
      contactName: String(form.get("contactName") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      language: locale,
      consent: form.get("consent") === "on",
      createdAt: new Date().toISOString()
    };
    try {
      if (siteKey) {
        if (!window.grecaptcha) throw new Error("Security verification is still loading. Please try again in a moment.");
        const token = await new Promise<string>((resolve, reject) => window.grecaptcha!.ready(() => window.grecaptcha!.execute(siteKey, { action: "community_join" }).then(resolve).catch(reject)));
        const response = await fetch("/api/join", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...registration, token }) });
        const result = await response.json() as { error?: string; persisted?: boolean };
        if (!response.ok) throw new Error(result.error || "We could not submit this registration. Please contact us on WhatsApp.");
        if (!result.persisted) localStorage.setItem("caleb-watch-local-registration", JSON.stringify(registration));
        setStatus(result.persisted ? (locale === "sw" ? "Asante. Kikundi chako kimesajiliwa." : locale === "fr" ? "Merci. Votre groupe est inscrit." : "Thank you. Your group registration has been received.") : (locale === "sw" ? "Maelezo yamehifadhiwa kwenye kivinjari hiki pekee." : locale === "fr" ? "Les informations sont enregistrées dans ce navigateur uniquement." : "Your details are saved in this browser only."));
      } else {
        localStorage.setItem("caleb-watch-local-registration", JSON.stringify(registration));
        setStatus(locale === "sw" ? "Maelezo yamehifadhiwa kwenye kivinjari hiki. Wasiliana nasi kwa WhatsApp ili tuweze kufuatilia." : locale === "fr" ? "Les informations sont enregistrées dans ce navigateur. Contactez-nous sur WhatsApp pour un suivi." : "Your details are saved in this browser only. Contact us on WhatsApp for follow-up.");
      }
      formElement.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to complete registration.");
    } finally {
      setPending(false);
    }
  };
  const label = locale === "sw" ? { group: "Jina la kikundi", type: "Aina ya kikundi", country: "Nchi", county: "Kaunti au wilaya", contact: "Jina la mwasiliani", email: "Barua pepe", phone: "Simu ya WhatsApp", consent: "Ninakubali kuwasiliana nami kuhusu kikundi hiki.", submit: "Sajili kikundi" } : locale === "fr" ? { group: "Nom du groupe", type: "Type de groupe", country: "Pays", county: "Comté ou district", contact: "Nom du contact", email: "Adresse e-mail", phone: "Téléphone WhatsApp", consent: "J’accepte d’être contacté au sujet de ce groupe.", submit: "Inscrire le groupe" } : { group: "Group or school name", type: "Group type", country: "Country", county: "County or district", contact: "Contact person", email: "Email address", phone: "WhatsApp phone number", consent: "I agree to be contacted about this community group.", submit: "Register this group" };
  return <form className="cw-join-form" onSubmit={submit}>
    <div className="row"><div className="col-md-6 form-group"><label htmlFor="groupName">{label.group} *</label><input id="groupName" className="form-control" name="groupName" required maxLength={100}/></div><div className="col-md-6 form-group"><label htmlFor="groupType">{label.type} *</label><select id="groupType" className="form-control" name="groupType" required defaultValue=""><option value="" disabled>Select one</option><option>School</option><option>Church or faith group</option><option>Neighbourhood group</option><option>Community organisation</option></select></div><div className="col-md-6 form-group"><label htmlFor="country">{label.country} *</label><select id="country" className="form-control" name="country" required defaultValue="Kenya"><option>Kenya</option><option>Uganda</option><option>Tanzania</option><option>Rwanda</option><option>Burundi</option><option>Malawi</option><option>Mozambique</option><option>Other</option></select></div><div className="col-md-6 form-group"><label htmlFor="county">{label.county} *</label><input id="county" className="form-control" name="county" required maxLength={100}/></div><div className="col-md-6 form-group"><label htmlFor="contactName">{label.contact} *</label><input id="contactName" className="form-control" name="contactName" required maxLength={100}/></div><div className="col-md-6 form-group"><label htmlFor="email">{label.email} *</label><input id="email" className="form-control" name="email" type="email" required maxLength={150}/></div><div className="col-md-6 form-group"><label htmlFor="phone">{label.phone} *</label><input id="phone" className="form-control" name="phone" type="tel" required maxLength={24}/><small className="cw-field-hint">Include your country calling code, for example +254.</small></div><div className="col-12 form-group"><label className="cw-consent-label"><input type="checkbox" name="consent" required/><span>{label.consent} *</span></label></div></div>
    <p className="cw-local-storage-note"><span className="fas fa-lock" aria-hidden="true"/> {t.formLocalNotice}</p><button type="submit" disabled={pending} className="cw-template-button">{pending ? "Sending..." : label.submit}</button>{status && <p className="cw-form-status" role="status">{status}</p>}
  </form>;
}

function JoinPage() {
  return <main id="main-content"><Intro page="join"/><section className="cw-section"><div className="container"><div className="row"><div className="col-lg-7"><div className="section-tittle"><span className="cw-eyebrow">A SMALL FIRST STEP</span><h3>Tell us how to reach your group</h3><p>Share one group contact who has agreed to coordinate. Do not include details about children or anyone needing assistance in this form.</p></div><JoinForm/></div><div className="col-lg-5"><aside className="cw-join-aside"><Picture src="/images/community-meeting.jpg" alt="Community members sit together during a village meeting" className="cw-join-photo"/><h3>What happens next?</h3><ol><li>Keep a copy of your group contact and safety plan.</li><li>Choose one hazard to discuss at your first check-in.</li><li>Contact Caleb Watch if you would like help finding a suitable template.</li></ol><a className="cw-contact-link" href="https://wa.me/254112272061" target="_blank" rel="noreferrer"><span className="fab fa-whatsapp" aria-hidden="true"/> +254 112 272 061</a></aside></div></div></div></section></main>;
}

function RegionPage() { return <RegionsPage/>; }

function GroupPage() {
  const { t } = useLocale();
  const [note, setNote] = useState("");
  const [savedMessage, setSavedMessage] = useState(false);
  const [savedTemplates, setSavedTemplates] = useState<string[]>([]);
  const [registrationSummary, setRegistrationSummary] = useState("No group registration saved on this device.");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setNote(localStorage.getItem("caleb-watch-group-notes") || "");
      try {
        const saved = JSON.parse(localStorage.getItem("caleb-watch-saved-templates") || "[]") as string[];
        setSavedTemplates(saved.filter((id): id is string => typeof id === "string"));
      } catch {
        localStorage.removeItem("caleb-watch-saved-templates");
      }
      try {
        const record = localStorage.getItem("caleb-watch-local-registration");
        if (record) {
          const group = JSON.parse(record) as { groupName?: string; country?: string };
          setRegistrationSummary(`${group.groupName || "Community group"}${group.country ? `, ${group.country}` : ""} is saved on this device.`);
        }
      } catch {
        localStorage.removeItem("caleb-watch-local-registration");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const saveNotes = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("caleb-watch-group-notes", note);
    setSavedMessage(true);
    window.setTimeout(() => setSavedMessage(false), 3000);
  };
  const byId = new Map(templateItems.map((item) => [item.id, item]));
  return <main id="main-content"><Intro page="group"/><section className="cw-section"><div className="container"><div className="row"><div className="col-lg-7"><div className="cw-notes-card"><h2>{t.nav.group}</h2><p>{t.notesIntro}</p><form onSubmit={saveNotes}><label htmlFor="group-notes">Group notes</label><p id="group-notes-help" className="cw-field-hint">{t.notePlaceholder}</p><textarea id="group-notes" aria-describedby="group-notes-help" value={note} onChange={(event) => setNote(event.target.value)} maxLength={3000}/><div className="cw-note-actions"><button type="submit" className="cw-template-button">{t.saveNotes}</button>{savedMessage && <span role="status">{t.notesSaved}</span>}</div></form><p className="cw-note-limit"><span className="fas fa-lock" aria-hidden="true"/> Stored only in this browser, not encrypted or synced.</p></div></div><div className="col-lg-5"><aside className="cw-saved-card"><span className="cw-eyebrow">QUICK ACCESS</span><h2>{t.saved} templates</h2>{savedTemplates.length ? <ul>{savedTemplates.map((id) => { const item = byId.get(id); return item ? <li key={id}><Link href="/templates">{item.title} <span aria-hidden="true">›</span></Link></li> : null; })}</ul> : <p>No templates saved on this device yet. Save one from the templates page.</p>}<Link href="/templates" className="cw-cta-secondary">Browse templates</Link><div className="cw-local-registration"><strong>Group registration</strong><p>{registrationSummary}</p></div></aside></div></div></div></section></main>;
}

function AboutPage() {
  const { locale } = useLocale();
  return <main id="main-content"><Intro page="about"/><section className="cw-section"><div className="container"><div className="row align-items-center"><div className="col-lg-6"><Picture src="/images/community-gathering.jpg" alt="Community members meet outdoors in a village" className="cw-about-photo"/></div><div className="col-lg-6"><div className="section-tittle"><span className="cw-eyebrow">SEE EARLY. ACT TOGETHER.</span><h3>Local readiness is built through shared practice.</h3><p>Caleb Watch offers practical tools for community early-warning relays, preparedness drills and information sharing. The goal is not to replace public services. It is to help local groups make a clear plan for receiving, checking and sharing information.</p><p>Schools, churches, neighbourhood groups and community organisations can adapt these resources to local language, access needs and official guidance.</p><p>{locale === "sw" ? "Tunaamini maandalizi bora ni ya vitendo, jumuishi na yanayoongozwa na maarifa ya eneo." : locale === "fr" ? "Nous croyons qu’une bonne préparation est pratique, inclusive et guidée par le savoir local." : "We believe good preparedness is practical, inclusive and guided by local knowledge."}</p></div></div></div></div></section></main>;
}

function MethodPage() {
  const principles = ["Use official alerts and trusted local sources", "Keep messages brief, dated and specific", "Make plans accessible to different needs", "Practice in a calm, low-risk setting", "Review and update roles after every drill"];
  return <main id="main-content"><Intro page="method"/><section className="cw-section"><div className="container"><div className="cw-method-layout"><div className="cw-method-copy"><span className="cw-eyebrow">OUR APPROACH</span><h2>Useful guidance without false certainty</h2><p>Caleb Watch content is designed to support local preparedness, not to forecast hazards or issue alerts. The materials describe common preparedness actions and encourage people to follow their national authorities and local leaders.</p><p>Examples are general. Conditions, services and safe actions vary between places. Groups should review plans with local emergency, health, education and community leadership.</p></div><div className="cw-method-list"><h3>What guides our work</h3><ol>{principles.map((principle, i) => <li key={principle}><span>{String(i + 1).padStart(2, "0")}</span>{principle}</li>)}</ol></div></div><div className="cw-authority-note"><strong>We do not publish live warnings.</strong><p>There are no sensor feeds, incident maps or operational alerts on Caleb Watch. For urgent help, contact local emergency services and follow official instructions.</p></div></div></section></main>;
}

function ContactPage() {
  const { locale } = useLocale();
  return <main id="main-content"><Intro page="contact"/><section className="cw-section"><div className="container"><div className="row"><div className="col-lg-7"><div className="cw-contact-card"><span className="cw-eyebrow">WE ARE LISTENING</span><h2>{locale === "sw" ? "Shiriki swali au maoni" : locale === "fr" ? "Partagez une question ou un retour" : "Share a question or feedback"}</h2><p>{locale === "sw" ? "Kwa usaidizi wa haraka, ujumbe wa WhatsApp ndio njia rahisi." : locale === "fr" ? "Pour obtenir une réponse plus rapide, écrivez-nous sur WhatsApp." : "For a quicker reply, send us a WhatsApp message. Please do not share sensitive personal information."}</p><a className="cw-template-button" href="https://wa.me/254112272061" target="_blank" rel="noreferrer"><span className="fab fa-whatsapp" aria-hidden="true"/> Message +254 112 272 061</a><p className="cw-contact-email">WhatsApp is our direct contact route.</p></div></div><div className="col-lg-5"><aside className="cw-contact-aside"><h3>Contact safely</h3><p>For immediate danger or a medical emergency, use your local emergency services. Caleb Watch is not an emergency response provider.</p><p>For health questions, contact qualified health professionals or your national health authority.</p></aside></div></div></div></section></main>;
}

function LegalPage({ page }: { page: "privacy" | "terms" }) {
  const isPrivacy = page === "privacy";
  return <main id="main-content"><Intro page={page}/><section className="cw-section"><div className="container"><article className="cw-legal-copy">{isPrivacy ? <><h2>Information this site uses</h2><p>Caleb Watch stores your language preference and cookie choice in browser local storage. Saved templates, group notes, drill checklist progress and any local-only group registration remain on the device and are not sent to us.</p><h2>Group registration</h2><p>When a secure registration service is configured, the join form uses Google reCAPTCHA to reduce automated submissions. If the form is operating in local-only mode, entered details stay in this browser. Do not submit sensitive information or details about children.</p><h2>Cookies and storage</h2><p>The required preference key is <code>caleb-watch-cookie-consent</code>. The site does not use advertising cookies. Browser storage can be cleared through your browser settings.</p><h2>Your choices</h2><p>You can remove saved items and notes in your browser, clear local storage, or contact us to ask a question about privacy. Contact us through the WhatsApp number listed on this site.</p><h2>Third-party services</h2><p>WhatsApp links open WhatsApp. Google reCAPTCHA may process technical information when enabled. Those services have their own privacy practices.</p></> : <><h2>Community preparedness information only</h2><p>Caleb Watch is not an official government warning service, emergency service, meteorological agency or health authority. Our materials are general educational information and are not a substitute for official instructions or professional advice.</p><h2>Follow official instructions</h2><p>Always follow national alerts, local authorities and qualified health professionals. In an emergency, contact local emergency services. Never take an unsafe action to verify a report.</p><h2>No guarantee</h2><p>We make no guarantee of coverage, completeness, accuracy, availability or suitability for a specific situation. Examples can become outdated or may not apply to your location.</p><h2>Use and sharing</h2><p>You may adapt the provided checklists and messages for non-commercial community preparedness. Verify all details and sources before sharing. You are responsible for decisions made using these materials.</p><h2>Changes</h2><p>Content and materials may be updated as we receive corrections. Continued use means you accept the current version of these terms.</p></>}</article></div></section></main>;
}

function NotFoundPage() {
  return <main id="main-content"><section className="cw-page-intro"><div className="container"><div className="section-tittle"><span className="cw-eyebrow">CALEB WATCH</span><h1>That page is not here.</h1><p>Use the site menu to find a hazard guide, relay plan or community template.</p><Link href="/" className="cw-template-button">Go to home</Link></div></div></section></main>;
}

export default function PageView({ page }: { page: string }) {
  const valid = ["home", "hazards", "relays", "drills", "templates", "regions", "join", "about", "method", "contact", "privacy", "terms", "group"];
  if (!valid.includes(page)) return <NotFoundPage/>;
  switch (page as PageKey) {
    case "home": return <HomePage/>;
    case "hazards": return <HazardsPage/>;
    case "relays": return <RelaysPage/>;
    case "drills": return <DrillsPage/>;
    case "templates": return <TemplatesPage/>;
    case "regions": return <RegionPage/>;
    case "join": return <JoinPage/>;
    case "about": return <AboutPage/>;
    case "method": return <MethodPage/>;
    case "contact": return <ContactPage/>;
    case "privacy": return <LegalPage page="privacy"/>;
    case "terms": return <LegalPage page="terms"/>;
    case "group": return <GroupPage/>;
    default: return <NotFoundPage/>;
  }
}

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}
