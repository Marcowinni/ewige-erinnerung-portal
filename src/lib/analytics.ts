import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn("Google Analytics Measurement ID is not set. Tracking is disabled.");
    return;
  }
  
  // Überprüft, ob wir im Browser sind und die ID vorhanden ist
  if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log("Google Analytics initialized.");
  }
};

export const logPageView = () => {
  if (!GA_MEASUREMENT_ID) return;
  
  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
};