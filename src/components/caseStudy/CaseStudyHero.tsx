import { motion } from 'motion/react';
import { MetricCard } from '../../data/caseStudyData';

interface CaseStudyHeroProps {
    title: string;
    subtitle: string;
    metrics: MetricCard[];
    enableMotion?: boolean;
}

export function CaseStudyHero({ title, subtitle, metrics, enableMotion = true }: CaseStudyHeroProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {enableMotion ? (
                    <>
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
                            style={{
                                background: 'radial-gradient(circle, var(--vibrant-magenta), transparent)',
                                filter: 'blur(100px)',
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                x: [0, 50, 0],
                                y: [0, 30, 0],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-30"
                            style={{
                                background: 'radial-gradient(circle, var(--vibrant-cyan), transparent)',
                                filter: 'blur(100px)',
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, -40, 0],
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 18,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </>
                ) : (
                    <>
                        <div
                            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
                            style={{
                                background: 'radial-gradient(circle, var(--vibrant-magenta), transparent)',
                                filter: 'blur(100px)',
                            }}
                        />
                        <div
                            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-30"
                            style={{
                                background: 'radial-gradient(circle, var(--vibrant-cyan), transparent)',
                                filter: 'blur(100px)',
                            }}
                        />
                    </>
                )}
            </div>

            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pb-16 md:pb-24">
                <motion.div
                    initial={enableMotion ? { opacity: 0, y: 50 } : false}
                    animate={enableMotion ? { opacity: 1, y: 0 } : undefined}
                    transition={enableMotion ? { duration: 1 } : undefined}
                >
                    <h1
                        className="groovy-text mb-8"
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                            background: 'linear-gradient(135deg, var(--vibrant-magenta), var(--vibrant-purple))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: 1.1,
                        }}
                    >
                        {title}
                    </h1>

                    <p className="text-xl md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed opacity-90">
                        {subtitle}
                    </p>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={enableMotion ? { opacity: 0, y: 30 } : false}
                                animate={enableMotion ? { opacity: 1, y: 0 } : undefined}
                                transition={enableMotion ? { delay: 0.5 + index * 0.1, duration: 0.8 } : undefined}
                                whileHover={enableMotion ? { scale: 1.05, y: -5 } : undefined}
                                className="p-8 rounded-2xl"
                                style={{
                                    background: 'rgba(26, 15, 46, 0.6)',
                                    backdropFilter: 'blur(10px)',
                                    border: `2px solid ${metric.color || 'var(--vibrant-cyan)'}`,
                                    boxShadow: metric.emphasis
                                        ? `0 0 30px ${metric.color || 'var(--vibrant-cyan)'}40`
                                        : 'none',
                                }}
                            >
                                <div
                                    className="groovy-text mb-3"
                                    style={{
                                        fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                                        color: metric.color || 'var(--vibrant-cyan)',
                                        lineHeight: 1,
                                    }}
                                >
                                    {metric.value}
                                </div>
                                <div
                                    className="text-sm uppercase tracking-wider opacity-70"
                                    style={{ letterSpacing: '0.1em' }}
                                >
                                    {metric.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            {enableMotion ? (
                <motion.div
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div
                        className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
                        style={{ borderColor: 'var(--vibrant-cyan)' }}
                    >
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: 'var(--vibrant-cyan)' }}
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            ) : (
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                    <div
                        className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
                        style={{ borderColor: 'var(--vibrant-cyan)' }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--vibrant-cyan)' }} />
                    </div>
                </div>
            )}
        </section>
    );
}
