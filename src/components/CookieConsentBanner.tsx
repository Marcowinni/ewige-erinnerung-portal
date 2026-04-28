import CookieConsent from "react-cookie-consent";
import { initGA, logPageView } from "@/lib/analytics";
import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";

const CookieConsentBanner = () => {
  const { sharedContent } = useContent();
  const t = sharedContent.cookieBanner;

  const handleAccept = () => {
    initGA();
    logPageView(); // Loggt den ersten Seitenaufruf nach der Zustimmung
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText={t.accept}
      declineButtonText={t.decline}
      enableDeclineButton
      cookieName="memora-cookie-consent"
      style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))", borderTop: "1px solid hsl(var(--border))" }}
      buttonStyle={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", fontSize: "14px", borderRadius: "0.375rem", padding: "8px 16px" }}
      declineButtonStyle={{ background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))", fontSize: "14px", borderRadius: "0.375rem", padding: "8px 16px" }}
      expires={150}
      onAccept={handleAccept}
    >
      {t.text}{" "}
      <Link to="/datenschutz" className="underline hover:text-primary">
        {t.learnMore}
      </Link>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
