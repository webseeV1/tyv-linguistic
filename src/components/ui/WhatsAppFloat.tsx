"use client";

import { whatsappLink } from "@/lib/site";
import { track } from "@/lib/analytics";
import { useI18n } from "@/i18n/useI18n";

export function WhatsAppFloat() {
  const { t } = useI18n();

  return (
    <a
      href={whatsappLink(t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.aria}
      onClick={() => track({ event: "cta_whatsapp" })}
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 active:scale-95"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.91-4.45 9.91-9.9C21.95 6.45 17.5 2 12.04 2Zm5.36 14.06c-.23.64-1.34 1.22-1.84 1.26-.47.05-.93.24-3.13-.65-2.64-1.04-4.32-3.74-4.45-3.92-.13-.18-1.07-1.43-1.07-2.72 0-1.29.68-1.93.92-2.19.24-.26.52-.32.7-.32h.5c.16 0 .38-.06.58.45.23.55.76 1.91.83 2.05.07.14.11.31.02.49-.36.74-.74.71-.5 1.12.92 1.58 1.84 2.13 3.27 2.85.24.12.39.1.54-.06.16-.18.62-.72.79-.97.16-.25.32-.21.54-.13.23.08 1.45.69 1.69.81.25.12.41.18.47.28.07.1.07.58-.16 1.22Z" />
      </svg>
    </a>
  );
}
