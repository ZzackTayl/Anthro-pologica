/**
 * Case Study Types
 * Centralized type definitions for the case study data structure
 */

// ============================================================================
// Hero Section Types
// ============================================================================

export interface MetricCard {
  value: string;
  label: string;
  color?: string;
  emphasis?: boolean;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  description?: string;
  metrics: MetricCard[];
  cta?: {
    text: string;
    link: string;
  };
}

// ============================================================================
// Executive Summary Types
// ============================================================================

export interface ExecutiveSummary {
  hook: string;
  context: string;
}

// ============================================================================
// Team Types
// ============================================================================

export interface TeamMember {
  name: string;
  badges: string[];
}

export interface TeamSection {
  members: TeamMember[];
}

// ============================================================================
// Problem Section Types
// ============================================================================

export interface PainPoint {
  title: string;
  currentSolution: string;
  userImpact: string;
  ourApproach: string;
}

export interface ProblemItem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ProblemSection {
  title: string;
  intro: string;
  featuredQuote: {
    text: string;
    attribution: string;
  };
  painPoints: PainPoint[];
  items?: ProblemItem[];
}

// ============================================================================
// Methodology Types
// ============================================================================

export interface MethodologyStep {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface MethodologySection {
  title: string;
  steps: MethodologyStep[];
}

// ============================================================================
// Timeline Types
// ============================================================================

export interface TimelinePhase {
  id: string;
  title: string;
  timeframe: string;
  description: string;
  keyActivities: string[];
  cost: string;
  outcome: string;
  color: string;
  position: 'left' | 'right';
}

export interface TimelineSection {
  title: string;
  intro: string;
  phases: TimelinePhase[];
}

// ============================================================================
// AI Framework Types
// ============================================================================

export interface AIWorkflowStep {
  title: string;
  description: string;
  icon: string;
}

export interface AIFrameworkSection {
  title: string;
  subtitle: string;
  steps: AIWorkflowStep[];
  proofPoint: string;
}

// ============================================================================
// Cost Breakdown Types
// ============================================================================

export interface CostBreakdownItem {
  category: string;
  traditional: number;
  ourApproach: number;
  savings: number;
}

export interface CostBreakdownSection {
  title: string;
  intro: string;
  traditionalCost?: number;
  actualCost?: number;
  savings?: number;
  items: CostBreakdownItem[];
  whyTheGap: string[];
}

// ============================================================================
// Results Types
// ============================================================================

export interface ResultMetric {
  value: string;
  label: string;
  description: string;
  color: string;
}

export interface ResultsSection {
  title: string;
  metrics: ResultMetric[];
  testimonial: {
    text: string;
    attribution: string;
  };
}

// ============================================================================
// Differentiators Types
// ============================================================================

export interface DifferentiatorItem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

// Alias for backward compatibility
export type Differentiator = DifferentiatorItem;

export interface DifferentiatorsSection {
  title: string;
  intro: string;
  items: DifferentiatorItem[];
}

// ============================================================================
// CTA Types
// ============================================================================

export interface CTAItem {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  color: string;
}

export interface CTASection {
  title: string;
  sections: CTAItem[];
}

// ============================================================================
// Main Case Study Data Type
// ============================================================================

export interface CaseStudyData {
  hero: HeroSection;
  executiveSummary: ExecutiveSummary;
  team: TeamSection;
  problem: ProblemSection;
  methodology?: MethodologySection;
  timeline: TimelineSection;
  aiFramework: AIFrameworkSection;
  costBreakdown: CostBreakdownSection;
  results: ResultsSection;
  differentiators: DifferentiatorsSection;
  cta: CTASection;
}