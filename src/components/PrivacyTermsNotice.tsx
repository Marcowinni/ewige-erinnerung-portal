import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const PrivacyTermsNotice = () => {
  // Holt die Texte aus dem Sprachmodul.
  // Das leere Objekt als Fallback stellt sicher, dass es nie zu einem Fehler kommt.
  const { uploaderCopy } = useContent().modeContent;
  const copy = uploaderCopy?.privacyNotice;

  // Zeigt nichts an, wenn die Texte nicht geladen werden konnten
  if (!copy) {
    return null;
  }
  
  return (
    <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          {copy.text}{" "}
          <Link to="/datenschutz" className="text-primary hover:underline">
            {copy.privacyLink}
          </Link>{" "}
          {copy.and}{" "}
          <Link to="/agb" className="text-primary hover:underline">
            {copy.termsLink}
          </Link>{" "}
          {copy.agreed}
        </p>
      </div>
    </div>
  );
};

export default PrivacyTermsNotice;