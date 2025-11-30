import { motion } from 'motion/react';
import { Cpu, Library, CheckCheck, LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
    Library,
    Cpu,
    CheckCheck,
};

interface AIWorkflowSectionProps {
    title: string;
    subtitle: string;
    steps: Array<{
        title: string;
        description: string;
        icon: string;
    }>;
    proofPoint: string;
    enableMotion?: boolean;
}

export function AIWorkflowSection({
    title,
    subtitle,
    steps,
    proofPoint,
    enableMotion = true,
}: AIWorkflowSectionProps) {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background Gradient */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                        background:
                            'linear-gradient(to bottom right, var(--psychedelic-cyan), transparent, var(--psychedelic-magenta))',
                    }}
            />

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
                            background: 'linear-gradient(135deg, #fff, var(--psychedelic-cyan))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {title}
                    </h2>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
                </motion.div>

                {/* Workflow Steps */}
                <div className="grid md:grid-cols-3 gap-8 mb-20 ai-workflow-steps relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                    {steps.map((step, index) => {
                        const IconComponent = ICON_MAP[step.icon] || Cpu;

                        return (
                            <motion.div
                                key={index}
                                initial={enableMotion ? { opacity: 0, y: 30 } : false}
                                whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                                viewport={{ once: true }}
                                transition={enableMotion ? { delay: index * 0.2 } : undefined}
                                className="relative"
                            >
                                {/* Step Number/Icon */}
                                <div className="flex justify-center mb-8 relative z-10">
                                    <div
                                        className="w-24 h-24 rounded-full flex items-center justify-center"
                                        style={{
                                            background: 'var(--background)',
                                            border: '2px solid var(--psychedelic-cyan)',
                                            boxShadow: '0 0 30px rgba(0, 245, 255, 0.2)',
                                        }}
                                    >
                                        <IconComponent size={40} style={{ color: 'var(--psychedelic-cyan)' }} />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div
                                    className="p-8 rounded-2xl h-full text-center"
                                    style={{
                                        background: 'rgba(26, 15, 46, 0.6)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                    }}
                                >
                                    <h3 className="text-xl font-semibold mb-4 text-cyan-400">{step.title}</h3>
                                    <p className="opacity-80 leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Proof Point Banner */}
                <motion.div
                    initial={enableMotion ? { opacity: 0, scale: 0.95 } : false}
                    whileInView={enableMotion ? { opacity: 1, scale: 1 } : undefined}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 rounded-3xl text-center relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(131, 56, 236, 0.1))',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <div className="relative z-10">
                        <h3 className="text-2xl font-semibold mb-4">The Result?</h3>
                        <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
                            "{proofPoint}"
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
