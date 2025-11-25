import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useMemo } from 'react';
import { useCanHover } from './ui/use-can-hover';

interface HeroSectionProps {
  enableMotion?: boolean;
}

export function HeroSection({ enableMotion = true }: HeroSectionProps) {
  const canHover = useCanHover();
  const rawScrollY = useMotionValue(0);
  const smoothScrollY = useSpring(rawScrollY, { stiffness: 120, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!enableMotion) {
      rawScrollY.set(0);
      return;
    }

    let frameId = 0;
    const updateScroll = () => {
      rawScrollY.set(window.scrollY);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enableMotion, rawScrollY]);

  const blobParallax = useTransform(smoothScrollY, (value) => value * 0.1);
  const blobParallaxSecondary = useTransform(smoothScrollY, (value) => value * 0.15);
  const blobParallaxTertiary = useTransform(smoothScrollY, (value) => value * 0.12);

  const geometricShapes = useMemo(() => {
    const borderPalette = [
      'var(--psychedelic-magenta)',
      'var(--psychedelic-cyan)',
      'var(--psychedelic-yellow)',
    ];

    return Array.from({ length: 6 }).map((_, index) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: 50 + Math.random() * 100,
      height: 50 + Math.random() * 100,
      borderColor: borderPalette[index % borderPalette.length],
      rotate: Math.random() * 360,
      duration: 20 + Math.random() * 10,
    }));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-60"
          style={
            enableMotion
              ? {
                  background: 'radial-gradient(circle, var(--psychedelic-purple), transparent)',
                  filter: 'blur(80px)',
                  y: blobParallax,
                  willChange: 'transform',
                }
              : {
                  background: 'radial-gradient(circle, var(--psychedelic-purple), transparent)',
                  filter: 'blur(80px)',
                }
          }
          animate={enableMotion ? {
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          } : {}}
          transition={enableMotion ? {
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          } : {}}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-60"
          style={
            enableMotion
              ? {
                  background: 'radial-gradient(circle, var(--psychedelic-pink), transparent)',
                  filter: 'blur(80px)',
                  y: blobParallaxSecondary,
                  willChange: 'transform',
                }
              : {
                  background: 'radial-gradient(circle, var(--psychedelic-pink), transparent)',
                  filter: 'blur(80px)',
                }
          }
          animate={enableMotion ? {
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          } : {}}
          transition={enableMotion ? {
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          } : {}}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full opacity-60"
          style={
            enableMotion
              ? {
                  background: 'radial-gradient(circle, var(--psychedelic-cyan), transparent)',
                  filter: 'blur(80px)',
                  y: blobParallaxTertiary,
                  willChange: 'transform',
                }
              : {
                  background: 'radial-gradient(circle, var(--psychedelic-cyan), transparent)',
                  filter: 'blur(80px)',
                }
          }
          animate={enableMotion ? {
            scale: [1.2, 1, 1.2],
            y: [0, -30, 0],
          } : {}}
          transition={enableMotion ? {
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          } : {}}
        />
      </div>

      {/* Geometric shapes - only render if motion enabled */}
      {enableMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {geometricShapes.map((shape, i) => (
            <motion.div
              key={i}
              className="absolute border-2 opacity-20"
              style={{
                top: shape.top,
                left: shape.left,
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                borderColor: shape.borderColor,
                rotate: `${shape.rotate}deg`,
                willChange: 'transform',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pb-16 md:pb-24">
        <motion.div
          initial={enableMotion ? { opacity: 0, y: 50 } : false}
          animate={enableMotion ? { opacity: 1, y: 0 } : undefined}
          transition={enableMotion ? { duration: 1 } : undefined}
        >
          <motion.h1
            className="groovy-text mb-6 leading-none hero-title-gradient"
            style={{
              fontSize: 'clamp(3rem, 12vw, 10rem)',
            }}
            animate={enableMotion ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={enableMotion ? {
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            } : {}}
          >
            ANTHRO-POLOGICA
          </motion.h1>
        </motion.div>

        <motion.div
          initial={enableMotion ? { opacity: 0, y: 30 } : false}
          animate={enableMotion ? { opacity: 1, y: 0 } : undefined}
          transition={enableMotion ? { duration: 1, delay: 0.3 } : undefined}
          className="space-y-4"
        >
          <p className="text-xl md:text-3xl mb-8">
            <span style={{ color: '#ffffff' }}>At the Center of </span>
            <motion.span
              className="inline-block"
              animate={enableMotion ? {
                color: ['#ff00ff', '#00ffff', '#ffff00', '#ff00ff'],
              } : {}}
              transition={enableMotion ? {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              } : {}}
            >
              Human Intelligence
            </motion.span>
            <span style={{ color: '#ffffff' }}> and </span>
            <motion.span
              className="inline-block"
              animate={enableMotion ? {
                color: ['#ff00ff', '#00ffff', '#ffff00', '#ff00ff'],
              } : {}}
              transition={enableMotion ? {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              } : {}}
            >
              Technological Intelligence
            </motion.span>
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            We blend human-centered design with cutting-edge AI, creating experiences that celebrate cognitive diversity and push creative boundaries.
          </p>
        </motion.div>

        <motion.div
          initial={enableMotion ? { opacity: 0, scale: 0.8 } : false}
          animate={enableMotion ? { opacity: 1, scale: 1 } : undefined}
          transition={enableMotion ? { duration: 1, delay: 0.6 } : undefined}
          className="mt-12"
        >
          <motion.button
            onClick={() => {
              const projectsSection = document.querySelector('#projects-section');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="button-wave relative px-8 py-4 overflow-hidden group cursor-pointer hero-button"
            whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
            whileTap={enableMotion ? { scale: 0.95 } : undefined}
            transition={enableMotion ? { duration: 0.3 } : undefined}
          >
            <span className="relative z-10 groovy-text text-2xl">Explore Our Universe</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
