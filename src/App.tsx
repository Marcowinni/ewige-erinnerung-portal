import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cookies from 'js-cookie';

import { logPageView } from "@/lib/analytics";
import CookieConsentBanner from "@/components/CookieConsentBanner";

import Index from "./pages/Index";
import Gedenken from "./pages/Gedenken";
import Ueber from "./pages/Ueber";
import Kontakt from "./pages/Kontakt";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import Impressum from "./pages/Impressum";
import NotFound from "./pages/NotFound";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouteChangeTracker />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/gedenken" element={<Gedenken />} />
        <Route path="/ueber" element={<Ueber />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/agb" element={<AGB />} />
        <Route path="/impressum" element={<Impressum />} />
        {/* Fügt den RouteChangeTracker hinzu */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsentBanner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
