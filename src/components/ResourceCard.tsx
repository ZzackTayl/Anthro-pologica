import { motion } from 'motion/react';
import { Clock, Download, ExternalLink, BookOpen } from 'lucide-react';
import { Resource } from '../data/resources';

interface ResourceCardProps {
  resource: Resource;
  onClick: () => void;
}

const difficultyColors = {
  beginner: 'var(--psychedelic-lime)',
  intermediate: 'var(--psychedelic-yellow)',
  advanced: 'var(--psychedelic-magenta)',
};

const categoryColors = {
  'getting-started': 'var(--psychedelic-cyan)',
  'research': 'var(--psychedelic-pink)',
  'design-systems': 'var(--psychedelic-purple)',
  'accessibility': 'var(--psychedelic-lime)',
  'neurodivergent': 'var(--psychedelic-orange)',
  'ai-tools': 'var(--psychedelic-magenta)',
  'templates': 'var(--psychedelic-yellow)',
  'case-studies': 'var(--psychedelic-cyan)',
};

export function ResourceCard({ resource, onClick }: ResourceCardProps) {
  const categoryColor = categoryColors[resource.category];
  const difficultyColor = difficultyColors[resource.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer h-full"
    >
      <div
        className={`relative p-6 rounded-2xl h-full flex flex-col resource-card ${resource.category.replace('-', '')}`}
        style={{
          border: `2px solid ${categoryColor}`,
        }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 resource-card-hover-overlay"
          style={{
            background: `radial-gradient(circle at top right, ${categoryColor}30, transparent)`,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3
                className={`groovy-text text-2xl mb-2 resource-card-title ${resource.category.replace('-', '')}`}
                style={{ color: categoryColor }}
              >
                {resource.title}
              </h3>
              <p className="text-sm opacity-80 leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>

          {/* Meta information */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Difficulty badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider resource-card-difficulty-${resource.difficulty}`}
              style={{
                background: `${difficultyColor}20`,
                color: difficultyColor,
                border: `1px solid ${difficultyColor}`,
              }}
            >
              {resource.difficulty}
            </span>

            {/* Read time */}
            <span
              className="px-3 py-1 rounded-full text-xs flex items-center gap-1 resource-card-meta"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Clock size={12} />
              {resource.readTime}
            </span>

            {/* Download indicator */}
            {resource.downloadUrl && (
              <span
                className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 resource-card-label ${resource.category.replace('-', '')}`}
                style={{
                  background: `${categoryColor}20`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}`,
                }}
              >
                <Download size={12} />
                Download
              </span>
            )}

            {/* External link indicator */}
            {resource.externalUrl && (
              <span
                className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 resource-card-label ${resource.category.replace('-', '')}`}
                style={{
                  background: `${categoryColor}20`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}`,
                }}
              >
                <ExternalLink size={12} />
                External
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs opacity-70 px-2 py-1 rounded resource-card-tag"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-between pt-4 border-t border-opacity-20 resource-card-footer ${resource.category.replace('-', '')}`}
               style={{ borderColor: categoryColor }}>
            <div className="text-xs opacity-60">
              By {resource.author}
            </div>
            <motion.div
              className={`flex items-center gap-2 text-sm resource-card-footer-text ${resource.category.replace('-', '')}`}
              style={{ color: categoryColor }}
              whileHover={{ x: 5 }}
            >
              <BookOpen size={16} />
              <span>Read More</span>
            </motion.div>
          </div>
        </div>

        {/* Corner decoration */}
        <motion.div
          className={`absolute top-3 right-3 w-2 h-2 rounded-full resource-card-corner ${resource.category.replace('-', '')}`}
          style={{ background: categoryColor }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
