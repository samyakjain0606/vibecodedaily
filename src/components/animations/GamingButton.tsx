import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GamingButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  scanLine?: boolean;
  glow?: boolean;
}

export function GamingButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  scanLine = true,
  glow = true
}: GamingButtonProps) {
  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 border-2";
  
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-intense border-primary text-primary-foreground",
    secondary: "bg-secondary hover:bg-secondary/90 border-secondary text-secondary-foreground",
    ghost: "bg-transparent hover:bg-primary/10 border-primary/30 hover:border-primary text-primary"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const glowClasses = glow ? {
    primary: "hover:shadow-[0_0_30px_oklch(0.75_0.25_142_/_0.5)]",
    secondary: "hover:shadow-[0_0_30px_oklch(0.70_0.28_25_/_0.5)]",
    ghost: "hover:shadow-[0_0_20px_oklch(0.75_0.25_142_/_0.3)]"
  } : { primary: "", secondary: "", ghost: "" };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowClasses[variant],
        "gaming-button",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {/* Scan line effect */}
      {scanLine && !disabled && (
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-white/60"
          initial={{ x: "-100%" }}
          whileHover={{ 
            x: "100%",
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        />
      )}
      
      {/* Corner brackets */}
      <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-current opacity-60" />
      <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-current opacity-60" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-current opacity-60" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-current opacity-60" />
      
      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Background shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ 
          x: "100%",
          transition: { duration: 1, ease: "easeInOut" }
        }}
      />
    </motion.button>
  );
}