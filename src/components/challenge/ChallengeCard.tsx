import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DifficultyBadge } from './DifficultyBadge';
import type { Challenge } from '@/types';

interface ChallengeCardProps {
  challenge: Challenge;
  className?: string;
  variant?: 'default' | 'featured';
}

export function ChallengeCard({ challenge, className, variant = 'default' }: ChallengeCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const isFeature = variant === 'featured';

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-lg border bg-card p-6 transition-all duration-300 ease-out',
        'hover:shadow-lg hover:border-primary/50 hover:-translate-y-1',
        'before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-primary before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-100',
        isFeature && 'border-primary/30 shadow-md ring-1 ring-primary/10',
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <DifficultyBadge difficulty={challenge.difficulty} />
        <time className="text-xs text-muted-foreground font-mono">
          {new Date(challenge.dateCreated).toLocaleDateString()}
        </time>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className={cn(
          'font-semibold leading-tight text-foreground group-hover:text-primary transition-colors',
          isFeature ? 'text-xl' : 'text-lg'
        )}>
          {challenge.title}
        </h3>
        
        <p className={cn(
          'text-muted-foreground leading-relaxed line-clamp-3',
          isFeature ? 'text-base' : 'text-sm'
        )}>
          {challenge.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-wrap gap-1">
            {challenge.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground font-mono"
              >
                {tag}
              </span>
            ))}
            {challenge.tags.length > 2 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{challenge.tags.length - 2}
              </span>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground font-mono">
            {challenge.estimatedTime}
          </div>
        </div>
      </div>
    </motion.div>
  );
}