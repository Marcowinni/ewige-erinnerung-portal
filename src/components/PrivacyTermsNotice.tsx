import { Link } from "react-router-dom";
import { Info } from "lucide-react";

const PrivacyTermsNotice = () => {
  return (
    <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          Mit dem Hochladen von Bildern erklären Sie sich mit unseren{" "}
          <Link to="/datenschutz" className="text-primary hover:underline">
            Datenschutzrichtlinien
          </Link>{" "}
          und{" "}
          <Link to="/agb" className="text-primary hover:underline">
            Nutzungsbedingungen
          </Link>{" "}
          einverstanden.
        </p>
      </div>
    </div>
  );
};

export default PrivacyTermsNotice;