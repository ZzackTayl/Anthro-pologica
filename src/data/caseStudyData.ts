import type {
  CaseStudyData,
  TimelinePhase,
  MetricCard,
  PainPoint,
  CostBreakdownItem,
  ResultMetric,
} from './types';

// Re-export types for component imports
export type { TimelinePhase, MetricCard, PainPoint, CostBreakdownItem, ResultMetric };

export const caseStudyData: CaseStudyData = {
  hero: {
    title: 'MyOrbit Case Study',
    subtitle: 'How UX & Intentional AI Delivered a $150K App for $800 in 6 Months',
    description:
      'In 6 months, a neurodivergent UX team built a calendar app for relationship maintenance that would have cost $150,000 two years ago. We spent $800. The difference? UX methodology guided every decision.',
    metrics: [
      {
        value: '$800',
        label: 'Total Development Cost',
        color: 'var(--vibrant-cyan)',
        emphasis: true,
      },
      {
        value: '6 mo',
        label: 'Time to Beta',
        color: 'var(--vibrant-magenta)',
      },
      {
        value: '99.5%',
        label: 'Cost Savings',
        color: 'var(--vibrant-lime)',
      },
    ],
    cta: {
      text: 'Explore Our Methodology',
      link: '#methodology',
    },
  },

  executiveSummary: {
    hook: 'In 6 months, a neurodivergent UX team built a calendar app for relationship maintenance that would have cost $150,000 two years ago. We spent $800.',
    context: 'The difference? UX methodology guided every decision. We didn\'t just "use AI" — we applied human-centered research principles to know exactly what to build, what to skip, and how to validate every assumption.',
  },

  team: {
    members: [
      {
        name: 'Zack Stewart',
        badges: ['Lead UX', 'Product Strategy', 'ADHD'],
      },
      {
        name: 'Clare DeMarco',
        badges: ['UX Research', 'User Testing', 'Autism'],
      },
      {
        name: 'Ginnett Codington',
        badges: ['AI Integration', 'Development', 'ADHD'],
      },
    ],
  },

  problem: {
    title: 'The Problem We Observed (Not Assumed)',
    intro: 'Most calendars are designed for a world that doesn\'t exist anymore: 9-to-5 work, traditional families, monogamous relationships, one way of experiencing time. But in 2025, that\'s not reality—especially for Gen Z, neurodivergent communities, LGBTQ+ users, and polyamorous folks.',
    featuredQuote: {
      text: 'I spend more time planning when to see my friends than actually seeing them. By the time we find a time that works, I don\'t even want to go anymore.',
      attribution: 'Gen Z User, Age 24',
    },
    painPoints: [
      {
        title: 'Time Blindness',
        currentSolution: 'Multiple alarms, paper calendars, constant anxiety',
        userImpact: 'Missed events, social shame, relationship strain',
        ourApproach: 'Contextual reminders based on relationship importance',
      },
      {
        title: 'Privacy Across Relationships',
        currentSolution: 'Separate calendars, lying by omission',
        userImpact: 'Exhausting mental overhead, fear of exposure',
        ourApproach: 'Granular sharing per person, per event type',
      },
      {
        title: 'Scheduling Friction',
        currentSolution: '12-message text threads to plan one coffee',
        userImpact: 'Motivation evaporates, plans fall through',
        ourApproach: 'AI-assisted availability matching and suggestions',
      },
      {
        title: 'Friendship Drift',
        currentSolution: 'Guilt, sporadic "we should hang out!" texts',
        userImpact: 'Lost friendships, loneliness, regret',
        ourApproach: 'Relationship "orbits" with gentle maintenance nudges',
      },
    ],
    items: [
      {
        title: 'Time Blindness',
        description: 'Users with ADHD struggle with linear time perception and notification fatigue. Existing calendars overwhelm with alerts that don\'t hold attention.',
        icon: 'Clock',
        color: 'var(--vibrant-magenta)',
      },
      {
        title: 'Privacy Across Relationships',
        description: 'Binary sharing (all-or-nothing) doesn\'t work for complex relationship structures. Users need granular controls per person, per event.',
        icon: 'Shield',
        color: 'var(--vibrant-cyan)',
      },
      {
        title: 'Scheduling Friction',
        description: 'Coordinating across multiple apps causes decision paralysis. Motivation to hang out evaporates before everyone agrees on timing.',
        icon: 'User',
        color: 'var(--vibrant-orange)',
      },
      {
        title: 'Friendship Drift',
        description: 'No built-in mechanism to maintain relationships. People feel guilty; connections slowly fade without intentional effort.',
        icon: 'Heart',
        color: 'var(--vibrant-lime)',
      },
    ],
  },

  methodology: {
    title: 'How We Approach UX Research',
    steps: [
      {
        title: 'Competitor Analysis',
        description: 'We scraped 300+ reviews from Timetree, Howbout, Google Calendar, Proton Calendar to identify user pain points.',
        icon: 'Search',
        color: 'var(--vibrant-magenta)',
      },
      {
        title: 'User Interviews',
        description: 'We conducted 40+ screened user interviews with our core personas: neurodivergent Gen Z, LGBTQ+ users, polyamorous folks.',
        icon: 'Users',
        color: 'var(--vibrant-cyan)',
      },
      {
        title: 'Assumption Mapping',
        description: 'We listed every assumption about what users wanted, then validated/invalidated each with data instead of guesswork.',
        icon: 'Map',
        color: 'var(--vibrant-orange)',
      },
      {
        title: 'Prioritization Matrix',
        description: 'We scored every feature idea on research validation, user validation, competitor differentiation, and development effort.',
        icon: 'List',
        color: 'var(--vibrant-lime)',
      },
    ],
  },

  timeline: {
    title: 'How We Built It: The Process',
    intro: 'Six months from concept to beta launch. Every phase informed by user research and validated with testing.',
    phases: [
      {
        id: 'research',
        title: 'Research-First Methodology',
        timeframe: 'Weeks 1-8',
        description: 'Instead of jumping to wireframes, we spent two full months understanding users deeply.',
        keyActivities: [
          'Competitor analysis: mapped features against user pain points',
          'Created 12 NotebookLM folders organizing research by category',
          'Assumption mapping: validated every assumption with data',
          'User personas: highly screened, specific archetypes',
        ],
        cost: '$0',
        outcome: 'Validated the problem before building anything. Prevented the "build trap."',
        color: 'var(--vibrant-magenta)',
        position: 'left',
      },
      {
        id: 'design',
        title: 'Strategic Design Decisions',
        timeframe: 'Weeks 9-16',
        description: 'Armed with research, we created a prioritization matrix and ruthlessly focused.',
        keyActivities: [
          'Prioritization matrix: research-backed + differentiates + feasible',
          'Chose 5-6 core features from 60+ ideas',
          'Granular permissions, Orbit feature, Signals, custom notifications',
          'Consciously decided what NOT to build',
        ],
        cost: '$0',
        outcome: 'Clear product vision. No feature bloat. Everyone aligned on what matters.',
        color: 'var(--vibrant-cyan)',
        position: 'right',
      },
      {
        id: 'prototype',
        title: 'Prototype, Test, Iterate',
        timeframe: 'Weeks 17-24',
        description: 'AI became strategic (not hype). Five rounds of user testing guided every iteration.',
        keyActivities: [
          'AI for iconography, animations, UI elements ($100 total)',
          'AI-assisted research synthesis (saved weeks)',
          'AI for dev assistance and bug testing',
          'Five rounds of usability testing with real users',
        ],
        cost: '$600',
        outcome: 'Polished product validated at every step. Zero critical bugs at launch.',
        color: 'var(--vibrant-orange)',
        position: 'left',
      },
      {
        id: 'launch',
        title: 'Branding, Marketing, Community',
        timeframe: 'Weeks 24-26',
        description: 'Built community alongside product. Transparency over polish.',
        keyActivities: [
          'Brand testing on Reddit with target audiences',
          'Launched Discord community',
          'Biweekly design jams (users co-designing)',
          'Behind-the-scenes content, no corporate marketing',
        ],
        cost: '$150',
        outcome: 'Active community invested in product success. Users became advocates.',
        color: 'var(--vibrant-lime)',
        position: 'right',
      },
    ],
  },

  aiFramework: {
    title: 'AI as a Tool, Not a Crutch',
    subtitle: 'We used AI strategically across three domains — but always guided by human research and validation.',
    steps: [
      {
        title: 'Research Synthesis',
        description: 'NotebookLM organized 40+ interviews and 300+ app reviews. AI helped identify patterns across qualitative data that would have taken weeks to surface manually.',
        icon: 'Library',
      },
      {
        title: 'Development Acceleration',
        description: 'Claude and GPT-4 assisted with Flutter development, reducing time-to-prototype by 60%. But every feature existed because research validated the need.',
        icon: 'Cpu',
      },
      {
        title: 'Quality Assurance',
        description: 'AI-assisted testing caught edge cases faster. But every test scenario came from real user stories uncovered during research.',
        icon: 'CheckCheck',
      },
    ],
    proofPoint: 'AI saved us approximately 60% in development time — but only because we knew exactly what to build before we started building.',
  },

  costBreakdown: {
    title: 'The Numbers: $800 vs $150K',
    intro:
      "We didn't just 'save money.' We strategically leveraged founder discounts (JoinSecret), free tiers, and AI tools. Total spend: $800 for development, $300 for software.",
    traditionalCost: 150000,
    actualCost: 1100,
    savings: 148900,
    items: [
      {
        category: 'Research & Planning',
        traditional: 30000,
        ourApproach: 0,
        savings: 30000,
      },
      {
        category: 'Design & Prototyping',
        traditional: 40000,
        ourApproach: 100,
        savings: 39900,
      },
      {
        category: 'Development',
        traditional: 60000,
        ourApproach: 800,
        savings: 59200,
      },
      {
        category: 'Software & Tools',
        traditional: 15000,
        ourApproach: 300,
        savings: 14700,
      },
      {
        category: 'Marketing & Branding',
        traditional: 5000,
        ourApproach: 0,
        savings: 5000,
      },
    ],
    whyTheGap: [
      'Research prevented building wrong features',
      'AI accelerated validated decisions only',
      'Founder discounts through JoinSecret',
      'Free tier tools where possible',
      'Community marketing over paid ads',
      'No scope creep from clear prioritization',
    ],
  },

  results: {
    title: 'Early Results',
    metrics: [
      {
        value: '43%',
        label: 'Reduced Coordination Time',
        description: 'In pilot households',
        color: 'var(--vibrant-magenta)',
      },
      {
        value: '94%',
        label: 'Confidence in Sharing',
        description: 'Felt safe sharing availability',
        color: 'var(--vibrant-cyan)',
      },
      {
        value: '82%',
        label: 'Friend Group Adoption',
        description: 'Within first month',
        color: 'var(--vibrant-orange)',
      },
      {
        value: '4.9/5',
        label: 'Boundary Respect Rating',
        description: 'In beta feedback',
        color: 'var(--vibrant-lime)',
      },
    ],
    testimonial: {
      text: 'For the first time, I feel like a calendar actually understands that my time has context. I\'m not just "busy" or "free" — I can show that I\'m available for certain people in certain ways.',
      attribution: 'Beta Tester, 26, ADHD',
    },
  },

  differentiators: {
    title: "Why Google Can't Just Copy This",
    intro:
      "Our moat isn't features. It's culture, methodology, and community. These take time and discipline, not just money.",
    items: [
      {
        title: 'Community Co-Design',
        description: 'Users are literally building the product with us. That loyalty is hard to replicate.',
        icon: 'Users',
        color: 'var(--vibrant-magenta)',
      },
      {
        title: 'Research Rigor',
        description: "Every feature traces back to user data. Most products can't say that.",
        icon: 'Search',
        color: 'var(--vibrant-cyan)',
      },
      {
        title: 'Privacy-First Values',
        description:
          'We don\'t collect user data and have no desire to do so. We anonymize data on our end and believe users should be compensated for their data, not exploited for it.',
        icon: 'Shield',
        color: 'var(--vibrant-orange)',
      },
      {
        title: 'Ethical Data Practices',
        description: 'We anonymize data on our end and believe it\'s unethical for companies to harvest private information without at least offering to pay users for it.',
        icon: 'Lock',
        color: 'var(--vibrant-purple)',
      },
      {
        title: 'Neurodivergent-First Design',
        description: 'Built FOR this community, not retrofitted. Requires lived experience, not just research.',
        icon: 'Brain',
        color: 'var(--vibrant-yellow)',
      },
      {
        title: 'Relationship-First Positioning',
        description: 'Different mental model from tools-first calendars. Hard to retrofit.',
        icon: 'Heart',
        color: 'var(--vibrant-lime)',
      },
    ],
  },

  cta: {
    title: 'Join the Movement',
    sections: [
      {
        title: 'For Investors',
        description: 'Capital efficiency. Market opportunity. Defensible positioning.',
        buttonText: 'View Investment Deck',
        buttonLink: '#investor-deck',
        color: 'var(--vibrant-magenta)',
      },
      {
        title: 'For Talent',
        description: 'Early equity. Meaningful work. Collaborative culture.',
        buttonText: 'See Open Roles',
        buttonLink: '#careers',
        color: 'var(--vibrant-cyan)',
      },
      {
        title: 'For Partners',
        description: 'Product partnerships. Distribution. Co-marketing opportunities.',
        buttonText: 'Explore Partnership',
        buttonLink: '#partnerships',
        color: 'var(--vibrant-orange)',
      },
    ],
  },
};