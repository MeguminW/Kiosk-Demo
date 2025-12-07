'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export function SuccessAnimation() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
    >
      <div className="relative">
        {/* Outer ring pulse */}
        <motion.div
          className="absolute inset-0 rounded-full bg-success/20"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Checkmark */}
        <CheckCircle2 className="w-32 h-32 text-success relative z-10" />
      </div>
    </motion.div>
  )
}
