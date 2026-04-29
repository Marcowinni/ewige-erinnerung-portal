import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X } from "lucide-react";
import Cookies from "js-cookie";
import { initGA, logPageView } from "@/lib/analytics";
import { useContent } from "@/contexts/ContentContext";

const COOKIE_NAME = "memora-cookie-consent";

const CookieConsentBanner = () => {
  const { sharedContent } = useContent();
  const t = sharedContent.cookieBanner;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      // Mount briefly delayed to avoid layout shift on first paint
      const id = window.setTimeout(() => setOpen(true), 600);
      return () => window.clearTimeout(id);
    }
  }, []);

  const persist = (value: "true" | "false") => {
    Cookies.set(COOKIE_NAME, value, { expires: 150, sameSite: "lax" });
  };

  const handleAccept = () => {
    persist("true");
    initGA();
    logPageView();
    setOpen(false);
  };

  const handleDecline = () => {
    persist("false");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="memora-cookie-banner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-x-3 bottom-3 z-[300] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-[420px]"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
        >
          <div className="memorial-card relative rounded-2xl border border-memorial-line bg-[hsl(var(--memorial-canvas))] p-5 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <button
              type="button"
              onClick={handleDecline}
              aria-label={t.decline}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-memorial-ink-soft transition-colors hover:bg-memorial-line/60 hover:text-memorial-ink"
            >
              <X className="h-4 w-4" strokeWidth={1.6} />
            </button>

            <div className="flex items-start gap-3 pr-6">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-memorial-bronze/15 text-memorial-bronze-deep">
                <Cookie className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <p
                  id="cookie-banner-title"
                  className="font-display text-[17px] leading-snug text-memorial-ink"
                >
                  {t.title ?? "Cookies"}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-memorial-ink-soft">
                  {t.text}{" "}
                  <Link
                    to="/datenschutz"
                    className="text-memorial-bronze-deep underline-offset-2 hover:underline"
                  >
                    {t.learnMore}
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleDecline}
                className="memorial-cta memorial-cta-ghost inline-flex items-center justify-center rounded-full px-5 py-2 text-[13px] font-medium"
              >
                {t.decline}
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="memorial-cta memorial-cta-primary inline-flex items-center justify-center rounded-full px-5 py-2 text-[13px] font-medium"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
