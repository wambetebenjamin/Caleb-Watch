import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageView from "@/app/components/PageView";

const pages = ["hazards", "relays", "drills", "templates", "regions", "join", "about", "method", "contact", "privacy", "terms", "group"] as const;
type Slug = (typeof pages)[number];
const titles: Record<Slug, string> = {
  hazards: "Hazards", relays: "Community relays", drills: "Preparedness drills", templates: "Community templates", regions: "Regional preparedness", join: "Join a community watch", about: "About Caleb Watch", method: "Our method", contact: "Contact", privacy: "Privacy", terms: "Terms of use", group: "My group"
};

export function generateStaticParams() {
  return pages.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!pages.includes(slug as Slug)) return { title: "Page not found" };
  return { title: titles[slug as Slug] };
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pages.includes(slug as Slug)) notFound();
  return <PageView page={slug}/>;
}
