import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import MemoraLogo from "@/components/MemoraLogo";
import { useContent } from "@/contexts/ContentContext";

const Footer = () => {
  const { sharedContent } = useContent();
  const { footer: f, navigation: nav } = sharedContent;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-memorial-line bg-[hsl(var(--memorial-canvas))] text-memorial-ink">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-memorial-ink hover:opacity-90 transition-opacity"
            >
              <MemoraLogo className="w-8 h-8 flex-shrink-0 align-middle" />
              <span className="font-display text-xl font-medium leading-none align-middle relative tracking-wide" style={{ top: "2px" }}>
                {f.brand.name}
              </span>
            </Link>

            <p className="text-memorial-ink-soft mt-4 leading-relaxed">
              {f.brand.description}
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-display text-xl mb-4 text-memorial-ink">{f.contactTitle}</h3>
            <ul className="space-y-3 text-sm text-memorial-ink-soft">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-memorial-bronze-deep" />
                <a href="mailto:info@memora.moments.ch" className="hover:underline">
                  info@memora.moments.ch
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-memorial-bronze-deep" />
                <a href="tel:+41794075699" className="hover:underline">
                  +41 79 407 56 99
                </a>
              </li>
              </ul>
            </div>

          {/* Links */}
          <div>
            <h3 className="font-display text-xl mb-4 text-memorial-ink">{f.linksTitle}</h3>
            <ul className="space-y-3 text-sm text-memorial-ink-soft">
              <li>
                <Link to="/" className="hover:underline">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link to="/erstellen" className="hover:underline">
                  {nav.create}
                </Link>
              </li>
              <li>
                <Link to="/ueber" className="hover:underline">
                  {nav.about}
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="hover:underline">
                  {nav.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-memorial-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-memorial-ink-soft">
          <span>
            © {year} {f.brand.name}. {f.copyright}
          </span>
          <div className="flex items-center gap-6">
            <Link to="/datenschutz" className="hover:text-memorial-ink transition-colors">
              {f.legal.privacy}
            </Link>
            <Link to="/agb" className="hover:text-memorial-ink transition-colors">
              {f.legal.terms}
            </Link>
            <Link to="/impressum" className="hover:text-memorial-ink transition-colors">
              {f.legal.imprint}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;