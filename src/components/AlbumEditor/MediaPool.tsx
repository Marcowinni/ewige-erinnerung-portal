import { useDroppable } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Play, Check } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { EditorMediaItem } from '@/hooks/useAlbumPages'

export const POOL_ID = '__pool__'

function PoolThumb({ item }: { item: EditorMediaItem }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    data: { type: 'media', mediaId: item.id, fromPageId: null },
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
      {...attributes}
      {...listeners}
      className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing relative touch-none"
    >
      {item.kind === 'image' ? (
        <img src={item.previewUrl} alt="" className="w-full h-full object-cover" />
      ) : (
        <>
          <video
            src={item.previewUrl}
            className="w-full h-full object-cover opacity-80"
            preload="metadata"
            muted
            playsInline
            onLoadedMetadata={(e) => {
              e.currentTarget.currentTime = 0.5
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="w-4 h-4 text-white drop-shadow" />
          </div>
        </>
      )}
    </div>
  )
}

interface Props {
  media: EditorMediaItem[]
  unassignedIds: string[]
}

export function MediaPool({ media, unassignedIds }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: POOL_ID, data: { type: 'pool' } })

  const unassigned = unassignedIds
    .map((id) => media.find((m) => m.id === id))
    .filter(Boolean) as EditorMediaItem[]

  return (
    <motion.div
      layout
      className={cn(
        'memorial-card rounded-2xl px-4 py-3 border-2 transition-all duration-200',
        isOver ? 'border-memorial-bronze shadow-[0_0_0_3px_hsl(var(--memorial-bronze)/0.18)]' : 'border-memorial-line'
      )}
    >
      <p className="text-[10px] uppercase tracking-widest text-memorial-ink-soft mb-3 flex items-center gap-2">
        Nicht zugeordnet
        {unassigned.length === 0 && (
          <span className="flex items-center gap-1 text-memorial-sage-deep">
            <Check className="w-3 h-3" />
            Alle zugeordnet
          </span>
        )}
      </p>

      <SortableContext items={unassigned.map((m) => m.id)} strategy={horizontalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            'flex gap-2 overflow-x-auto pb-1 min-h-[5rem]',
            unassigned.length === 0 && 'items-center justify-center'
          )}
        >
          {unassigned.length === 0 ? (
            <p className="text-[12px] text-memorial-ink-soft/50 italic">
              Hierher ziehen zum Entfernen
            </p>
          ) : (
            unassigned.map((m) => <PoolThumb key={m.id} item={m} />)
          )}
        </div>
      </SortableContext>
    </motion.div>
  )
}
