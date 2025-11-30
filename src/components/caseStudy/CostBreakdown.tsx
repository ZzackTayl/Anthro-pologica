import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { CostBreakdownItem } from '../../data/caseStudyData';

interface CostBreakdownProps {
    title: string;
    intro: string;
    items: CostBreakdownItem[];
    whyTheGap: string[];
    enableMotion?: boolean;
}

export function CostBreakdown({ title, intro, items, whyTheGap, enableMotion = true }: CostBreakdownProps) {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const totalTraditional = items.reduce((sum, item) => sum + item.traditional, 0);
    const totalOurs = items.reduce((sum, item) => sum + item.ourApproach, 0);
    const maxValue = Math.max(totalTraditional, totalOurs);

    return (
        <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                {enableMotion ? (
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full opacity-15"
                        style={{
                            background: 'radial-gradient(circle, var(--psychedelic-yellow), transparent)',
                            filter: 'blur(100px)',
                            x: '-50%',
                            y: '-50%',
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                ) : (
                    <div
                        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full opacity-15"
                        style={{
                            background: 'radial-gradient(circle, var(--psychedelic-yellow), transparent)',
                            filter: 'blur(100px)',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                )}
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={enableMotion ? { opacity: 0, y: 50 } : false}
                    whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={enableMotion ? { duration: 0.8 } : undefined}
                    className="text-center mb-20"
                >
                    <h2
                        className="groovy-text mb-6"
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                            background: 'linear-gradient(135deg, var(--psychedelic-yellow), var(--psychedelic-orange))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {title}
                    </h2>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">{intro}</p>
                </motion.div>

                {/* Cost comparison bars */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {/* Traditional */}
                    <motion.div
                        initial={enableMotion ? { opacity: 0, x: -50 } : false}
                        whileInView={enableMotion ? { opacity: 1, x: 0 } : undefined}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={enableMotion ? { duration: 0.8 } : undefined}
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-center" style={{ color: 'var(--psychedelic-orange)' }}>
                            Traditional Development
                        </h3>
                        <div className="relative h-[400px] flex items-end justify-center">
                            <motion.div
                                className="w-full max-w-[200px] rounded-t-3xl relative"
                                style={{
                                    background: 'linear-gradient(to top, var(--psychedelic-orange), var(--psychedelic-yellow))',
                                    boxShadow: '0 0 40px var(--psychedelic-orange)60',
                                }}
                                initial={{ height: 0 }}
                                animate={inView ? { height: '100%' } : { height: 0 }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                            >
                                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-center">
                                    <div className="text-5xl font-bold groovy-text" style={{ color: 'var(--psychedelic-orange)' }}>
                                        ${totalTraditional.toLocaleString()}
                                    </div>
                                    <div className="text-sm opacity-70 mt-1">Industry Standard</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Our Approach */}
                    <motion.div
                        initial={enableMotion ? { opacity: 0, x: 50 } : false}
                        whileInView={enableMotion ? { opacity: 1, x: 0 } : undefined}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={enableMotion ? { duration: 0.8 } : undefined}
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-center" style={{ color: 'var(--psychedelic-cyan)' }}>
                            Our Approach
                        </h3>
                        <div className="relative h-[400px] flex items-end justify-center">
                            <motion.div
                                className="w-full max-w-[200px] rounded-t-3xl relative"
                                style={{
                                    background: 'linear-gradient(to top, var(--psychedelic-cyan), var(--psychedelic-lime))',
                                    boxShadow: '0 0 40px var(--psychedelic-cyan)60',
                                }}
                                initial={{ height: 0 }}
                                animate={inView ? { height: `${(totalOurs / maxValue) * 100}%` } : { height: 0 }}
                                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                            >
                                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-center">
                                    <div className="text-5xl font-bold groovy-text" style={{ color: 'var(--psychedelic-cyan)' }}>
                                        ${totalOurs.toLocaleString()}
                                    </div>
                                    <div className="text-sm opacity-70 mt-1">UX-First Method</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Detailed breakdown */}
                <motion.div
                    initial={enableMotion ? { opacity: 0, y: 30 } : false}
                    whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={enableMotion ? { delay: 0.5 } : undefined}
                    className="p-8 rounded-3xl mb-12"
                    style={{
                        background: 'rgba(26, 15, 46, 0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid var(--psychedelic-yellow)',
                    }}
                >
                    <h3 className="text-2xl font-semibold mb-6">Cost Breakdown by Category</h3>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-3 border-b border-white/10 last:border-0">
                                <div className="font-semibold">{item.category}</div>
                                <div className="text-sm opacity-70">
                                    Traditional: <span className="text-orange-400">${item.traditional.toLocaleString()}</span>
                                </div>
                                <div className="text-sm opacity-70">
                                    Ours: <span className="text-cyan-400">${item.ourApproach.toLocaleString()}</span>
                                </div>
                                <div className="text-sm font-semibold" style={{ color: 'var(--psychedelic-lime)' }}>
                                    Saved: ${item.savings.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Why the gap */}
                <motion.div
                    initial={enableMotion ? { opacity: 0, y: 30 } : false}
                    whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className="text-3xl font-semibold mb-8">Why the Gap?</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                        {whyTheGap.map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={enableMotion ? { opacity: 0, scale: 0.9 } : false}
                                whileInView={enableMotion ? { opacity: 1, scale: 1 } : undefined}
                                viewport={{ once: true }}
                                transition={enableMotion ? { delay: index * 0.1 } : undefined}
                                whileHover={enableMotion ? { scale: 1.05 } : undefined}
                                className="p-6 rounded-2xl"
                                style={{
                                    background: 'rgba(26, 15, 46, 0.6)',
                                    backdropFilter: 'blur(10px)',
                                    border: '2px solid var(--psychedelic-cyan)',
                                }}
                            >
                                <p className="leading-relaxed">{reason}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
