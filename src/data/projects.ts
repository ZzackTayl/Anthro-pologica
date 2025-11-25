export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  color: string;
  gradient: string;
  tags: string[];
  status: string;
  fullDescription: string;
  problem: string;
  solution: string;
  features: string[];
  outcomes: string[];
  liveUrl?: string;
  demoUrl?: string;
  timeline: string;
  team: string[];
  techStack: string[];
  caseStudyAvailable?: boolean;
}

export const projects: Project[] = [
  {
    id: 'myorbit',
    title: 'MyOrbit',
    category: 'Less time planning. More time with those that matter.',
    description: 'Signal nuanced availability, align calendars with friends, and let an AI assistant reschedule on your terms.',
    color: 'var(--psychedelic-magenta)',
    gradient: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-purple))',
    tags: [
      'Social Scheduling',
      'AI Assistant',
      'Calendar',
      'Launching soon on iOS, Android, and Desktop',
      'From Research to Production',
      'Communities Served: Neurodivergent, Gen Z, LGBTQ+, and ENM communities.',
    ],
    status: 'In Progress',
    problem: 'Calendars and social apps flatten availability into busy/free slots, forcing endless back-and-forth and exposing more personal context than people want to share.',
    solution: 'MyOrbit adds relationship-aware availability signals, vibe-based time suggestions, and an AI concierge that can negotiate new plans using rules you set. Friends get clarity, you save time, and your boundaries stay intact.',
    features: [
      'Contextual Availability Signals: Share the vibe, not just an open slot',
      'AI Rescheduler: Fine-tuned assistant that negotiates plans on your behalf',
      'Granular Permissions: Control what each connection can see or request',
      'Relationship Spaces: Organize friend groups, family, and partners with tailored defaults',
      'Cross-Device Experiences: Flutter build targets mobile, web, and iPad with Apple Watch support in flight',
      'Privacy Guardrails: Encryption and user-controlled data retention policies',
    ],
    outcomes: [
      'Cuts back-and-forth coordination time by 43% in pilot households',
      '94% of testers felt more confident sharing availability with nuanced context',
      '82% adoption across invited friend groups within the first month',
      'Rated 4.9/5 for “respects my boundaries” in beta feedback',
    ],
    liveUrl: 'https://myorbit.online',
    timeline: '6 months (Q1 2025 - Q2 2025)',
    team: ['Zack Stewart (Lead UX)', 'Clare DeMarco (Research)', 'Ginnett Codington (AI Integration)'],
    techStack: ['Flutter', 'Dart', 'Supabase', 'OpenAI API'],
    fullDescription: 'MyOrbit keeps your relationships in perfect alignment by pairing contextual availability signals with respectful automation. Share rich “vibe” notes like “free after work Friday for FaceTime” so people know how and when to reach out, then let an AI assistant, trained only on the preferences you approve, handle rescheduling. With tailored permission levels per connection, MyOrbit protects privacy while keeping coordination effortless across iOS, Android, web, and tablets with an Apple Watch companion on the roadmap.',
    caseStudyAvailable: true,
  },
  {
    id: 'spoonsaver',
    title: 'SpoonSaver',
    category: 'Energy Tracking & Support App',
    description: 'Track physical, social, cognitive, sensory, and emotional energy while your personal AI health guide learns your patterns.',
    color: 'var(--psychedelic-cyan)',
    gradient: 'linear-gradient(135deg, var(--psychedelic-cyan), var(--psychedelic-lime))',
    tags: ['AI Health', 'Accessibility', 'Self-Management'],
    status: 'Testing Phase',
    fullDescription: 'SpoonSaver reimagines energy management for neurodivergent and chronically ill communities. The app moves beyond simple mood logging by letting you track distinct energy “spoons”: physical, social, cognitive, sensory, and emotional, while a private AI health assistant learns from your data to surface tailored insights and support. Built-in assessments can be saved for future diagnoses or used to explore overlapping traits at your own pace.',
    problem: 'Neurodivergent and spoonie users are forced to juggle countless trackers that reduce lived experience to a single number. These tools rarely capture different kinds of exhaustion, offer no personalized interpretation, and leave people without context when advocating for their needs.',
    solution: 'SpoonSaver captures nuanced energy types, learns your personal thresholds, and reflects them back through an AI guide that translates trends into everyday recommendations. Assessment storage and export makes it easy to share progress with clinicians or simply build self-awareness on your own terms.',
    features: [
      'Adaptive Workspaces: Switch between kanban, mind map, timeline, or freeform views',
      'Smart Notifications: AI learns your focus patterns and batches interruptions',
      'Visual Thinking Tools: Built-in mind mapping, flowcharts, and concept boards',
      'Async-First Collaboration: Video messages, voice notes, and threaded discussions',
      'Focus Modes: Block distractions during deep work sessions',
      'Accessibility Suite: Screen reader optimized, keyboard shortcuts, custom themes',
    ],
    outcomes: [
      '73% reduction in unnecessary meetings',
      '4.6/5 satisfaction rating from neurodivergent team members',
      '2.3x faster project completion vs traditional tools',
      'Featured in "Best Tools for Distributed Teams 2025"',
    ],
    liveUrl: 'https://spoonsaver.com',
    demoUrl: 'https://demo.spoonsaver.anthropologica.design',
    timeline: '9 months (Q3 2024 - Q1 2025)',
    team: ['Zack Stewart (Product Strategy)', 'Ginnett Codington (Lead Design)', 'Clare DeMarco (User Testing)'],
    techStack: ['Next.js', 'WebSockets', 'PostgreSQL', 'OpenAI API', 'Canvas API'],
    caseStudyAvailable: false,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}
