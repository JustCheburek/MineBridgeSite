'use client'
import type { SpringOptions } from 'framer-motion'
import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TiltedCardProps {
  scaleOnHover?: number
  rotateAmplitude?: number
  children?: React.ReactNode
  className?: string
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
}

export default function TiltedCard({
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  className,
  children,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), springValues)
  const rotateY = useSpring(useMotionValue(0), springValues)
  const scale = useSpring(1, springValues)
  const opacity = useSpring(0)
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  })

  const [lastY, setLastY] = useState(0)

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude

    rotateX.set(rotationX)
    rotateY.set(rotationY)

    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)

    const velocityY = offsetY - lastY
    rotateFigcaption.set(-velocityY * 0.6)
    setLastY(offsetY)
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover)
    opacity.set(1)
  }

  function handleMouseLeave() {
    opacity.set(0)
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
    rotateFigcaption.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn('size-full relative flex flex-col items-center justify-center [perspective:800px]', className)}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className='relative [transform-style:preserve-3d] *:will-change-transform size-full'
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* <motion.img
          src={imageSrc}
          alt={altText}
          className='absolute left-0 top-0 rounded-[15px] object-cover will-change-transform [transform:translateZ(0)]'
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className='absolute left-0 top-0 z-[2] will-change-transform [transform:translateZ(30px)]'>
            {overlayContent}
          </motion.div>
        )} */}
        {children}
      </motion.div>
    </motion.div>
  )
}
