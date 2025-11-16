import { motion } from 'motion/react';
import { FormEvent, useMemo, useState } from 'react';
import { Mail, MessageCircle, Calendar, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useCanHover } from './ui/use-can-hover';

interface ContactSectionProps {
  enableMotion?: boolean;
}

export function ContactSection({ enableMotion = true }: ContactSectionProps) {
  const canHover = useCanHover();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const particles = useMemo(() => {
    const colors = [
      'var(--psychedelic-magenta)',
      'var(--psychedelic-cyan)',
      'var(--psychedelic-yellow)',
    ];

    return Array.from({ length: 20 }, (_, index) => {
      let left = Math.random() * 100;
      let top = Math.random() * 100;
      let attempts = 0;

      // Keep dots out of the heading zone so the text stays legible.
      const inHeadingSafeZone = () =>
        top > 35 && top < 70 && left > 20 && left < 80;

      while (inHeadingSafeZone() && attempts < 10) {
        left = Math.random() * 100;
        top = Math.random() * 100;
        attempts += 1;
      }

      return {
        id: index,
        color: colors[index % colors.length],
        left,
        top,
        xOffset: Math.random() * 50 - 25,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
      };
    });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      window.alert(result.message || 'Thanks! Your message is on the way.');
      event.currentTarget.reset();
    } catch (error) {
      console.error('Submission error:', error);
      let errorMessage = 'Sorry—something went wrong. Please try again in a moment.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      window.alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Psychedelic background animation */}
      {enableMotion ? (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 50%, var(--psychedelic-purple) 0%, transparent 50%), radial-gradient(circle at 70% 50%, var(--psychedelic-pink) 0%, transparent 50%)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 50%, var(--psychedelic-purple) 0%, transparent 50%), radial-gradient(circle at 70% 50%, var(--psychedelic-pink) 0%, transparent 50%)',
          }}
          aria-hidden
        />
      )}

      {/* Color shifting particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) =>
          enableMotion ? (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: particle.color,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, particle.xOffset, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
            />
          ) : (
            <div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: particle.color,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
            />
          )
        )}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={enableMotion ? { opacity: 0, y: 50 } : false}
          whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          transition={enableMotion ? { duration: 1 } : undefined}
          className="text-center mb-16"
        >
          <h2 className="groovy-text text-6xl md:text-8xl mb-6">
            <motion.span
              style={{
                background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-yellow), var(--psychedelic-cyan))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Let's Connect
            </motion.span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Have a question about something we're working on or want to get in contact?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Contact methods */}
          <motion.div
            initial={enableMotion ? { opacity: 0, x: -50 } : false}
            whileInView={enableMotion ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true }}
            transition={enableMotion ? { duration: 0.8 } : undefined}
            className="space-y-6"
          >
            {[
              {
                icon: Mail,
                title: 'Email Us',
                value: 'hello@anthropologica.design',
                color: 'var(--psychedelic-magenta)',
              },
              {
                icon: MessageCircle,
                title: 'Chat With Us',
                value: 'Available Mon-Fri, 9am-6pm PST',
                color: 'var(--psychedelic-cyan)',
              },
              {
                icon: Calendar,
                title: 'Schedule a Call',
                value: 'Book a free 30-min consultation',
                color: 'var(--psychedelic-orange)',
              },
            ].map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={i}
                  initial={enableMotion ? { opacity: 0, y: 30 } : false}
                  whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: true }}
                  transition={enableMotion ? { delay: i * 0.1 } : undefined}
                  whileHover={enableMotion && canHover ? { scale: 1.05, x: 10 } : undefined}
                  className={`flex items-start gap-4 p-6 rounded-2xl ${canHover ? 'cursor-pointer' : ''}`}
                  style={{
                    background: 'rgba(26, 15, 46, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${method.color}`,
                  }}
                >
                  <motion.div
                    animate={
                      enableMotion
                        ? {
                            rotate: [0, 10, -10, 0],
                          }
                        : {
                            rotate: 0,
                          }
                    }
                    transition={
                      enableMotion
                        ? {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : undefined
                    }
                  >
                    <Icon size={32} color={method.color} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl mb-1" style={{ color: method.color }}>
                      {method.title}
                    </h3>
                    <p className="opacity-80">{method.value}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Social proof */}
            <motion.div
              initial={enableMotion ? { opacity: 0 } : false}
              whileInView={enableMotion ? { opacity: 1 } : undefined}
              viewport={{ once: true }}
              transition={enableMotion ? { delay: 0.4 } : undefined}
              className="mt-8 p-6 rounded-2xl"
              style={{
                background: 'rgba(26, 15, 46, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '2px solid var(--psychedelic-yellow)',
              }}
            >
              <p className="text-sm opacity-80 mb-2">Average response time</p>
              <p className="groovy-text text-3xl" style={{ color: 'var(--psychedelic-yellow)' }}>
                &lt; 24 Hours
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={enableMotion ? { opacity: 0, x: 50 } : false}
            whileInView={enableMotion ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true }}
            transition={enableMotion ? { duration: 0.8 } : undefined}
            className="relative p-8 rounded-3xl"
            style={{
              background: 'rgba(26, 15, 46, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '2px solid var(--psychedelic-magenta)',
            }}
          >
            {/* Form glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-3xl opacity-0"
              style={{
                background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan))',
                filter: 'blur(20px)',
              }}
              initial={enableMotion ? { opacity: 0 } : false}
              animate={
                enableMotion
                  ? {
                      opacity: focusedField ? 0.3 : 0,
                    }
                  : {
                      opacity: focusedField ? 0.3 : 0,
                    }
              }
              transition={enableMotion ? { duration: 0.3 } : undefined}
            />

            <form className="relative space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-2 opacity-80">Name</label>
                <motion.div
                  whileFocus={enableMotion ? { scale: 1.02 } : undefined}
                  animate={
                    enableMotion
                      ? {
                          boxShadow: focusedField === 'name'
                            ? '0 0 20px var(--psychedelic-magenta)'
                            : '0 0 0px transparent',
                        }
                      : {
                          boxShadow: focusedField === 'name'
                            ? '0 0 20px var(--psychedelic-magenta)'
                            : '0 0 0px transparent',
                        }
                  }
                  transition={enableMotion ? undefined : { duration: 0 }}
                >
                  <Input
                    type="text"
                    placeholder="Your name"
                    name="name"
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="bg-[var(--input-background)] border-2 border-[var(--psychedelic-magenta)] focus:border-[var(--psychedelic-cyan)] transition-colors"
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-sm mb-2 opacity-80">Email</label>
                <motion.div
                  whileFocus={enableMotion ? { scale: 1.02 } : undefined}
                  animate={
                    enableMotion
                      ? {
                          boxShadow: focusedField === 'email'
                            ? '0 0 20px var(--psychedelic-cyan)'
                            : '0 0 0px transparent',
                        }
                      : {
                          boxShadow: focusedField === 'email'
                            ? '0 0 20px var(--psychedelic-cyan)'
                            : '0 0 0px transparent',
                        }
                  }
                  transition={enableMotion ? undefined : { duration: 0 }}
                >
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    name="email"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="bg-[var(--input-background)] border-2 border-[var(--psychedelic-cyan)] focus:border-[var(--psychedelic-magenta)] transition-colors"
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-sm mb-2 opacity-80">What would you like to discuss?</label>
                <motion.div
                  whileFocus={enableMotion ? { scale: 1.02 } : undefined}
                  animate={
                    enableMotion
                      ? {
                          boxShadow: focusedField === 'project'
                            ? '0 0 20px var(--psychedelic-orange)'
                            : '0 0 0px transparent',
                        }
                      : {
                          boxShadow: focusedField === 'project'
                            ? '0 0 20px var(--psychedelic-orange)'
                            : '0 0 0px transparent',
                        }
                  }
                  transition={enableMotion ? undefined : { duration: 0 }}
                >
                  <Input
                    type="text"
                    placeholder="What are we creating?"
                    name="project"
                    onFocus={() => setFocusedField('project')}
                    onBlur={() => setFocusedField(null)}
                    className="bg-[var(--input-background)] border-2 border-[var(--psychedelic-orange)] focus:border-[var(--psychedelic-yellow)] transition-colors"
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-sm mb-2 opacity-80">Message</label>
                <motion.div
                  whileFocus={enableMotion ? { scale: 1.02 } : undefined}
                  animate={
                    enableMotion
                      ? {
                          boxShadow: focusedField === 'message'
                            ? '0 0 20px var(--psychedelic-yellow)'
                            : '0 0 0px transparent',
                        }
                      : {
                          boxShadow: focusedField === 'message'
                            ? '0 0 20px var(--psychedelic-yellow)'
                            : '0 0 0px transparent',
                        }
                  }
                  transition={enableMotion ? undefined : { duration: 0 }}
                >
                  <Textarea
                    placeholder="Tell us about your vision..."
                    rows={5}
                    name="message"
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="bg-[var(--input-background)] border-2 border-[var(--psychedelic-yellow)] focus:border-[var(--psychedelic-orange)] transition-colors resize-none"
                  />
                </motion.div>
              </div>

              <motion.div 
                whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined} 
                whileTap={enableMotion ? { scale: 0.95 } : undefined}
                transition={enableMotion ? { duration: 0.3 } : undefined}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-wave w-full relative overflow-hidden group py-6"
                  style={{
                    background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan))',
                    border: '2px solid var(--psychedelic-yellow)',
                  }}
                >
                  {/* Animated pulse */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--psychedelic-cyan), var(--psychedelic-magenta))',
                      opacity: 0,
                    }}
                    whileHover={enableMotion && canHover ? { opacity: 1 } : undefined}
                    transition={enableMotion ? { duration: 0.3 } : undefined}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2 text-black groovy-text text-xl">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send size={20} />
                  </span>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
