import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PjSofonic MS — Business Management System',
    short_name: 'PjSofonic MS',
    description:
      'Integrated ERP command center: HR & payroll, projects, CRM, collaboration, and analytics.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f7f6',
    theme_color: '#0a2540',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
