
import { Link } from "react-router-dom";
import { Star, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span className="text-xl font-serif">Ewige Erinnerung</span>
            </div>
            <p className="text-sm text-primary-foreground/80 max-w-xs">
              Bewahren Sie die Erinnerung an Ihre Liebsten mit unseren einzigartigen QR-Code Glasplatten - eine würdevolle Verbindung zu besonderen Momenten.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Kontakt</h3>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@ewige-erinnerung.ch</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+41 123 456 789</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="hover:underline">Startseite</Link>
              <Link to="/gedenken" className="hover:underline">Gedenken erstellen</Link>
              <Link to="/ueber" className="hover:underline">Über uns</Link>
              <Link to="/kontakt" className="hover:underline">Kontakt</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <p className="text-sm text-primary-foreground/80">
              Abonnieren Sie unseren Newsletter für Neuigkeiten und Updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Ihre E-Mail" 
                className="px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent-foreground w-full"
              />
              <button className="bg-accent text-accent-foreground px-4 py-2 rounded-r-md hover:bg-accent/90 transition-colors">
                Senden
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/70">
            &copy; {new Date().getFullYear()} Ewige Erinnerung. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/datenschutz" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
              Datenschutz
            </Link>
            <Link to="/agb" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
              AGB
            </Link>
            <Link to="/impressum" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
