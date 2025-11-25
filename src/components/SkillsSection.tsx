import { motion } from 'motion/react';
import { useState } from 'react';
import { Sparkles, Brain, TestTube, Zap, Layers, Users, Rocket, Target } from 'lucide-react';
import { useCanHover } from './ui/use-can-hover';

const skills = [
  {
    icon: Brain,
    title: 'UX Research',
    description: 'Deep user insights through empathetic research methodologies',
    color: 'var(--psychedelic-magenta)',
    details: ['User Interviews', 'Usability Testing', 'Journey Mapping', 'Persona Development'],
  },
  {
    icon: Users,
    title: 'Workshop Facilitation',
    description: 'Collaborative sessions that spark innovation and alignment',
    color: 'var(--psychedelic-lime)',
    details: ['Design Sprints', 'Stakeholder Workshops', 'Co-creation Sessions', 'Team Alignment'],
  },
  {
    icon: TestTube,
    title: 'User Testing',
    description: 'Hands-on product testing from team members who routinely evaluate experiences for brands like Amazon, Uber, and PlayStation',
    color: 'var(--psychedelic-orange)',
    details: ['Mixed-Method Studies', 'Enterprise Product Evaluations', 'Rapid Feedback Loops', 'Conversion Optimization'],
  },
  {
    icon: Zap,
    title: 'Neurodivergent Design',
    description: 'We diverge deeper, mapping the system, then converge with structure to land the right solution',
    color: 'var(--psychedelic-yellow)',
    details: ['Accessibility First', 'ADHD-Friendly UI', 'Sensory Considerations', 'Flexible Interactions'],
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description: 'Scalable, consistent design frameworks that evolve',
    color: 'var(--psychedelic-pink)',
    details: ['Component Libraries', 'Token Management', 'Documentation', 'Version Control'],
  },
  {
    icon: Sparkles,
    title: 'AI-Assisted Design',
    description: 'Leveraging artificial intelligence to amplify creative workflows',
    color: 'var(--psychedelic-cyan)',
    details: [
      'AI-Assisted Prototyping',
      'Jr. Thought Partner',
      'Secondary Data Synthesis',
      'Agentic AI & MCP Strategy',
    ],
  },
  {
    icon: Rocket,
    title: 'Rapid Prototyping',
    description: 'Fast iteration cycles from concept to clickable prototype',
    color: 'var(--psychedelic-purple)',
    details: ['Low-Fi Wireframes', 'High-Fi Mockups', 'Interactive Prototypes', 'Design Handoff'],
  },
  {
    icon: Target,
    title: 'Strategy & Vision',
    description: 'Pulling in subject matter experts to craft marketing strategies grounded in user research insights',
    color: 'var(--psychedelic-cyan)',
    details: ['Product Strategy', 'Research-Led Campaigns', 'Expert Collaboration', 'Roadmap Planning'],
  },
];

interface SkillsSectionProps {
  enableMotion?: boolean;
}

export function SkillsSection({ enableMotion = true }: SkillsSectionProps) {
  const canHover = useCanHover();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={enableMotion ? { opacity: 0, y: 50 } : false}
          whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          transition={enableMotion ? { duration: 1 } : undefined}
          className="text-center mb-20"
        >
          <h2 className="groovy-text text-6xl md:text-8xl mb-6">
            <motion.span className="gradient-linear-cyan-mag-yellow">
              Our Superpowers
            </motion.span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            A kaleidoscope of skills honed through years of experience and neurodivergent innovation
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                initial={enableMotion ? { opacity: 0, scale: 0.8, rotate: -10 } : false}
                whileInView={enableMotion ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
                viewport={{ once: true, amount: 0.2 }}
                transition={enableMotion ? { duration: 0.6, delay: index * 0.05 } : undefined}
                onClick={() =>
                  setExpandedIndex((previous) => (previous === index ? null : index))
                }
                className="relative cursor-pointer"
              >
              <motion.div
                className="relative p-6 rounded-2xl overflow-hidden skill-card"
                style={{
                  border: `2px solid ${skill.color}`,
                }}
                animate={
                  enableMotion
                    ? {
                        scale: isExpanded ? 1.05 : 1,
                        rotateY: canHover && isExpanded ? 5 : 0,
                      }
                    : {
                        scale: 1,
                        rotateY: 0,
                      }
                }
                whileHover={
                  enableMotion && canHover
                    ? {
                        scale: 1.05,
                        rotate: [0, -2, 2, 0],
                      }
                    : undefined
                }
                transition={enableMotion ? { duration: 0.3 } : undefined}
              >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 skill-card-glow"
                    style={{
                      background: `radial-gradient(circle at center, ${skill.color}, transparent)`,
                    }}
                    animate={
                      enableMotion
                        ? {
                            opacity: isExpanded ? 0.3 : 0,
                          }
                        : {
                            opacity: isExpanded ? 0.3 : 0,
                          }
                    }
                    transition={enableMotion ? { duration: 0.3 } : undefined}
                  />

                  {/* Icon */}
                  <motion.div
                    className="mb-4 inline-block"
                    animate={
                      enableMotion
                        ? {
                            rotate: isExpanded ? 360 : 0,
                            scale: [1, 1.15, 1],
                          }
                        : {
                            rotate: 0,
                            scale: 1,
                          }
                    }
                    transition={
                      enableMotion
                        ? { 
                            rotate: { duration: 0.5 },
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                          }
                        : undefined
                    }
                  >
                    <Icon size={48} className={`skill-card-icon ${skill.color.replace('var(--', '').replace(')', '')}`} strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3
                    className={`groovy-text text-2xl mb-3 skill-card-title ${skill.color.replace('var(--', '').replace(')', '')}`}
                    style={{ color: skill.color }}
                  >
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm mb-4 opacity-80 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Details (expandable) */}
                  <motion.div
                    initial={false}
                    animate={
                      enableMotion
                        ? {
                            height: isExpanded ? 'auto' : 0,
                            opacity: isExpanded ? 1 : 0,
                          }
                        : {
                            height: isExpanded ? 'auto' : 0,
                            opacity: isExpanded ? 1 : 0,
                          }
                    }
                    transition={enableMotion ? { duration: 0.3 } : undefined}
                    className="overflow-hidden"
                  >
                    <ul className={`space-y-2 mt-4 pt-4 border-t border-opacity-30 skill-card-details ${skill.color.replace('var(--', '').replace(')', '')}`}
                        style={{ borderColor: skill.color }}>
                      {skill.details.map((detail, i) => (
                        <motion.li
                            key={i}
                            initial={enableMotion ? { x: -20, opacity: 0 } : false}
                            animate={
                              enableMotion
                                ? {
                                    x: isExpanded ? 0 : -20,
                                    opacity: isExpanded ? 1 : 0,
                                  }
                                : {
                                    x: 0,
                                    opacity: isExpanded ? 1 : 0,
                                  }
                            }
                            transition={enableMotion ? { delay: i * 0.05 } : undefined}
                            className="flex items-center text-sm opacity-90"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 skill-card-dot ${skill.color.replace('var(--', '').replace(')', '')}`} 
                                  style={{ background: skill.color }} />
                            {detail}
                          </motion.li>
                      ))}
                    </ul>
                  </motion.div>


                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
