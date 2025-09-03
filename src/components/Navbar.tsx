
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import MemoraLogo from "@/components/MemoraLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PetModeToggle from "@/components/PetModeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur shadow-md py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-primary hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center justify-center">
            <MemoraLogo className="w-8 h-8" />
          </div>
          <span className="font-serif text-xl font-medium leading-none">{t('brand.name')}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <PetModeToggle />
          <LanguageSwitcher />
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/gedenken" className="text-foreground hover:text-primary transition-colors">
            {t('nav.create')}
          </Link>
          <Link to="/ueber" className="text-foreground hover:text-primary transition-colors">
            {t('nav.about')}
          </Link>
          <Link to="/kontakt" className="text-foreground hover:text-primary transition-colors">
            {t('nav.contact')}
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t('nav.theme')}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button asChild className="bg-primary text-primary-foreground">
            <Link to="/gedenken?product=premium">{t('nav.start')}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-2">
          <PetModeToggle />
          <LanguageSwitcher />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t('nav.theme')}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg absolute top-full left-0 right-0 p-4 flex flex-col space-y-4 border-t">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/gedenken"
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.create')}
          </Link>
          <Link
            to="/ueber"
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.about')}
          </Link>
          <Link
            to="/kontakt"
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.contact')}
          </Link>
          <Button
            asChild
            className="bg-primary text-primary-foreground w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link to="/gedenken?product=premium">{t('nav.start')}</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
