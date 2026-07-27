import {
  createContext,
  useContext,
  ReactNode,
} from 'react';
import {
  useAccessibilityPreferences,
  ApplyAccessibilityPreferencesOptions,
} from '../hooks/useAccessibilityPreferences';
import type { AccessibilityPreferences } from '../components/AccessibilityPreferences';

/**
 * Context for accessibility preferences across the application.
 * This eliminates prop drilling for motion, font style, and other preferences.
 */
interface AccessibilityContextValue {
  /** Current accessibility preferences */
  preferences: AccessibilityPreferences;
  /** Whether motion/animations are enabled */
  enableMotion: boolean;
  /** Apply new preferences (optionally persist to localStorage) */
  applyPreferences: (
    next: AccessibilityPreferences,
    options?: ApplyAccessibilityPreferencesOptions
  ) => AccessibilityPreferences;
  /** Partially update preferences */
  updatePreferences: (
    partial: Partial<AccessibilityPreferences>,
    options?: ApplyAccessibilityPreferencesOptions
  ) => AccessibilityPreferences;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

interface AccessibilityProviderProps {
  children: ReactNode;
  /** Override for mobile detection to disable motion */
  isMobile?: boolean;
}

/**
 * Provider component that wraps the app with accessibility context.
 * Handles motion preferences, dyslexic fonts, and other accessibility settings.
 */
export function AccessibilityProvider({
  children,
  isMobile = false,
}: AccessibilityProviderProps) {
  const {
    preferences,
    applyPreferences,
    updatePreferences,
  } = useAccessibilityPreferences();

  // Disable motion on mobile for performance
  const enableMotion = preferences.motion && !isMobile;

  const value: AccessibilityContextValue = {
    preferences,
    enableMotion,
    applyPreferences,
    updatePreferences,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

/**
 * Hook to access accessibility preferences from any component.
 * Must be used within an AccessibilityProvider.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { enableMotion, preferences } = useAccessibility();
 *
 *   return (
 *     <motion.div
 *       animate={enableMotion ? { opacity: 1 } : undefined}
 *     />
 *   );
 * }
 * ```
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      'useAccessibility must be used within an AccessibilityProvider'
    );
  }
  return context;
}

/**
 * Hook to get just the motion preference (convenience hook).
 *
 * @example
 * ```tsx
 * function AnimatedComponent() {
 *   const enableMotion = useMotionPreference();
 *   return <motion.div animate={enableMotion ? {} : false} />;
 * }
 * ```
 */
export function useMotionPreference(): boolean {
  const { enableMotion } = useAccessibility();
  return enableMotion;
}

export { AccessibilityContext };