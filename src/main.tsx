import React from "react";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ContentProvider } from "@/contexts/ContentContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContentProvider>
        <ThemeProvider defaultTheme="light" storageKey="memora-theme">
          <App />
          <Toaster />
        </ThemeProvider>
      </ContentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
