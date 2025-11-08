import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";
import MemoraLogo from "@/components/MemoraLogo";
import { useContent } from "@/contexts/ContentContext";

const Footer = () => {
  const { sharedContent } = useContent();
  const { footer: f, navigation: nav } = sharedContent;
  const year = new Date().getFullYear();

  const facebookUrl = "https://www.facebook.com/people/Memora-Moments-Schweiz/61583456910281/#";

  // TikTok SVG Icon-Komponente
  const TikTokIcon = ({ className }: { className?: string }) => (
     <svg 
       className={className} 
       viewBox="0 0 24 24" 
       fill="currentColor" 
       xmlns="http://www.w3.org/2000/svg"
     >
       <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.65 4.32 1.7.02 1.3.01 2.6-.02 3.91-.15 2.59-1.23 4.98-3.2 6.77-1.96 1.79-4.35 2.67-6.91 2.7-1.31.02-2.61.01-3.91.02-.08-1.53-.63-3.09-1.75-4.17-1.12-1.11-2.7-1.65-4.32-1.7-.02-1.3-.01-2.6.02-3.91.15-2.59 1.23-4.98 3.2-6.77C5.18 3.86 7.57 3 10.13 2.9c1.31-.02 2.61-.01 3.91-.02h.01c.32.01.63.02.93.03zM10 15.21c.53 0 .93-.01 1.4-.02-1.4-2.12-2.8-4.25-4.2-6.37-.15-.33-.29-.67-.43-1-.03.35-.07.69-.1 1.04.02 1.3.01 2.6-.02 3.91.15 2.59 1.23 4.98 3.2 6.77.1-.09.19-.18.28-.27.08.08.16.16.25.24.01.01.01.01.02.01z" />
     </svg>
  );

  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity"
            >
              <MemoraLogo className="w-8 h-8 flex-shrink-0 align-middle" />
              <span className="font-serif text-xl font-medium leading-none align-middle relative" style={{ top: "2px" }}>
                {f.brand.name}
              </span>
            </Link>

            <p className="text-muted-foreground mt-4">
              {f.brand.description}
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{f.contactTitle}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@memora.moments.ch" className="hover:underline">
                  info@memora.moments.ch
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+41794075699" className="hover:underline">
                  +41 79 407 56 99
                </a>
              </li>
              <li className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-primary" />
                  <a
                    href="https://www.instagram.com/memoramoments.ch/"
                    target="_blank" // Öffnet in neuem Tab
                    rel="noopener noreferrer" // Sicherheit für externe Links
                    className="hover:underline"
                  >
                    @Memora Moments Schweiz
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Facebook className="w-5 h-5 text-primary" />
                  <a
                    href={facebookUrl} // Verwende die Variable hier
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @memora-moments 
                  </a>
                </li>
                {/* --- TikTok Link --- */}
                <li className="flex items-center gap-3">
                  <TikTokIcon className="w-5 h-5 text-primary" />
                  <a
                    href="https://www.tiktok.com/@memora.moments.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @memora.moments.ch
                  </a>
                </li>
              </ul>
            </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{f.linksTitle}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:underline">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link to="/gedenken" className="hover:underline">
                  {nav.gedenken}
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
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            © {year} {f.brand.name}. {f.copyright}
          </span>
          <div className="flex items-center gap-6">
            <Link to="/datenschutz" className="hover:underline">
              {f.legal.privacy}
            </Link>
            <Link to="/agb" className="hover:underline">
              {f.legal.terms}
            </Link>
            <Link to="/impressum" className="hover:underline">
              {f.legal.imprint}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;