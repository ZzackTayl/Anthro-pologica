import { motion } from 'motion/react';
import { useState } from 'react';
import { TimelinePhase } from '../../data/caseStudyData';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CaseStudyTimelineProps {
    title: string;
    intro: string;
    phases: TimelinePhase[];
    enableMotion?: boolean;
}

export function CaseStudyTimeline({ title, intro, phases, enableMotion = true }: CaseStudyTimelineProps) {
    const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="w-full h-full"
                    style={{
                        background:
                            'repeating-linear-gradient(45deg, transparent, transparent 20px, var(--psychedelic-cyan) 20px, var(--psychedelic-cyan) 21px)',
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={enableMotion ? { opacity: 0, y: 50 } : false}
                    whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={enableMotion ? { duration: 0.8 } : undefined}
                    className="text-center mb-20"
                >
                    <h2 className="groovy-text mb-6 hero-title-gradient">
                        {title}
                    </h2>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">{intro}</p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line - desktop */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-4">
                        {phases.map((phase, index) => (
                            <motion.div
                                key={phase.id}
                                initial={enableMotion ? { opacity: 0, y: 30 } : false}
                                whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                                viewport={{ once: true }}
                                transition={enableMotion ? { delay: index * 0.15, duration: 0.8 } : undefined}
                                className="relative"
                            >
                                {/* Timeline node */}
                                <div className="flex flex-col items-center mb-6">
                                    <motion.div
                                        className="w-6 h-6 rounded-full border-4 mb-3 z-10"
                                        style={{
                                            borderColor: phase.color,
                                            background: 'var(--background)',
                                            boxShadow: `0 0 20px ${phase.color}80`,
                                        }}
                                        whileHover={enableMotion ? { scale: 1.2 } : undefined}
                                    />
                                    <div className="text-center">
                                        <h3 className="font-semibold text-lg mb-1" style={{ color: phase.color }}>
                                            {phase.title}
                                        </h3>
                                        <p className="text-sm opacity-70">{phase.timeframe}</p>
                                    </div>
                                </div>

                                {/* Phase card */}
                                <motion.div
                                    className="p-4 rounded-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
                                    style={{
                                        background: 'rgba(26, 15, 46, 0.6)',
                                        backdropFilter: 'blur(10px)',
                                        border: `2px solid ${phase.color}`,
                                        // Dynamic focus ring color matching the phase
                                        ['--tw-ring-color' as any]: phase.color,
                                    }}
                                    whileHover={enableMotion ? { scale: 1.02, y: -5 } : undefined}
                                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={expandedPhase === phase.id}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setExpandedPhase(expandedPhase === phase.id ? null : phase.id);
                                        }
                                    }}
                                >
                                    <p className="text-sm leading-relaxed mb-3 opacity-90">{phase.description}</p>

                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="font-semibold" style={{ color: phase.color }}>
                                            Cost: {phase.cost}
                                        </span>
                                        <button
                                            className="flex items-center gap-1 opacity-70 hover:opacity-100"
                                            aria-expanded={expandedPhase === phase.id}
                                            aria-label={expandedPhase === phase.id ? 'Show less' : 'Show more'}
                                        >
                                            {expandedPhase === phase.id ? 'Less' : 'More'}
                                            {expandedPhase === phase.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                    </div>

                                    {/* Expandable details */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: expandedPhase === phase.id ? 'auto' : 0,
                                            opacity: expandedPhase === phase.id ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-3 border-t border-white/10 space-y-3">
                                            <div>
                                                <h4 className="font-semibold text-sm mb-2 opacity-70">Key Activities:</h4>
                                                <ul className="space-y-1">
                                                    {phase.keyActivities.map((activity, i) => (
                                                        <li key={i} className="text-sm opacity-80 flex items-start">
                                                            <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                                                            {activity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1 opacity-70">Outcome:</h4>
                                                <p className="text-sm opacity-80">{phase.outcome}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
