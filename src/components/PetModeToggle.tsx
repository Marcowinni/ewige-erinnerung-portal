import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import { Heart, PawPrint } from "lucide-react";

const PetModeToggle = () => {
  const { mode, setMode, isPetMode, sharedContent } = useContent();

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
          <span className="hidden sm:inline">{sharedContent.navigation.mode.human}</span>
        </>
      ) : (
        <>
          <PawPrint className="w-4 h-4" />
          <span className="hidden sm:inline">{sharedContent.navigation.mode.pet}</span>
        </>
      )}
    </Button>
  );
};

export default PetModeToggle;