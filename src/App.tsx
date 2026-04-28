import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cookies from 'js-cookie';

import { logPageView } from "@/lib/analytics";
import CookieConsentBanner from "@/components/CookieConsentBanner";

import Landing from "./pages/Landing";
import SelfService from "./pages/SelfService";
import Index from "./pages/Index";
import Gedenken from "./pages/Gedenken";
import Ueber from "./pages/Ueber";
import Kontakt from "./pages/Kontakt";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import Impressum from "./pages/Impressum";
import NotFound from "./pages/NotFound";
import BestellungErfolgreich from "./pages/BestellungErfolgreich";
import BestellungAbgebrochen from "./pages/BestellungAbgebrochen";
import Partner from "./pages/Partner";
import Admin from "./pages/Admin";
import AdminAlbum from "./pages/AdminAlbum";
import AdminTags from "./pages/AdminTags";

import Album from "./pages/Album";
import AlbumStylePreview from "./pages/AlbumStylePreview";
import AlbumPreviewMobile from "./pages/AlbumPreviewMobile";
import AlbumShowcaseFrame from "./pages/AlbumShowcaseFrame";

const queryClient = new QueryClient();

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Prüft, ob die Zustimmung bereits gegeben wurde
    const consent = Cookies.get("memora-cookie-consent");
    if (consent === "true") {
      logPageView();
    }
  }, [location]);

  return null;
};

const ConditionalCookieBanner = () => {
  const { pathname } = useLocation();
  // Hide on iframe-embedded preview routes — the parent page already shows the banner
  const isEmbeddedRoute = pathname.startsWith('/preview/') || pathname.startsWith('/showcase/');
  if (isEmbeddedRoute) return null;
  return <CookieConsentBanner />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouteChangeTracker />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/erstellen" element={<SelfService />} />
        <Route path="/legacy-shop" element={<Index />} />
        <Route path="/gedenken" element={<Gedenken />} />
        <Route path="/ueber" element={<Ueber />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/agb" element={<AGB />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/album/:albumSlug" element={<Album />} />
        <Route path="/album-stil-vorschau" element={<AlbumStylePreview />} />
        <Route path="/preview/mobile" element={<AlbumPreviewMobile />} />
        <Route path="/showcase/:theme" element={<AlbumShowcaseFrame />} />
        <Route path="/bestellung-erfolgreich" element={<BestellungErfolgreich />} />
        <Route path="/bestellung-abgebrochen" element={<BestellungAbgebrochen />} />
        <Route path="/upload" element={<Partner />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/album/:id" element={<AdminAlbum />} />
        <Route path="/admin/tags" element={<AdminTags />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ConditionalCookieBanner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
