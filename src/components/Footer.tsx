import { motion } from 'motion/react';
import { Instagram, Linkedin, Heart, Settings } from 'lucide-react';
import { useCanHover } from './ui/use-can-hover';

interface FooterProps {
  enableMotion?: boolean;
  onOpenAccessibilitySettings?: () => void;
}

export function Footer({ enableMotion = true, onOpenAccessibilitySettings }: FooterProps) {
  const canHover = useCanHover();
  const handleOpenAccessibilitySettings = () => {
    if (onOpenAccessibilitySettings) {
      onOpenAccessibilitySettings();
      return;
    }

    localStorage.removeItem('anthropologica_visited');
    window.location.reload();
  };
  const socialLinks = [
    { icon: Instagram, href: '#', color: 'var(--psychedelic-pink)', label: 'Visit our Instagram' },
    { icon: Linkedin, href: '#', color: 'var(--psychedelic-cyan)', label: 'Connect with us on LinkedIn' },
  ];

  const revealSection = (delay = 0) =>
    enableMotion
      ? {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.8, delay },
        }
      : {
          initial: { opacity: 1, y: 0 },
          animate: { opacity: 1, y: 0 },
        };

  const fadeIn = (delay = 0) =>
    enableMotion
      ? {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.8, delay },
        }
      : {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
        };

  const scaleLine = enableMotion
    ? {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: { once: true },
        transition: { duration: 1 },
      }
    : {
        initial: { scaleX: 1 },
        animate: { scaleX: 1 },
      };

  return (
    <footer className="relative overflow-hidden">
      {/* Animated waves */}
      <div className="absolute inset-x-0 top-0 overflow-hidden">
        {enableMotion ? (
          <svg
            className="w-full h-32"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="var(--psychedelic-magenta)"
              opacity="0.3"
              animate={{
                d: [
                  'M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z',
                  'M0,60 Q300,100 600,60 T1200,60 L1200,120 L0,120 Z',
                  'M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z',
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z"
              fill="var(--psychedelic-cyan)"
              opacity="0.3"
              animate={{
                d: [
                  'M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z',
                  'M0,80 Q300,120 600,80 T1200,80 L1200,120 L0,120 Z',
                  'M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </svg>
        ) : (
          <svg
            className="w-full h-32"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="var(--psychedelic-magenta)"
              opacity="0.3"
            />
            <path
              d="M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z"
              fill="var(--psychedelic-cyan)"
              opacity="0.3"
            />
          </svg>
        )}
      </div>

      <div className="relative pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto mt-12">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <motion.div
              {...revealSection()}
            >
              <h3 className="groovy-text text-4xl mb-4">
                <motion.span
                  style={{
                    background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ANTHRO-POLOGICA
                </motion.span>
              </h3>
              <p className="opacity-80 leading-relaxed">
                Small but mighty UX venture studio pushing bold products forward with neurodivergent insight and AI experimentation.
              </p>
            </motion.div>

            {/* Quick links */}
            <motion.div
              {...revealSection(0.1)}
            >
              <h4 className="text-xl mb-4" style={{ color: 'var(--psychedelic-cyan)' }}>
                Quick Links
              </h4>
              <ul className="space-y-2">
                {['About', 'Services', 'Projects', 'Team', 'Contact'].map((link, i) => (
                  <motion.li key={i} whileHover={enableMotion && canHover ? { x: 5 } : undefined}>
                    <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                      {link}
                    </a>
                  </motion.li>
                ))}
                <motion.li whileHover={enableMotion && canHover ? { x: 5 } : undefined}>
                  <button 
                    onClick={handleOpenAccessibilitySettings}
                    className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Accessibility Settings
                  </button>
                </motion.li>
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              {...revealSection(0.2)}
            >
              <h4 className="text-xl mb-4" style={{ color: 'var(--psychedelic-yellow)' }}>
                Stay Connected
              </h4>
              <p className="opacity-80 mb-4">
                Get our monthly newsletter with UX insights and neurodivergent design tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-full bg-[var(--input-background)] border border-[var(--psychedelic-yellow)] text-foreground focus:outline-hidden focus:ring-2 focus:ring-[var(--psychedelic-yellow)]"
                  aria-label="Email address for newsletter subscription"
                />
                <motion.button
                  className="button-wave px-6 py-3 rounded-full whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, var(--psychedelic-orange), var(--psychedelic-pink))',
                    border: '2px solid var(--psychedelic-yellow)',
                    color: '#000',
                  }}
                  whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
                  whileTap={enableMotion ? { scale: 0.95 } : undefined}
                  transition={enableMotion ? { duration: 0.3 } : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.parentElement?.querySelector('input[type="email"]') as HTMLInputElement;
                    if (input && input.value && input.value.includes('@')) {
                      // Show loading state
                      const originalText = e.currentTarget.innerHTML;
                      e.currentTarget.innerHTML = 'Subscribing...';
                      
                      fetch('/api/subscribe', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: input.value })
                      })
                      .then(async response => {
                        const data = await response.json();
                        
                        if (response.ok && data.success) {
                          alert(`Thank you for subscribing with ${input.value}! A welcome email is on the way.`);
                          input.value = '';
                        } else {
                          const errorMessage = data.error || 'There was an issue with your subscription.';
                          alert(`Error: ${errorMessage} Please try again.`);
                        }
                      })
                      .catch(error => {
                        console.error('Subscription error:', error);
                        alert('There was a network error. Please check your connection and try again.');
                      })
                      .finally(() => {
                        // Restore original button text
                        e.currentTarget.innerHTML = originalText;
                      });
                    } else {
                      alert('Please enter a valid email address.');
                      input?.focus();
                    }
                  }}
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Social links */}
          <motion.div
            {...fadeIn(0.3)}
            className="flex justify-center gap-6 mb-12"
          >
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={i}
                  href={social.href}
                  className="p-3 rounded-full"
                  style={{
                    background: 'rgba(26, 15, 46, 0.8)',
                    border: `2px solid ${social.color}`,
                  }}
                  aria-label={social.label}
                  whileHover={
                    enableMotion && canHover
                      ? {
                          scale: 1.2,
                          rotate: 360,
                          backgroundColor: social.color,
                        }
                      : undefined
                  }
                  transition={enableMotion ? { duration: 0.3 } : undefined}
                >
                  <Icon size={24} color={social.color} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Divider */}
          <motion.div
            className="h-px mb-8"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--psychedelic-magenta), var(--psychedelic-cyan), transparent)',
            }}
            {...scaleLine}
          />

          {/* Copyright */}
          <motion.div
            {...fadeIn(0.4)}
            className="text-center"
          >
            <p className="opacity-80 text-center">
              © 2025 Anthro-Pologica. Made with{' '}
              <motion.span
                className="inline-flex items-center justify-center mx-1 align-middle"
                animate={enableMotion ? {
                  scale: [1, 1.3, 1],
                } : {}}
                transition={enableMotion ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                } : {}}
              >
                <Heart size={16} fill="var(--psychedelic-pink)" color="var(--psychedelic-pink)" />
              </motion.span>
              {' '}and neurodivergent thinking
            </p>
            <motion.p
              className="mt-2 text-sm opacity-60"
              animate={enableMotion ? {
                color: [
                  'var(--psychedelic-magenta)',
                  'var(--psychedelic-cyan)',
                  'var(--psychedelic-yellow)',
                  'var(--psychedelic-magenta)',
                ],
              } : {}}
              transition={enableMotion ? {
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              } : {}}
            >
              Celebrating cognitive diversity • Pushing creative boundaries
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 inset-x-0 h-1">
        {enableMotion ? (
          <motion.div
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, var(--psychedelic-magenta), var(--psychedelic-cyan), var(--psychedelic-yellow), var(--psychedelic-orange), var(--psychedelic-magenta))',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '200% 0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ) : (
          <div
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, var(--psychedelic-magenta), var(--psychedelic-cyan), var(--psychedelic-yellow), var(--psychedelic-orange), var(--psychedelic-magenta))',
              backgroundSize: '200% 100%',
            }}
          />
        )}
      </div>
    </footer>
  );
}
