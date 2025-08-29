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
    
    // Gedenken page
    'gedenken.title': 'Gedenken erstellen | Ewige Erinnerung',
    'gedenken.heading': 'Ein bleibendes Gedenken erschaffen',
    'gedenken.description': 'Erstellen Sie eine persönliche Erinnerung mit Bildern, Videos und der Lieblingsmusik Ihres Verstorbenen, zugänglich durch Berühren einer hochwertigen NFC-Glasplatte mit dem Handy.',
    
    // Ueber page
    'about.title': 'Über Memora Moments',
    'about.lead': 'Wir verbinden moderne Technologie mit traditioneller Erinnerungskultur, um Ihnen zu helfen, das Andenken an Ihre Liebsten lebendig zu halten.',
    'about.story.title': 'Unsere Geschichte',
    'about.story.p1': 'Die Idee zu Memora Moments entstand aus einer persönlichen Erfahrung. Nach dem frühen Verlust meines Grossvaters verging Zeit und die Erinnerungen an die Person wurden schwächer und schwächer..',
    'about.story.p2': 'Wir entdeckten, dass traditionelle Gedenkformen oft statisch sind und nur begrenzte Möglichkeiten bieten, die Persönlichkeit und die besonderen Momente des Verstorbenen zu vermitteln. So entwickelten wir eine Lösung, die Technologie nutzt, um Erinnerungen in einer respektvollen und dennoch lebendigen Weise zu bewahren.',
    'about.values.title': 'Was uns antreibt',
    'about.values.compassion.title': 'Mitgefühl',
    'about.values.compassion.desc': 'Wir verstehen den Schmerz des Verlusts und schaffen einfühlsame Wege, Erinnerungen zu bewahren und zu würdigen.',
    'about.values.personality.title': 'Persönlichkeit',
    'about.values.personality.desc': 'Jeder Mensch ist einzigartig. Unsere Gedenkplatten spiegeln die Individualität und die besonderen Momente Ihrer Liebsten wider.',
    'about.values.connection.title': 'Verbindung',
    'about.values.connection.desc': 'Wir schaffen eine Brücke zwischen Vergangenheit und Gegenwart, die Generationen verbindet und Geschichten weiterträgt.',
    'about.product.title': 'Unsere Memora Moments',
    'about.product.p1': 'Jede Memora Moments Platte besteht aus hochwertigem, witterungsbeständigem Material, das speziell für den Ausseneinsatz entwickelt wurde. Die eingebettete NFC-Technologie ist UV-beständig und funktioniert über Jahre hinweg zuverlässig.',
    'about.product.p2': 'Die Platten sind dezent gestaltet und fügen sich harmonisch in die Gedenkstätte ein.',
    'about.quote': '"Memora - Erinnerungen die weiterleben."',
    
    // Kontakt page
    'contact.title': 'Kontaktieren Sie uns!',
    'contact.description': 'Haben Sie Fragen zu unseren Produkten oder benötigen Sie Unterstützung bei der Erstellung Ihres persönlichen Gedenkens? Wir stehen Ihnen gerne zur Verfügung.',
    'contact.email': 'E-Mail',
    'contact.phone': 'Telefon',
    'contact.address': 'Adresse',
    'contact.form.title': 'Nachricht senden',
    'contact.form.name': 'Name',
    'contact.form.name.placeholder': 'Ihr vollständiger Name',
    'contact.form.email': 'E-Mail',
    'contact.form.email.placeholder': 'Ihre E-Mail-Adresse',
    'contact.form.subject': 'Betreff',
    'contact.form.subject.placeholder': 'Worum geht es in Ihrer Nachricht?',
    'contact.form.message': 'Nachricht',
    'contact.form.message.placeholder': 'Wie können wir Ihnen helfen?',
    'contact.form.submit': 'Nachricht senden',
    'contact.form.success': 'Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.',
    
    // Memory uploader
    'memoryUploader.createMemory': 'Gedenken erstellen',
    'memoryUploader.completeOrder': 'Bestellung abschließen',
    'memoryUploader.step': 'Schritt',
    'memoryUploader.of': 'von',
    'memoryUploader.step1Title': 'Produkttyp und Informationen wählen',
    'memoryUploader.step2Title': 'Fotos und Videos hinzufügen',
    'memoryUploader.step3Title': 'Lieblingslied auswählen',
    'memoryUploader.step4Title': 'Überprüfen und bestätigen',
    'memoryUploader.selectCategory': 'Produktkategorie wählen',
    'memoryUploader.memoraTag': 'Memora Tag',
    'memoryUploader.memoraFrame': 'Memora Frame',
    'memoryUploader.memoraTagDescription': 'Schlichte NFC-Platte für digitale Erinnerungen',
    'memoryUploader.memoraFrameDescription': 'Mit persönlichem Foto im Rahmen',
    'memoryUploader.deceasedName': 'Name des/der Verstorbenen',
    'memoryUploader.fullName': 'Vollständiger Name',
    'memoryUploader.birthDate': 'Geburtsdatum',
    'memoryUploader.deathDate': 'Sterbedatum',
    'memoryUploader.framePhoto': 'Foto für den Rahmen',
    'memoryUploader.selectFramePhoto': 'Foto für den Rahmen auswählen',
    'memoryUploader.framePhotoPreview': 'Rahmen Foto Vorschau',
    'memoryUploader.personalMessage': 'Persönliche Botschaft',
    'memoryUploader.personalMessagePlaceholder': 'Eine persönliche Nachricht oder ein Zitat...',
    'memoryUploader.uploadPhotos': 'Fotos hochladen',
    'memoryUploader.clickToSelectPhotos': 'Klicken Sie hier, um Fotos auszuwählen',
    'memoryUploader.photoFormats': 'JPG, PNG oder GIF (max. 10MB)',
    'memoryUploader.photoPreview': 'Vorschau der Fotos',
    'memoryUploader.preview': 'Vorschau',
    'memoryUploader.uploadVideo': 'Video hochladen',
    'memoryUploader.clickToSelectVideo': 'Klicken Sie hier, um ein Video auszuwählen',
    'memoryUploader.videoFormats': 'MP4, MOV oder AVI (max. 50MB)',
    'memoryUploader.favoriteSong': 'Lieblingslied',
    'memoryUploader.clickToUploadSong': 'Klicken Sie hier, um ein Lied hochzuladen',
    'memoryUploader.audioFormats': 'MP3 oder WAV (max. 10MB)',
    'memoryUploader.orLinkSpotify': 'Oder Link zu Spotify/YouTube einfügen',
    'memoryUploader.linkPlaceholder': 'z.B. https://open.spotify.com/track/...',
    'memoryUploader.musicExplanation': 'Die Musik wird beim Berühren der NFC-Platte mit dem Handy zusammen mit den Bildern und Videos abgespielt, um ein ganzheitliches Erinnerungserlebnis zu schaffen.',
    'memoryUploader.plateReady': 'Ihre NFC-Platte ist bereit für die Bestellung',
    'memoryUploader.mediaUploaded': 'Alle Medien wurden erfolgreich hochgeladen.',
    'memoryUploader.price': 'Preis:',
    'memoryUploader.orderConfirmation': 'Nach Abschluss der Bestellung erhalten Sie eine Bestätigungs-E-Mail mit allen Details und dem Lieferzeitplan.',
    'memoryUploader.deliveryAddress': 'Lieferadresse',
    'memoryUploader.fullDeliveryAddress': 'Vollständige Lieferadresse',
    'memoryUploader.back': 'Zurück',
    'memoryUploader.next': 'Weiter',
    'memoryUploader.orderNow': 'Jetzt bestellen',
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
    
    // Gedenken page
    'gedenken.title': 'Create Memorial | Eternal Memory',
    'gedenken.heading': 'Create a Lasting Memorial',
    'gedenken.description': 'Create a personal memory with photos, videos and your loved one\'s favorite music, accessible by touching a high-quality NFC glass plate with your phone.',
    
    // Ueber page
    'about.title': 'About Memora Moments',
    'about.lead': 'We connect modern technology with traditional remembrance culture to help you keep the memory of your loved ones alive.',
    'about.story.title': 'Our Story',
    'about.story.p1': 'The idea for Memora Moments arose from a personal experience. After the early loss of my grandfather, time passed and the memories of the person became weaker and weaker..',
    'about.story.p2': 'We discovered that traditional forms of remembrance are often static and offer limited opportunities to convey the personality and special moments of the deceased. So we developed a solution that uses technology to preserve memories in a respectful yet vibrant way.',
    'about.values.title': 'What drives us',
    'about.values.compassion.title': 'Compassion',
    'about.values.compassion.desc': 'We understand the pain of loss and create empathetic ways to preserve and honor memories.',
    'about.values.personality.title': 'Personality',
    'about.values.personality.desc': 'Every person is unique. Our memorial plates reflect the individuality and special moments of your loved ones.',
    'about.values.connection.title': 'Connection',
    'about.values.connection.desc': 'We create a bridge between past and present that connects generations and carries stories forward.',
    'about.product.title': 'Our Memora Moments',
    'about.product.p1': 'Each Memora Moments plate is made of high-quality, weather-resistant material specially developed for outdoor use. The embedded NFC technology is UV-resistant and works reliably for years.',
    'about.product.p2': 'The plates are discreetly designed and blend harmoniously into the memorial site.',
    'about.quote': '"Memora – Memories that live on."',
    
    // Kontakt page
    'contact.title': 'Contact Us!',
    'contact.description': 'Do you have questions about our products or need support creating your personal memorial? We are happy to help you.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.form.title': 'Send Message',
    'contact.form.name': 'Name',
    'contact.form.name.placeholder': 'Your full name',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'Your email address',
    'contact.form.subject': 'Subject',
    'contact.form.subject.placeholder': 'What is your message about?',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'How can we help you?',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Thank you for your message. We will get back to you shortly.',
    
    // Memory uploader
    'memoryUploader.createMemory': 'Create Memory',
    'memoryUploader.completeOrder': 'Complete Order',
    'memoryUploader.step': 'Step',
    'memoryUploader.of': 'of',
    'memoryUploader.step1Title': 'Choose product type and information',
    'memoryUploader.step2Title': 'Add photos and videos',
    'memoryUploader.step3Title': 'Select favorite song',
    'memoryUploader.step4Title': 'Review and confirm',
    'memoryUploader.selectCategory': 'Choose product category',
    'memoryUploader.memoraTag': 'Memora Tag',
    'memoryUploader.memoraFrame': 'Memora Frame',
    'memoryUploader.memoraTagDescription': 'Simple NFC plate for digital memories',
    'memoryUploader.memoraFrameDescription': 'With personal photo in frame',
    'memoryUploader.deceasedName': 'Name of the deceased',
    'memoryUploader.fullName': 'Full name',
    'memoryUploader.birthDate': 'Date of birth',
    'memoryUploader.deathDate': 'Date of death',
    'memoryUploader.framePhoto': 'Photo for frame',
    'memoryUploader.selectFramePhoto': 'Select photo for frame',
    'memoryUploader.framePhotoPreview': 'Frame photo preview',
    'memoryUploader.personalMessage': 'Personal message',
    'memoryUploader.personalMessagePlaceholder': 'A personal message or quote...',
    'memoryUploader.uploadPhotos': 'Upload photos',
    'memoryUploader.clickToSelectPhotos': 'Click here to select photos',
    'memoryUploader.photoFormats': 'JPG, PNG or GIF (max. 10MB)',
    'memoryUploader.photoPreview': 'Photo preview',
    'memoryUploader.preview': 'Preview',
    'memoryUploader.uploadVideo': 'Upload video',
    'memoryUploader.clickToSelectVideo': 'Click here to select a video',
    'memoryUploader.videoFormats': 'MP4, MOV or AVI (max. 50MB)',
    'memoryUploader.favoriteSong': 'Favorite song',
    'memoryUploader.clickToUploadSong': 'Click here to upload a song',
    'memoryUploader.audioFormats': 'MP3 or WAV (max. 10MB)',
    'memoryUploader.orLinkSpotify': 'Or paste Spotify/YouTube link',
    'memoryUploader.linkPlaceholder': 'e.g. https://open.spotify.com/track/...',
    'memoryUploader.musicExplanation': 'Music will be played when touching the NFC plate with your phone, together with images and videos, to create a complete memory experience.',
    'memoryUploader.plateReady': 'Your NFC plate is ready for ordering',
    'memoryUploader.mediaUploaded': 'All media has been successfully uploaded.',
    'memoryUploader.price': 'Price:',
    'memoryUploader.orderConfirmation': 'After completing the order, you will receive a confirmation email with all details and delivery schedule.',
    'memoryUploader.deliveryAddress': 'Delivery address',
    'memoryUploader.fullDeliveryAddress': 'Complete delivery address',
    'memoryUploader.back': 'Back',
    'memoryUploader.next': 'Next',
    'memoryUploader.orderNow': 'Order now',
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
    
    // Gedenken page
    'gedenken.title': 'Créer un mémorial | Mémoire éternelle',
    'gedenken.heading': 'Créer un mémorial durable',
    'gedenken.description': 'Créez un souvenir personnel avec photos, vidéos et la musique préférée de votre proche, accessible en touchant une plaque NFC en verre de haute qualité avec votre téléphone.',
    
    // Ueber page
    'about.title': 'À propos de Memora Moments',
    'about.lead': 'Nous connectons la technologie moderne avec la culture traditionnelle du souvenir pour vous aider à garder vivante la mémoire de vos proches.',
    'about.story.title': 'Notre histoire',
    'about.story.p1': 'L\'idée de Memora Moments est née d\'une expérience personnelle. Après la perte précoce de mon grand-père, le temps a passé et les souvenirs de la personne sont devenus de plus en plus faibles..',
    'about.story.p2': 'Nous avons découvert que les formes traditionnelles de commémoration sont souvent statiques et offrent des possibilités limitées pour transmettre la personnalité et les moments spéciaux du défunt. Nous avons donc développé une solution qui utilise la technologie pour préserver les souvenirs de manière respectueuse mais vivante.',
    'about.values.title': 'Ce qui nous motive',
    'about.values.compassion.title': 'Compassion',
    'about.values.compassion.desc': 'Nous comprenons la douleur de la perte et créons des moyens empathiques de préserver et d\'honorer les souvenirs.',
    'about.values.personality.title': 'Personnalité',
    'about.values.personality.desc': 'Chaque personne est unique. Nos plaques commémoratives reflètent l\'individualité et les moments spéciaux de vos proches.',
    'about.values.connection.title': 'Connexion',
    'about.values.connection.desc': 'Nous créons un pont entre le passé et le présent qui connecte les générations et transmet les histoires.',
    'about.product.title': 'Nos Memora Moments',
    'about.product.p1': 'Chaque plaque Memora Moments est faite de matériau de haute qualité, résistant aux intempéries, spécialement développé pour une utilisation extérieure. La technologie NFC intégrée résiste aux UV et fonctionne de manière fiable pendant des années.',
    'about.product.p2': 'Les plaques sont conçues discrètement et s\'intègrent harmonieusement dans le site commémoratif.',
    'about.quote': '"Memora – Des souvenirs qui perdurent."',
    
    // Kontakt page
    'contact.title': 'Contactez-nous !',
    'contact.description': 'Avez-vous des questions sur nos produits ou besoin d\'aide pour créer votre mémorial personnel ? Nous sommes là pour vous aider.',
    'contact.email': 'E-mail',
    'contact.phone': 'Téléphone',
    'contact.address': 'Adresse',
    'contact.form.title': 'Envoyer un message',
    'contact.form.name': 'Nom',
    'contact.form.name.placeholder': 'Votre nom complet',
    'contact.form.email': 'E-mail',
    'contact.form.email.placeholder': 'Votre adresse e-mail',
    'contact.form.subject': 'Sujet',
    'contact.form.subject.placeholder': 'De quoi parle votre message ?',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Comment pouvons-nous vous aider ?',
    'contact.form.submit': 'Envoyer le message',
    'contact.form.success': 'Merci pour votre message. Nous vous répondrons sous peu.',
    
    // Memory uploader
    'memoryUploader.createMemory': 'Créer un souvenir',
    'memoryUploader.completeOrder': 'Finaliser la commande',
    'memoryUploader.step': 'Étape',
    'memoryUploader.of': 'sur',
    'memoryUploader.step1Title': 'Choisir le type de produit et les informations',
    'memoryUploader.step2Title': 'Ajouter des photos et vidéos',
    'memoryUploader.step3Title': 'Sélectionner une chanson préférée',
    'memoryUploader.step4Title': 'Vérifier et confirmer',
    'memoryUploader.selectCategory': 'Choisir la catégorie de produit',
    'memoryUploader.memoraTag': 'Memora Tag',
    'memoryUploader.memoraFrame': 'Memora Frame',
    'memoryUploader.memoraTagDescription': 'Plaque NFC simple pour souvenirs numériques',
    'memoryUploader.memoraFrameDescription': 'Avec photo personnelle dans un cadre',
    'memoryUploader.deceasedName': 'Nom du/de la défunt(e)',
    'memoryUploader.fullName': 'Nom complet',
    'memoryUploader.birthDate': 'Date de naissance',
    'memoryUploader.deathDate': 'Date de décès',
    'memoryUploader.framePhoto': 'Photo pour le cadre',
    'memoryUploader.selectFramePhoto': 'Sélectionner une photo pour le cadre',
    'memoryUploader.framePhotoPreview': 'Aperçu de la photo du cadre',
    'memoryUploader.personalMessage': 'Message personnel',
    'memoryUploader.personalMessagePlaceholder': 'Un message personnel ou une citation...',
    'memoryUploader.uploadPhotos': 'Télécharger des photos',
    'memoryUploader.clickToSelectPhotos': 'Cliquez ici pour sélectionner des photos',
    'memoryUploader.photoFormats': 'JPG, PNG ou GIF (max. 10MB)',
    'memoryUploader.photoPreview': 'Aperçu des photos',
    'memoryUploader.preview': 'Aperçu',
    'memoryUploader.uploadVideo': 'Télécharger une vidéo',
    'memoryUploader.clickToSelectVideo': 'Cliquez ici pour sélectionner une vidéo',
    'memoryUploader.videoFormats': 'MP4, MOV ou AVI (max. 50MB)',
    'memoryUploader.favoriteSong': 'Chanson préférée',
    'memoryUploader.clickToUploadSong': 'Cliquez ici pour télécharger une chanson',
    'memoryUploader.audioFormats': 'MP3 ou WAV (max. 10MB)',
    'memoryUploader.orLinkSpotify': 'Ou coller un lien Spotify/YouTube',
    'memoryUploader.linkPlaceholder': 'ex. https://open.spotify.com/track/...',
    'memoryUploader.musicExplanation': 'La musique sera jouée lorsque vous touchez la plaque NFC avec votre téléphone, avec les images et vidéos, pour créer une expérience complète de souvenir.',
    'memoryUploader.plateReady': 'Votre plaque NFC est prête pour la commande',
    'memoryUploader.mediaUploaded': 'Tous les médias ont été téléchargés avec succès.',
    'memoryUploader.price': 'Prix :',
    'memoryUploader.orderConfirmation': 'Après avoir finalisé la commande, vous recevrez un e-mail de confirmation avec tous les détails et le planning de livraison.',
    'memoryUploader.deliveryAddress': 'Adresse de livraison',
    'memoryUploader.fullDeliveryAddress': 'Adresse de livraison complète',
    'memoryUploader.back': 'Retour',
    'memoryUploader.next': 'Suivant',
    'memoryUploader.orderNow': 'Commander maintenant',
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
    
    // Gedenken page
    'gedenken.title': 'Crea memoriale | Memoria eterna',
    'gedenken.heading': 'Crea un memoriale duraturo',
    'gedenken.description': 'Crea un ricordo personale con foto, video e la musica preferita del tuo caro, accessibile toccando una piastra NFC in vetro di alta qualità con il telefono.',
    
    // Ueber page
    'about.title': 'Chi siamo - Memora Moments',
    'about.lead': 'Colleghiamo tecnologia moderna con cultura tradizionale della memoria per aiutarti a mantenere vivo il ricordo dei tuoi cari.',
    'about.story.title': 'La nostra storia',
    'about.story.p1': 'L\'idea di Memora Moments è nata da un\'esperienza personale. Dopo la perdita precoce di mio nonno, il tempo è passato e i ricordi della persona sono diventati sempre più deboli..',
    'about.story.p2': 'Abbiamo scoperto che le forme tradizionali di commemorazione sono spesso statiche e offrono possibilità limitate per trasmettere la personalità e i momenti speciali del defunto. Così abbiamo sviluppato una soluzione che utilizza la tecnologia per preservare i ricordi in modo rispettoso ma vivace.',
    'about.values.title': 'Cosa ci motiva',
    'about.values.compassion.title': 'Compassione',
    'about.values.compassion.desc': 'Comprendiamo il dolore della perdita e creiamo modi empatici per preservare e onorare i ricordi.',
    'about.values.personality.title': 'Personalità',
    'about.values.personality.desc': 'Ogni persona è unica. Le nostre piastre commemorative riflettono l\'individualità e i momenti speciali dei tuoi cari.',
    'about.values.connection.title': 'Connessione',
    'about.values.connection.desc': 'Creiamo un ponte tra passato e presente che collega le generazioni e trasmette le storie.',
    'about.product.title': 'I nostri Memora Moments',
    'about.product.p1': 'Ogni piastra Memora Moments è realizzata con materiale di alta qualità, resistente alle intemperie, sviluppato appositamente per uso esterno. La tecnologia NFC integrata resiste ai raggi UV e funziona in modo affidabile per anni.',
    'about.product.p2': 'Le piastre sono progettate discretamente e si integrano armoniosamente nel sito commemorativo.',
    'about.quote': '"Memora – Ricordi che vivono."',
    
    // Kontakt page
    'contact.title': 'Contattaci!',
    'contact.description': 'Hai domande sui nostri prodotti o hai bisogno di supporto per creare il tuo memoriale personale? Siamo qui per aiutarti.',
    'contact.email': 'Email',
    'contact.phone': 'Telefono',
    'contact.address': 'Indirizzo',
    'contact.form.title': 'Invia messaggio',
    'contact.form.name': 'Nome',
    'contact.form.name.placeholder': 'Il tuo nome completo',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'Il tuo indirizzo email',
    'contact.form.subject': 'Oggetto',
    'contact.form.subject.placeholder': 'Di cosa tratta il tuo messaggio?',
    'contact.form.message': 'Messaggio',
    'contact.form.message.placeholder': 'Come possiamo aiutarti?',
    'contact.form.submit': 'Invia messaggio',
    'contact.form.success': 'Grazie per il tuo messaggio. Ti risponderemo presto.',
    
    // Memory uploader
    'memoryUploader.createMemory': 'Crea ricordo',
    'memoryUploader.completeOrder': 'Completa ordine',
    'memoryUploader.step': 'Passo',
    'memoryUploader.of': 'di',
    'memoryUploader.step1Title': 'Scegli tipo di prodotto e informazioni',
    'memoryUploader.step2Title': 'Aggiungi foto e video',
    'memoryUploader.step3Title': 'Seleziona canzone preferita',
    'memoryUploader.step4Title': 'Rivedi e conferma',
    'memoryUploader.selectCategory': 'Scegli categoria prodotto',
    'memoryUploader.memoraTag': 'Memora Tag',
    'memoryUploader.memoraFrame': 'Memora Frame',
    'memoryUploader.memoraTagDescription': 'Piastra NFC semplice per ricordi digitali',
    'memoryUploader.memoraFrameDescription': 'Con foto personale in cornice',
    'memoryUploader.deceasedName': 'Nome del/della defunto/a',
    'memoryUploader.fullName': 'Nome completo',
    'memoryUploader.birthDate': 'Data di nascita',
    'memoryUploader.deathDate': 'Data di morte',
    'memoryUploader.framePhoto': 'Foto per la cornice',
    'memoryUploader.selectFramePhoto': 'Seleziona foto per la cornice',
    'memoryUploader.framePhotoPreview': 'Anteprima foto cornice',
    'memoryUploader.personalMessage': 'Messaggio personale',
    'memoryUploader.personalMessagePlaceholder': 'Un messaggio personale o una citazione...',
    'memoryUploader.uploadPhotos': 'Carica foto',
    'memoryUploader.clickToSelectPhotos': 'Clicca qui per selezionare le foto',
    'memoryUploader.photoFormats': 'JPG, PNG o GIF (max. 10MB)',
    'memoryUploader.photoPreview': 'Anteprima foto',
    'memoryUploader.preview': 'Anteprima',
    'memoryUploader.uploadVideo': 'Carica video',
    'memoryUploader.clickToSelectVideo': 'Clicca qui per selezionare un video',
    'memoryUploader.videoFormats': 'MP4, MOV o AVI (max. 50MB)',
    'memoryUploader.favoriteSong': 'Canzone preferita',
    'memoryUploader.clickToUploadSong': 'Clicca qui per caricare una canzone',
    'memoryUploader.audioFormats': 'MP3 o WAV (max. 10MB)',
    'memoryUploader.orLinkSpotify': 'O incolla link Spotify/YouTube',
    'memoryUploader.linkPlaceholder': 'es. https://open.spotify.com/track/...',
    'memoryUploader.musicExplanation': 'La musica verrà riprodotta quando tocchi la piastra NFC con il telefono, insieme a immagini e video, per creare un\'esperienza completa di ricordo.',
    'memoryUploader.plateReady': 'La tua piastra NFC è pronta per l\'ordine',
    'memoryUploader.mediaUploaded': 'Tutti i media sono stati caricati con successo.',
    'memoryUploader.price': 'Prezzo:',
    'memoryUploader.orderConfirmation': 'Dopo aver completato l\'ordine, riceverai un\'email di conferma con tutti i dettagli e la pianificazione della consegna.',
    'memoryUploader.deliveryAddress': 'Indirizzo di consegna',
    'memoryUploader.fullDeliveryAddress': 'Indirizzo di consegna completo',
    'memoryUploader.back': 'Indietro',
    'memoryUploader.next': 'Avanti',
    'memoryUploader.orderNow': 'Ordina ora',
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