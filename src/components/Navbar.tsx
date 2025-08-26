
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Star, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

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
          <Star className="w-6 h-6" />
          <span className="font-serif text-xl font-medium">NFC Erinnerung </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Startseite
          </Link>
          <Link to="/gedenken" className="text-foreground hover:text-primary transition-colors">
            Gedenken erstellen
          </Link>
          <Link to="/ueber" className="text-foreground hover:text-primary transition-colors">
            Über uns
          </Link>
          <Link to="/kontakt" className="text-foreground hover:text-primary transition-colors">
            Kontakt
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Farbmodus wechseln"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button asChild className="bg-primary text-primary-foreground">
            <Link to="/gedenken?product=premium">Jetzt starten</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Farbmodus wechseln"
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
            Startseite
          </Link>
          <Link
            to="/gedenken"
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Gedenken erstellen
          </Link>
          <Link
            to="/ueber"
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Über uns
          </Link>
          <Link
            to="/kontakt"
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Kontakt
          </Link>
          <Button
            asChild
            className="bg-primary text-primary-foreground w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link to="/gedenken?product=premium">Jetzt starten</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
