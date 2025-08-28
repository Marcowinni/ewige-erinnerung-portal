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
    'hero.subtitle': 'Aus Erinnerungen wird ein stilles Denkmal – Memora Moments öffnet die Tür zu bewegenden Momenten mit Bild und Musik.',
    'hero.start': 'Jetzt beginnen',
    'hero.learn': 'Mehr erfahren',
    
    // Features
    'features.title': 'Unvergessliche Momente für die Ewigkeit',
    'features.subtitle': 'Unsere Memora Moments NFC-Platten vereinen moderne Technologie mit würdevoller Erinnerung. Sie ermöglichen, das Leben eines geliebten Menschen durch Bilder, Videos und Musik lebendig zu halten – direkt am Grab.',
    'features.unique.title': 'Einzigartiges Gedenken',
    'features.unique.desc': 'Bewahren Sie besondere Erinnerungen mit Memora Moments, die Ihre schönsten Momente durch einfaches Berühren mit dem Handy zugänglich macht.',
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
    'howitworks.step3.desc': 'Ihre persönliche NFC-Platte wird gefertigt und direkt zu Ihnen nach Hause geliefert.',
    
    // Products
    'products.title': 'Unsere Produkte und wie sie funktionieren',
    'products.subtitle': 'Erleben Sie den Memora Moments in Aktion und sehen Sie unsere Gedenkplatten.',
    'products.basic.title': 'Memora Tag',
    'products.basic.desc': 'Schlichte, elegante NFC-Platte für Ihre digitalen Erinnerungen.',
    'products.premium.title': 'Memora Frame',
    'products.premium.desc': 'Die stilvolle Verbindung von klassischem Bilderrahmen und moderner NFC-Technologie – für persönliche Erinnerungen, die bleiben.',
    'products.features.glass': '6×6 cm NFC-Platte aus hochwertigem Kunststoff',
    'products.features.nfc': 'Minimalistische, elegante Gestaltung',
    'products.features.format': 'Witterungsbeständig & langlebig',
    'products.features.weather': 'Einfaches Aufbringen an Grabsteinen, Urnen oder Erinnerungsorten',
    'products.features.all': 'Hochwertiger Bilderrahmen mit integriertem NFC-Tag',
    'products.features.photo': 'Persönliches Foto im Rahmen',
    'products.features.engraving': 'Kleinere, dezente NFC-Einheit für unauffällige Nutzung',
    'products.features.premium': 'Ideal für Wohnzimmer, Gedenkecken oder private Erinnerungsorte',
    
    // CTA
    'cta.title': 'Beginnen Sie Ihre Erinnerungsreise',
    'cta.subtitle': 'Werden Sie Teil einer Gemeinschaft, die das Leben wertschätzt. Erstellen Sie noch heute Ihr einzigartiges Gedenken und bewahren Sie kostbare Erinnerungen für kommende Generationen.',
    'cta.create': 'Gedenken erstellen',
    'cta.contact': 'Kontakt aufnehmen',
    
    // Footer
    'footer.description': 'Bewahren Sie die Erinnerung an Ihre Liebsten mit unseren einzigartigen Memora Moments - eine würdevolle Verbindung zu besonderen Momenten.',
    'footer.contact': 'Kontakt',
    'footer.links': 'Links',
    'footer.copyright': 'Alle Rechte vorbehalten.',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.imprint': 'Impressum',
    
    // Brand
    'brand.name': 'Memora Moments',
    'brand.tagline': 'Memora - Erinnerungen die weiterleben.',
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
    'hero.subtitle': 'Memora Moments turns memories into a quiet monument – opening the door to moving moments with images and music.',
    'hero.start': 'Get Started',
    'hero.learn': 'Learn More',

    // Features
    'features.title': 'Unforgettable Moments for Eternity',
    'features.subtitle': 'Our Memora Moments NFC plates combine modern technology with dignified remembrance. They keep the life of a loved one alive through photos, videos and music – directly at the graveside.',
    'features.unique.title': 'A Unique Tribute',
    'features.unique.desc': 'Preserve special memories with Memora Moments, making your most beautiful moments accessible with a simple tap of a phone.',
    'features.multimedia.title': 'Multimedia Memories',
    'features.multimedia.desc': 'Upload photos and videos that reflect the personality and life of the deceased.',
    'features.music.title': 'Add a Favorite Song',
    'features.music.desc': 'Include meaningful music that plays while viewing the memories.',
    'features.quality.title': 'Dignified Design',
    'features.quality.desc': 'High-quality plates that blend harmoniously with the headstone and withstand all weather conditions.',

    // How it works
    'howitworks.title': 'It’s that simple',
    'howitworks.subtitle': 'In just a few steps to your personal memorial: upload photos or videos, choose a song, and we create a lovingly designed video. You receive an NFC plate that leads directly to your memory with a simple tap.',
    'howitworks.step1.title': 'Upload Media',
    'howitworks.step1.desc': 'Select the most meaningful photos and videos that capture your loved one’s life.',
    'howitworks.step2.title': 'Choose Music',
    'howitworks.step2.desc': 'Add a favorite song that had special meaning.',
    'howitworks.step3.title': 'Receive NFC Plate',
    'howitworks.step3.desc': 'Your personal NFC plate is produced and shipped directly to your home.',

    // Products
    'products.title': 'Our Products and How They Work',
    'products.subtitle': 'Experience Memora Moments in action and discover our memorial solutions.',
    'products.basic.title': 'Memora Tag',
    'products.basic.desc': 'A minimal, elegant NFC plate for your digital memories.',
    'products.premium.title': 'Memora Frame',
    'products.premium.desc': 'A refined picture frame with integrated NFC – for personal memories that last.',
    'products.features.glass': '6×6 cm NFC plate made of high-quality plastic',
    'products.features.nfc': 'Minimal, elegant design',
    'products.features.format': 'Weather-resistant & durable',
    'products.features.weather': 'Easy to attach to headstones, urns, or memorial places',
    'products.features.all': 'High-quality picture frame with integrated NFC tag',
    'products.features.photo': 'Personal photo inside the frame',
    'products.features.engraving': 'Small, discreet NFC unit for unobtrusive use',
    'products.features.premium': 'Ideal for living rooms, memorial corners, or private spaces',

    // CTA
    'cta.title': 'Begin Your Memory Journey',
    'cta.subtitle': 'Join a community that cherishes life. Create your unique memorial today and preserve precious memories for generations to come.',
    'cta.create': 'Create Memorial',
    'cta.contact': 'Get in Touch',

    // Footer
    'footer.description': 'Preserve the memory of your loved ones with our unique Memora Moments – a dignified connection to special moments.',
    'footer.contact': 'Contact',
    'footer.links': 'Links',
    'footer.copyright': 'All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.imprint': 'Imprint',

    // Brand
    'brand.name': 'Memora Moments',
    'brand.tagline': 'Memora – Memories that live on.',
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
    'hero.title': 'Des souvenirs qui perdurent – avec cœur et musique.',
    'hero.subtitle': 'Memora Moments transforme les souvenirs en un monument silencieux – et ouvre la porte à des moments émouvants avec images et musique.',
    'hero.start': 'Commencer',
    'hero.learn': 'En savoir plus',

    // Features
    'features.title': 'Des moments inoubliables pour l’éternité',
    'features.subtitle': 'Nos plaques NFC Memora Moments allient technologie moderne et souvenir digne. Elles permettent de faire revivre la vie d’un être cher par des photos, vidéos et musique – directement au tombeau.',
    'features.unique.title': 'Un hommage unique',
    'features.unique.desc': 'Préservez des souvenirs précieux avec Memora Moments, accessibles d’un simple contact avec le téléphone.',
    'features.multimedia.title': 'Souvenirs multimédias',
    'features.multimedia.desc': 'Téléchargez des photos et vidéos qui reflètent la personnalité et la vie du défunt.',
    'features.music.title': 'Ajouter une chanson préférée',
    'features.music.desc': 'Intégrez une musique signifiante qui se joue lors de la consultation.',
    'features.quality.title': 'Design digne',
    'features.quality.desc': 'Plaques de haute qualité s’intégrant harmonieusement à la pierre tombale et résistantes aux intempéries.',

    // How it works
    'howitworks.title': 'C’est aussi simple',
    'howitworks.subtitle': 'En quelques étapes vers votre mémorial personnel : téléchargez des photos ou vidéos, choisissez une chanson, nous créons une vidéo conçue avec soin. Vous recevez une plaque NFC qui mène directement à votre souvenir d’un simple contact.',
    'howitworks.step1.title': 'Téléverser des médias',
    'howitworks.step1.desc': 'Sélectionnez les photos et vidéos les plus significatives.',
    'howitworks.step2.title': 'Choisir la musique',
    'howitworks.step2.desc': 'Ajoutez une chanson préférée ayant une signification particulière.',
    'howitworks.step3.title': 'Recevoir la plaque NFC',
    'howitworks.step3.desc': 'Votre plaque NFC personnelle est fabriquée et livrée chez vous.',

    // Products
    'products.title': 'Nos produits et leur fonctionnement',
    'products.subtitle': 'Découvrez Memora Moments en action et nos solutions commémoratives.',
    'products.basic.title': 'Memora Tag',
    'products.basic.desc': 'Plaque NFC minimaliste et élégante pour vos souvenirs numériques.',
    'products.premium.title': 'Memora Frame',
    'products.premium.desc': 'Cadre photo raffiné avec NFC intégré – pour des souvenirs personnels qui durent.',
    'products.features.glass': 'Plaque NFC 6×6 cm en plastique de haute qualité',
    'products.features.nfc': 'Design minimaliste et élégant',
    'products.features.format': 'Résistante aux intempéries et durable',
    'products.features.weather': 'Pose facile sur pierres tombales, urnes ou lieux de mémoire',
    'products.features.all': 'Cadre photo de haute qualité avec étiquette NFC intégrée',
    'products.features.photo': 'Photo personnelle dans le cadre',
    'products.features.engraving': 'Petite étiquette NFC discrète pour un usage discret',
    'products.features.premium': 'Idéal pour le salon, les coins de recueillement ou des espaces privés',

    // CTA
    'cta.title': 'Commencez votre voyage de mémoire',
    'cta.subtitle': 'Rejoignez une communauté qui valorise la vie. Créez dès aujourd’hui votre mémorial unique et préservez des souvenirs précieux pour les générations futures.',
    'cta.create': 'Créer un mémorial',
    'cta.contact': 'Nous contacter',

    // Footer
    'footer.description': 'Préservez la mémoire de vos proches avec Memora Moments – un lien digne avec des instants précieux.',
    'footer.contact': 'Contact',
    'footer.links': 'Liens',
    'footer.copyright': 'Tous droits réservés.',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.imprint': 'Mentions légales',

    // Brand
    'brand.name': 'Memora Moments',
    'brand.tagline': 'Memora – Des souvenirs qui perdurent.',
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
    'hero.title': 'Ricordi che vivono – con cuore e musica.',
    'hero.subtitle': 'Memora Moments trasforma i ricordi in un monumento silenzioso – aprendo la porta a momenti commoventi con immagini e musica.',
    'hero.start': 'Inizia',
    'hero.learn': 'Scopri di più',

    // Features
    'features.title': 'Momenti indimenticabili per l’eternità',
    'features.subtitle': 'Le nostre piastre NFC Memora Moments uniscono tecnologia moderna e ricordo dignitoso. Mantengono viva la memoria attraverso foto, video e musica – direttamente presso la tomba.',
    'features.unique.title': 'Un tributo unico',
    'features.unique.desc': 'Con Memora Moments i tuoi momenti più belli sono accessibili con un semplice tocco del telefono.',
    'features.multimedia.title': 'Ricordi multimediali',
    'features.multimedia.desc': 'Carica foto e video che raccontano la vita e la personalità del defunto.',
    'features.music.title': 'Aggiungi una canzone preferita',
    'features.music.desc': 'Includi una musica significativa durante la visione dei ricordi.',
    'features.quality.title': 'Design dignitoso',
    'features.quality.desc': 'Piastre di alta qualità che si integrano armoniosamente con la lapide e resistono agli agenti atmosferici.',

    // How it works
    'howitworks.title': 'È davvero semplice',
    'howitworks.subtitle': 'In pochi passaggi al tuo memoriale personale: carica foto o video, scegli una canzone e noi creiamo un video curato con amore. Ricevi una piastra NFC che porta direttamente al tuo ricordo con un semplice tocco.',
    'howitworks.step1.title': 'Carica i media',
    'howitworks.step1.desc': 'Seleziona le foto e i video più significativi.',
    'howitworks.step2.title': 'Scegli la musica',
    'howitworks.step2.desc': 'Aggiungi una canzone preferita di particolare significato.',
    'howitworks.step3.title': 'Ricevi la piastra NFC',
    'howitworks.step3.desc': 'La tua piastra NFC personale viene prodotta e spedita a casa.',

    // Products
    'products.title': 'I nostri prodotti e come funzionano',
    'products.subtitle': 'Scopri Memora Moments in azione e le nostre soluzioni commemorative.',
    'products.basic.title': 'Memora Tag',
    'products.basic.desc': 'Piastra NFC minimal ed elegante per i tuoi ricordi digitali.',
    'products.premium.title': 'Memora Frame',
    'products.premium.desc': 'Cornice fotografica raffinata con NFC integrato – per ricordi personali che durano.',
    'products.features.glass': 'Piastra NFC 6×6 cm in plastica di alta qualità',
    'products.features.nfc': 'Design minimale ed elegante',
    'products.features.format': 'Resistente alle intemperie e durevole',
    'products.features.weather': 'Applicazione semplice su lapidi, urne o luoghi della memoria',
    'products.features.all': 'Cornice fotografica di alta qualità con tag NFC integrato',
    'products.features.photo': 'Foto personale nella cornice',
    'products.features.engraving': 'Piccolo tag NFC discreto per un uso non invasivo',
    'products.features.premium': 'Ideale per salotti, angoli del ricordo o spazi privati',

    // CTA
    'cta.title': 'Inizia il tuo viaggio della memoria',
    'cta.subtitle': 'Entra in una comunità che valorizza la vita. Crea oggi il tuo memoriale unico e conserva ricordi preziosi per le generazioni future.',
    'cta.create': 'Crea memoriale',
    'cta.contact': 'Contattaci',

    // Footer
    'footer.description': 'Preserva il ricordo dei tuoi cari con Memora Moments – un legame dignitoso con momenti speciali.',
    'footer.contact': 'Contatto',
    'footer.links': 'Link',
    'footer.copyright': 'Tutti i diritti riservati.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Termini',
    'footer.imprint': 'Note legali',

    // Brand
    'brand.name': 'Memora Moments',
    'brand.tagline': 'Memora – Ricordi che vivono.',
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