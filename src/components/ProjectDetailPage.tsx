import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { Project } from '../data/projects';
import { InvestorSection } from './InvestorSection';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectMedia } from '../data/projectMedia';

interface ProjectDetailPageProps {
  project: Project;
  enableMotion?: boolean;
}

const projectMediaMap = projectMedia;

export function ProjectDetailPage({ project, enableMotion = true }: ProjectDetailPageProps) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const media = projectMediaMap[project.id];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={enableMotion ? { opacity: heroOpacity, scale: heroScale } : undefined}
        >
          <div className="absolute inset-0" style={{ background: project.gradient, opacity: 0.3 }} />
          {media?.type === 'video' ? (
            <div className="absolute inset-0">
              <iframe
                title={`${project.title} overview`}
                src={media.src}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            <ImageWithFallback
              src={media?.src}
              alt={project.title}
              className="w-full h-full object-cover opacity-20"
              loading="eager"
              fetchPriority="high"
            />
          )}
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {enableMotion ? (
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-40"
              style={{
                background: `radial-gradient(circle, ${project.color}, transparent)`,
                filter: 'blur(100px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ) : (
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-40"
              style={{
                background: `radial-gradient(circle, ${project.color}, transparent)`,
                filter: 'blur(100px)',
              }}
            />
          )}
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={enableMotion ? { opacity: 0, y: 50 } : false}
            animate={enableMotion ? { opacity: 1, y: 0 } : undefined}
            transition={enableMotion ? { duration: 1 } : undefined}
          >
            <motion.div
              className="inline-block px-6 py-2 rounded-full mb-6"
              style={{ background: project.color }}
              animate={
                enableMotion
                  ? {
                      boxShadow: [
                        `0 0 20px ${project.color}`,
                        `0 0 40px ${project.color}`,
                        `0 0 20px ${project.color}`,
                      ],
                    }
                  : {
                      boxShadow: `0 0 20px ${project.color}`,
                    }
              }
              transition={enableMotion ? { duration: 2, repeat: Infinity } : undefined}
            >
              <span className="text-black">{project.status}</span>
            </motion.div>

            <h1
              className="groovy-text mb-6"
              style={{
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                color: project.color,
              }}
            >
              {project.title}
            </h1>

            <p className="text-2xl md:text-3xl mb-8 opacity-90">{project.category}</p>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-80">
              {project.fullDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-12">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-wave flex items-center gap-2 px-8 py-4 rounded-full"
                  style={{
                    background: project.gradient,
                    border: `2px solid ${project.color}`,
                    color: '#000',
                  }}
                  whileHover={enableMotion ? { scale: 1.05 } : undefined}
                  whileTap={enableMotion ? { scale: 0.95 } : undefined}
                  transition={enableMotion ? { duration: 0.3 } : undefined}
                >
                  <span className="groovy-text text-xl">Visit Live Site</span>
                  <ExternalLink size={20} />
                </motion.a>
              )}
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-wave flex items-center gap-2 px-8 py-4 rounded-full"
                  style={{
                    background: 'rgba(26, 15, 46, 0.8)',
                    border: `2px solid ${project.color}`,
                    color: project.color,
                  }}
                  whileHover={enableMotion ? { scale: 1.05 } : undefined}
                  whileTap={enableMotion ? { scale: 0.95 } : undefined}
                  transition={enableMotion ? { duration: 0.3 } : undefined}
                >
                  <span className="groovy-text text-xl">View Demo</span>
                  <ExternalLink size={20} />
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        {enableMotion ? (
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 rounded-full flex justify-center pt-2" style={{ borderColor: project.color }}>
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: project.color }}
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        ) : (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 rounded-full flex justify-center pt-2" style={{ borderColor: project.color }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
            </div>
          </div>
        )}
      </section>

      {/* Problem & Solution */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {enableMotion ? (
            <motion.div
              style={{
                background: `repeating-linear-gradient(45deg, transparent, transparent 20px, ${project.color} 20px, ${project.color} 21px)`,
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-full h-full"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `repeating-linear-gradient(45deg, transparent, transparent 20px, ${project.color} 20px, ${project.color} 21px)`,
              }}
            />
          )}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={enableMotion ? { opacity: 0, x: -50 } : false}
              whileInView={enableMotion ? { opacity: 1, x: 0 } : undefined}
              viewport={{ once: true, amount: 0.3 }}
              transition={enableMotion ? { duration: 0.8 } : undefined}
              className="p-8 rounded-3xl"
              style={{
                background: 'rgba(26, 15, 46, 0.8)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${project.color}`,
              }}
            >
              <h2 className="groovy-text text-4xl md:text-5xl mb-6" style={{ color: project.color }}>
                The Problem
              </h2>
              <p className="text-lg leading-relaxed opacity-90">{project.problem}</p>
            </motion.div>

            <motion.div
              initial={enableMotion ? { opacity: 0, x: 50 } : false}
              whileInView={enableMotion ? { opacity: 1, x: 0 } : undefined}
              viewport={{ once: true, amount: 0.3 }}
              transition={enableMotion ? { duration: 0.8 } : undefined}
              className="p-8 rounded-3xl"
              style={{
                background: 'rgba(26, 15, 46, 0.8)',
                backdropFilter: 'blur(10px)',
                border: `2px solid var(--psychedelic-cyan)`,
              }}
            >
              <h2 className="groovy-text text-4xl md:text-5xl mb-6" style={{ color: 'var(--psychedelic-cyan)' }}>
                Our Solution
              </h2>
              <p className="text-lg leading-relaxed opacity-90">{project.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          {enableMotion ? (
            <motion.div
              className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, ${project.color}, transparent)`,
                filter: 'blur(100px)',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          ) : (
            <div
              className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, ${project.color}, transparent)`,
                filter: 'blur(100px)',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={enableMotion ? { opacity: 0, y: 50 } : false}
            whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            className="groovy-text text-6xl md:text-7xl text-center mb-16"
            style={{
              background: `linear-gradient(135deg, ${project.color}, var(--psychedelic-cyan))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Key Features
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={enableMotion ? { opacity: 0, y: 30 } : false}
                whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true }}
                transition={enableMotion ? { delay: index * 0.1 } : undefined}
                whileHover={enableMotion ? { scale: 1.03, x: 5 } : undefined}
                className="p-6 rounded-2xl flex items-start gap-4"
                style={{
                  background: 'rgba(26, 15, 46, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${project.color}`,
                }}
              >
                <CheckCircle2 size={24} color={project.color} className="flex-shrink-0 mt-1" />
                <p className="leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Section - specific to this project */}
      <InvestorSection enableMotion={enableMotion} />

      {/* Footer */}
      <Footer enableMotion={enableMotion} />
    </div>
  );
}
