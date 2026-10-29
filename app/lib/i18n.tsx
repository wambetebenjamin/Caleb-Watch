"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "sw" | "fr";

type Words = {
  nav: Record<string, string>;
  tagline: string;
  notice: string;
  voice: string;
  stopVoice: string;
  language: string;
  more: string;
  join: string;
  footerAbout: string;
  disclaimerTitle: string;
  disclaimer: string;
  cookieTitle: string;
  cookieText: string;
  accept: string;
  reject: string;
  saved: string;
  save: string;
  unsave: string;
  homeTitle: string;
  homeIntro: string;
  seeHazards: string;
  joinGroup: string;
  readPrimer: string;
  pageTitles: Record<string, string>;
  pageIntros: Record<string, string>;
  sectionHow: string;
  howIntro: string;
  localAction: string;
  sourceNote: string;
  waLabel: string;
  regionExamples: string;
  formLocalNotice: string;
  notesSaved: string;
  notesIntro: string;
  notePlaceholder: string;
  saveNotes: string;
  checklistLabel: string;
};

export const words: Record<Locale, Words> = {
  en: {
    nav: { home: "Home", hazards: "Hazards", relays: "Relays", drills: "Drills", templates: "Templates", regions: "Regions", join: "Join", about: "About", method: "Method", contact: "Contact", privacy: "Privacy", terms: "Terms", group: "My group" },
    tagline: "See early. Act together.",
    notice: "Preparedness starts with people who know one another.",
    voice: "Listen to a short tour",
    stopVoice: "Stop voice tour",
    language: "Language",
    more: "More",
    join: "Join the watch",
    footerAbout: "Simple tools for community early-warning relays, preparedness drills and information sharing so schools, churches and local groups can act before crisis deepens.",
    disclaimerTitle: "Important note",
    disclaimer: "Community preparedness information only. Not an official government warning service or meteorological agency. Always follow national alerts and local authorities. No guarantee of coverage or accuracy.",
    cookieTitle: "Your privacy matters",
    cookieText: "This site uses one essential preference to remember your cookie choice and local tools to keep saved templates and group notes on this device.",
    accept: "Allow essential storage",
    reject: "No thanks",
    saved: "Saved",
    save: "Save template",
    unsave: "Remove saved template",
    homeTitle: "A clear message can change what happens next.",
    homeIntro: "Simple tools for neighbours, schools, churches and local groups to share trusted information, prepare together and act before a crisis deepens.",
    seeHazards: "Explore hazard guides",
    joinGroup: "Set up a community watch",
    readPrimer: "Read the primer",
    pageTitles: {
      hazards: "Know the risks around you", relays: "A reliable relay starts with a simple plan", drills: "Practice builds calm, confident action", templates: "Ready-to-use words for the moments that matter", regions: "Local risks, shared learning", join: "Start a community watch", about: "Preparedness belongs to everyone", method: "Practical guidance, grounded in local action", contact: "Talk with Caleb Watch", privacy: "Privacy", terms: "Terms of use", group: "My group notes"
    },
    pageIntros: {
      hazards: "Four common hazards, clear first steps and local actions that help people prepare without spreading fear.", relays: "Set up a phone tree or notice system that still works when signal, power or time is limited.", drills: "Use short, repeatable drills to make routes, roles and safe meeting points familiar before they are needed.", templates: "Adapt and share these simple messages and checklists with your group. Save useful templates on this device.", regions: "Examples from East and Southern Africa show why local context matters. Follow the guidance of your own authorities.", join: "Bring neighbours, a school, church or local group together around a simple plan for sharing information and helping one another.", about: "Caleb Watch helps communities make practical plans, share information clearly and practice before emergencies happen.", method: "We turn common preparedness principles into small, accessible steps that community groups can adapt to their context.", contact: "Have a question, a correction or a community example to share? We would be glad to hear from you.", privacy: "We collect as little as possible. Your saved templates and notes stay in your browser unless you choose to send a group registration.", terms: "Use these materials as general preparedness support, alongside current official advice and local knowledge.", group: "Keep a few important roles, contacts and next steps together on this device. Do not store sensitive personal information here."
    },
    sectionHow: "How a relay works",
    howIntro: "A relay turns a warning into a shared next step, one trusted connection at a time.",
    localAction: "Local action",
    sourceNote: "Use this guide as a starting point and adapt it with local authorities and community leaders.",
    waLabel: "Message Caleb Watch on WhatsApp",
    regionExamples: "Examples are illustrative, not forecasts. Risk varies by place, season and local conditions.",
    formLocalNotice: "Your group details are stored only in this browser until a secure registration service is configured. For immediate follow-up, contact us on WhatsApp.",
    notesSaved: "Notes saved on this device.",
    notesIntro: "This private note pad is stored in this browser only. Avoid names, medical details or other sensitive information.",
    notePlaceholder: "Next meeting, roles to confirm, local safe place...",
    saveNotes: "Save my notes",
    checklistLabel: "Mark each action as your group completes it. Progress stays on this device."
  },
  sw: {
    nav: { home: "Nyumbani", hazards: "Hatari", relays: "Mawasiliano", drills: "Mazoezi", templates: "Violezo", regions: "Maeneo", join: "Jiunge", about: "Kuhusu", method: "Mbinu", contact: "Wasiliana", privacy: "Faragha", terms: "Masharti", group: "Kikundi changu" },
    tagline: "Ona mapema. Chukua hatua pamoja.", notice: "Maandalizi huanza kwa watu wanaofahamiana.", voice: "Sikiliza maelezo mafupi", stopVoice: "Simamisha sauti", language: "Lugha", more: "Zaidi", join: "Jiunge na uangalizi", footerAbout: "Zana rahisi za mawasiliano ya tahadhari ya mapema, mazoezi ya maandalizi na kushirikiana taarifa ili shule, makanisa na vikundi vya jamii vichukue hatua kabla hali haijawa mbaya.", disclaimerTitle: "Taarifa muhimu", disclaimer: "Taarifa za maandalizi ya jamii pekee. Hii si huduma rasmi ya tahadhari ya serikali au wakala wa hali ya hewa. Fuata tahadhari za kitaifa na mamlaka za eneo lako. Hakuna hakikisho la upatikanaji au usahihi.", cookieTitle: "Faragha yako ni muhimu", cookieText: "Tovuti hii hutumia kipengele muhimu kukumbuka chaguo lako la vidakuzi. Violezo na dokezo la kikundi huhifadhiwa kwenye kifaa hiki.", accept: "Ruhusu hifadhi muhimu", reject: "La, asante", saved: "Imehifadhiwa", save: "Hifadhi kiolezo", unsave: "Ondoa kiolezo", homeTitle: "Ujumbe ulio wazi unaweza kubadili kinachofuata.", homeIntro: "Zana rahisi kwa majirani, shule, makanisa na vikundi vya eneo kushiriki taarifa zinazoaminika, kujiandaa pamoja na kuchukua hatua mapema.", seeHazards: "Tazama miongozo ya hatari", joinGroup: "Anzisha uangalizi wa jamii", readPrimer: "Soma mwongozo", pageTitles: { hazards: "Fahamu hatari zilizo karibu nawe", relays: "Mawasiliano ya kuaminika huanza kwa mpango rahisi", drills: "Mazoezi huleta hatua tulivu na za uhakika", templates: "Maneno tayari kwa nyakati muhimu", regions: "Hatari za eneo, mafunzo ya pamoja", join: "Anzisha uangalizi wa jamii", about: "Maandalizi ni ya kila mtu", method: "Mwongozo wa vitendo unaoanzia eneo lako", contact: "Wasiliana na Caleb Watch", privacy: "Faragha", terms: "Masharti ya matumizi", group: "Dokezo la kikundi changu" }, pageIntros: { hazards: "Hatari nne za kawaida, hatua za kwanza zilizo wazi na vitendo vya eneo vinavyosaidia kujiandaa bila kueneza hofu.", relays: "Anzisha mnyororo wa simu au mfumo wa matangazo unaoweza kufanya kazi hata mtandao au umeme ukikatika.", drills: "Tumia mazoezi mafupi na ya kurudiwa ili njia, majukumu na sehemu salama ya kukutana zijulikane.", templates: "Badilisha na ushiriki ujumbe na orodha hizi rahisi na kikundi chako.", regions: "Mifano kutoka Afrika Mashariki na Kusini inaonyesha umuhimu wa mazingira ya eneo. Fuata mamlaka za nchi yako.", join: "Unganisha majirani, shule, kanisa au kikundi cha eneo kupitia mpango rahisi wa kushiriki taarifa na kusaidiana.", about: "Caleb Watch husaidia jamii kupanga kwa vitendo, kushiriki taarifa wazi na kufanya mazoezi kabla ya dharura.", method: "Tunabadilisha kanuni za maandalizi kuwa hatua ndogo zinazoweza kurekebishwa na vikundi vya jamii.", contact: "Una swali, marekebisho au mfano wa jamii? Tungependa kusikia kutoka kwako.", privacy: "Tunakusanya taarifa chache iwezekanavyo. Violezo na madokezo hubaki kwenye kivinjari chako.", terms: "Tumia nyenzo hizi kama msaada wa jumla sambamba na ushauri rasmi na maarifa ya eneo.", group: "Weka majukumu muhimu, mawasiliano na hatua zinazofuata pamoja kwenye kifaa hiki. Usiweke taarifa nyeti." }, sectionHow: "Jinsi mawasiliano yanavyofanya kazi", howIntro: "Mawasiliano hubadilisha tahadhari kuwa hatua ya pamoja kupitia uhusiano mmoja unaoaminika kwa wakati.", localAction: "Hatua za eneo", sourceNote: "Tumia mwongozo huu kama mwanzo na uubadilishe pamoja na mamlaka na viongozi wa jamii.", waLabel: "Tuma ujumbe Caleb Watch kwa WhatsApp", regionExamples: "Mifano ni ya kuelimisha, si utabiri. Hatari hutofautiana kulingana na eneo na msimu.", formLocalNotice: "Maelezo ya kikundi huhifadhiwa kwenye kivinjari hiki tu hadi huduma salama ya usajili iwekwe. Wasiliana nasi kwa WhatsApp.", notesSaved: "Madokezo yamehifadhiwa kwenye kifaa hiki.", notesIntro: "Dokezo hili huhifadhiwa kwenye kivinjari hiki pekee. Epuka majina na taarifa nyeti.", notePlaceholder: "Mkutano ujao, majukumu ya kuthibitisha, sehemu salama...", saveNotes: "Hifadhi madokezo", checklistLabel: "Weka alama kadri kikundi kinavyokamilisha hatua. Maendeleo hubaki kwenye kifaa hiki." },
  fr: {
    nav: { home: "Accueil", hazards: "Risques", relays: "Relais", drills: "Exercices", templates: "Modèles", regions: "Régions", join: "Participer", about: "À propos", method: "Méthode", contact: "Contact", privacy: "Confidentialité", terms: "Conditions", group: "Mon groupe" },
    tagline: "Voir tôt. Agir ensemble.", notice: "La préparation commence entre personnes qui se connaissent.", voice: "Écouter une courte présentation", stopVoice: "Arrêter la présentation", language: "Langue", more: "Plus", join: "Rejoindre la veille", footerAbout: "Des outils simples pour les relais d’alerte communautaires, les exercices de préparation et le partage d’informations afin que les écoles, les églises et les groupes locaux puissent agir avant que la crise ne s’aggrave.", disclaimerTitle: "Information importante", disclaimer: "Informations de préparation communautaire uniquement. Ceci n’est pas un service officiel d’alerte gouvernemental ni une agence météorologique. Suivez toujours les alertes nationales et les autorités locales. Aucune garantie de couverture ou d’exactitude.", cookieTitle: "Votre vie privée compte", cookieText: "Ce site utilise une préférence essentielle pour mémoriser votre choix de cookies. Les modèles enregistrés et les notes restent sur cet appareil.", accept: "Autoriser le stockage essentiel", reject: "Non merci", saved: "Enregistré", save: "Enregistrer le modèle", unsave: "Retirer le modèle", homeTitle: "Un message clair peut changer la suite.", homeIntro: "Des outils simples pour que les voisins, les écoles, les églises et les groupes locaux partagent des informations fiables, se préparent ensemble et agissent tôt.", seeHazards: "Voir les guides des risques", joinGroup: "Créer une veille communautaire", readPrimer: "Lire le guide", pageTitles: { hazards: "Connaître les risques autour de vous", relays: "Un relais fiable commence par un plan simple", drills: "La pratique renforce une action calme et sûre", templates: "Des messages prêts pour les moments importants", regions: "Risques locaux, apprentissage partagé", join: "Créer une veille communautaire", about: "La préparation concerne tout le monde", method: "Des conseils pratiques ancrés dans l’action locale", contact: "Contacter Caleb Watch", privacy: "Confidentialité", terms: "Conditions d’utilisation", group: "Notes de mon groupe" }, pageIntros: { hazards: "Quatre risques fréquents, des premiers gestes clairs et des actions locales pour se préparer sans propager la peur.", relays: "Créez une chaîne téléphonique ou un système d’affichage qui fonctionne même avec peu de réseau ou d’électricité.", drills: "Des exercices courts et réguliers rendent les itinéraires, les rôles et les lieux sûrs familiers.", templates: "Adaptez et partagez ces messages et listes simples avec votre groupe.", regions: "Des exemples d’Afrique de l’Est et australe montrent l’importance du contexte local. Suivez les autorités de votre pays.", join: "Rassemblez voisins, école, église ou groupe local autour d’un plan simple de partage d’information et d’entraide.", about: "Caleb Watch aide les communautés à planifier concrètement, à partager clairement et à s’exercer avant une urgence.", method: "Nous transformons les principes de préparation en petites étapes accessibles et adaptables.", contact: "Une question, une correction ou un exemple local à partager ? Nous serions heureux de vous lire.", privacy: "Nous recueillons le moins possible. Vos modèles et notes restent dans votre navigateur.", terms: "Utilisez ces ressources comme soutien général, avec les conseils officiels et les connaissances locales.", group: "Gardez les rôles importants, contacts et prochaines étapes sur cet appareil. N’y consignez rien de sensible." }, sectionHow: "Comment fonctionne un relais", howIntro: "Un relais transforme une alerte en action commune, un lien de confiance à la fois.", localAction: "Action locale", sourceNote: "Utilisez ce guide comme point de départ et adaptez-le avec les autorités et responsables locaux.", waLabel: "Écrire à Caleb Watch sur WhatsApp", regionExamples: "Ces exemples sont illustratifs, pas des prévisions. Les risques varient selon le lieu et la saison.", formLocalNotice: "Vos coordonnées restent dans ce navigateur jusqu’à la configuration d’un service sécurisé. Contactez-nous sur WhatsApp.", notesSaved: "Notes enregistrées sur cet appareil.", notesIntro: "Ces notes restent dans ce navigateur. Évitez les noms et les données sensibles.", notePlaceholder: "Prochaine réunion, rôles à confirmer, lieu sûr...", saveNotes: "Enregistrer mes notes", checklistLabel: "Cochez chaque action terminée. La progression reste sur cet appareil." }
};

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: Words };
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem("caleb-watch-language");
      if (stored === "sw" || stored === "fr" || stored === "en") setLocaleState(stored);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("caleb-watch-language", nextLocale);
    document.documentElement.lang = nextLocale;
  };
  const value = useMemo(() => ({ locale, setLocale, t: words[locale] }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
