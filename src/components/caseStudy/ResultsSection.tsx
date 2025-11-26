import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ResultMetric } from '../../data/caseStudyData';
import { CheckCircle2 } from 'lucide-react';

interface ResultsSectionProps {
    title: string;
    metrics: ResultMetric[];
    testimonial: {
        text: string;
        attribution: string;
    };
    enableMotion?: boolean;
}

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
    const [displayValue, setDisplayValue] = useState('0');
    const isPercentage = value.includes('%');
    const isRating = value.includes('/');

    useEffect(() => {
        if (!inView) return;

        if (isRating) {
            // For ratings like "4.9/5", just display immediately
            setTimeout(() => setDisplayValue(value), 100);
            return;
        }

        const numericValue = parseInt(value.replace(/\D/g, ''), 10);
        if (isNaN(numericValue)) {
            setDisplayValue(value);
            return;
        }

        const duration = 2000; // 2 seconds
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuad = progress * (2 - progress);
            const current = Math.floor(numericValue * easeOutQuad);

            setDisplayValue(isPercentage ? `${current}%` : current.toString());

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }, [inView, value, isPercentage, isRating]);

    return <span>{displayValue}</span>;
}

export function ResultsSection({ title, metrics, testimonial, enableMotion = true }: ResultsSectionProps) {
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

    return (
        <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                {enableMotion ? (
                    <motion.div
                        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
                        style={{
                            background: 'radial-gradient(circle, var(--vibrant-cyan), transparent)',
                            filter: 'blur(100px)',
                        }}
                        animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 20, repeat: Infinity }}
                    />
                ) : (
                    <div
                        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
                        style={{
                            background: 'radial-gradient(circle, var(--vibrant-cyan), transparent)',
                            filter: 'blur(100px)',
                        }}
                    />
                )}
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={enableMotion ? { opacity: 0, y: 50 } : false}
                    whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2
                        className="groovy-text mb-6"
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                            background: 'linear-gradient(135deg, var(--vibrant-cyan), var(--vibrant-lime))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {title}
                    </h2>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={enableMotion ? { opacity: 0, scale: 0.8 } : false}
                            whileInView={enableMotion ? { opacity: 1, scale: 1 } : undefined}
                            viewport={{ once: true }}
                            transition={enableMotion ? { delay: index * 0.1 } : undefined}
                            whileHover={enableMotion ? { scale: 1.05, y: -10 } : undefined}
                            className="p-8 rounded-2xl text-center"
                            style={{
                                background: 'rgba(26, 15, 46, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: `2px solid ${metric.color}`,
                                boxShadow: `0 0 30px ${metric.color}40`,
                            }}
                        >
                            <CheckCircle2 size={32} className="mx-auto mb-4" style={{ color: metric.color }} />
                            <div className="groovy-text text-5xl mb-3" style={{ color: metric.color }}>
                                <AnimatedCounter value={metric.value} inView={inView} />
                            </div>
                            <div className="font-semibold mb-2">{metric.label}</div>
                            <div className="text-sm opacity-70">{metric.description}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonial */}
                <motion.div
                    initial={enableMotion ? { opacity: 0, y: 30 } : false}
                    whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl"
                    style={{
                        background: 'rgba(26, 15, 46, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid var(--vibrant-cyan)',
                    }}
                >
                    <blockquote>
                        <p className="text-xl md:text-2xl italic leading-relaxed mb-6">{testimonial.text}</p>
                        <footer className="text-right opacity-70">— {testimonial.attribution}</footer>
                    </blockquote>
                </motion.div>
            </div>
        </section>
    );
}
