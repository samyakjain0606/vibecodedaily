export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'chill' | 'deep' | 'wild';
  estimatedTime: string;
  tags: string[];
  dateCreated: string;
  examples?: string[];
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export type Theme = 'light' | 'dark';