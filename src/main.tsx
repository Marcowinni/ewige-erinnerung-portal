import React from "react";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ContentProvider } from "@/contexts/ContentContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ContentProvider>
          <ThemeProvider defaultTheme="dark" storageKey="memora-theme">
            <App />
            <Toaster />
          </ThemeProvider>
        </ContentProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
