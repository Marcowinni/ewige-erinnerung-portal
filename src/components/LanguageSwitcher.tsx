import { useContent } from '@/contexts/ContentContext';
import { Language } from '@/data/content';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContent();

  const languages = [
    { code: 'de' as Language, flag: '🇩🇪', name: 'Deutsch' },
    { code: 'en' as Language, flag: '🇬🇧', name: 'English' },
    { code: 'fr' as Language, flag: '🇫🇷', name: 'Français' },
    { code: 'it' as Language, flag: '🇮🇹', name: 'Italiano' },
  ];

  const currentLang = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-9 w-9 p-0"
          aria-label="Sprache auswählen"
          title={`Sprache: ${currentLang.name}`}
        >
          <span className="font-semibold uppercase text-xs">{currentLang.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-0">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onSelect={() => setLanguage(lang.code)} className="gap-2">
            <span className="text-base">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;