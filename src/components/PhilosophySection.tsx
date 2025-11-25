import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useCanHover } from './ui/use-can-hover';

interface PhilosophySectionProps {
  enableMotion?: boolean;
}

export function PhilosophySection({ enableMotion = true }: PhilosophySectionProps) {
  const ref = useRef(null);
  const canHover = useCanHover();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Animated background */}
      {enableMotion ? (
        <motion.div
          className="absolute inset-0 opacity-30 bg-radial-purple-center"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ) : (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at center, var(--psychedelic-purple) 0%, transparent 70%)',
          }}
          aria-hidden
        />
      )}

      {/* Flowing shapes */}
      {enableMotion ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full opacity-20 flowing-shape-${i % 3}`}
              style={{
                width: `${100 + i * 30}px`,
                height: `${100 + i * 30}px`,
                top: `${20 + i * 10}%`,
                left: `${i % 2 === 0 ? '10%' : '80%'}`,
              }}
              animate={{
                x: [0, i % 2 === 0 ? 100 : -100, 0],
                y: [0, i % 2 === 0 ? -50 : 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      ) : null}

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        style={enableMotion ? { opacity, scale, y } : {}}
        transition={enableMotion ? { duration: 0.5 } : undefined}
      >
        <motion.div
          initial={enableMotion ? { opacity: 0 } : false}
          whileInView={enableMotion ? { opacity: 1 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          transition={enableMotion ? { duration: 1 } : undefined}
          className="text-center mb-16"
        >
          <h2 className="groovy-text text-6xl md:text-8xl mb-6">
            <motion.span className="gradient-linear-pink-cyan">
              Our Philosophy
            </motion.span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              title: 'Human Insight',
              description: 'Our work starts with real conversations. We partner with the people who will use our products to co-create solutions that solve genuine problems, not chase unsustainable hype.',
              color: 'var(--psychedelic-magenta)',
            },
            {
              title: 'Iterative Testing',
              description: 'Our mixed-method research blends data and deep listening, then we iterate relentlessly until every touchpoint feels right, safe, and truly effective.',
              color: 'var(--psychedelic-cyan)',
            },
            {
              title: 'Neurodivergent Design',
              description: 'We celebrate cognitive diversity. Our team brings ADHD, autism, dyslexia, and other neurodivergent perspectives that result in innovative, inclusive solutions.',
              color: 'var(--psychedelic-orange)',
            },
            {
              title: 'Bold Innovation',
              description: 'We ideate as a collective, using improv-style techniques to stretch every concept and bridge emerging technology with real human needs.',
              color: 'var(--psychedelic-yellow)',
            },
            {
              title: 'Intentional AI',
              description: 'We approach AI with care and responsibility. Every AI implementation is thoughtfully considered, ethically evaluated, and designed to enhance, never replace, human judgment and creativity.',
              color: 'var(--psychedelic-lime)',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={enableMotion ? { opacity: 0, y: 50 } : false}
              whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, amount: 0.3 }}
              transition={enableMotion ? { duration: 0.8, delay: index * 0.1 } : undefined}
              className={`relative p-8 rounded-3xl overflow-hidden philosophy-card ${canHover ? 'group cursor-pointer' : ''}`}
              style={{ borderColor: item.color }}
            >
              <motion.div
                className={`absolute inset-0 philosophy-card-hover ${canHover ? 'opacity-0 group-hover:opacity-20' : 'opacity-0'}`}
                style={{ background: item.color }}
                transition={enableMotion ? { duration: 0.3 } : undefined}
              />
              
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-30 philosophy-card-blur"
                style={{ background: item.color }}
                animate={
                  enableMotion
                    ? {
                        scale: [1, 1.3, 1],
                      }
                    : undefined
                }
                transition={
                  enableMotion
                    ? {
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : undefined
                }
              />

              <h3 className={`groovy-text text-3xl md:text-4xl mb-4 philosophy-card-title`} style={{ color: item.color }}>
                {item.title}
              </h3>
              <p className="text-lg leading-relaxed opacity-90">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
