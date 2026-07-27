import { useEffect, useRef } from 'react';

/**
 * Custom hook to manage document title
 * 
 * Sets the document title when the component mounts and optionally
 * restores the previous title when the component unmounts.
 * 
 * @param title - The title to set
 * @param options - Configuration options
 * @param options.restoreOnUnmount - Whether to restore the previous title on unmount (default: true)
 * @param options.prefix - Optional prefix for all titles (e.g., "Savoirity LLC | ")
 * @param options.suffix - Optional suffix for all titles
 * 
 * @example
 * ```tsx
 * // Basic usage
 * useDocumentTitle('Home');
 * 
 * // With options
 * useDocumentTitle('MyOrbit Case Study', { 
 *   prefix: 'Savoirity LLC | ',
 *   restoreOnUnmount: false 
 * });
 * ```
 */
export function useDocumentTitle(
  title: string,
  options: {
    restoreOnUnmount?: boolean;
    prefix?: string;
    suffix?: string;
  } = {}
): void {
  const { restoreOnUnmount = true, prefix = '', suffix = '' } = options;
  const previousTitleRef = useRef<string | null>(null);

  useEffect(() => {
    // Store the previous title
    previousTitleRef.current = document.title;

    // Construct the new title
    const newTitle = `${prefix}${title}${suffix}`;
    document.title = newTitle;

    // Cleanup: restore previous title on unmount if option is enabled
    return () => {
      if (restoreOnUnmount && previousTitleRef.current !== null) {
        document.title = previousTitleRef.current;
      }
    };
  }, [title, prefix, suffix, restoreOnUnmount]);
}

/**
 * Default site title configuration
 */
export const SITE_NAME = 'Savoirity LLC';

/**
 * Convenience hook with site name prefix
 * 
 * @param pageTitle - The page-specific title
 * @param options - Additional options passed to useDocumentTitle
 * 
 * @example
 * ```tsx
 * // Results in: "MyOrbit Case Study | Savoirity LLC"
 * usePageTitle('MyOrbit Case Study');
 * 
 * // For home page, just shows site name
 * usePageTitle(''); // Results in: "Savoirity LLC"
 * ```
 */
export function usePageTitle(
  pageTitle: string,
  options: Omit<Parameters<typeof useDocumentTitle>[1], 'suffix'> = {}
): void {
  const fullTitle = pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
  useDocumentTitle(fullTitle, { ...options, restoreOnUnmount: true });
}

export default useDocumentTitle;