import React from "react";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PetModeProvider } from "@/contexts/PetModeContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PetModeProvider>
        <LanguageProvider>
          <ThemeProvider defaultTheme="light" storageKey="memora-theme">
            <App />
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </PetModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
