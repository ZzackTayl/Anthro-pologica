import { useCallback, useEffect, useRef, useState } from 'react';
import type { AccessibilityPreferences } from '../components/AccessibilityPreferences';
import {
  ACCESSIBILITY_STORAGE_KEY,
  applyAccessibilityPreferences,
  DEFAULT_ACCESSIBILITY_PREFERENCES,
  loadSavedAccessibilityPreferences,
  persistAccessibilityPreferences,
} from '../utils/accessibilityPreferences';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const defaultApplyOptions = { persist: false } as const;

export interface ApplyAccessibilityPreferencesOptions {
  persist?: boolean;
}

const getSystemMotionPreference = (): boolean => {
  if (typeof window === 'undefined') return true;

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  return !mediaQuery.matches;
};

function getPrefersReducedMotion() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function hasExplicitMotionPreference() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const stored = window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (!stored) {
      return false;
    }

    const parsed = JSON.parse(stored) as Partial<AccessibilityPreferences>;
    return typeof parsed.motion === 'boolean';
  } catch {
    return false;
  }
}

function applyMotionPreference(preferences: AccessibilityPreferences) {
  const prefersReducedMotion = getPrefersReducedMotion();
  return {
    ...preferences,
    motion: preferences.motion && !prefersReducedMotion,
  };
}

export function useAccessibilityPreferences(): {
  preferences: AccessibilityPreferences;
  applyPreferences: (
    next: AccessibilityPreferences,
    options?: ApplyAccessibilityPreferencesOptions
  ) => AccessibilityPreferences;
  updatePreferences: (
    partial: Partial<AccessibilityPreferences>,
    options?: ApplyAccessibilityPreferencesOptions
  ) => AccessibilityPreferences;
} {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() =>
    applyMotionPreference({
      ...DEFAULT_ACCESSIBILITY_PREFERENCES,
      motion: getSystemMotionPreference(),
    })
  );
  const preferencesRef = useRef(preferences);

  const applyAndSetPreferences = useCallback(
    (
      next: AccessibilityPreferences,
      options: ApplyAccessibilityPreferencesOptions = defaultApplyOptions
    ) => {
      const effectivePreferences = applyMotionPreference(next);
      preferencesRef.current = effectivePreferences;
      setPreferences(effectivePreferences);
      applyAccessibilityPreferences(effectivePreferences);

      if (options.persist) {
        persistAccessibilityPreferences(effectivePreferences);
      }

      return effectivePreferences;
    },
    []
  );

  useEffect(() => {
    preferencesRef.current = preferences;
  }, [preferences]);

  useEffect(() => {
    const saved = loadSavedAccessibilityPreferences();
    if (saved) {
      applyAndSetPreferences(saved);
    } else {
      applyAndSetPreferences({
        ...DEFAULT_ACCESSIBILITY_PREFERENCES,
        motion: getSystemMotionPreference(),
      });
    }
  }, [applyAndSetPreferences]);

  const updatePreferences = useCallback(
    (
      partial: Partial<AccessibilityPreferences>,
      options: ApplyAccessibilityPreferencesOptions = defaultApplyOptions
    ) => {
      const merged = {
        ...preferencesRef.current,
        ...partial,
      };

      return applyAndSetPreferences(merged, options);
    },
    [applyAndSetPreferences]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const applySystemPreference = (matches: boolean) => {
      if (hasExplicitMotionPreference()) {
        return;
      }

      const desiredMotion = matches ? false : true;
      updatePreferences({ motion: desiredMotion });
    };

    applySystemPreference(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      applySystemPreference(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [updatePreferences]);

  return {
    preferences,
    applyPreferences: applyAndSetPreferences,
    updatePreferences,
  };
}
