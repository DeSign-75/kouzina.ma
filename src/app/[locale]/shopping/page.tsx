import type { Metadata } from "next";
import { ShoppingScreen } from "@/components/ShoppingScreen";
import type { Locale } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "لائحة السوق · Liste de courses · Shopping list" };

export default async function ShoppingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ShoppingScreen locale={locale as Locale} />;
}
