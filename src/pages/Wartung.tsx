import { Link } from "react-router-dom";
import MemoraLogo from "@/components/MemoraLogo";

const Wartung = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
    <MemoraLogo className="w-16 h-16 text-primary mb-6" />
    <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
      Memora Moments
    </h1>
    <p className="text-lg text-muted-foreground max-w-md">
      Unsere Webseite ist vorübergehend offline.
    </p>
    <nav className="mt-12 flex gap-6 text-sm text-muted-foreground">
      <Link to="/impressum" className="underline hover:text-primary">
        Impressum
      </Link>
      <Link to="/datenschutz" className="underline hover:text-primary">
        Datenschutz
      </Link>
    </nav>
  </div>
);

export default Wartung;
