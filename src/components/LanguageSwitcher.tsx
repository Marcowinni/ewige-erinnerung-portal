import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'de' as Language, flag: '🇩🇪', name: 'Deutsch' },
    { code: 'en' as Language, flag: '🇬🇧', name: 'English' },
    { code: 'fr' as Language, flag: '🇫🇷', name: 'Français' },
    { code: 'it' as Language, flag: '🇮🇹', name: 'Italiano' },
  ];

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage(lang.code)}
          className="text-xs px-2 py-1 h-8"
          title={lang.name}
        >
          <span className="text-sm">{lang.flag}</span>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;