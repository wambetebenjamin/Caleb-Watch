import { NextResponse } from "next/server";

export const runtime = "nodejs";

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const registration = {
    group_name: text(body.groupName, 100),
    group_type: text(body.groupType, 60),
    country: text(body.country, 80),
    county: text(body.county, 100),
    contact_name: text(body.contactName, 100),
    email: text(body.email, 150).toLowerCase(),
    phone: text(body.phone, 24),
    language: text(body.language, 2),
    consent: body.consent === true,
  };
  if (!registration.group_name || !registration.country || !registration.county || !registration.contact_name || !registration.email || !registration.phone || !registration.consent) {
    return NextResponse.json({ error: "Complete all required fields and consent before submitting." }, { status: 400 });
  }
  const groupTypes = new Set(["School", "Church or faith group", "Neighbourhood group", "Community organisation"]);
  const countries = new Set(["Kenya", "Uganda", "Tanzania", "Rwanda", "Burundi", "Malawi", "Mozambique", "Other"]);
  if (!groupTypes.has(registration.group_type) || !countries.has(registration.country) || !["en", "sw", "fr"].includes(registration.language)) {
    return NextResponse.json({ error: "Choose a valid group type, country and language." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(registration.email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "Secure registration is not configured. Nothing was submitted. Contact the team on WhatsApp for follow-up." }, { status: 503 });
  const token = text(body.token, 4096);
  if (!token) return NextResponse.json({ error: "Complete the security check and try again." }, { status: 400 });

  const verificationBody = new URLSearchParams({ secret, response: token });
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwardedFor) verificationBody.set("remoteip", forwardedFor);
  let verification: { success?: boolean; score?: number; action?: string };
  try {
    const result = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verificationBody,
      cache: "no-store",
    });
    verification = await result.json() as typeof verification;
  } catch {
    return NextResponse.json({ error: "Security verification is temporarily unavailable. Please try again or contact us on WhatsApp." }, { status: 502 });
  }
  if (!verification.success || verification.action !== "community_join" || (verification.score ?? 0) < 0.5) {
    return NextResponse.json({ error: "Security verification could not be completed. Please try again." }, { status: 403 });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    try {
      const saved = await fetch(`${supabaseUrl}/rest/v1/caleb_watch_groups`, {
        method: "POST",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(registration),
        cache: "no-store",
      });
      if (!saved.ok) return NextResponse.json({ error: "We could not save this registration securely. Please try again or contact us on WhatsApp." }, { status: 502 });
      return NextResponse.json({ ok: true, persisted: true }, { status: 201 });
    } catch {
      return NextResponse.json({ error: "Secure storage is temporarily unavailable. Please try again or contact us on WhatsApp." }, { status: 502 });
    }
  }
  return NextResponse.json({ ok: true, persisted: false }, { status: 200 });
}
