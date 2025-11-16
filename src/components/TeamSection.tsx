import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ZackPortrait from '../../resources/images/zack.webp';
import GinnettPortrait from '../../resources/images/Ginnett-removebg-preview.png';
import ClarePortrait from '../../resources/images/Clare.webp';
import { useCanHover } from './ui/use-can-hover';

const teamMembers = [
  {
    name: 'Zack Stewart',
    role: 'Founder & UX Researcher',
    bio: 'A UX evangelist with a deep skillset in blending human psychology and technical solutions. 5+ years crafting strategy that defined experiences for over 75 million users, with roots in film and a regular improv practice.',
    color: 'var(--psychedelic-magenta)',
    gradient: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-pink))',
    image: ZackPortrait,
    link: {
      href: 'https://zackdrivesstrategy.com/',
      label: 'zackdrivesstrategy.com',
    },
    imageStyles: {
      objectPosition: 'center 45%',
    },
  },
  {
    name: 'Ginnett Codington',
    role: 'Creative Technologist',
    bio: 'Our guide for when and where to use AI. Grounded in deep empathy, she keeps us aligned with user needs and turns insights into responsible, user-centered decisions.',
    color: 'var(--psychedelic-cyan)',
    gradient: 'linear-gradient(135deg, var(--psychedelic-cyan), var(--psychedelic-purple))',
    image: GinnettPortrait,
    link: null,
  },
  {
    name: 'Clare DeMarco',
    role: 'UX Researcher',
    bio: 'UX researcher whose insights have helped startups thrive. She helps us converge and stay aligned on what matters most, whether that\'s which project to prioritize and why, or what business decisions to make under tight constraints.',
    color: 'var(--psychedelic-orange)',
    gradient: 'linear-gradient(135deg, var(--psychedelic-orange), var(--psychedelic-yellow))',
    image: ClarePortrait,
    hoverTextColor: '#0b1f5d',
    hoverRoleColor: 'rgba(11, 31, 93, 0.85)',
    hoverBioColor: 'rgba(11, 31, 93, 0.85)',
    link: null,
  },
];

interface TeamSectionProps {
  enableMotion?: boolean;
}

export function TeamSection({ enableMotion = true }: TeamSectionProps) {
  const canHover = useCanHover();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 md:opacity-20 opacity-10">
        {enableMotion ? (
          <motion.div
            className="absolute top-0 left-0 w-full h-full team-bg-gradient"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ) : (
          <div
            className="absolute top-0 left-0 w-full h-full team-bg-gradient"
            aria-hidden
          />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={enableMotion ? { opacity: 0, y: 50 } : false}
          whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          transition={enableMotion ? { duration: 1 } : undefined}
          className="text-center mb-20"
        >
          <h2 className="groovy-text text-6xl md:text-8xl mb-6">
            <motion.span className="gradient-linear-yellow-orange-pink">
              Meet The Team
            </motion.span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            The minds behind the magic: neurodivergent thinkers, storytellers, researchers, and creative technologists.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member, index) => {
            const isActive = canHover ? hoveredIndex === index : true;
            const hoverHeadingColor = member.hoverTextColor ?? '#ffffff';
            const hoverRoleColor = member.hoverRoleColor ?? 'rgba(255, 255, 255, 0.85)';
            const hoverBioColor = member.hoverBioColor ?? 'rgba(255, 255, 255, 0.9)';
            const headingColor = canHover && isActive ? hoverHeadingColor : member.color;
            const roleColor = canHover && isActive ? hoverRoleColor : member.color;
            const bioColor = canHover && isActive ? hoverBioColor : 'rgba(255, 255, 255, 0.9)';
            const linkColor = canHover && isActive ? hoverHeadingColor : member.color;

            return (
              <motion.div
                key={index}
                initial={enableMotion ? { opacity: 0, y: 50 } : false}
                whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, amount: 0.2 }}
                transition={enableMotion ? { duration: 0.8, delay: index * 0.15 } : undefined}
                onHoverStart={canHover ? () => setHoveredIndex(index) : undefined}
                onHoverEnd={canHover ? () => setHoveredIndex(null) : undefined}
                className={`relative ${canHover ? 'group cursor-pointer' : ''}`}
              >
                <motion.div
                  className={`relative overflow-hidden rounded-3xl team-card ${canHover ? 'group cursor-pointer' : ''}`}
                  style={{
                    border: `3px solid ${member.color}`,
                  }}
                  animate={
                    enableMotion
                      ? {
                          rotateY: canHover && isActive ? 10 : 0,
                          rotateX: canHover && isActive ? -5 : 0,
                          scale: canHover && isActive ? 1.05 : 1,
                        }
                      : {
                          rotateY: 0,
                          rotateX: 0,
                          scale: 1,
                        }
                  }
                  transition={enableMotion ? { duration: 0.4 } : undefined}
                >
                  {/* Geometric frame overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10 team-geometric-frame"
                    style={{
                      border: `6px solid ${member.color}`,
                      opacity: canHover && isActive ? 1 : 0,
                    }}
                    transition={enableMotion ? { duration: 0.3 } : undefined}
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-16 h-16 team-corner-topleft"
                      style={{
                        borderTop: `6px solid ${member.color}`,
                        borderLeft: `6px solid ${member.color}`,
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-16 h-16 team-corner-bottomright"
                      style={{
                        borderBottom: `6px solid ${member.color}`,
                        borderRight: `6px solid ${member.color}`,
                      }}
                    />
                  </motion.div>

                  {/* Profile image placeholder */}
                  <div className="aspect-square relative overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={member.imageStyles}
                    />
                  </div>

                  {/* Info section */}
                  <div className="p-6">
                    <motion.h3
                        className={`groovy-text text-3xl md:text-4xl mb-2 team-card-heading ${canHover && isActive ? 'team-card-heading-hover' : ''}`}
                        style={{
                          color: headingColor,
                          transition: enableMotion ? 'color 0.3s ease' : 'none',
                        }}
                        animate={
                          enableMotion
                            ? {
                                scale: canHover && isActive ? 1.05 : 1,
                              }
                            : { scale: 1 }
                        }
                      >
                      {member.name}
                    </motion.h3>
                    <p
                      className={`text-lg mb-4 opacity-80 team-card-role ${canHover && isActive ? 'team-card-role-hover' : ''}`}
                      style={{
                        color: roleColor,
                        transition: enableMotion ? 'color 0.3s ease' : 'none',
                      }}
                    >
                      {member.role}
                    </p>
                    <motion.p
                        className={`leading-relaxed opacity-90 team-card-bio ${canHover && isActive ? 'team-card-bio-hover' : ''}`}
                        initial={enableMotion && canHover ? { height: 0, opacity: 0 } : false}
                        animate={
                          enableMotion && canHover
                            ? {
                                height: isActive ? 'auto' : 0,
                                opacity: isActive ? 1 : 0,
                              }
                            : {
                                height: 'auto',
                                opacity: 1,
                              }
                        }
                        transition={enableMotion ? { duration: 0.4 } : undefined}
                        style={{
                          color: bioColor,
                          transition: enableMotion ? 'color 0.3s ease' : 'none',
                        }}
                      >
                      {member.bio}
                    </motion.p>
                    {member.link ? (
                      <motion.a
                          href={member.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-3 inline-flex items-center text-sm font-medium team-card-link ${canHover && isActive ? 'team-card-link-hover' : ''}`}
                          initial={enableMotion && canHover ? { height: 0, opacity: 0 } : false}
                          animate={
                            enableMotion && canHover
                              ? {
                                  height: isActive ? 'auto' : 0,
                                  opacity: isActive ? 1 : 0,
                                }
                              : {
                                  height: 'auto',
                                  opacity: 1,
                                }
                          }
                          transition={enableMotion ? { duration: 0.4 } : undefined}
                          whileHover={enableMotion && canHover ? { gap: '0.75rem' } : undefined}
                          style={{
                            color: linkColor,
                            transition: enableMotion ? 'color 0.3s ease' : 'none',
                          }}
                        >
                        {member.link.label}
                      </motion.a>
                    ) : null}
                  </div>

                  {/* 3D depth effect */}
                  <motion.div
                    className={`absolute -inset-4 rounded-3xl -z-10 ${canHover ? 'opacity-0 group-hover:opacity-100' : ''} team-card-depth`}
                    style={{
                      background: member.gradient,
                      filter: 'blur(20px)',
                    }}
                    initial={enableMotion ? { opacity: 0 } : false}
                    animate={
                      enableMotion
                        ? {
                            opacity: canHover ? (isActive ? 1 : 0) : 0,
                          }
                        : {
                            opacity: canHover && isActive ? 1 : 0,
                          }
                    }
                    transition={enableMotion ? { duration: 0.3 } : undefined}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
