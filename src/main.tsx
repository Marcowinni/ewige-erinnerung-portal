import React from "react";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ContentProvider } from "@/contexts/ContentContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";

// STRIPE-IMPORTS
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Stripe Promise laden
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ContentProvider>
          <ThemeProvider defaultTheme="dark" storageKey="memora-theme">
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
            <Toaster />
          </ThemeProvider>
        </ContentProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
