import { motion } from 'motion/react';
import { ArrowLeft, Home, Settings } from 'lucide-react';
import { useCanHover } from './ui/use-can-hover';

interface NavigationProps {
  onNavigateHome: () => void;
  onOpenPersonalize?: () => void;
  isHomePage?: boolean;
  enableMotion?: boolean;
}

export function Navigation({ onNavigateHome, onOpenPersonalize, isHomePage = true, enableMotion = true }: NavigationProps) {
  const canHover = useCanHover();
  if (isHomePage) {
    // Show minimal nav on homepage with personalize button
    return (
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(10, 5, 20, 0.6)',
          backdropFilter: 'blur(20px)',
        }}
        initial={enableMotion ? { y: -100 } : false}
        animate={{ y: 0 }}
        transition={enableMotion ? { duration: 0.5 } : { duration: 0 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            className="groovy-text text-2xl cursor-pointer"
            onClick={onNavigateHome}
            style={{
              background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
          >
            ANTHRO-POLOGICA
          </motion.div>

          {onOpenPersonalize && (
            <motion.button
              onClick={onOpenPersonalize}
              className="flex items-center gap-2 px-6 py-2 rounded-full"
              style={{
                background: 'rgba(26, 15, 46, 0.8)',
                border: '2px solid var(--psychedelic-cyan)',
              }}
              whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
              whileTap={enableMotion ? { scale: 0.95 } : {}}
            >
              <Settings size={20} color="var(--psychedelic-cyan)" />
              <span style={{ color: 'var(--psychedelic-cyan)' }}>Personalize</span>
            </motion.button>
          )}
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        background: 'rgba(10, 5, 20, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 0, 255, 0.2)',
      }}
      initial={enableMotion ? { y: -100 } : false}
      animate={{ y: 0 }}
      transition={enableMotion ? { duration: 0.5 } : { duration: 0 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.button
          onClick={onNavigateHome}
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(26, 15, 46, 0.8)',
            border: '2px solid var(--psychedelic-cyan)',
          }}
          whileHover={enableMotion && canHover ? { scale: 1.05, x: -5 } : undefined}
          whileTap={enableMotion ? { scale: 0.95 } : {}}
        >
          <ArrowLeft size={20} color="var(--psychedelic-cyan)" />
          <span style={{ color: 'var(--psychedelic-cyan)' }}>Back to Home</span>
        </motion.button>

        <div className="flex items-center gap-4">
          {onOpenPersonalize && (
            <motion.button
              onClick={onOpenPersonalize}
              className="button-wave flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(26, 15, 46, 0.8)',
                border: '2px solid var(--psychedelic-yellow)',
              }}
              whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
              whileTap={enableMotion ? { scale: 0.95 } : {}}
              transition={enableMotion ? { duration: 0.3 } : { duration: 0 }}
            >
              <Settings size={20} color="var(--psychedelic-yellow)" />
              <span style={{ color: 'var(--psychedelic-yellow)' }}>Personalize</span>
            </motion.button>
          )}

          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={onNavigateHome}
            whileHover={enableMotion && canHover ? { scale: 1.05 } : undefined}
          >
            <Home size={20} color="var(--psychedelic-magenta)" />
            <span className="groovy-text text-xl" style={{
              background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              ANTHRO-POLOGICA
            </span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
