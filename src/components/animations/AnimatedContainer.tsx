import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  staggerChildren?: number;
}

export function AnimatedContainer({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  staggerChildren = 0.1
}: AnimatedContainerProps) {
  
  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay
      }
    }
  };

  const itemVariants = {
    ...animations[animation]
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
}