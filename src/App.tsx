import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { Navigation } from './components/Navigation';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useIsMobile } from './components/ui/use-mobile';
import { getProjectById } from './data/projects';
import { AccessibilityProvider, useAccessibility } from './contexts';
import { usePageTitle } from './hooks/useDocumentTitle';
import { scrollToElementById, scrollToTop } from './utils/scroll';
import './styles.css';

// Lazy loaded components
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

const MyOrbitCaseStudyPage = lazy(() =>
  import('./components/MyOrbitCaseStudyPage').then((module) => ({ default: module.MyOrbitCaseStudyPage }))
);

const AccessibilityPreferencesDialog = lazy(() =>
  import('./components/AccessibilityPreferences').then((module) => ({ default: module.AccessibilityPreferencesDialog }))
);

// ============================================================================
// Loading Skeleton Component
// ============================================================================

function SectionSkeleton({ height = 'project-card' }: { height?: string }) {
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

// ============================================================================
// Page Components
// ============================================================================

function HomePage() {
  const navigate = useNavigate();
  const { enableMotion, preferences, applyPreferences } = useAccessibility();
  const [showAccessibilityDialog, setShowAccessibilityDialog] = useState(false);

  const handleProjectClick = useCallback((projectId: string) => {
    const project = getProjectById(projectId);
    if (project?.caseStudyAvailable === false) {
      if (project?.liveUrl) {
        window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    if (projectId === 'myorbit') {
      navigate('/case-study/myorbit');
    } else {
      navigate(`/project/${projectId}`);
    }
  }, [navigate]);

  const handleNavigateHome = useCallback(() => {
    navigate('/');
    scrollToTop({ enableMotion: preferences.motion });
  }, [navigate, preferences.motion]);

  const handleOpenPersonalize = useCallback(() => {
    setShowAccessibilityDialog(true);
  }, []);

  // Set page title using custom hook
  usePageTitle('Human-Centered Design & Neurodivergent Insight');

  return (
    <>
      <Suspense fallback={null}>
        {showAccessibilityDialog && (
          <AccessibilityPreferencesDialog
            onSave={applyPreferences}
            preferences={preferences}
            isOpen={showAccessibilityDialog}
            onClose={() => setShowAccessibilityDialog(false)}
          />
        )}
      </Suspense>

      <Navigation
        onNavigateHome={handleNavigateHome}
        onOpenPersonalize={handleOpenPersonalize}
        isHomePage={true}
        enableMotion={enableMotion}
      />

      <main id="main-content">
        <motion.div
          key="home"
          initial={enableMotion ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={enableMotion ? { opacity: 0 } : {}}
          transition={enableMotion ? { duration: 0.5 } : { duration: 0 }}
        >
          <HeroSection enableMotion={enableMotion} />
          <Suspense fallback={<SectionSkeleton />}>
            <PhilosophySection enableMotion={enableMotion} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <TeamSection enableMotion={enableMotion} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton height="20rem" />}>
            <SkillsSection enableMotion={enableMotion} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton height="28rem" />}>
            <ProjectsCarousel
              onProjectClick={handleProjectClick}
              enableMotion={enableMotion}
            />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <ContactSection enableMotion={enableMotion} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton height="12rem" />}>
            <Footer
              enableMotion={enableMotion}
              onOpenAccessibilitySettings={handleOpenPersonalize}
            />
          </Suspense>
        </motion.div>
      </main>
    </>
  );
}

function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { enableMotion, preferences, applyPreferences } = useAccessibility();
  const [showAccessibilityDialog, setShowAccessibilityDialog] = useState(false);

  const project = projectId ? getProjectById(projectId) : null;

  const handleNavigateHome = useCallback(() => {
    navigate('/');
    scrollToTop({ enableMotion: preferences.motion });
  }, [navigate, preferences.motion]);

  const handleOpenPersonalize = useCallback(() => {
    setShowAccessibilityDialog(true);
  }, []);

  // Set page title using custom hook
  usePageTitle(project?.title || '');

  // Redirect to home if project not found
  useEffect(() => {
    if (projectId && !project) {
      navigate('/');
    }
  }, [projectId, project, navigate]);

  if (!project) {
    return null;
  }

  return (
    <>
      <Suspense fallback={null}>
        {showAccessibilityDialog && (
          <AccessibilityPreferencesDialog
            onSave={applyPreferences}
            preferences={preferences}
            isOpen={showAccessibilityDialog}
            onClose={() => setShowAccessibilityDialog(false)}
          />
        )}
      </Suspense>

      <Navigation
        onNavigateHome={handleNavigateHome}
        onOpenPersonalize={handleOpenPersonalize}
        isHomePage={false}
        enableMotion={enableMotion}
      />

      <main id="main-content">
        <motion.div
          key="project"
          initial={enableMotion ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={enableMotion ? { opacity: 0 } : {}}
          transition={enableMotion ? { duration: 0.5 } : { duration: 0 }}
        >
          <Suspense fallback={<SectionSkeleton height="32rem" />}>
            <ProjectDetailPage
              project={project}
              enableMotion={enableMotion}
              onOpenAccessibilitySettings={handleOpenPersonalize}
            />
          </Suspense>
        </motion.div>
      </main>
    </>
  );
}

function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enableMotion, preferences, applyPreferences } = useAccessibility();
  const [showAccessibilityDialog, setShowAccessibilityDialog] = useState(false);

  const handleNavigateHome = useCallback(() => {
    navigate('/');
    scrollToTop({ enableMotion: preferences.motion });
  }, [navigate, preferences.motion]);

  const handleOpenPersonalize = useCallback(() => {
    setShowAccessibilityDialog(true);
  }, []);

  // Set page title using custom hook
  usePageTitle('MyOrbit Case Study: $800 vs $150K');

  useEffect(() => {
    if (id !== 'myorbit') {
      navigate('/');
    }
  }, [id, navigate]);

  if (id !== 'myorbit') {
    return null;
  }

  return (
    <>
      <Suspense fallback={null}>
        {showAccessibilityDialog && (
          <AccessibilityPreferencesDialog
            onSave={applyPreferences}
            preferences={preferences}
            isOpen={showAccessibilityDialog}
            onClose={() => setShowAccessibilityDialog(false)}
          />
        )}
      </Suspense>

      <Navigation
        onNavigateHome={handleNavigateHome}
        onOpenPersonalize={handleOpenPersonalize}
        isHomePage={false}
        enableMotion={enableMotion}
      />

      <main id="main-content">
        <motion.div
          key="case-study"
          initial={enableMotion ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={enableMotion ? { opacity: 0 } : {}}
          transition={enableMotion ? { duration: 0.5 } : { duration: 0 }}
        >
          <Suspense fallback={<SectionSkeleton height="32rem" />}>
            <MyOrbitCaseStudyPage
              enableMotion={enableMotion}
              onOpenAccessibilitySettings={handleOpenPersonalize}
            />
          </Suspense>
        </motion.div>
      </main>
    </>
  );
}

// ============================================================================
// App Content Component (inside Router and AccessibilityProvider)
// ============================================================================

function AppContent() {
  const isMobile = useIsMobile();
  const { preferences } = useAccessibility();
  const location = useLocation();

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

  // Scroll to the hash target when present, otherwise go to top.
  useEffect(() => {
    const hashTarget = location.hash.slice(1);
    const targetId = (() => {
      try {
        return decodeURIComponent(hashTarget);
      } catch {
        return hashTarget;
      }
    })();

    if (!hashTarget) {
      scrollToTop({ enableMotion: preferences.motion });
      return;
    }

    let attempts = 0;
    let cancelled = false;

    const tryScroll = () => {
      if (cancelled) return;

      attempts += 1;
      const found = scrollToElementById(targetId, {
        enableMotion: preferences.motion,
      });

      if (!found && attempts < 12) {
        window.setTimeout(tryScroll, 100);
      }
    };

    window.setTimeout(tryScroll, 0);

    return () => {
      cancelled = true;
    };
  }, [location.hash, location.pathname, preferences.motion]);

  return (
    <MotionConfig reducedMotion={preferences.motion ? 'never' : 'always'}>
      <div className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg"
          style={{
            background: 'var(--vibrant-cyan)',
            color: '#000',
            fontWeight: 'bold',
          }}
        >
          Skip to main content
        </a>

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:projectId" element={<ProjectPage />} />
            <Route path="/case-study/:id" element={<CaseStudyPage />} />
            {/* Fallback route - redirect to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

// ============================================================================
// Main App Component
// ============================================================================

export default function App() {
  const isMobile = useIsMobile();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AccessibilityProvider isMobile={isMobile}>
          <AppContent />
        </AccessibilityProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
