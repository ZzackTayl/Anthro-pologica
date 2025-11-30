import { motion } from 'motion/react';
import { PainPoint } from '../../data/caseStudyData';

interface ProblemSectionProps {
    title: string;
    intro: string;
    featuredQuote: {
        text: string;
        attribution: string;
    };
    painPoints: PainPoint[];
    enableMotion?: boolean;
}

export function ProblemSection({
    title,
    intro,
    featuredQuote,
    painPoints,
    enableMotion = true,
}: ProblemSectionProps) {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
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

                {/* Featured Quote */}
                <motion.div
                    initial={enableMotion ? { opacity: 0, scale: 0.95 } : false}
                    whileInView={enableMotion ? { opacity: 1, scale: 1 } : undefined}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={enableMotion ? { duration: 0.8 } : undefined}
                    className="max-w-4xl mx-auto mb-20 p-8 md:p-12 rounded-3xl relative quote-section"
                >
                    <div className="text-6xl opacity-20 absolute top-4 left-8 quote-mark">
                        "
                    </div>
                    <p className="text-xl md:text-2xl italic leading-relaxed mb-6 relative z-10">{featuredQuote.text}</p>
                    <p className="text-right opacity-70">— {featuredQuote.attribution}</p>
                </motion.div>

                {/* Pain Points Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {painPoints.map((painPoint, index) => (
                        <motion.div
                            key={index}
                            initial={enableMotion ? { opacity: 0, y: 30 } : false}
                            whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                            viewport={{ once: true }}
                            transition={enableMotion ? { delay: index * 0.1, duration: 0.8 } : undefined}
                            whileHover={enableMotion ? { scale: 1.03, y: -5 } : undefined}
                            className="p-6 rounded-2xl problem-section-card"
                        >
                            <h3 className="text-xl font-semibold mb-4 problem-section-title">
                                {painPoint.title}
                            </h3>

                            <div className="pain-point-content text-sm">
                                <div className="pain-point-section">
                                    <div className="font-semibold opacity-70 mb-1">Current Solution:</div>
                                    <div className="opacity-80">{painPoint.currentSolution}</div>
                                </div>

                                <div className="pain-point-section">
                                    <div className="font-semibold opacity-70 mb-1 problem-section-user-impact">
                                        User Impact:
                                    </div>
                                    <div className="opacity-80">{painPoint.userImpact}</div>
                                </div>

                                <div>
                                    <div className="font-semibold opacity-70 mb-1 problem-section-our-approach">
                                        Our Approach:
                                    </div>
                                    <div className="opacity-90">{painPoint.ourApproach}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
