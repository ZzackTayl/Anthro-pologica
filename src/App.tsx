import { lazy, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { Navigation } from './components/Navigation';
import { useIsMobile } from './components/ui/use-mobile';
import { getProjectById } from './data/projects';
import { useAccessibilityPreferences } from './hooks/useAccessibilityPreferences';
import './styles.css'; // Import the CSS file with our styles

type Route = 'home' | 'project';

const PhilosophySection = lazy(() =>
  import('./components/PhilosophySection').then((module) => ({ default: module.PhilosophySection }))
);

const TeamSection = lazy(() =>
  import('./components/TeamSection').then((module) => ({ default: module.TeamSection }))
);

const SkillsSection = lazy(() =>
  import('./components/SkillsSection').then((module) => ({ default: module.SkillsSection }))
);

const ProjectsCarousel = lazy(() =>
  import('./components/ProjectsCarousel').then((module) => ({ default: module.ProjectsCarousel }))
);

const ContactSection = lazy(() =>
  import('./components/ContactSection').then((module) => ({ default: module.ContactSection }))
);

const Footer = lazy(() =>
  import('./components/Footer').then((module) => ({ default: module.Footer }))
);

const ProjectDetailPage = lazy(() =>
  import('./components/ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage }))
);

const AccessibilityPreferencesDialog = lazy(() =>
  import('./components/AccessibilityPreferences').then((module) => ({ default: module.AccessibilityPreferencesDialog }))
);

function SectionSkeleton({ height = 'project-card' }: { height?: string }) {
  // Map height string to appropriate CSS class
  const heightClass = height === '16rem' ? 'project-card' :
                     height === '20rem' ? 'project-card-tall' :
                     height === '28rem' ? 'project-card-extra-tall' :
                     height === '12rem' ? 'project-card-footer' :
                     height === '32rem' ? 'project-card-project-detail' :
                     'project-card';
                     
  return (
    <div className="py-24 px-6" aria-hidden>
      <div
        className={`max-w-6xl mx-auto rounded-3xl bg-white/5 backdrop-blur-sm animate-pulse ${heightClass}`}
      />
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile();
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showAccessibilityDialog, setShowAccessibilityDialog] = useState(false);
  const { preferences: accessibilityPrefs, applyPreferences } = useAccessibilityPreferences();
  const motionEnabled = accessibilityPrefs.motion && !isMobile;

  const handleProjectClick = (projectId: string) => {
    const project = getProjectById(projectId);
    if (project?.caseStudyAvailable === false) {
      if (project?.liveUrl) {
        window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    setSelectedProjectId(projectId);
    setCurrentRoute('project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentRoute('home');
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPersonalize = () => {
    setShowAccessibilityDialog(true);
  };

  // Enable motion reduction on mobile for better performance
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isMobile) {
      root.classList.add('reduce-motion-mobile');
      body?.classList.add('reduce-motion-mobile');
    } else {
      root.classList.remove('reduce-motion-mobile');
      body?.classList.remove('reduce-motion-mobile');
    }
  }, [isMobile]);

  const selectedProject = selectedProjectId ? getProjectById(selectedProjectId) : null;

  return (
    <MotionConfig reducedMotion={accessibilityPrefs.motion ? 'never' : 'always'}>
      <>
      <Suspense fallback={null}>
        {showAccessibilityDialog ? (
          <AccessibilityPreferencesDialog
            onSave={applyPreferences}
            preferences={accessibilityPrefs}
            isOpen={showAccessibilityDialog}
            onClose={() => setShowAccessibilityDialog(false)}
          />
        ) : null}
      </Suspense>
      
      <div className="min-h-screen bg-background text-foreground antialiased">
        <Navigation 
          onNavigateHome={handleNavigateHome} 
          onOpenPersonalize={handleOpenPersonalize}
          isHomePage={currentRoute === 'home'}
          enableMotion={motionEnabled}
        />
        
        <AnimatePresence mode="wait">
          {currentRoute === 'home' ? (
            <motion.div
              key="home"
              initial={motionEnabled ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={motionEnabled ? { opacity: 0 } : {}}
              transition={motionEnabled ? { duration: 0.5 } : { duration: 0 }}
            >
              <HeroSection enableMotion={motionEnabled} />
              <Suspense fallback={<SectionSkeleton />}>
                <PhilosophySection enableMotion={motionEnabled} />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <TeamSection enableMotion={motionEnabled} />
              </Suspense>
              <Suspense fallback={<SectionSkeleton height="20rem" />}>
                <SkillsSection enableMotion={motionEnabled} />
              </Suspense>
              <Suspense fallback={<SectionSkeleton height="28rem" />}>
                <ProjectsCarousel 
                  onProjectClick={handleProjectClick}
                  enableMotion={motionEnabled}
                />
              </Suspense>
              <Suspense fallback={<SectionSkeleton />}>
                <ContactSection enableMotion={motionEnabled} />
              </Suspense>
              <Suspense fallback={<SectionSkeleton height="12rem" />}>
                <Footer 
                  enableMotion={motionEnabled}
                  onOpenAccessibilitySettings={handleOpenPersonalize}
                />
              </Suspense>
            </motion.div>
          ) : currentRoute === 'project' && selectedProject ? (
            <motion.div
              key="project"
              initial={motionEnabled ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={motionEnabled ? { opacity: 0 } : {}}
              transition={motionEnabled ? { duration: 0.5 } : { duration: 0 }}
            >
              <Suspense fallback={<SectionSkeleton height="32rem" />}>
                <ProjectDetailPage project={selectedProject} enableMotion={motionEnabled} />
              </Suspense>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      </>
    </MotionConfig>
  );
}
