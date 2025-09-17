import { Button, type ButtonProps } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import { Heart, PawPrint, Sparkles } from "lucide-react";

const PetModeToggle = ({ size = "sm" }: { size?: ButtonProps["size"] }) => {
  const { mode, setMode, sharedContent } = useContent();

  const cycleMode = () => {
    if (mode === "human") return setMode("pet");
    if (mode === "pet") return setMode("surprise");
    return setMode("human");
  };

  const iconAndLabel = () => {
    if (mode === "human") {
      return (
        <>
          <Heart className="w-4 h-4" />
          <span className="hidden sm:inline">{sharedContent.navigation.mode.human}</span>
        </>
      );
    }
    if (mode === "pet") {
      return (
        <>
          <PawPrint className="w-4 h-4" />
          <span className="hidden sm:inline">{sharedContent.navigation.mode.pet}</span>
        </>
      );
    }
    return (
      <>
        <Sparkles className="w-4 h-4" />
        <span className="hidden sm:inline">{sharedContent.navigation.mode.surprise}</span>
      </>
    );
  };

  return (
    <Button
      onClick={cycleMode}
      variant="outline"
      size={size}
      className="gap-2"
      aria-label="Modus wechseln"
      title="Modus wechseln"
    >
      {iconAndLabel()}
    </Button>
  );
};

export default PetModeToggle;