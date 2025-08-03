import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Challenge } from '@/types';
import { cn } from '@/lib/utils';

interface ChallengePreviewCardProps {
  challenge: Challenge;
  className?: string;
}

export function ChallengePreviewCard({ challenge, className }: ChallengePreviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);

  const nextExample = () => {
    if (challenge.examples) {
      setCurrentExample((prev) => (prev + 1) % challenge.examples!.length);
    }
  };

  return (
    <motion.div
      className={cn(
        "relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Animated gradient border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(45deg, 
            var(--primary) 0%, 
            var(--accent) 50%, 
            var(--primary) 100%)`
        }}
      />
      <motion.div
        className="absolute inset-[1px] bg-card/90 backdrop-blur-sm rounded-xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold font-sans mb-2 text-foreground">
              Today's Challenge
            </h3>
            <p className="text-sm text-muted-foreground font-serif leading-relaxed">
              {challenge.description}
            </p>
          </div>
          <motion.div
            className="ml-4 flex-shrink-0"
            animate={{ rotate: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl">🎯</span>
          </motion.div>
        </div>

        {/* Interactive code example */}
        {challenge.examples && challenge.examples.length > 0 && (
          <motion.div
            className="bg-muted/30 rounded-lg p-4 cursor-pointer select-none"
            onClick={nextExample}
            whileTap={{ scale: 0.98 }}
            animate={{
              backgroundColor: isHovered ? 'var(--muted)' : 'var(--muted)/30'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                Example {currentExample + 1} of {challenge.examples.length}
              </span>
              <motion.span
                className="text-xs text-muted-foreground"
                animate={{ opacity: isHovered ? 1 : 0.6 }}
              >
                Click to cycle →
              </motion.span>
            </div>
            <motion.code
              className="text-sm font-mono text-foreground block"
              key={currentExample}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {challenge.examples[currentExample]}
            </motion.code>
          </motion.div>
        )}

        {/* Tags with animation */}
        <div className="flex flex-wrap gap-2 mt-4">
          {challenge.tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/50 text-secondary-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}