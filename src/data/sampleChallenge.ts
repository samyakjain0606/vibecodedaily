import type { Challenge } from '@/types';

// Daily rotation challenges - these rotate based on date
const dailyChallenges: Challenge[] = [
  {
    id: 'daily-001',
    title: 'Emotional Calculator',
    description: 'Build a calculator with feelings! It gets happy with multiplication (big numbers = joy!), sad with division (why split things apart?), angry with large numbers (too much to handle!), and celebrates with animations when you get nice round results. Give it a personality that reacts to every operation.',
    difficulty: 'chill',
    estimatedTime: '',
    tags: ['JavaScript', 'Emotional UX', 'Math', 'Animation'],
    dateCreated: '2025-08-05T00:00:00.000Z',
    hasInteractiveComponent: true,
    componentName: 'EmotionalCalculator',
    examples: [
      'if (operation === "*") mood = "happy"; playJoyfulSound()',
      'if (result > 1000) { mood = "overwhelmed"; shake() }',
      'if (operation === "/") { sadFace(); askWhyDivide() }'
    ],
    tips: [
      'Use CSS transforms for emotional reactions (scale, rotate, translate)',
      'Add facial expressions with CSS or emojis that change based on operations',
      'Include sound effects or vibrations for enhanced emotional feedback',
      'Make the calculator "worry" about complex calculations with loading animations'
    ]
  },
  {
    id: 'daily-002',
    title: 'Mouse-Following Face',
    description: 'Create an adorable face that follows your mouse cursor around the screen! The eyes should track the pointer, expressions change based on mouse speed, and it should react differently when you click, hover over elements, or stay idle. Make it feel alive and responsive to your every movement.',
    difficulty: 'chill',
    estimatedTime: '',
    tags: ['Mouse Events', 'CSS Animation', 'Interactive', 'Personality'],
    dateCreated: '2025-08-06T00:00:00.000Z',
    hasInteractiveComponent: true,
    componentName: 'MouseFollowingFace',
    examples: [
      'const eyeX = (mouseX - faceX) / distance * maxEyeMovement',
      'if (mouseSpeed > threshold) expression = "excited"',
      'face.style.transform = `translate(${mouseX}px, ${mouseY}px)`'
    ],
    tips: [
      'Use requestAnimationFrame for smooth eye tracking movement',
      'Calculate angles between face center and mouse position for realistic eye direction',
      'Add personality: wink on click, yawn when idle, surprised face for fast movements',
      'Consider adding blinking animations and subtle breathing effects'
    ]
  },
  {
    id: 'daily-003',
    title: 'Sleepy Night Mode Toggle',
    description: 'Design a night mode toggle that\'s genuinely tired! When switching to dark mode, it should yawn, stretch, rub its eyes, and slowly fade the lights. When switching back to light mode, it wakes up gradually, maybe with a coffee animation. Make the transition feel like watching something fall asleep and wake up.',
    difficulty: 'chill',
    estimatedTime: '',
    tags: ['Theme Toggle', 'CSS Animation', 'State Management', 'Micro-interactions'],
    dateCreated: '2025-08-07T00:00:00.000Z',
    hasInteractiveComponent: true,
    componentName: 'SleepyToggle',
    examples: [
      'if (isDark) { yawn(); stretchArms(); fadeToBlack() }',
      'const wakeUpSequence = ["stretch", "rubEyes", "gradualBrightness"]',
      'toggle.addEventListener("click", () => sleepyCycle())'
    ],
    tips: [
      'Use CSS keyframes for yawning (scale mouth, close eyes briefly)',
      'Implement stretching with transform animations (scaleY for arms)',
      'Add gradual brightness transitions instead of instant theme switches',
      'Include subtle snoring sounds or "zzz" animations when in dark mode'
    ]
  },
  {
    id: 'daily-004',
    title: 'Hungry Progress Bar',
    description: 'Build a progress bar that\'s always hungry for more tasks! As you complete items, it "eats" them with chomping animations, gets fuller and happier, and starts looking around for more food. When it\'s empty, it should look sad and maybe even growl. When full, it should be satisfied and maybe take a little nap.',
    difficulty: 'chill',
    estimatedTime: '',
    tags: ['Progress Bar', 'Animation', 'State Management', 'Gamification'],
    dateCreated: '2025-08-08T00:00:00.000Z',
    hasInteractiveComponent: true,
    componentName: 'HungryProgressBar',
    examples: [
      'const hunger = Math.max(0, 100 - completionPercentage)',
      'if (newTask) { chomp(); belly.grow(); happiness++ }',
      'if (progress === 0) { lookSad(); playGrowlSound() }'
    ],
    tips: [
      'Use CSS clip-path or width animations for the "eating" effect',
      'Add mouth/teeth graphics that open and close during chomping',
      'Include belly expansion animations as tasks are consumed',
      'Add eye movements and expressions that change with hunger level'
    ]
  },
  {
    id: 'daily-005',
    title: 'Insecure Password Field',
    description: 'Create a password input that\'s constantly worried about its strength! It should nervously comment on your password as you type ("Is that strong enough?", "Maybe add a number?"), celebrate when you create something strong, and get anxious about weak passwords. Give it encouraging messages and self-doubt that makes you want to create better passwords.',
    difficulty: 'chill',
    estimatedTime: '',
    tags: ['Form Validation', 'Password Strength', 'Emotional UX', 'Security'],
    dateCreated: '2025-08-09T00:00:00.000Z',
    hasInteractiveComponent: true,
    componentName: 'InsecurePasswordField',
    examples: [
      'if (strength < 30) message = "I\'m worried this isn\'t strong enough... 😰"',
      'if (hasNumbers && hasSymbols) celebrate("You make me feel so secure!")',
      'const encouragements = ["You got this!", "Almost there!", "I believe in you!"]'
    ],
    tips: [
      'Use real-time password strength analysis (length, complexity, patterns)',
      'Add CSS animations for nervous shaking when password is weak',
      'Include encouraging messages that appear at different strength levels',
      'Make celebration animations when strong passwords are achieved (confetti, happy bouncing)'
    ]
  }
];

// Function to get today's challenge based on date
export const getTodaysChallenge = (): Challenge => {
  const today = new Date();
  const startDate = new Date('2025-08-05'); // Aug 5th as day 0
  const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const challengeIndex = daysDiff % dailyChallenges.length;
  return dailyChallenges[challengeIndex >= 0 ? challengeIndex : 0];
};

// Export today's challenge
export const todaysChallenge: Challenge = getTodaysChallenge();

export const sampleChallenges: Challenge[] = [
  {
    id: 'challenge-002',
    title: 'Sad Todo App',
    description: 'Build a todo app that gets emotionally attached to tasks. It pleads when you delete items and cries when removing completed ones.',
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
    description: 'Colors have preferences too! Create a matching system where colors swipe on each other based on complementary relationships and compatibility.',
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
    description: 'Build a web page where all UI elements are affected by gravity. Buttons fall down, text floats up, and you catch flying form inputs.',
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
    description: 'Create a function that only works when it doesn\'t work. Design a system where errors are features and bugs are intentional.',
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
    description: 'Design buttons with different personalities - shy ones that hide, excited ones that bounce, grumpy ones that reluctantly work.',
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
    description: 'Build a clock that doesn\'t respect linear time. It runs backwards, skips ahead, takes breaks, or gets distracted.',
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
    description: 'Create a scrollbar with its own agenda. It scrolls sideways when you expect vertical, or in opposite directions.',
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
    description: 'Make the cursor choreograph a dance routine when users are idle. The longer they wait, the more elaborate it becomes.',
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