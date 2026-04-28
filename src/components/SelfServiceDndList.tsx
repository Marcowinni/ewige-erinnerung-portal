import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Play } from "lucide-react";
import { useState } from "react";

export interface MediaItem {
  id: string;
  file: File;
  previewUrl: string;
  caption: string;
  kind: "image" | "video";
}

interface Props {
  items: MediaItem[];
  onReorder: (items: MediaItem[]) => void;
  onRemove: (id: string) => void;
  onCaptionChange: (id: string, caption: string) => void;
}

function SortableCard({
  item,
  onRemove,
  onCaptionChange,
  isDragging,
}: {
  item: MediaItem;
  onRemove: (id: string) => void;
  onCaptionChange: (id: string, caption: string) => void;
  isDragging?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.85 : 1,
    rotate: isDragging ? "1deg" : "0deg",
    boxShadow: isDragging
      ? "0 12px 32px -8px rgba(30,20,10,0.22), 0 2px 8px -2px rgba(30,20,10,0.12)"
      : undefined,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="memorial-card rounded-xl flex items-center gap-3 p-3"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="flex-shrink-0 cursor-grab active:cursor-grabbing text-memorial-ink-soft hover:text-memorial-ink transition-colors touch-none p-1"
        aria-label="Verschieben"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      {/* Thumbnail */}
      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-memorial-sepia-light relative">
        {item.kind === "image" ? (
          <img
            src={item.previewUrl}
            alt="Vorschau"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <video
              src={item.previewUrl}
              className="w-full h-full object-cover opacity-80"
              preload="metadata"
              muted
              playsInline
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = 0.5;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-5 h-5 text-white drop-shadow" />
            </div>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft mb-1 truncate">
          {item.file.name}
        </p>
        <input
          type="text"
          placeholder="Beschriftung (optional)"
          value={item.caption}
          onChange={(e) => onCaptionChange(item.id, e.target.value)}
          className="memorial-underline-input w-full text-sm text-memorial-ink placeholder:text-memorial-ink-soft/50"
        />
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-memorial-ink-soft hover:text-red-500 hover:bg-red-50 transition-colors"
        aria-label="Entfernen"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function SelfServiceDndList({
  items,
  onReorder,
  onRemove,
  onCaptionChange,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const activeItem = items.find((i) => i.id === activeId) ?? null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  }

  if (items.length === 0) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <SortableCard
              key={item.id}
              item={item}
              onRemove={onRemove}
              onCaptionChange={onCaptionChange}
              isDragging={item.id === activeId}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem && (
          <SortableCard
            item={activeItem}
            onRemove={() => {}}
            onCaptionChange={() => {}}
            isDragging
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
