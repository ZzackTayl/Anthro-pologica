import { motion } from 'motion/react';
import backgroundSand from '../assets/background_sand.webp';
import { useCanHover } from './ui/use-can-hover';

interface HeroSectionProps {
  enableMotion?: boolean;
}

export function HeroSection({ enableMotion = true }: HeroSectionProps) {
  const canHover = useCanHover();
  const heroMinHeight = 'max(100vh, 66.67vw)'; // maintain image aspect ratio (1536x1024) without stretching

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden pt-32 md:pt-40"
      style={{ minHeight: heroMinHeight }}
    >
      {/* Static background image replaces animated blobs and geometric shapes */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
        <img
          aria-hidden="true"
          src={backgroundSand}
          alt=""
          className="w-full h-auto max-w-none object-contain bg-black"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.48) 65%, rgba(0,0,0,0.62) 100%), linear-gradient(to bottom, rgba(0,0,0,0.28), rgba(0,0,0,0.48))',
          }}
        />
      </div>

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
          className="space-y-4 mt-10"
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
          className="mt-16 md:mt-20"
        >
          <motion.a
            href="#projects-section"
            onClick={(e) => {
              e.preventDefault();
              const projectsSection = document.querySelector('#projects-section');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="button-wave relative px-8 py-4 overflow-hidden group cursor-pointer hero-button inline-block text-center no-underline"
            whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
            whileTap={enableMotion ? { scale: 0.95 } : undefined}
            transition={enableMotion ? { duration: 0.3 } : undefined}
          >
            <span className="relative z-10 groovy-text text-2xl">Explore Our Universe</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
