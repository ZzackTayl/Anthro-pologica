import { motion } from 'motion/react';
import { Differentiator } from '../../data/caseStudyData';
import * as Icons from 'lucide-react';

interface DifferentiatorsProps {
    title: string;
    intro: string;
    items: Differentiator[];
    enableMotion?: boolean;
}

export function Differentiators({ title, intro, items, enableMotion = true }: DifferentiatorsProps) {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
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
                            background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-orange))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {title}
                    </h2>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">{intro}</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => {
                        const IconComponent = (Icons as any)[item.icon] || Icons.Circle;

                        return (
                            <motion.div
                                key={index}
                                initial={enableMotion ? { opacity: 0, y: 30 } : false}
                                whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                                viewport={{ once: true }}
                                transition={enableMotion ? { delay: index * 0.1 } : undefined}
                                whileHover={enableMotion ? { scale: 1.05, y: -5 } : undefined}
                                className="p-6 rounded-2xl"
                                style={{
                                    background: 'rgba(26, 15, 46, 0.6)',
                                    backdropFilter: 'blur(10px)',
                                    border: `2px solid ${item.color}`,
                                }}
                            >
                                <IconComponent size={40} className="mb-4" style={{ color: item.color }} />
                                <h3 className="text-xl font-semibold mb-3" style={{ color: item.color }}>
                                    {item.title}
                                </h3>
                                <p className="leading-relaxed opacity-90">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
