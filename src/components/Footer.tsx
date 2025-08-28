
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MemoraLogo from "@/components/MemoraLogo";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MemoraLogo className="w-8 h-8" />
              <span className="text-xl font-serif">{t('brand.name')}</span>
            </div>
            <p className="text-sm text-primary-foreground/80 max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('footer.contact')}</h3>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@memora-moments.ch</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+41 123 456 789</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('footer.links')}</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="hover:underline">{t('nav.home')}</Link>
              <Link to="/gedenken" className="hover:underline">{t('nav.create')}</Link>
              <Link to="/ueber" className="hover:underline">{t('nav.about')}</Link>
              <Link to="/kontakt" className="hover:underline">{t('nav.contact')}</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/70">
            &copy; {new Date().getFullYear()} {t('brand.name')}. {t('footer.copyright')}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/datenschutz" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
              {t('footer.privacy')}
            </Link>
            <Link to="/agb" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
              {t('footer.terms')}
            </Link>
            <Link to="/impressum" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
              {t('footer.imprint')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
