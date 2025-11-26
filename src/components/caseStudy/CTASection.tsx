import { motion } from 'motion/react';

interface CTASectionProps {
    title: string;
    sections: Array<{
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        color: string;
    }>;
    enableMotion?: boolean;
}

export function CTASection({ title, sections, enableMotion = true }: CTASectionProps) {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background with portal effect */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {[...Array(6)].map((_, i) =>
                    enableMotion ? (
                        <motion.div
                            key={i}
                            className="absolute rounded-full border-2 opacity-15"
                            style={{
                                width: `${300 + i * 150}px`,
                                height: `${300 + i * 150}px`,
                                borderColor: i % 2 === 0 ? 'var(--vibrant-magenta)' : 'var(--vibrant-cyan)',
                            }}
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, i % 2 === 0 ? 360 : -360],
                            }}
                            transition={{
                                duration: 15 + i * 2,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    ) : (
                        <div
                            key={i}
                            className="absolute rounded-full border-2 opacity-15"
                            style={{
                                width: `${300 + i * 150}px`,
                                height: `${300 + i * 150}px`,
                                borderColor: i % 2 === 0 ? 'var(--vibrant-magenta)' : 'var(--vibrant-cyan)',
                            }}
                        />
                    )
                )}
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h2
                    initial={enableMotion ? { opacity: 0, y: 50 } : false}
                    whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    className="groovy-text text-center mb-16"
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                        background: 'linear-gradient(135deg, var(--vibrant-yellow), var(--vibrant-orange))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    {title}
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={enableMotion ? { opacity: 0, y: 30 } : false}
                            whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                            viewport={{ once: true }}
                            transition={enableMotion ? { delay: index * 0.15 } : undefined}
                            className="text-center"
                        >
                            <div
                                className="p-8 rounded-2xl mb-6"
                                style={{
                                    background: 'rgba(26, 15, 46, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    border: `2px solid ${section.color}`,
                                }}
                            >
                                <h3 className="text-2xl font-semibold mb-4" style={{ color: section.color }}>
                                    {section.title}
                                </h3>
                                <p className="opacity-90 mb-6">{section.description}</p>

                                <motion.a
                                    href={section.buttonLink}
                                    className="inline-block px-8 py-4 rounded-full font-semibold button-wave"
                                    style={{
                                        background: section.color,
                                        color: '#000',
                                        border: `2px solid ${section.color}`,
                                    }}
                                    whileHover={enableMotion ? { scale: 1.05 } : undefined}
                                    whileTap={enableMotion ? { scale: 0.95 } : undefined}
                                >
                                    {section.buttonText}
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
