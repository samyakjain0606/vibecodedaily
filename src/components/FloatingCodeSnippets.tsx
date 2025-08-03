import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { floatingCodeSnippets } from '@/data/sampleChallenge';

interface FloatingSnippet {
  id: number;
  text: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export function FloatingCodeSnippets() {
  const [snippets, setSnippets] = useState<FloatingSnippet[]>([]);

  useEffect(() => {
    const generateSnippets = () => {
      const newSnippets: FloatingSnippet[] = floatingCodeSnippets.map((text, index) => ({
        id: index,
        text,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 8 + Math.random() * 4
      }));
      setSnippets(newSnippets);
    };

    generateSnippets();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snippets.map((snippet) => (
        <motion.div
          key={snippet.id}
          className="absolute text-xs font-mono text-muted-foreground/30 select-none"
          initial={{
            x: `${snippet.x}%`,
            y: `${snippet.y}%`,
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            x: [`${snippet.x}%`, `${(snippet.x + 20) % 100}%`, `${(snippet.x + 40) % 100}%`],
            y: [`${snippet.y}%`, `${(snippet.y + 30) % 100}%`, `${(snippet.y + 60) % 100}%`],
            opacity: [0, 0.6, 0.4, 0],
            scale: [0.8, 1, 1.1, 0.9],
            rotate: [0, 5, -3, 2]
          }}
          transition={{
            duration: snippet.duration,
            delay: snippet.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {snippet.text}
        </motion.div>
      ))}
    </div>
  );
}