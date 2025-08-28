import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'de' | 'en' | 'fr' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  de: {
    // Navbar
    'nav.home': 'Startseite',
    'nav.create': 'Gedenken erstellen',
    'nav.about': 'Über uns', 
    'nav.contact': 'Kontakt',
    'nav.start': 'Jetzt starten',
    'nav.theme': 'Farbmodus wechseln',
    
    // Hero
    'hero.title': 'Erinnerungen, die weiterleben – mit Herz und Klang.',
    'hero.subtitle': 'Aus Erinnerungen wird ein stilles Denkmal – eine NFC-Platte öffnet die Tür zu bewegenden Momenten mit Bild und Musik.',
    'hero.start': 'Jetzt beginnen',
    'hero.learn': 'Mehr erfahren',
    
    // Features
    'features.title': 'Unvergessliche Momente für die Ewigkeit',
    'features.subtitle': 'Unsere Memora Moments NFC-Platten vereinen moderne Technologie mit würdevoller Erinnerung. Sie ermöglichen, das Leben eines geliebten Menschen durch Bilder, Videos und Musik lebendig zu halten – direkt am Grab.',
    'features.unique.title': 'Einzigartiges Gedenken',
    'features.unique.desc': 'Bewahren Sie besondere Erinnerungen mit einer personalisierten NFC-Platte, die Ihre schönsten Momente durch einfaches Berühren mit dem Handy zugänglich macht.',
    'features.multimedia.title': 'Multimedia Erinnerungen', 
    'features.multimedia.desc': 'Laden Sie Fotos und Videos hoch, die die Persönlichkeit und das Leben des Verstorbenen zeigen.',
    'features.music.title': 'Lieblingslied einbinden',
    'features.music.desc': 'Fügen Sie bedeutungsvolle Musik hinzu, die beim Betrachten der Erinnerungen abgespielt wird.',
    'features.quality.title': 'Würdevoll gestaltet',
    'features.quality.desc': 'Hochwertige Glasplatten, die sich harmonisch in den Grabstein einfügen und allen Wetterbedingungen standhalten.',
    
    // How it works
    'howitworks.title': 'So einfach funktioniert es',
    'howitworks.subtitle': 'In wenigen Schritten zur persönlichen Gedenkplatte: Laden Sie Fotos oder Videos hoch, wählen Sie ein Lied, wir erstellen daraus ein liebevoll gestaltetes Video. Sie erhalten eine NFC-Platte, die durch Berühren mit dem Handy direkt zu Ihrer Erinnerung führt.',
    'howitworks.step1.title': 'Medien hochladen',
    'howitworks.step1.desc': 'Wählen Sie die schönsten Fotos und Videos aus, die die Erinnerung an Ihren Liebsten festhalten.',
    'howitworks.step2.title': 'Musik auswählen',
    'howitworks.step2.desc': 'Fügen Sie ein Lieblingslied hinzu, das besondere Bedeutung für den Verstorbenen hatte.',
    'howitworks.step3.title': 'NFC-Platte erhalten',
    'howitworks.step3.desc': 'Ihre persönliche NFC-Glasplatte wird gefertigt und direkt zu Ihnen nach Hause geliefert.',
    
    // Products
    'products.title': 'Unsere Produkte und wie sie funktionieren',
    'products.subtitle': 'Erleben Sie den Memora Moments in Aktion und sehen Sie unsere Gedenkplatten aus verschiedenen Materialien.',
    'products.basic.title': 'Basis Version',
    'products.basic.desc': 'Schlichte, elegante NFC-Platte für Ihre digitalen Erinnerungen.',
    'products.premium.title': 'Individuelle Gestaltung',
    'products.premium.desc': 'Vollständig personalisierbare NFC-Platte mit Foto und individueller Gestaltung.',
    'products.premium.recommended': 'Empfohlen',
    'products.features.glass': 'Hochwertige Glasplatte',
    'products.features.nfc': 'NFC-Technologie integriert',
    'products.features.format': 'Standardformat 15x10cm',
    'products.features.weather': 'Witterungsbeständig',
    'products.features.all': 'Alle Basis-Features',
    'products.features.photo': 'Persönliches Foto im Rahmen',
    'products.features.engraving': 'Individuelle Gravur möglich',
    'products.features.premium': 'Premium Materialien verfügbar',
    
    // CTA
    'cta.title': 'Beginnen Sie Ihre Erinnerungsreise',
    'cta.subtitle': 'Werden Sie Teil einer Gemeinschaft, die das Leben wertschätzt. Erstellen Sie noch heute Ihr einzigartiges Gedenken und bewahren Sie kostbare Erinnerungen für kommende Generationen.',
    'cta.create': 'Gedenken erstellen',
    'cta.contact': 'Kontakt aufnehmen',
    
    // Footer
    'footer.description': 'Bewahren Sie die Erinnerung an Ihre Liebsten mit unseren einzigartigen NFC-Glasplatten - eine würdevolle Verbindung zu besonderen Momenten.',
    'footer.contact': 'Kontakt',
    'footer.links': 'Links',
    'footer.copyright': 'Alle Rechte vorbehalten.',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.imprint': 'Impressum',
    
    // Brand
    'brand.name': 'Memora Moments',
    'brand.tagline': 'Memoro - Erinnerungen die bleiben.',
  },
  
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.create': 'Create Memorial',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.start': 'Get Started',
    'nav.theme': 'Toggle theme',
    
    // Hero
    'hero.title': 'Memories that live on – with heart and sound.',
    'hero.subtitle': 'Memories become a silent monument – an NFC plate opens the door to moving moments with image and music.',
    'hero.start': 'Get Started',
    'hero.learn': 'Learn More',
    
    // Features
    'features.title': 'Unforgettable Moments for Eternity',
    'features.subtitle': 'Our Memora Moments NFC plates combine modern technology with dignified remembrance. They enable keeping the life of a loved one alive through pictures, videos and music – directly at the grave.',
    'features.unique.title': 'Unique Memorial',
    'features.unique.desc': 'Preserve special memories with a personalized NFC plate that makes your most beautiful moments accessible by simply touching with your phone.',
    'features.multimedia.title': 'Multimedia Memories',
    'features.multimedia.desc': 'Upload photos and videos that show the personality and life of the deceased.',
    'features.music.title': 'Include Favorite Song',
    'features.music.desc': 'Add meaningful music that plays when viewing the memories.',
    'features.quality.title': 'Dignified Design',
    'features.quality.desc': 'High-quality glass plates that harmoniously integrate into the gravestone and withstand all weather conditions.',
    
    // How it works
    'howitworks.title': 'How it works so simply',
    'howitworks.subtitle': 'In just a few steps to your personal memorial plate: Upload photos or videos, choose a song, we create a lovingly designed video from it. You receive an NFC plate that leads directly to your memory by touching with your phone.',
    'howitworks.step1.title': 'Upload Media',
    'howitworks.step1.desc': 'Select the most beautiful photos and videos that capture the memory of your loved one.',
    'howitworks.step2.title': 'Choose Music',
    'howitworks.step2.desc': 'Add a favorite song that had special meaning for the deceased.',
    'howitworks.step3.title': 'Receive NFC Plate',
    'howitworks.step3.desc': 'Your personal NFC glass plate is manufactured and delivered directly to your home.',
    
    // Products
    'products.title': 'Our Products and How They Work',
    'products.subtitle': 'Experience Memora Moments in action and see our memorial plates made from various materials.',
    'products.basic.title': 'Basic Version',
    'products.basic.desc': 'Simple, elegant NFC plate for your digital memories.',
    'products.premium.title': 'Individual Design',
    'products.premium.desc': 'Fully customizable NFC plate with photo and individual design.',
    'products.premium.recommended': 'Recommended',
    'products.features.glass': 'High-quality glass plate',
    'products.features.nfc': 'NFC technology integrated',
    'products.features.format': 'Standard format 15x10cm',
    'products.features.weather': 'Weather resistant',
    'products.features.all': 'All basic features',
    'products.features.photo': 'Personal photo in frame',
    'products.features.engraving': 'Individual engraving possible',
    'products.features.premium': 'Premium materials available',
    
    // CTA
    'cta.title': 'Begin Your Memory Journey',
    'cta.subtitle': 'Become part of a community that values life. Create your unique memorial today and preserve precious memories for future generations.',
    'cta.create': 'Create Memorial',
    'cta.contact': 'Get in Touch',
    
    // Footer
    'footer.description': 'Preserve the memory of your loved ones with our unique NFC glass plates - a dignified connection to special moments.',
    'footer.contact': 'Contact',
    'footer.links': 'Links',
    'footer.copyright': 'All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.imprint': 'Imprint',
    
    // Brand
    'brand.name': 'Memora Moments',
    'brand.tagline': 'Memoro - Memories that remain.',
  },
  
  fr: {
    // Navbar
    'nav.home': 'Accueil',
    'nav.create': 'Créer un mémorial',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.start': 'Commencer',
    'nav.theme': 'Changer le thème',
    
    // Hero
    'hero.title': 'Des souvenirs qui perdurent – avec cœur et son.',
    'hero.subtitle': 'Les souvenirs deviennent un monument silencieux – une plaque NFC ouvre la porte à des moments émouvants avec image et musique.',
    'hero.start': 'Commencer',
    'hero.learn': 'En savoir plus',
    
    // Features
    'features.title': 'Moments inoubliables pour l\'éternité',
    'features.subtitle': 'Nos plaques NFC Memora Moments allient technologie moderne et souvenir digne. Elles permettent de garder vivante la vie d\'un être cher grâce aux images, vidéos et musique – directement sur la tombe.',
    'features.unique.title': 'Mémorial unique',
    'features.unique.desc': 'Préservez des souvenirs spéciaux avec une plaque NFC personnalisée qui rend vos plus beaux moments accessibles en touchant simplement avec votre téléphone.',
    'features.multimedia.title': 'Souvenirs multimédia',
    'features.multimedia.desc': 'Téléchargez des photos et vidéos qui montrent la personnalité et la vie du défunt.',
    'features.music.title': 'Inclure une chanson préférée',
    'features.music.desc': 'Ajoutez une musique significative qui se joue lors de la visualisation des souvenirs.',
    'features.quality.title': 'Design digne',
    'features.quality.desc': 'Plaques de verre de haute qualité qui s\'intègrent harmonieusement dans la pierre tombale et résistent à toutes les conditions météorologiques.',
    
    // How it works
    'howitworks.title': 'Comment cela fonctionne si simplement',
    'howitworks.subtitle': 'En quelques étapes vers votre plaque commémorative personnelle : téléchargez des photos ou vidéos, choisissez une chanson, nous créons une vidéo conçue avec amour. Vous recevez une plaque NFC qui mène directement à votre souvenir en touchant avec votre téléphone.',
    'howitworks.step1.title': 'Télécharger des médias',
    'howitworks.step1.desc': 'Sélectionnez les plus belles photos et vidéos qui capturent le souvenir de votre être cher.',
    'howitworks.step2.title': 'Choisir la musique',
    'howitworks.step2.desc': 'Ajoutez une chanson préférée qui avait une signification particulière pour le défunt.',
    'howitworks.step3.title': 'Recevoir la plaque NFC',
    'howitworks.step3.desc': 'Votre plaque de verre NFC personnelle est fabriquée et livrée directement chez vous.',
    
    // Products
    'products.title': 'Nos produits et comment ils fonctionnent',
    'products.subtitle': 'Découvrez Memora Moments en action et voyez nos plaques commémoratives faites de divers matériaux.',
    'products.basic.title': 'Version de base',
    'products.basic.desc': 'Plaque NFC simple et élégante pour vos souvenirs numériques.',
    'products.premium.title': 'Design individuel',
    'products.premium.desc': 'Plaque NFC entièrement personnalisable avec photo et design individuel.',
    'products.premium.recommended': 'Recommandé',
    'products.features.glass': 'Plaque de verre de haute qualité',
    'products.features.nfc': 'Technologie NFC intégrée',
    'products.features.format': 'Format standard 15x10cm',
    'products.features.weather': 'Résistant aux intempéries',
    'products.features.all': 'Toutes les fonctionnalités de base',
    'products.features.photo': 'Photo personnelle dans le cadre',
    'products.features.engraving': 'Gravure individuelle possible',
    'products.features.premium': 'Matériaux premium disponibles',
    
    // CTA
    'cta.title': 'Commencez votre voyage de la mémoire',
    'cta.subtitle': 'Rejoignez une communauté qui valorise la vie. Créez votre mémorial unique aujourd\'hui et préservez de précieux souvenirs pour les générations futures.',
    'cta.create': 'Créer un mémorial',
    'cta.contact': 'Nous contacter',
    
    // Footer
    'footer.description': 'Préservez la mémoire de vos proches avec nos plaques de verre NFC uniques - une connexion digne à des moments spéciaux.',
    'footer.contact': 'Contact',
    'footer.links': 'Liens',
    'footer.copyright': 'Tous droits réservés.',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.imprint': 'Mentions légales',
    
    // Brand
    'brand.name': 'Memora Moments',
    'brand.tagline': 'Memoro - Souvenirs qui demeurent.',
  },
  
  it: {
    // Navbar
    'nav.home': 'Home',
    'nav.create': 'Crea memoriale',
    'nav.about': 'Chi siamo',
    'nav.contact': 'Contatto',
    'nav.start': 'Inizia',
    'nav.theme': 'Cambia tema',
    
    // Hero
    'hero.title': 'Ricordi che vivono – con cuore e suono.',
    'hero.subtitle': 'I ricordi diventano un monumento silenzioso – una piastra NFC apre la porta a momenti commoventi con immagine e musica.',
    'hero.start': 'Inizia',
    'hero.learn': 'Scopri di più',
    
    // Features
    'features.title': 'Momenti indimenticabili per l\'eternità',
    'features.subtitle': 'Le nostre piastre NFC Memora Moments combinano tecnologia moderna con ricordo dignitoso. Permettono di mantenere viva la vita di una persona cara attraverso immagini, video e musica – direttamente sulla tomba.',
    'features.unique.title': 'Memoriale unico',
    'features.unique.desc': 'Preserva ricordi speciali con una piastra NFC personalizzata che rende i tuoi momenti più belli accessibili semplicemente toccando con il telefono.',
    'features.multimedia.title': 'Ricordi multimediali',
    'features.multimedia.desc': 'Carica foto e video che mostrano la personalità e la vita del defunto.',
    'features.music.title': 'Includi canzone preferita',
    'features.music.desc': 'Aggiungi musica significativa che suona durante la visualizzazione dei ricordi.',
    'features.quality.title': 'Design dignitoso',
    'features.quality.desc': 'Piastre di vetro di alta qualità che si integrano armoniosamente nella lapide e resistono a tutte le condizioni atmosferiche.',
    
    // How it works
    'howitworks.title': 'Come funziona così semplicemente',
    'howitworks.subtitle': 'In pochi passi alla tua piastra commemorativa personale: carica foto o video, scegli una canzone, creiamo un video progettato con amore. Ricevi una piastra NFC che porta direttamente al tuo ricordo toccando con il telefono.',
    'howitworks.step1.title': 'Carica media',
    'howitworks.step1.desc': 'Seleziona le foto e i video più belli che catturano il ricordo della tua persona cara.',
    'howitworks.step2.title': 'Scegli la musica',
    'howitworks.step2.desc': 'Aggiungi una canzone preferita che aveva un significato speciale per il defunto.',
    'howitworks.step3.title': 'Ricevi piastra NFC',
    'howitworks.step3.desc': 'La tua piastra di vetro NFC personale viene prodotta e consegnata direttamente a casa tua.',
    
    // Products
    'products.title': 'I nostri prodotti e come funzionano',
    'products.subtitle': 'Sperimenta Memora Moments in azione e vedi le nostre piastre commemorative realizzate con vari materiali.',
    'products.basic.title': 'Versione base',
    'products.basic.desc': 'Piastra NFC semplice ed elegante per i tuoi ricordi digitali.',
    'products.premium.title': 'Design individuale',
    'products.premium.desc': 'Piastra NFC completamente personalizzabile con foto e design individuale.',
    'products.premium.recommended': 'Consigliato',
    'products.features.glass': 'Piastra di vetro di alta qualità',
    'products.features.nfc': 'Tecnologia NFC integrata',
    'products.features.format': 'Formato standard 15x10cm',
    'products.features.weather': 'Resistente alle intemperie',
    'products.features.all': 'Tutte le funzionalità base',
    'products.features.photo': 'Foto personale nella cornice',
    'products.features.engraving': 'Incisione individuale possibile',
    'products.features.premium': 'Materiali premium disponibili',
    
    // CTA
    'cta.title': 'Inizia il tuo viaggio della memoria',
    'cta.subtitle': 'Diventa parte di una comunità che valorizza la vita. Crea il tuo memoriale unico oggi e preserva ricordi preziosi per le generazioni future.',
    'cta.create': 'Crea memoriale',
    'cta.contact': 'Contattaci',
    
    // Footer
    'footer.description': 'Preserva la memoria dei tuoi cari con le nostre piastre di vetro NFC uniche - una connessione dignitosa a momenti speciali.',
    'footer.contact': 'Contatto',
    'footer.links': 'Collegamenti',
    'footer.copyright': 'Tutti i diritti riservati.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Termini',
    'footer.imprint': 'Colofone',
    
    // Brand
    'brand.name': 'Memora Moments',
    'brand.tagline': 'Memoro - Ricordi che rimangono.',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};