import type { Challenge } from '@/types';

export const todaysChallenge: Challenge = {
  id: 'challenge-001',
  title: 'Nervous Button',
  description: 'Create a button that gets increasingly nervous when users hover near it. The closer you get, the more it should shake, change colors, or try to escape. Make it endearingly anxious!',
  difficulty: 'chill',
  estimatedTime: '30-60 minutes',
  tags: ['CSS', 'JavaScript', 'Animation', 'UI/UX'],
  dateCreated: new Date().toISOString(),
  examples: [
    'button.addEventListener(\'mousemove\', getAnxious)',
    'transform: translate(${jitter}px, ${jitter}px)',
    'if (nervousness > 80) button.textContent = "Please no..."'
  ]
};

export const sampleChallenges: Challenge[] = [
  {
    id: 'challenge-002',
    title: 'Sad Todo App',
    description: 'Build a todo app that gets emotionally attached to tasks. When you try to delete items, it pleads with you. Completed tasks make it happy, but removing them makes it cry.',
    difficulty: 'chill',
    estimatedTime: '45-60 minutes',
    tags: ['React', 'State Management', 'Emotional UX', 'Animation'],
    dateCreated: '2024-08-02T00:00:00.000Z',
    examples: [
      'const sadness = deletedTasks.length * 10',
      'if (isDeleting) showPleadingMessage()',
      'tasks.forEach(task => task.emotionalBond++)'
    ]
  },
  {
    id: 'challenge-003',
    title: 'Color Dating App',
    description: 'Colors have preferences too! Create a matching system where colors swipe on each other based on complementary relationships, temperature, and saturation compatibility.',
    difficulty: 'deep',
    estimatedTime: '2-3 hours',
    tags: ['Color Theory', 'Algorithms', 'UI Design', 'Canvas'],
    dateCreated: '2024-08-01T00:00:00.000Z',
    examples: [
      'const compatibility = calculateColorHarmony(color1, color2)',
      'if (Math.abs(hue1 - hue2) === 180) return "perfect match!"',
      'swipeRight("#FF5733", "#33FF57")'
    ]
  },
  {
    id: 'challenge-004',
    title: 'Gravity UI Elements',
    description: 'Build a web page where all UI elements are affected by gravity. Buttons fall down, text floats up if it\'s light enough, and you need to catch flying form inputs to fill them out.',
    difficulty: 'wild',
    estimatedTime: '1-2 days',
    tags: ['Physics', 'Canvas', 'Game Development', 'Creative UX'],
    dateCreated: '2024-07-31T00:00:00.000Z',
    examples: [
      'element.velocity.y += gravity * deltaTime',
      'if (element.mass < airResistance) element.floats = true',
      'collision.detect(element, groundLevel)'
    ]
  },
  {
    id: 'challenge-005',
    title: 'Paradox Programming Challenge',
    description: 'Create a function that only works when it doesn\'t work. Design a system where errors are features, bugs are intentional, and the more broken it appears, the better it functions.',
    difficulty: 'deep',
    estimatedTime: '3-4 hours',
    tags: ['Logic', 'Philosophy', 'Creative Thinking', 'Meta-programming'],
    dateCreated: '2024-07-30T00:00:00.000Z',
    examples: [
      'try { successfullyFail() } catch(win) { return win }',
      'const working = broken ? true : false',
      'if (!isWorking()) celebrate()'
    ]
  },
  {
    id: 'challenge-006',
    title: 'Emotional Buttons Pack',
    description: 'Design a collection of buttons with different personalities - a shy button that hides, an excited button that bounces, an grumpy button that reluctantly works, and a dramatic button that overreacts.',
    difficulty: 'chill',
    estimatedTime: '45-90 minutes',
    tags: ['CSS Animation', 'Personality Design', 'Micro-interactions'],
    dateCreated: '2024-07-29T00:00:00.000Z',
    examples: [
      'shyButton.addEventListener("hover", () => fadeAway())',
      'excitedButton.style.animation = "bounce 0.5s infinite"',
      'grumpyButton.onclick = () => grudginglyExecute()'
    ]
  },
  {
    id: 'challenge-007',
    title: 'Time Warp Clock',
    description: 'Build a clock that doesn\'t respect linear time. Sometimes it runs backwards, occasionally skips ahead, takes lunch breaks, or gets distracted and forgets what time it was showing.',
    difficulty: 'wild',
    estimatedTime: '4-6 hours',
    tags: ['Time Manipulation', 'Creative Logic', 'Animation', 'Randomness'],
    dateCreated: '2024-07-28T00:00:00.000Z',
    examples: [
      'if (Math.random() < 0.1) time.reverse()',
      'clock.takeBreak(Math.random() * 30000)',
      'if (confused) display.show("Time? What is time?")'
    ]
  },
  {
    id: 'challenge-008',
    title: 'Impossible Scrollbar',
    description: 'Create a scrollbar that has its own agenda. Sometimes it scrolls sideways when you expect vertical, other times it scrolls content in the opposite direction, or decides to scroll multiple elements at once.',
    difficulty: 'deep',
    estimatedTime: '2-3 hours',
    tags: ['Scroll Events', 'UI Subversion', 'Creative UX', 'JavaScript'],
    dateCreated: '2024-07-27T00:00:00.000Z',
    examples: [
      'scroll.addEventListener("wheel", (e) => doOpposite(e))',
      'if (feeling_rebellious) scrollSideways()',
      'element.scrollTop = randomElement.scrollTop'
    ]
  },
  {
    id: 'challenge-009',
    title: 'Dancing Cursor',
    description: 'Make the cursor choreograph a dance routine when users aren\'t actively clicking or typing. The longer they\'re idle, the more elaborate the performance becomes.',
    difficulty: 'chill',
    estimatedTime: '30-45 minutes',
    tags: ['CSS Cursors', 'Animation', 'Idle Detection', 'Performance'],
    dateCreated: '2024-07-26T00:00:00.000Z',
    examples: [
      'let idleTime = 0; setInterval(() => idleTime++, 1000)',
      'if (idleTime > 5) cursor.startDancing()',
      'cursor.style.animation = "waltz 2s infinite"'
    ]
  }
];

export const allChallenges = [todaysChallenge, ...sampleChallenges];

export const floatingCodeSnippets = [
  'const magic = () => "✨"',
  'if (weird) { doIt() }',
  'Array.from(chaos)',
  'element.style.fun = "yes"',
  'console.log("why not?")',
  'Math.random() > creativity',
  'document.querySelector(".impossible")',
  'setTimeout(surprise, ∞)',
  'gravity.apply(button)',
  'color.findSoulmate()',
  'time.reverse()',
  'cursor.dance()'
];