import { motion } from 'framer-motion';
import { Tag, Lightbulb, CheckCircle, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Challenge } from '@/types';

interface ChallengeDetailsModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
}

export function ChallengeDetailsModal({
  challenge,
  isOpen,
  onClose
}: ChallengeDetailsModalProps) {
  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'chill':
        return 'bg-green-500/20 text-green-700 border-green-500/30 dark:text-green-400';
      case 'deep':
        return 'bg-orange-500/20 text-orange-700 border-orange-500/30 dark:text-orange-400';
      case 'wild':
        return 'bg-red-500/20 text-red-700 border-red-500/30 dark:text-red-400';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getDifficultyEmoji = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'chill':
        return '🌊';
      case 'deep':
        return '🔥';
      case 'wild':
        return '⚡';
      default:
        return '🎯';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };


  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-background border border-border/50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="p-6 space-y-6"
        >
          {/* Header Section */}
          <DialogHeader className="space-y-4">
            <motion.div variants={itemVariants} className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${getDifficultyColor(challenge.difficulty)}`}
                  >
                    <span className="text-base">{getDifficultyEmoji(challenge.difficulty)}</span>
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </span>
                  
                </div>
                
                <DialogTitle className="text-2xl md:text-3xl font-bold font-brand text-foreground leading-tight">
                  {challenge.title}
                </DialogTitle>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                {challenge.description}
              </DialogDescription>
            </motion.div>
          </DialogHeader>

          {/* Tags Section */}
          {challenge.tags && challenge.tags.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Tag className="w-4 h-4" />
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {challenge.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}


          {/* Tips Section */}
          {challenge.tips && challenge.tips.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Lightbulb className="w-4 h-4" />
                Pro Tips
              </div>
              <div className="space-y-2">
                {challenge.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Post on X Section */}
          <motion.div variants={itemVariants} className="pt-4 border-t border-border/50">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ExternalLink className="w-4 h-4" />
              <span>Post it on X tagging</span>
              <a 
                href="https://x.com/paraschopra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                paras chopra
              </a>
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}