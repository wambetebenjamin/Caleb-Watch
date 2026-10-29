import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteShell from "@/app/components/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "Caleb Watch | See early. Act together.",
    template: "%s | Caleb Watch",
  },
  description: "Simple community early-warning relays, preparedness drills and information sharing for schools, churches and local groups.",
  applicationName: "Caleb Watch",
  openGraph: {
    title: "Caleb Watch | See early. Act together.",
    description: "Simple tools for community preparedness, early-warning relays and shared action.",
    type: "website",
    locale: "en_KE",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

/* eslint @next/next/no-css-tags: off -- Serve the uploaded theme stylesheets directly so their original font paths and cascade remain unchanged. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <head>
      <link rel="stylesheet" href="/template/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="/template/css/owl.carousel.min.css"/>
      <link rel="stylesheet" href="/template/css/ticker-style.css"/>
      <link rel="stylesheet" href="/template/css/flaticon.css"/>
      <link rel="stylesheet" href="/template/css/slicknav.css"/>
      <link rel="stylesheet" href="/template/css/animate.min.css"/>
      <link rel="stylesheet" href="/template/css/magnific-popup.css"/>
      <link rel="stylesheet" href="/template/css/fontawesome-all.min.css"/>
      <link rel="stylesheet" href="/template/css/themify-icons.css"/>
      <link rel="stylesheet" href="/template/css/slick.css"/>
      <link rel="stylesheet" href="/template/css/nice-select.css"/>
      <link rel="stylesheet" href="/template/css/style.css"/>
      <link rel="stylesheet" href="/template/css/caleb-overrides.css"/>
    </head>
    <body><SiteShell>{children}</SiteShell></body>
  </html>;
}
