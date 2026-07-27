/**
 * Icon Map Utility
 * 
 * This file provides a centralized, tree-shakeable way to access Lucide icons.
 * Instead of importing all icons with `import * as Icons from 'lucide-react'`,
 * we explicitly import only the icons we need, significantly reducing bundle size.
 */

import {
  Brain,
  CheckCheck,
  Circle,
  Clock,
  Cpu,
  Heart,
  Library,
  List,
  Lock,
  Map,
  Search,
  Shield,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react';

/**
 * Map of icon names to their components.
 * Add new icons here as needed - only icons in this map will be bundled.
 */
export const iconMap: Record<string, LucideIcon> = {
  Brain,
  CheckCheck,
  Circle,
  Clock,
  Cpu,
  Heart,
  Library,
  List,
  Lock,
  Map,
  Search,
  Shield,
  User,
  Users,
};

/**
 * Get an icon component by name.
 * Returns Circle as fallback if the icon is not found or name is invalid.
 * 
 * @param name - The icon name (e.g., 'Heart', 'Users')
 * @returns The Lucide icon component
 */
export function getIcon(name: string | undefined | null): LucideIcon {
  if (!name || typeof name !== 'string') {
    return Circle;
  }
  return iconMap[name] || Circle;
}

/**
 * Default/fallback icon
 */
export const DefaultIcon = Circle;