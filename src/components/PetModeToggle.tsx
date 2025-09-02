import { Button } from "@/components/ui/button";
import { usePetMode } from "@/contexts/PetModeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, PawPrint } from "lucide-react";

const PetModeToggle = () => {
  const { mode, setMode, isPetMode } = usePetMode();
  const { t } = useLanguage();

  const toggleMode = () => {
    setMode(isPetMode ? 'human' : 'pet');
  };

  return (
    <Button
      onClick={toggleMode}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 border-primary/20 hover:border-primary/40 transition-colors"
    >
      {isPetMode ? (
        <>
          <Heart className="w-4 h-4" />
          <span className="hidden sm:inline">{t('mode.human')}</span>
        </>
      ) : (
        <>
          <PawPrint className="w-4 h-4" />
          <span className="hidden sm:inline">{t('mode.pet')}</span>
        </>
      )}
    </Button>
  );
};

export default PetModeToggle;