import { Suspense, lazy } from 'react';
import { myOrbitCaseStudy } from '../data/caseStudyData';
import { CaseStudyHero } from './caseStudy/CaseStudyHero';
import { Footer } from './Footer';

// Lazy load heavy sections
const ProblemSection = lazy(() =>
    import('./caseStudy/ProblemSection').then((module) => ({ default: module.ProblemSection }))
);
const CaseStudyTimeline = lazy(() =>
    import('./caseStudy/CaseStudyTimeline').then((module) => ({ default: module.CaseStudyTimeline }))
);
const CostBreakdown = lazy(() =>
    import('./caseStudy/CostBreakdown').then((module) => ({ default: module.CostBreakdown }))
);
const ResultsSection = lazy(() =>
    import('./caseStudy/ResultsSection').then((module) => ({ default: module.ResultsSection }))
);
const AIWorkflowSection = lazy(() =>
    import('./caseStudy/AIWorkflowSection').then((module) => ({ default: module.AIWorkflowSection }))
);
const Differentiators = lazy(() =>
    import('./caseStudy/Differentiators').then((module) => ({ default: module.Differentiators }))
);
const CTASection = lazy(() =>
    import('./caseStudy/CTASection').then((module) => ({ default: module.CTASection }))
);

interface MyOrbitCaseStudyPageProps {
    enableMotion?: boolean;
}

function SectionSkeleton() {
    return (
        <div className="py-24 px-6" aria-hidden>
            <div className="max-w-6xl mx-auto rounded-3xl bg-white/5 backdrop-blur-sm animate-pulse h-96" />
        </div>
    );
}

export function MyOrbitCaseStudyPage({ enableMotion = true }: MyOrbitCaseStudyPageProps) {
    const data = myOrbitCaseStudy;

    return (
        <div className="pt-32">
            {/* Hero Section - not lazy loaded for LCP */}
            <CaseStudyHero
                title={data.hero.title}
                subtitle={data.hero.subtitle}
                metrics={data.hero.metrics}
                enableMotion={enableMotion}
            />

            {/* Executive Summary */}
            <section className="py-40 px-6 executive-summary-section">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <p className="text-2xl md:text-3xl leading-relaxed opacity-90 executive-summary-hook">{data.executiveSummary.hook}</p>
                    <p className="text-xl leading-relaxed opacity-80">{data.executiveSummary.context}</p>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 groovy-text hero-title-gradient">The Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data.team.members.map((member, index) => (
                            <div 
                                key={index} 
                                className="p-8 rounded-2xl backdrop-blur-sm team-card"
                            >
                                <h3 className="text-2xl font-bold mb-4 team-card-title">{member.name}</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {member.badges.map((badge, badgeIndex) => (
                                        <span 
                                            key={badgeIndex} 
                                            className="px-4 py-2 rounded-full text-sm team-badge"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <Suspense fallback={<SectionSkeleton />}>
                <ProblemSection
                    title={data.problem.title}
                    intro={data.problem.intro}
                    featuredQuote={data.problem.featuredQuote}
                    painPoints={data.problem.painPoints}
                    enableMotion={enableMotion}
                />
            </Suspense>

            {/* Timeline Section */}
            <Suspense fallback={<SectionSkeleton />}>
                <CaseStudyTimeline
                    title={data.timeline.title}
                    intro={data.timeline.intro}
                    phases={data.timeline.phases}
                    enableMotion={enableMotion}
                />
            </Suspense>

            {/* AI Framework Section */}
            <Suspense fallback={<SectionSkeleton />}>
                <AIWorkflowSection
                    title={data.aiFramework.title}
                    subtitle={data.aiFramework.subtitle}
                    steps={data.aiFramework.steps}
                    proofPoint={data.aiFramework.proofPoint}
                    enableMotion={enableMotion}
                />
            </Suspense>

            {/* Cost Breakdown Section */}
            <Suspense fallback={<SectionSkeleton />}>
                <CostBreakdown
                    title={data.costBreakdown.title}
                    intro={data.costBreakdown.intro}
                    items={data.costBreakdown.items}
                    whyTheGap={data.costBreakdown.whyTheGap}
                    enableMotion={enableMotion}
                />
            </Suspense>

            {/* Results Section */}
            <Suspense fallback={<SectionSkeleton />}>
                <ResultsSection
                    title={data.results.title}
                    metrics={data.results.metrics}
                    testimonial={data.results.testimonial}
                    enableMotion={enableMotion}
                />
            </Suspense>

            {/* Differentiators Section */}
            <Suspense fallback={<SectionSkeleton />}>
                <Differentiators
                    title={data.differentiators.title}
                    intro={data.differentiators.intro}
                    items={data.differentiators.items}
                    enableMotion={enableMotion}
                />
            </Suspense>

            {/* CTA Section */}
            <Suspense fallback={<SectionSkeleton />}>
                <CTASection title={data.cta.title} sections={data.cta.sections} enableMotion={enableMotion} />
            </Suspense>

            {/* Footer */}
            <Footer enableMotion={enableMotion} />
        </div>
    );
}
