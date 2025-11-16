import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Search, Filter, BookOpen, Sparkles } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import { Footer } from './Footer';
import { resources, categories, ResourceCategory, DifficultyLevel } from '../data/resources';

interface ResourceCenterProps {
  onResourceClick: (resourceId: string) => void;
}

export function ResourceCenter({ onResourceClick }: ResourceCenterProps) {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
    const searchMatch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && difficultyMatch && searchMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  ['var(--psychedelic-magenta)', 'var(--psychedelic-cyan)', 'var(--psychedelic-yellow)', 'var(--psychedelic-orange)'][i % 4]
                }, transparent)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.div
              className="inline-block"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <BookOpen size={80} color="var(--psychedelic-cyan)" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="groovy-text text-6xl md:text-8xl mb-6"
          >
            <motion.span
              style={{
                background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan), var(--psychedelic-yellow))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              UX Resource Center
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 opacity-90"
          >
            Your cosmic library of guides, templates, and wisdom for creating extraordinary user experiences
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div
              className="relative flex items-center px-6 py-4 rounded-full"
              style={{
                background: 'rgba(26, 15, 46, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '2px solid var(--psychedelic-cyan)',
              }}
            >
              <Search size={24} color="var(--psychedelic-cyan)" className="mr-3" aria-hidden="true" />
              <label htmlFor="resource-search" className="sr-only">
                Search resources
              </label>
              <input
                id="resource-search"
                type="text"
                placeholder="Search guides, templates, case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-lg"
              />
              {searchQuery && (
                <motion.button
                  onClick={() => setSearchQuery('')}
                  className="ml-3 text-sm opacity-70 hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Clear
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Filter Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 rounded-full mx-auto"
            style={{
              background: showFilters ? 'var(--psychedelic-magenta)' : 'rgba(26, 15, 46, 0.8)',
              color: showFilters ? '#000' : 'var(--psychedelic-magenta)',
              border: '2px solid var(--psychedelic-magenta)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter size={20} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </motion.button>
        </div>
      </section>

      {/* Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto mb-12">
              <div
                className="p-8 rounded-3xl"
                style={{
                  background: 'rgba(26, 15, 46, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid var(--psychedelic-magenta)',
                }}
              >
                {/* Difficulty Filter */}
                <div className="mb-6">
                  <h3 className="text-xl mb-4" style={{ color: 'var(--psychedelic-cyan)' }}>
                    Difficulty Level
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((difficulty) => (
                      <motion.button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className="px-6 py-3 rounded-full text-sm uppercase tracking-wider"
                        style={{
                          background: selectedDifficulty === difficulty 
                            ? 'var(--psychedelic-cyan)' 
                            : 'rgba(255, 255, 255, 0.1)',
                          color: selectedDifficulty === difficulty ? '#000' : '#fff',
                          border: '2px solid var(--psychedelic-cyan)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {difficulty === 'all' ? 'All Levels' : difficulty}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="text-xl mb-4" style={{ color: 'var(--psychedelic-magenta)' }}>
                    Category
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id as ResourceCategory | 'all')}
                        className="px-4 py-3 rounded-xl text-sm text-left"
                        style={{
                          background: selectedCategory === category.id 
                            ? 'var(--psychedelic-magenta)' 
                            : 'rgba(255, 255, 255, 0.1)',
                          color: selectedCategory === category.id ? '#000' : '#fff',
                          border: '2px solid var(--psychedelic-magenta)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
        <section className="px-6 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm opacity-70">Active filters:</span>
              
              {selectedCategory !== 'all' && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSelectedCategory('all')}
                  className="px-4 py-2 rounded-full text-sm flex items-center gap-2"
                  style={{
                    background: 'var(--psychedelic-magenta)40',
                    border: '1px solid var(--psychedelic-magenta)',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <span className="text-xs">✕</span>
                </motion.button>
              )}

              {selectedDifficulty !== 'all' && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSelectedDifficulty('all')}
                  className="px-4 py-2 rounded-full text-sm flex items-center gap-2"
                  style={{
                    background: 'var(--psychedelic-cyan)40',
                    border: '1px solid var(--psychedelic-cyan)',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {selectedDifficulty}
                  <span className="text-xs">✕</span>
                </motion.button>
              )}

              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-full text-sm flex items-center gap-2"
                  style={{
                    background: 'var(--psychedelic-yellow)40',
                    border: '1px solid var(--psychedelic-yellow)',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  "{searchQuery}"
                  <span className="text-xs">✕</span>
                </motion.button>
              )}

              <motion.button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="text-sm opacity-70 hover:opacity-100 underline"
                whileHover={{ scale: 1.05 }}
              >
                Clear all
              </motion.button>
            </div>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Results count */}
          <div className="mb-8 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg opacity-70"
            >
              Showing <span className="text-psychedelic-cyan">{filteredResources.length}</span> {filteredResources.length === 1 ? 'resource' : 'resources'}
            </motion.p>
          </div>

          {/* Resources grid */}
          {filteredResources.length > 0 ? (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ResourceCard
                      resource={resource}
                      onClick={() => onResourceClick(resource.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Sparkles size={64} color="var(--psychedelic-magenta)" className="mx-auto mb-6" />
              <h3 className="groovy-text text-3xl mb-4">No resources found</h3>
              <p className="text-lg opacity-70 mb-8">
                Try adjusting your filters or search query
              </p>
              <motion.button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="px-8 py-4 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan))',
                  color: '#000',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-16 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(0, 255, 255, 0.2))',
              border: '2px solid var(--psychedelic-cyan)',
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="mb-6"
            >
              <Sparkles size={48} color="var(--psychedelic-yellow)" className="mx-auto" />
            </motion.div>
            <h2 className="groovy-text text-5xl mb-6">
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Need Personalized Guidance?
              </span>
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Work with our neurodivergent UX experts to level up your skills or transform your product
            </p>
            <motion.button
              className="button-wave px-10 py-5 rounded-full groovy-text text-2xl"
              style={{
                background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan))',
                color: '#000',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              Book a Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
