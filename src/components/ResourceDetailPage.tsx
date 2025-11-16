import { motion } from 'motion/react';
import { ArrowLeft, Clock, Download, ExternalLink, Share2, Bookmark } from 'lucide-react';
import { Resource } from '../data/resources';
import ReactMarkdown from 'react-markdown';
import { Footer } from './Footer';

interface ResourceDetailPageProps {
  resource: Resource;
  onBack: () => void;
}

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

const difficultyColors = {
  beginner: 'var(--psychedelic-lime)',
  intermediate: 'var(--psychedelic-yellow)',
  advanced: 'var(--psychedelic-magenta)',
};

export function ResourceDetailPage({ resource, onBack }: ResourceDetailPageProps) {
  const categoryColor = categoryColors[resource.category];
  const difficultyColor = difficultyColors[resource.difficulty];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${categoryColor}, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Back button */}
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(26, 15, 46, 0.8)',
              border: `2px solid ${categoryColor}`,
              color: categoryColor,
            }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            Back to Resources
          </motion.button>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="groovy-text text-5xl md:text-7xl mb-6"
            style={{
              background: `linear-gradient(135deg, ${categoryColor}, var(--psychedelic-cyan))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {resource.title}
          </motion.h1>

          {/* Meta information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-6"
          >
            <span
              className="px-4 py-2 rounded-full text-sm uppercase tracking-wider"
              style={{
                background: `${difficultyColor}20`,
                color: difficultyColor,
                border: `1px solid ${difficultyColor}`,
              }}
            >
              {resource.difficulty}
            </span>

            <span
              className="px-4 py-2 rounded-full text-sm flex items-center gap-2"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Clock size={16} />
              {resource.readTime} read
            </span>

            <span className="px-4 py-2 rounded-full text-sm opacity-70">
              By {resource.author}
            </span>

            <span className="px-4 py-2 rounded-full text-sm opacity-70">
              {new Date(resource.publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {resource.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background: `${categoryColor}20`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}`,
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {resource.downloadUrl && (
              <motion.a
                href={resource.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${categoryColor}, var(--psychedelic-magenta))`,
                  color: '#000',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                Download Template
              </motion.a>
            )}

            {resource.externalUrl && (
              <motion.a
                href={resource.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full"
                style={{
                  background: 'rgba(26, 15, 46, 0.8)',
                  border: `2px solid ${categoryColor}`,
                  color: categoryColor,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
                View External Link
              </motion.a>
            )}

            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-full"
              style={{
                background: 'rgba(26, 15, 46, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={20} />
              Share
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-full"
              style={{
                background: 'rgba(26, 15, 46, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark size={20} />
              Save
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none"
            style={{
              background: 'rgba(26, 15, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              padding: '3rem',
              borderRadius: '2rem',
              border: `2px solid ${categoryColor}40`,
            }}
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="groovy-text text-4xl mb-6" style={{ color: categoryColor }}>
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="groovy-text text-3xl mb-4 mt-8" style={{ color: categoryColor }}>
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="groovy-text text-2xl mb-3 mt-6" style={{ color: categoryColor }}>
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 leading-relaxed opacity-90">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-2 list-disc list-inside">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 space-y-2 list-decimal list-inside">{children}</ol>
                ),
                code: ({ children }) => (
                  <code
                    className="px-2 py-1 rounded text-sm"
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      color: categoryColor,
                    }}
                  >
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre
                    className="p-4 rounded-xl mb-4 overflow-x-auto"
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: `1px solid ${categoryColor}40`,
                    }}
                  >
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    className="pl-4 py-2 mb-4 border-l-4 italic"
                    style={{ borderColor: categoryColor }}
                  >
                    {children}
                  </blockquote>
                ),
              }}
            >
              {resource.content}
            </ReactMarkdown>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center p-12 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${categoryColor}20, transparent)`,
              border: `2px solid ${categoryColor}`,
            }}
          >
            <h2 className="groovy-text text-4xl mb-4" style={{ color: categoryColor }}>
              Found This Helpful?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Explore more resources or get in touch with our team for personalized guidance
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                onClick={onBack}
                className="button-wave px-8 py-4 rounded-full groovy-text text-xl"
                style={{
                  background: `linear-gradient(135deg, ${categoryColor}, var(--psychedelic-magenta))`,
                  color: '#000',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Browse More Resources
              </motion.button>
              <motion.button
                className="button-wave px-8 py-4 rounded-full groovy-text text-xl"
                style={{
                  background: 'rgba(26, 15, 46, 0.8)',
                  border: `2px solid ${categoryColor}`,
                  color: categoryColor,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
