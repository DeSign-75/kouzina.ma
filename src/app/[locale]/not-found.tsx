import Link from "next/link";
import { LallaZohra } from "@/components/Mascot";

export default function NotFound() {
  return (
    <div className="page flex min-h-[70dvh] flex-col items-center justify-center text-center">
      <LallaZohra mood="sorry" className="h-40 w-40" />
      <h1 className="mt-4 text-[24px]">ما لقيناش هاد الصفحة</h1>
      <p className="mt-1.5 max-w-[300px] text-[13.5px] text-ink-soft">
        Page introuvable · Page not found
      </p>
      <Link href="/ar" className="btn btn-primary btn-sm mt-5 px-5">
        الرئيسية
      </Link>
    </div>
  );
}
