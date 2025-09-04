import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TagDesignerProps {
  shape: "round" | "square"; // round = 3cm pet tag, square = 6x6cm human tag
}

// A minimal, dependency-free designer to position an image and a text on a tag
// - Drag the image and text inside the design area
// - Adjust image size and text size
export default function TagDesigner({ shape }: TagDesignerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Image state
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imagePos, setImagePos] = useState({ x: 60, y: 60 });
  const [imageSize, setImageSize] = useState(140); // px width

  // Text state
  const [text, setText] = useState("");
  const [textPos, setTextPos] = useState({ x: 80, y: 220 });
  const [textSize, setTextSize] = useState(18);

  // Drag handling
  const dragState = useRef<{ target: "image" | "text" | null; offsetX: number; offsetY: number }>({
    target: null,
    offsetX: 0,
    offsetY: 0,
  });

  const onMouseDown = (e: React.MouseEvent, target: "image" | "text") => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    if (target === "image") {
      dragState.current = { target, offsetX: x - imagePos.x, offsetY: y - imagePos.y };
    } else {
      dragState.current = { target, offsetX: x - textPos.x, offsetY: y - textPos.y };
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.target) return;
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = e.clientX - bounds.left - dragState.current.offsetX;
    const y = e.clientY - bounds.top - dragState.current.offsetY;

    // Confine within container
    const max = 300; // container size
    const nx = Math.max(0, Math.min(max, x));
    const ny = Math.max(0, Math.min(max, y));

    if (dragState.current.target === "image") {
      setImagePos({ x: nx, y: ny });
    } else {
      setTextPos({ x: nx, y: ny });
    }
  };

  const onMouseUp = () => {
    dragState.current = { target: null, offsetX: 0, offsetY: 0 };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const reset = () => {
    setImageSrc("");
    setImagePos({ x: 60, y: 60 });
    setImageSize(140);
    setText("");
    setTextPos({ x: 80, y: 220 });
    setTextSize(18);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tagImage">Bild hochladen</Label>
            <Input id="tagImage" type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageSize">Bildgrösse</Label>
            <input
              id="imageSize"
              type="range"
              min={40}
              max={260}
              value={imageSize}
              onChange={(e) => setImageSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagText">Text</Label>
            <Input
              id="tagText"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Name, Datum, kurzer Text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="textSize">Textgrösse</Label>
            <input
              id="textSize"
              type="range"
              min={10}
              max={40}
              value={textSize}
              onChange={(e) => setTextSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={reset}>Zurücksetzen</Button>
          </div>
        </div>

        {/* Designer */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-center">
            <div
              ref={containerRef}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              className="relative bg-card border border-border"
              style={{ width: 300, height: 300, borderRadius: shape === "round" ? 9999 : 12 }}
            >
              {/* Visual guide */}
              <div
                className={shape === "round" ? "absolute inset-2 rounded-full border-2 border-dashed border-muted" : "absolute inset-2 rounded-lg border-2 border-dashed border-muted"}
              />

              {/* Image */}
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Tag Bild"
                  draggable={false}
                  onMouseDown={(e) => onMouseDown(e, "image")}
                  style={{
                    position: "absolute",
                    left: imagePos.x,
                    top: imagePos.y,
                    width: imageSize,
                    userSelect: "none",
                    cursor: "move",
                  }}
                />
              )}

              {/* Text */}
              {text && (
                <div
                  onMouseDown={(e) => onMouseDown(e, "text")}
                  style={{
                    position: "absolute",
                    left: textPos.x,
                    top: textPos.y,
                    fontSize: textSize,
                    fontFamily: "serif",
                    cursor: "move",
                    userSelect: "none",
                  }}
                >
                  {text}
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-3">
            Vorschau: {shape === "round" ? "Runder 3cm NFC-Tag (Haustier)" : "Rechteck 6×6cm NFC-Tag (Human)"}
          </p>
        </div>
      </div>
    </div>
  );
}
