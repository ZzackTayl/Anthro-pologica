import { useEffect, useState } from 'react';

/**
 * Detects whether the current device supports hover interactions.
 * Helpful for disabling hover-specific animations on touch-only devices.
 */
export function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const update = (event: MediaQueryListEvent | MediaQueryList) => {
      setCanHover(event.matches);
    };

    // Initialize with the current match state
    update(mediaQuery);

    mediaQuery.addEventListener('change', update as (event: MediaQueryListEvent) => void);

    return () => {
      mediaQuery.removeEventListener('change', update as (event: MediaQueryListEvent) => void);
    };
  }, []);

  return canHover;
}
