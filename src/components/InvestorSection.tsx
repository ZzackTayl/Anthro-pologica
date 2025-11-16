import { motion } from 'motion/react';
import { TrendingUp, FileText, BarChart3, Presentation } from 'lucide-react';

interface InvestorSectionProps {
  enableMotion?: boolean;
}

export function InvestorSection({ enableMotion = true }: InvestorSectionProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Portal effect background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {[...Array(8)].map((_, i) =>
          enableMotion ? (
            <motion.div
              key={i}
              className={`absolute rounded-full border-2 opacity-20 portal-ring-${i % 2 === 0 ? 'magenta' : 'cyan'}`}
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, i % 2 === 0 ? 360 : -360],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ) : (
            <div
              key={i}
              className={`absolute rounded-full border-2 opacity-20 portal-ring-${i % 2 === 0 ? 'magenta' : 'cyan'}`}
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
              }}
              aria-hidden
            />
          )
        )}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={enableMotion ? { opacity: 0, scale: 0.8 } : false}
          whileInView={enableMotion ? { opacity: 1, scale: 1 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          transition={enableMotion ? { duration: 1 } : undefined}
          className="text-center"
        >
          <motion.div
            className="inline-block mb-8"
            animate={
              enableMotion
                ? {
                    rotate: [0, 5, -5, 0],
                  }
                : {
                    rotate: 0,
                  }
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
          >
            <TrendingUp size={80} className="psychedelic-cyan" strokeWidth={1.5} />
          </motion.div>

          <h2 className="groovy-text text-6xl md:text-8xl mb-6">
            <motion.span className="gradient-linear-main bg-clip-text text-transparent">
              Investors & Partners
            </motion.span>
          </h2>

          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
            Join us in revolutionizing UX design for the neurodivergent future
          </p>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: FileText, label: 'Pitch Deck', color: 'var(--psychedelic-magenta)' },
              { icon: BarChart3, label: 'Market Analysis', color: 'var(--psychedelic-cyan)' },
              { icon: Presentation, label: 'Roadmap', color: 'var(--psychedelic-orange)' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={enableMotion ? { opacity: 0, y: 30 } : false}
                  whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: true }}
                  transition={enableMotion ? { delay: i * 0.1 } : undefined}

                  className="p-6 rounded-2xl bg-card border border-transparent"
                  style={{
                    borderColor: item.color,
                  }}
                >
                  <Icon size={40} className="mx-auto mb-3 investor-card-color" style={{ color: item.color }} />
                  <p className="text-lg investor-card-color" style={{ color: item.color }}>{item.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={enableMotion ? { opacity: 0, y: 30 } : false}
            whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={enableMotion ? { delay: 0.4 } : undefined}
          >
            <motion.button
              className="relative px-12 py-6 overflow-hidden group button-wave"
              style={{
                border: '3px solid var(--psychedelic-yellow)',
              }}
              whileHover={enableMotion ? { scale: 1.05 } : undefined}
              whileTap={enableMotion ? { scale: 0.95 } : undefined}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={
                  enableMotion
                    ? {
                        x: ['-100%', '200%'],
                      }
                    : {
                        x: '0%',
                      }
                }
                transition={
                  enableMotion
                    ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }
                    : undefined
                }
              />

              {/* Pulsing glow */}
              <motion.div
                className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 bg-pulse-glow"
                animate={
                  enableMotion
                    ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }
                    : {
                        scale: 1,
                        opacity: 0.5,
                      }
                }
                transition={
                  enableMotion
                    ? {
                        duration: 2,
                        repeat: Infinity,
                      }
                    : undefined
                }
              />

              <span className="relative z-10 groovy-text text-3xl text-black">
                View Investment Deck
              </span>
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
