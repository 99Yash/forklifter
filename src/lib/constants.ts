import * as Icons from '@/components/ui/icons';

export const OSSTAGS = {
  FEATURE: 'Feature',
  BUG: 'Bug',
  ENHANCEMENT: 'Enhancement',
  DOCUMENTATION: 'Documentation',
  CHORE: 'Chore',
  TEST: 'Test',
  FIX: 'Fix',
  OTHER: 'Other',
} as const;

export const workspaceItems = [
  {
    title: 'Profile',
    href: '/',
    icon: Icons.User,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: Icons.Projects,
  },
  {
    title: 'Experiences',
    href: '/experiences',
    icon: Icons.Building,
  },
  {
    title: 'Testimonials',
    href: '/testimonials',
    icon: Icons.Quote,
  },
  {
    title: 'Contributions',
    href: '/oss',
    icon: Icons.GITMerge,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Icons.Settings,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: Icons.Analytics,
  },
] as const;
