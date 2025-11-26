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
        <div className="pt-20">
            {/* Hero Section - not lazy loaded for LCP */}
            <CaseStudyHero
                title={data.hero.title}
                subtitle={data.hero.subtitle}
                metrics={data.hero.metrics}
                enableMotion={enableMotion}
            />

            {/* Executive Summary */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <p className="text-2xl md:text-3xl leading-relaxed opacity-90">{data.executiveSummary.hook}</p>
                    <p className="text-xl leading-relaxed opacity-80">{data.executiveSummary.context}</p>
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
