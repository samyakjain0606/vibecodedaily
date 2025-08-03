import { cn } from '@/lib/utils';
import type { Challenge } from '@/types';

interface DifficultyBadgeProps {
  difficulty: Challenge['difficulty'];
  className?: string;
}

const difficultyConfig = {
  chill: {
    label: 'Chill',
    style: 'bg-[oklch(0.6531_0.1131_240.2984_/_0.1)] text-[oklch(0.6531_0.1131_240.2984)] border-[oklch(0.6531_0.1131_240.2984_/_0.2)]',
    icon: '●'
  },
  deep: {
    label: 'Deep',
    style: 'bg-[oklch(0.7357_0.1641_34.7091_/_0.1)] text-[oklch(0.7357_0.1641_34.7091)] border-[oklch(0.7357_0.1641_34.7091_/_0.2)]',
    icon: '▲'
  },
  wild: {
    label: 'Wild',
    style: 'bg-[oklch(0.6831_0.1514_142.4956_/_0.1)] text-[oklch(0.6831_0.1514_142.4956)] border-[oklch(0.6831_0.1514_142.4956_/_0.2)]',
    icon: '★'
  }
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium uppercase tracking-wide font-sans',
        config.style,
        className
      )}
    >
      <span className="text-sm" aria-hidden="true">{config.icon}</span>
      {config.label}
    </span>
  );
}