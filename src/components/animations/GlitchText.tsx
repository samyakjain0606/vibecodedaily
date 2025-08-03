import { motion, useAnimation } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  triggerOnHover?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
  delay?: number;
}

export function GlitchText({ 
  children, 
  className = '', 
  triggerOnHover = true, 
  intensity = 'medium',
  delay = 0 
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const controls = useAnimation();
  const textRef = useRef<HTMLSpanElement>(null);

  const glitchIntensity = {
    light: { x: [-1, 1, -1], duration: 0.1, repeat: 2 },
    medium: { x: [-2, 2, -2, 0], duration: 0.15, repeat: 3 },
    heavy: { x: [-4, 4, -2, 2, -1, 0], duration: 0.2, repeat: 4 }
  };

  const startGlitch = async () => {
    if (isGlitching) return;
    setIsGlitching(true);

    // Add glitch class for CSS effects
    if (textRef.current) {
      textRef.current.classList.add('glitch-active');
    }

    // Run the glitch animation
    await controls.start({
      ...glitchIntensity[intensity],
      transition: {
        duration: glitchIntensity[intensity].duration,
        repeat: glitchIntensity[intensity].repeat,
        ease: 'easeInOut'
      }
    });

    // Clean up
    if (textRef.current) {
      textRef.current.classList.remove('glitch-active');
    }
    setIsGlitching(false);
  };

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        startGlitch();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  const handleHover = () => {
    if (triggerOnHover) {
      startGlitch();
    }
  };

  return (
    <motion.span
      ref={textRef}
      className={`inline-block relative ${className}`}
      animate={controls}
      onHoverStart={handleHover}
      style={{
        textShadow: isGlitching ? 
          '2px 0 oklch(0.75 0.25 142), -2px 0 oklch(0.65 0.30 240)' : 
          'none'
      }}
    >
      {children}
    </motion.span>
  );
}