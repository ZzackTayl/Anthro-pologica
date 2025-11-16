import type { AccessibilityPreferences } from '../components/AccessibilityPreferences';

export const ACCESSIBILITY_STORAGE_KEY = 'anthropologica_preferences';

export const DEFAULT_ACCESSIBILITY_PREFERENCES: AccessibilityPreferences = {
  motion: true,
  colorIntensity: 100,
  fontStyle: 'default',
  contrast: 'normal',
  spacing: 'comfortable',
};

export function normalizeAccessibilityPreferences(
  partial: Partial<AccessibilityPreferences> | null | undefined
): AccessibilityPreferences {
  return {
    motion: partial?.motion ?? DEFAULT_ACCESSIBILITY_PREFERENCES.motion,
    colorIntensity: partial?.colorIntensity ?? DEFAULT_ACCESSIBILITY_PREFERENCES.colorIntensity,
    fontStyle: partial?.fontStyle ?? DEFAULT_ACCESSIBILITY_PREFERENCES.fontStyle,
    contrast: partial?.contrast ?? DEFAULT_ACCESSIBILITY_PREFERENCES.contrast,
    spacing: partial?.spacing ?? DEFAULT_ACCESSIBILITY_PREFERENCES.spacing,
  };
}

export function applyAccessibilityPreferences(preferences: AccessibilityPreferences) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const body = document.body;
  const appRoot = document.getElementById('root');

  if (!root) {
    return;
  }

  const toggleClass = (className: string, enabled: boolean) => {
    root.classList.toggle(className, enabled);
    body?.classList.toggle(className, enabled);
    appRoot?.classList.toggle(className, enabled);
  };

  if (preferences.fontStyle === 'dyslexic') {
    toggleClass('dyslexic-font', true);
  } else {
    toggleClass('dyslexic-font', false);
  }

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  toggleClass('reduce-motion', !preferences.motion || prefersReducedMotion);

  toggleClass('high-contrast', preferences.contrast === 'high');

  toggleClass('compact-spacing', preferences.spacing === 'compact');

  root.style.setProperty('--color-intensity', `${preferences.colorIntensity / 100}`);
}

export function loadSavedAccessibilityPreferences(): AccessibilityPreferences | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const saved = window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<AccessibilityPreferences>;
    return normalizeAccessibilityPreferences(parsed);
  } catch (error) {
    console.error('Failed to parse saved accessibility preferences', error);
    return null;
  }
}

export function persistAccessibilityPreferences(preferences: AccessibilityPreferences) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(preferences));
}
