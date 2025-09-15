import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Check } from "lucide-react";
import type { UploaderCopy } from "@/data/content/types";

interface LocalMusicCardProps {
  filename: string;
  title: string;
  selected: boolean;
  onSelect: () => void;
  copy: UploaderCopy;
}

const LocalMusicCard = ({ filename, title, selected, onSelect, copy }: LocalMusicCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <Card className={`cursor-pointer transition-all ${selected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm">{title}</h4>
          {selected && <Check className="h-4 w-4 text-primary" />}
        </div>
        
        <audio
          ref={audioRef}
          src={`/music/${filename}`}
          onEnded={handleAudioEnd}
          preload="metadata"
        />
        
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={togglePlay}
            className="flex-1"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3 w-3 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3 w-3 mr-1" />
                {copy.step3Fields.playButton}
              </>
            )}
          </Button>
          
          <Button
            type="button"
            size="sm"
            variant={selected ? "default" : "outline"}
            onClick={onSelect}
            disabled={selected}
          >
            {selected ? copy.step3Fields.selectedLabel : copy.step3Fields.selectButton}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalMusicCard;