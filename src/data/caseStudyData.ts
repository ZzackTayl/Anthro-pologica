export interface MetricCard {
    value: string;
    label: string;
    color?: string;
    emphasis?: boolean;
}

export interface PainPoint {
    title: string;
    currentSolution: string;
    userImpact: string;
    ourApproach: string;
}

export interface TimelinePhase {
    id: string;
    title: string;
    timeframe: string;
    description: string;
    keyActivities: string[];
    cost: string;
    outcome: string;
    color: string;
}

export interface CostBreakdownItem {
    category: string;
    traditional: number;
    ourApproach: number;
    savings: number;
}

export interface ResultMetric {
    value: string;
    label: string;
    description: string;
    color: string;
}

export interface Differentiator {
    title: string;
    description: string;
    icon: string;
    color: string;
}

export interface CaseStudyData {
    hero: {
        title: string;
        subtitle: string;
        metrics: MetricCard[];
    };
    executiveSummary: {
        hook: string;
        context: string;
    };
    team: {
        title: string;
        members: Array<{
            name: string;
            badges: string[];
        }>;
    };
    problem: {
        title: string;
        intro: string;
        featuredQuote: {
            text: string;
            attribution: string;
        };
        painPoints: PainPoint[];
    };
    timeline: {
        title: string;
        intro: string;
        phases: TimelinePhase[];
    };
    costBreakdown: {
        title: string;
        intro: string;
        items: CostBreakdownItem[];
        whyTheGap: string[];
    };
    results: {
        title: string;
        metrics: ResultMetric[];
        testimonial: {
            text: string;
            attribution: string;
        };
    };
    differentiators: {
        title: string;
        intro: string;
        items: Differentiator[];
    };
    cta: {
        title: string;
        sections: Array<{
            title: string;
            description: string;
            buttonText: string;
            buttonLink: string;
            color: string;
        }>;
    };
    aiFramework: {
        title: string;
        subtitle: string;
        steps: Array<{
            title: string;
            description: string;
            icon: string;
        }>;
        proofPoint: string;
    };
}

export const myOrbitCaseStudy: CaseStudyData = {
    hero: {
        title: '$1,100 vs $150K: How UX Built This',
        subtitle:
            "A small but mighty team of three neurodivergent humans built an enterprise-quality calendar app for less than the cost of a used laptop. Here's how rigorous research, intentional AI use, and a neurodivergent team delivered what competitors spend 100x more to achieve.",
        metrics: [
            {
                value: '6',
                label: 'MONTHS',
                color: 'var(--vibrant-magenta)',
                emphasis: false,
            },
            {
                value: '3',
                label: 'PEOPLE',
                color: 'var(--vibrant-cyan)',
                emphasis: false,
            },
            {
                value: '98%',
                label: 'COST REDUCTION',
                color: 'var(--vibrant-yellow)',
                emphasis: true,
            },
        ],
    },
    executiveSummary: {
        hook: "Most calendars are designed for a world that doesn't exist anymore: 9-to-5 work, traditional families, monogamous relationships, one way of experiencing time. We built something different.",
        context:
            'In six months, three neurodivergent UX professionals built MyOrbit—a calendar and connection app redesigned for real human relationships—for $1,100 total spend. An app that would have cost $150,000 to develop two years ago. The difference? A custom AI-native development framework and rigorous UX methodology.',
    },
    team: {
        title: 'The Team',
        members: [
            {
                name: 'Zack',
                badges: ['template', 'template', 'template', 'template'],
            },
            {
                name: 'Clare',
                badges: ['template', 'template', 'template', 'template'],
            },
            {
                name: 'Ginnett',
                badges: ['template', 'template', 'template', 'template'],
            },
        ],
    },
    problem: {
        title: 'The Problem We Observed (Not Assumed)',
        intro:
            "We didn't guess what users needed. We researched it. 300+ competitor reviews, surveys, usability tests, user interviews. 100+ Reddit threads. We did our best to map out any assumptions we had.",
        featuredQuote: {
            text: `I need to share my calendar with my unsupportive dad (he just needs to see I'm busy), my supportive stepmom (she gets event titles), my boyfriend (full details), and my best friend crashing at my place (she should see my plans). Existing apps make me choose: share everything or share nothing.`,
            attribution: 'Beta Tester, LGBTQ+ Community',
        },
        painPoints: [
            {
                title: 'Time Blindness + Notification Failure',
                currentSolution: 'More notifications (causes fatigue)',
                userImpact: 'Users miss events they care about',
                ourApproach: 'Customizable, attention-grabbing notifications; circular ADHD-friendly time views',
            },
            {
                title: 'Privacy Across Multiple Relationships',
                currentSolution: "Binary sharing (share or don't)",
                userImpact: "Can't share calendar without exposing intimate details",
                ourApproach:
                    'Granular, event-level permission controls (show "busy," "busy + title," or full details per person)',
            },
            {
                title: 'Loneliness in Scheduling Friction',
                currentSolution: 'Complex multi-app coordination',
                userImpact: 'Motivation to hang out evaporates before everyone agrees',
                ourApproach: 'Native language input, signals feature, AI-assisted rescheduling',
            },
            {
                title: 'Friendship Drift',
                currentSolution: 'No mechanism to track this',
                userImpact: 'People feel guilty; connections slowly fade',
                ourApproach: 'Orbit feature: visual representation of relationship proximity; optional nudges',
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
            },
        ],
    },
    costBreakdown: {
        title: 'The Numbers: $1,100 vs $150K',
        intro:
            "We didn't just 'save money.' We strategically leveraged founder discounts (JoinSecret), free tiers, and AI tools. Total spend: $800 for development, $300 for software.",
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
                ourApproach: 50,
                savings: 4950,
            },
        ],
        whyTheGap: [
            'Founder Discounts: Leveraged JoinSecret for Sentry, Jam, Intercom, Make.com, Notion, Perplexity',
            'Smart Tooling: Free tiers for Canva, ChatGPT Business deals, Mobbin',
            'Strategic AI: "Deal hunting" with Perplexity to find the best tool offers weekly',
            'Paid only for high-value impact: UXTweak (usability), Kilo code ($50 buffer), Google Gemini',
            'No "One-Shot" Coding: Our custom framework prevented costly refactors',
        ],
    },
    aiFramework: {
        title: 'The Secret Sauce: Context Engineering',
        subtitle:
            "We didn't just prompt and pray. We developed a proprietary 'Context Engineering Framework' over months of iteration to ensure clean, enterprise-grade Flutter architecture.",
        steps: [
            {
                title: 'Knowledge Library',
                description:
                    'Optimized for token usage. We maintain a curated library of architectural patterns and context that feeds the AI exactly what it needs, preventing hallucinations and "drift."',
                icon: 'Library',
            },
            {
                title: 'Model Selection Guide',
                description:
                    "We don't use one model for everything. We have a strict protocol: Gemini for context-heavy architecture, Claude for complex logic, GPT for quick refactors.",
                icon: 'Cpu',
            },
            {
                title: 'Human-AI Verification Loops',
                description:
                    'AI generates, but humans verify against the framework. This "sandwich" method ensures code cleanliness that pure AI generation lacks.',
                icon: 'CheckCheck',
            },
        ],
        proofPoint:
            'Proof it works: We tested this framework on a second application. Result? 80% of the architecture was generated correctly on the first pass, adhering strictly to our clean code standards.',
    },
    results: {
        title: 'Results & Impact',
        metrics: [
            {
                value: '95%',
                label: 'of beta testers would recommend',
                description: 'Net promoter score territory',
                color: 'var(--vibrant-cyan)',
            },
            {
                value: '94%',
                label: 'felt more confident sharing availability',
                description: 'with nuanced context',
                color: 'var(--vibrant-magenta)',
            },
            {
                value: '82%',
                label: 'adoption within friend groups',
                description: 'within first month',
                color: 'var(--vibrant-yellow)',
            },
            {
                value: '4.9/5',
                label: 'for "respects my boundaries"',
                description: 'in beta feedback',
                color: 'var(--vibrant-orange)',
            },
        ],
        testimonial: {
            text: 'This app actually gets how my brain works. I can finally share my schedule without anxiety, and the orbit feature helps me stay connected to people I care about.',
            attribution: 'Beta Tester, Neurodivergent Community',
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
                title: 'Values Alignment',
                description:
                    'Never IPO, no data harvesting, living wages, LGBTQ+ and neurodivergent support. These are operational, not marketing.',
                icon: 'Heart',
                color: 'var(--vibrant-orange)',
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
                buttonText: 'Explore Partnerships',
                buttonLink: '#partnerships',
                color: 'var(--vibrant-orange)',
            },
        ],
    },
};
