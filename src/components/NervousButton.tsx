import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NervousButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
  disabled?: boolean;
}

interface MousePosition {
  x: number;
  y: number;
}

interface ButtonPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function NervousButton({
  children = "Click me... if you can",
  className,
  variant = 'default',
  size = 'lg',
  onClick,
  disabled = false,
}: NervousButtonProps) {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [buttonPos, setButtonPos] = useState<ButtonPosition>({ x: 0, y: 0, width: 0, height: 0 });
  const [nervousness, setNervousness] = useState(0);
  const [evasiveOffset, setEvasiveOffset] = useState({ x: 0, y: 0 });
  const [buttonText, setButtonText] = useState(children);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Track mouse position globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Update button position when it moves or on resize
  useEffect(() => {
    const updateButtonPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        });
      }
    };
    
    updateButtonPosition();
    window.addEventListener('resize', updateButtonPosition);
    window.addEventListener('scroll', updateButtonPosition);
    
    const observer = new ResizeObserver(updateButtonPosition);
    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', updateButtonPosition);
      window.removeEventListener('scroll', updateButtonPosition);
      observer.disconnect();
    };
  }, [evasiveOffset]);
  
  // Calculate nervousness and handle evasive behavior
  useEffect(() => {
    if (buttonPos.width === 0) return;
    
    // Calculate distance from mouse to button center
    const dx = mousePos.x - buttonPos.x;
    const dy = mousePos.y - buttonPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Nervousness increases as mouse gets closer (within 200px)
    const maxDistance = 200;
    const rawNervousness = Math.max(0, (maxDistance - distance) / maxDistance) * 100;
    setNervousness(rawNervousness);
    
    // Evasive movement when nervousness is high (>40)
    if (rawNervousness > 40 && !disabled) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        // Calculate available movement space
        const maxMoveX = Math.min(100, (containerRect.width - buttonPos.width) / 2);
        const maxMoveY = Math.min(50, (containerRect.height - buttonPos.height) / 2);
        
        // Move away from mouse, but within container bounds
        const moveIntensity = (rawNervousness - 40) / 60; // 0 to 1
        const moveX = -Math.sign(dx) * moveIntensity * maxMoveX;
        const moveY = -Math.sign(dy) * moveIntensity * maxMoveY * 0.5; // Less vertical movement
        
        setEvasiveOffset({ x: moveX, y: moveY });
      }
    } else {
      // Return to center when not nervous
      setEvasiveOffset({ x: 0, y: 0 });
    }
    
    // Update button text based on nervousness
    if (rawNervousness > 80) {
      setButtonText("Please no...");
    } else if (rawNervousness > 60) {
      setButtonText("Wait, what?");
    } else if (rawNervousness > 30) {
      setButtonText("Hey, stay back!");
    } else {
      setButtonText(children);
    }
  }, [mousePos, buttonPos, children, disabled]);
  
  // Jitter animation based on nervousness
  useEffect(() => {
    if (nervousness > 20 && !disabled) {
      const jitterIntensity = Math.min(nervousness / 100, 1);
      const maxJitter = 3 * jitterIntensity;
      
      // Create jitter animation
      controls.start({
        x: evasiveOffset.x + (Math.random() - 0.5) * maxJitter * 2,
        y: evasiveOffset.y + (Math.random() - 0.5) * maxJitter * 2,
        transition: {
          duration: 0.1,
          ease: "easeOut",
        },
      });
      
      // Continue jittering while nervous
      const jitterInterval = setInterval(() => {
        if (nervousness > 20) {
          controls.start({
            x: evasiveOffset.x + (Math.random() - 0.5) * maxJitter * 2,
            y: evasiveOffset.y + (Math.random() - 0.5) * maxJitter * 2,
            transition: {
              duration: 0.1,
              ease: "easeOut",
            },
          });
        }
      }, 100);
      
      return () => clearInterval(jitterInterval);
    } else {
      // Smooth return to evasive position
      controls.start({
        x: evasiveOffset.x,
        y: evasiveOffset.y,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      });
    }
  }, [nervousness, evasiveOffset, controls, disabled]);
  
  const handleClick = () => {
    if (nervousness < 30 && onClick) {
      onClick();
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative inline-block min-w-[300px] min-h-[100px] flex items-center justify-center"
    >
      <motion.div
        animate={controls}
        className="relative"
      >
        <Button
          ref={buttonRef}
          variant={variant}
          size={size}
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            "transition-all duration-200 select-none",
            nervousness > 60 && "bg-orange-500 hover:bg-orange-600 text-white",
            nervousness > 80 && "bg-red-500 hover:bg-red-600 text-white scale-95",
            nervousness > 20 && "shadow-lg",
            className
          )}
          style={{
            cursor: nervousness > 30 ? 'pointer' : 'pointer',
          }}
        >
          {buttonText}
        </Button>
        
        {/* Nervousness indicator (optional visual feedback) */}
        {nervousness > 0 && (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Nervousness: {Math.round(nervousness)}%
          </motion.div>
        )}
        
        {/* Sweat drops when very nervous */}
        {nervousness > 70 && (
          <motion.div
            className="absolute -top-2 right-2 text-blue-400"
            animate={{
              y: [0, 10, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💧
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}