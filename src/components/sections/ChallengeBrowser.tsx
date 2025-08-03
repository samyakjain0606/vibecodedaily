import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Archive } from 'lucide-react';
import { Container } from '@/components/Container';
import { ChallengeCard } from '@/components/challenge/ChallengeCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Challenge } from '@/types';

interface ChallengeBrowserProps {
  challenges: Challenge[];
}

type DifficultyFilter = 'all' | 'chill' | 'deep' | 'wild';

const filterConfig = {
  all: { label: 'All', count: 0 },
  chill: { label: 'Chill', count: 0 },
  deep: { label: 'Deep', count: 0 },
  wild: { label: 'Wild', count: 0 }
};

export function ChallengeBrowser({ challenges }: ChallengeBrowserProps) {
  const [activeFilter, setActiveFilter] = useState<DifficultyFilter>('all');

  // Calculate counts for each difficulty
  const counts = challenges.reduce((acc, challenge) => {
    acc[challenge.difficulty]++;
    acc.all++;
    return acc;
  }, { all: 0, chill: 0, deep: 0, wild: 0 } as Record<DifficultyFilter, number>);

  const filteredChallenges = activeFilter === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.difficulty === activeFilter);

  const browserVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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

  const cardsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.section 
      className="py-16 lg:py-24 bg-muted/20"
      variants={browserVariants}
      initial="hidden"
      animate="visible"
    >
      <Container>
        <div className="space-y-8">
          {/* Section Header */}
          <motion.div 
            className="text-center space-y-3"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/10 text-[oklch(0.65_0.30_240)] text-sm font-medium">
              <Archive className="w-4 h-4" />
              Challenge Library
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-brand text-foreground">
              Explore Previous Challenges
            </h2>
            
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive into our collection of weird, wonderful, and surprisingly practical coding challenges
            </p>
          </motion.div>

          {/* Difficulty Filter Tabs */}
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <div className="inline-flex p-1 bg-muted/50 rounded-lg border">
              {(Object.keys(filterConfig) as DifficultyFilter[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 font-brand',
                    'hover:bg-background/80',
                    activeFilter === filter
                      ? 'bg-background text-foreground shadow-sm border'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {filterConfig[filter].label}
                  <span className="ml-1.5 text-xs opacity-70">
                    ({counts[filter]})
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Challenge Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr"
            variants={cardsVariants}
            key={activeFilter} // Trigger re-animation when filter changes
          >
            {filteredChallenges.map((challenge) => (
              <motion.div key={challenge.id} variants={itemVariants} className="h-full">
                <ChallengeCard challenge={challenge} />
              </motion.div>
            ))}
          </motion.div>

          {/* Browse More CTA */}
          <motion.div 
            className="text-center pt-8"
            variants={itemVariants}
          >
            <Button 
              variant="outline" 
              size="lg"
              className="font-brand hover:border-primary hover:text-primary"
            >
              View Full Archive
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}