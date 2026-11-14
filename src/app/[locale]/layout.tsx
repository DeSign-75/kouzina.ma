import { Cairo, Fraunces, IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "../globals.css";
import { Providers } from "@/components/Providers";
import { AppChrome } from "@/components/AppChrome";
import { isRTL, locales, type Locale } from "@/i18n/dictionaries";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "كوزينة · KOUZINA — شنو نطيب اليوم؟",
  description:
    "كوزينة كتعاونك تختار شنو تطيب كل نهار: وصفات مغربية، أثمنة بالدرهم، ووقت الطياب.",
  applicationName: "KOUZINA",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "KOUZINA" },
};

export const viewport: Viewport = {
  themeColor: "#FBF4E6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (locales.includes(raw as Locale) ? raw : "ar") as Locale;
  const dir = isRTL(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${plexArabic.variable} ${fraunces.variable} ${jakarta.variable}`}
    >
      <body className="antialiased">
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}
