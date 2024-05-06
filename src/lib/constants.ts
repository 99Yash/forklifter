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
  { label: 'NextJS', value: 'NextJS' },
  { label: 'Docker', value: 'Docker' },
  { label: 'TRPC', value: 'tRPC' },
  { label: 'Redis', value: 'Redis' },
  { label: 'Kubernetes', value: 'Kubernetes' },
  { label: 'TailwindCSS', value: 'Tailwind' },
  { label: 'NestJS', value: 'NestJS' },
  { label: 'Zustand', value: 'Zustand' },
  { label: 'Redux Toolkit', value: 'Redux-Toolkit' },
  { label: 'Typescript', value: 'Typescript' },
  { label: 'Go', value: 'Go' },
  { label: 'Flutter', value: 'Flutter' },
  { label: 'Express', value: 'Express' },
  { label: 'Turborepo', value: 'Turborepo' },
  { label: 'MongoDB', value: 'MongoDB' },
  { label: 'PostgreSQL', value: 'Postgres' },
  { label: 'MySQL', value: 'MySQL' },
  { label: 'GraphQL', value: 'GraphQL' },
  { label: 'Drizzle', value: 'Drizzle' },
  { label: 'Prisma', value: 'Prisma' },
] as const;
