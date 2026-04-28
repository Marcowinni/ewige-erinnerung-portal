import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Particle {
  id: number
  angle: number
  distance: number
}

interface Props {
  active: boolean
  x: number
  y: number
}

export function ParticleBurst({ active, x, y }: Props) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (!active) return
    const count = 12
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: (i / count) * 360,
        distance: 40 + Math.random() * 24,
      }))
    )
    setKey((k) => k + 1)
  }, [active])

  return (
    <div
      className="fixed pointer-events-none z-[100]"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      <AnimatePresence>
        {active &&
          particles.map((p) => {
            const rad = (p.angle * Math.PI) / 180
            const tx = Math.cos(rad) * p.distance
            const ty = Math.sin(rad) * p.distance
            return (
              <motion.div
                key={`${key}-${p.id}`}
                className="absolute rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  left: -2,
                  top: -2,
                  background: `hsl(${27 + p.id * 3},${60 + p.id * 2}%,${50 + p.id}%)`,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: tx, y: ty, opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.75, ease: 'easeOut', delay: p.id * 0.01 }}
              />
            )
          })}
      </AnimatePresence>
    </div>
  )
}
