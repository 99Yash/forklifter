import * as Icons from '@/components/ui/icons';

export const OSSTAGS = [
  'Feature',
  'Bug',
  'Documentation',
  'Enhancement',
  'Fix',
  'Test',
  'Other',
] as const;

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

export const tech = [
  { label: 'Docker', value: 'Docker' },
  { label: 'Drizzle', value: 'Drizzle' },
  { label: 'Express', value: 'Express' },
  { label: 'Go', value: 'Go' },
  { label: 'GraphQL', value: 'GraphQL' },
  { label: 'Kubernetes', value: 'Kubernetes' },
  { label: 'MongoDB', value: 'MongoDB' },
  { label: 'MySQL', value: 'MySQL' },
  { label: 'NestJS', value: 'NestJS' },
  { label: 'NextJS', value: 'NextJS' },
  { label: 'PostgreSQL', value: 'Postgres' },
  { label: 'Prisma', value: 'Prisma' },
  { label: 'Redis', value: 'Redis' },
  { label: 'Redux', value: 'Redux' },
  { label: 'TailwindCSS', value: 'Tailwind' },
  { label: 'TRPC', value: 'tRPC' },
  { label: 'Turborepo', value: 'Turborepo' },
  { label: 'Typescript', value: 'Typescript' },
  { label: 'Zustand', value: 'Zustand' },
] as const;
