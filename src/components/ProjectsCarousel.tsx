import { motion, AnimatePresence } from 'motion/react';
import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projects } from '../data/projects';
import { projectMedia } from '../data/projectMedia';
import { useCanHover } from './ui/use-can-hover';

interface ProjectsCarouselProps {
  onProjectClick: (projectId: string) => void;
  enableMotion?: boolean;
}

export function ProjectsCarousel({ onProjectClick, enableMotion = true }: ProjectsCarouselProps) {
  const canHover = useCanHover();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Simplified animations for mobile/reduced motion
  const slideVariants = useMemo(
    () => ({
      enter: (direction: number) =>
        enableMotion
          ? {
              rotateY: direction > 0 ? 90 : -90,
              opacity: 0,
              scale: 0.8,
              x: 0,
            }
          : {
              rotateY: 0,
              opacity: 1,
              scale: 1,
              x: 0,
            },
      center: {
        rotateY: 0,
        opacity: 1,
        scale: 1,
        x: 0,
      },
      exit: (direction: number) =>
        enableMotion
          ? {
              rotateY: direction < 0 ? 90 : -90,
              opacity: 0,
              scale: 0.8,
              x: 0,
            }
          : {
              rotateY: 0,
              opacity: 1,
              scale: 1,
              x: 0,
            },
    }),
    [enableMotion]
  );

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = projects.length - 1;
      if (nextIndex >= projects.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentProject = projects[currentIndex];
  const currentMedia = projectMedia[currentProject.id];
  const isCaseStudyAvailable = currentProject.caseStudyAvailable !== false;
  const projectThemeClass = `project-theme-${currentProject.id}`;
  const contextTags = currentProject.tags?.slice(4) ?? [];
  const hasContextTags = contextTags.length > 0;

  return (
    <section id="projects-section" className="relative py-32 px-6 pb-40 overflow-hidden">
      {/* Flowing background waves - only animate if motion enabled */}
      {enableMotion ? (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.svg
            className="absolute w-full h-full"
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z"
              fill="var(--psychedelic-magenta)"
              animate={{
                d: [
                  'M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z',
                  'M0,400 Q300,500 600,400 T1200,400 L1200,800 L0,800 Z',
                  'M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z',
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0,500 Q300,400 600,500 T1200,500 L1200,800 L0,800 Z"
              fill="var(--psychedelic-cyan)"
              animate={{
                d: [
                  'M0,500 Q300,400 600,500 T1200,500 L1200,800 L0,800 Z',
                  'M0,500 Q300,600 600,500 T1200,500 L1200,800 L0,800 Z',
                  'M0,500 Q300,400 600,500 T1200,500 L1200,800 L0,800 Z',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.svg>
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z"
              fill="var(--psychedelic-magenta)"
            />
            <path
              d="M0,500 Q300,400 600,500 T1200,500 L1200,800 L0,800 Z"
              fill="var(--psychedelic-cyan)"
            />
          </svg>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          role="region"
          aria-label="Projects carousel"
          aria-live="polite"
          aria-atomic="false"
        >
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Viewing project {currentIndex + 1} of {projects.length}: {currentProject.title}
          </div>

          <motion.div
            initial={enableMotion ? { opacity: 0, y: 50 } : false}
            whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={enableMotion ? { duration: 1 } : undefined}
            className="text-center mb-20"
          >
            <h2 className="groovy-text text-6xl md:text-8xl mb-6">
              <motion.span
                className="carousel-heading-gradient"
                animate={enableMotion ? {
                  backgroundPosition: ['0% 0%', '100% 100%'],
                } : undefined}
                transition={enableMotion ? {
                  duration: 12,
                  repeat: Infinity,
                  ease: 'linear',
                } : undefined}
              >
                Current Projects
              </motion.span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Explore our active projects pushing the boundaries of UX design
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto carousel-perspective">
          <AnimatePresence initial={false} custom={direction} mode={enableMotion ? 'wait' : undefined}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial={enableMotion ? 'enter' : false}
              animate={enableMotion ? 'center' : undefined}
              exit={enableMotion ? 'exit' : undefined}
              transition={
                enableMotion
                  ? {
                      rotateY: { type: 'spring', stiffness: 100, damping: 20 },
                      opacity: { duration: 0.3 },
                    }
                  : { duration: 0 }
              }
              className="relative preserve-3d"
            >
              <div
                className={`relative p-8 md:p-12 rounded-3xl overflow-hidden project-card ${projectThemeClass}`}
              >
                {/* Gradient overlay */}
                {enableMotion ? (
                  <motion.div
                    className="absolute inset-0 opacity-20 project-card-overlay"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 opacity-20 project-card-overlay"
                    aria-hidden
                  />
                )}

                {/* Content */}
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                  {/* Left: Image and badges */}
                  <div className="space-y-4">
                    {/* Badges ABOVE image - first 3 tags */}
                    {currentProject.tags?.length ? (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {currentProject.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={`top-badge-${i}`}
                              className={`px-3 py-1 rounded-full text-sm border-2 project-badge ${projectThemeClass}`}
                            >
                              {tag}
                            </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Image */}
                    <motion.div
                      initial={enableMotion ? { opacity: 0, x: -50 } : false}
                      animate={enableMotion ? { opacity: 1, x: 0 } : undefined}
                      transition={enableMotion ? { delay: 0.2 } : undefined}
                      className={`relative aspect-video rounded-xl overflow-hidden project-media-frame ${projectThemeClass}`}
                    >
                      {currentMedia?.type === 'video' ? (
                        <iframe
                          title={`${currentProject.title} preview`}
                          src={currentMedia.src}
                          className="absolute inset-0 h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <ImageWithFallback
                          src={currentMedia?.src}
                          alt={currentProject.alt || `Screenshot of ${currentProject.title} project`}
                          className="w-full h-full object-cover"
                          loading="eager"
                        />
                      )}
                      {currentMedia?.type === 'image' && enableMotion && (
                        <motion.div
                          className="absolute inset-0 project-media-overlay"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Badge BELOW image - "Launching soon" tag (index 3) */}
                    {currentProject.tags?.length > 3 && currentProject.tags[3] && (
                      <div className="text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm border-2 project-badge ${projectThemeClass}`}
                        >
                          {currentProject.tags[3]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right: Details */}
                  <motion.div
                    initial={enableMotion ? { opacity: 0, x: 50 } : false}
                    animate={enableMotion ? { opacity: 1, x: 0 } : undefined}
                    transition={enableMotion ? { delay: 0.3 } : undefined}
                  >
                    <h3 className={`groovy-text text-4xl md:text-5xl mb-3 project-title ${projectThemeClass}`}>
                      {currentProject.title}
                    </h3>

                    <p className="text-lg mb-4 opacity-80">{currentProject.category}</p>

                    <p className="text-base leading-relaxed mb-6 opacity-90">
                      {currentProject.description}
                    </p>

                    {isCaseStudyAvailable ? (
                      <motion.button
                        onClick={() => onProjectClick(currentProject.id)}
                        className={`button-wave flex items-center gap-2 px-6 py-3 rounded-full project-cta ${projectThemeClass}`}
                        whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
                        whileTap={enableMotion ? { scale: 0.95 } : undefined}
                        transition={enableMotion ? { duration: 0.3 } : undefined}
                      >
                        <span>View Case Study</span>
                        <ExternalLink size={18} />
                      </motion.button>
                    ) : currentProject.liveUrl ? (
                      <motion.a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`button-wave flex items-center gap-2 px-6 py-3 rounded-full project-cta ${projectThemeClass}`}
                        whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
                        whileTap={enableMotion ? { scale: 0.95 } : undefined}
                        transition={enableMotion ? { duration: 0.3 } : undefined}
                      >
                        <span>Visit Website</span>
                        <ExternalLink size={18} />
                      </motion.a>
                    ) : null}

                    {/* Context cards - skip first 4 tags (3 badges + 1 launching soon) */}
                    {hasContextTags && (
                      <div className="project-context-grid mt-8">
                        {contextTags.map((tag, i) => (
                          <div
                            key={`context-${i}`}
                            className={`flex items-start gap-3 px-3 py-2 rounded-xl shadow-md backdrop-blur-sm project-context-card ${projectThemeClass}`}
                          >
                            <span
                              className={`mt-1 inline-block w-2 h-2 rounded-full shrink-0 project-context-dot ${projectThemeClass}`}
                              aria-hidden
                            />
                            <span className="text-sm leading-relaxed">{tag}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={() => paginate(-1)}
              className="button-wave p-5 rounded-full min-w-[48px] min-h-[48px] carousel-nav-button carousel-nav-prev"
              aria-label="View previous project"
              whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
              whileTap={enableMotion ? { scale: 0.9 } : undefined}
              transition={enableMotion ? { duration: 0.3 } : undefined}
            >
              <ChevronLeft size={24} color="var(--psychedelic-cyan)" />
            </motion.button>

            <motion.button
              onClick={() => paginate(1)}
              className="button-wave p-5 rounded-full min-w-[48px] min-h-[48px] carousel-nav-button carousel-nav-next"
              aria-label="View next project"
              whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
              whileTap={enableMotion ? { scale: 0.9 } : undefined}
              transition={enableMotion ? { duration: 0.3 } : undefined}
            >
              <ChevronRight size={24} color="var(--psychedelic-magenta)" />
            </motion.button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-3 mt-6">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`p-3 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center project-pagination-dot project-theme-${projects[i].id} ${i === currentIndex ? 'is-active' : ''}`}
                aria-label={`Go to project ${i + 1} of ${projects.length}: ${projects[i].title}`}
                aria-current={i === currentIndex ? 'true' : 'false'}
                whileHover={enableMotion && canHover ? { scale: 1.5 } : undefined}
                animate={
                  enableMotion
                    ? {
                        scale: i === currentIndex ? 1.2 : 1,
                      }
                    : {
                        scale: 1,
                      }
                }
              >
                <span
                  className="w-3 h-3 rounded-full project-dot"
                  data-active={i === currentIndex}
                />
              </motion.button>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
