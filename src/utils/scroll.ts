export interface ScrollOptions {
  enableMotion?: boolean;
  block?: ScrollLogicalPosition;
}

function getScrollBehavior(enableMotion = true): ScrollBehavior {
  return enableMotion ? 'smooth' : 'auto';
}

export function scrollToTop(options: ScrollOptions = {}) {
  if (typeof window === 'undefined') return;

  window.scrollTo({
    top: 0,
    behavior: getScrollBehavior(options.enableMotion ?? true),
  });
}

export function scrollToElementById(id: string, options: ScrollOptions = {}): boolean {
  if (typeof document === 'undefined') return false;

  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({
    behavior: getScrollBehavior(options.enableMotion ?? true),
    block: options.block ?? 'start',
  });

  return true;
}
