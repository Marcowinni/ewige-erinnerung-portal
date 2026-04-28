import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useContent } from "@/contexts/ContentContext";
import MemoraLogo from "@/components/MemoraLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  const { sharedContent } = useContent();
  const nav = sharedContent.navigation;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMenuOpen]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsMenuOpen(false);
  }, []);
  useEffect(() => {
    if (!isMenuOpen) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, onKeyDown]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(var(--memorial-canvas))]/90 backdrop-blur-md shadow-sm border-b border-memorial-line py-2"
          : "py-4"
      }`}
      role="navigation"
      aria-label="Hauptnavigation"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-2">
        <Link
          to="/"
          className="flex items-center gap-2 text-memorial-ink hover:opacity-90 transition-opacity min-w-0"
          onClick={closeMenu}
        >
          <MemoraLogo className="w-8 h-8 flex-shrink-0 align-middle" />
          <span
            className="font-display text-lg sm:text-xl font-medium leading-none align-middle relative tracking-wide"
            style={{ top: "2px" }}
          >
            {nav.home}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-5">
          <LanguageSwitcher />
          <Link to="/erstellen" className="text-memorial-ink hover:text-memorial-bronze-deep transition-colors text-sm">
            Erstellen
          </Link>
          <Link to="/ueber" className="text-memorial-ink hover:text-memorial-bronze-deep transition-colors text-sm">
            {nav.about}
          </Link>
          <Link to="/kontakt" className="text-memorial-ink hover:text-memorial-bronze-deep transition-colors text-sm">
            {nav.contact}
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Theme"
            title="Theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link
            to="/erstellen"
            className="memorial-cta memorial-cta-primary inline-flex items-center rounded-full px-5 py-2 text-sm font-medium"
          >
            {nav.start}
          </Link>
        </div>

        {/* Mobile Right-Side Controls */}
        <div className="flex items-center md:hidden space-x-1.5">
          <LanguageSwitcher />
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Theme"
            title="Theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeMenu}
            aria-hidden
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-[hsl(var(--memorial-canvas))] text-memorial-ink shadow-xl border-r border-memorial-line">
            <div className="p-4 flex items-center justify-between border-b border-memorial-line">
              <span className="font-display text-lg tracking-wide">{nav.home}</span>
              <Button variant="ghost" size="icon" onClick={closeMenu} aria-label="Schließen">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="p-4 flex flex-col space-y-2">
              <Link
                to="/"
                className="text-memorial-ink hover:text-memorial-bronze-deep transition-colors py-2"
                onClick={closeMenu}
              >
                {nav.home}
              </Link>
              <Link
                to="/erstellen"
                className="text-memorial-ink hover:text-memorial-bronze-deep transition-colors py-2"
                onClick={closeMenu}
              >
                Erstellen
              </Link>
              <Link
                to="/ueber"
                className="text-memorial-ink hover:text-memorial-bronze-deep transition-colors py-2"
                onClick={closeMenu}
              >
                {nav.about}
              </Link>
              <Link
                to="/kontakt"
                className="text-memorial-ink hover:text-memorial-bronze-deep transition-colors py-2"
                onClick={closeMenu}
              >
                {nav.contact}
              </Link>
              <Link
                to="/erstellen"
                className="memorial-cta memorial-cta-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium mt-4"
                onClick={closeMenu}
              >
                {nav.start}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;