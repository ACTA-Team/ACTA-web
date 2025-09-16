"use client"

import { useEffect, useState, useMemo, memo } from "react"
import { motion } from "framer-motion"

const SLOWDOWN = 3 // 1 = same; >1 = slower; <1 = faster

const StarsBackground = memo(() => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  const stars = useMemo(() => {
    if (!isClient) return []

    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 2,
      initialX: Math.random() * 120 - 10,
      initialY: Math.random() * 120 - 20,
      // before: Math.random() * 12 + 8  (8s to 20s)
      duration: (Math.random() * 12 + 8) * SLOWDOWN, // now slower
      delay: Math.random() * 20, // you can increase it a bit if you want more "pauses"
      opacity: Math.random() * 0.7 + 0.3,
    }))
  }, [isClient])

  if (!isClient) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.initialX}%`,
            top: `${star.initialY}%`,
          }}
          animate={{
            x: [0, -screenSize.width * 1.2],
            y: [0, screenSize.height * 1.2],
            opacity: [0, star.opacity, star.opacity, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
})

StarsBackground.displayName = "StarsBackground"
export default StarsBackground
