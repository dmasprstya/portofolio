const projects = [
  {
    slug: 'simons',
    title: 'SIMONS',
    subtitle: 'Sistem Informasi Manajemen Penomoran Surat',
    tagline: 'Automating letter numbering for government operations',
    shortDescription: 'Letter management system for Kanwil Kemenkumham Bangka Belitung with Linear Daily Gap Rollover algorithm.',
    fullDescription: [
      'Production-ready letter management system built for Kanwil Kemenkumham Bangka Belitung. The core innovation is a Linear Daily Gap Rollover algorithm that ensures consistent numbering across daily operations.',
      'The system handles role-based access control, 4-level letter classification, gap request management, comprehensive audit logs, and PDF/CSV export functionality. It is currently in production use.'
    ],
    tech: ['Laravel 12', 'React 18', 'MySQL', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/dmasprstya/simons',
    status: 'Complete & in production use',
    screenshots: [
      // Add screenshot filenames here, e.g.:
      // '/screenshots/simons-1.png',
      // '/screenshots/simons-2.png',
    ]
  },
  {
    slug: 'rdi-cms',
    title: 'RDI-CMS',
    subtitle: 'Sistem Terintegrasi Rosman Djohan Institute',
    tagline: 'Unified management platform for educational institutions',
    shortDescription: 'Comprehensive education management system with CMS, 5 user roles, and 14+ database tables.',
    fullDescription: [
      'Comprehensive education management system with full CMS capabilities. Features 5 user roles (admin, staff, guru, student, editor) across 14+ database tables covering student grade management, learning modules, and announcements.',
      'Built with a modern stack: Next.js 14 + TypeScript + PostgreSQL (Supabase) + Drizzle ORM. Includes a public landing page with program showcases and WhatsApp integration. Optimized with 27 database indexes, Sentry error tracking, and code-splitting for performance.'
    ],
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Auth.js'],
    github: 'https://github.com/dmasprstya/rdi-cms',
    status: 'Complete & maintained',
    screenshots: [
      // '/screenshots/rdi-cms-1.png',
      // '/screenshots/rdi-cms-2.png',
    ]
  },
  {
    slug: 'hgo-',
    title: 'SPK HGO ',
    subtitle: 'Medical Patient Prioritization System',
    tagline: 'Decision support system for hospital patient management',
    shortDescription: 'React-based medical prioritization and patient management tool with focus on UI/UX design.',
    fullDescription: [
      'A React-based medical prioritization and patient management tool designed for hospital environments. The project focuses on intuitive UI/UX design and clear system architecture documentation.',
      'The system helps hospital staff prioritize patients efficiently using decision support algorithms. Currently in development.'
    ],
    tech: ['React', 'Architecture Design', 'UI/UX'],
    github: 'https://github.com/dmasprstya/hgo-app',
    status: 'In development',
    screenshots: [
      // '/screenshots/hgo-1.png',
      // '/screenshots/hgo-2.png',
    ]
  }
]

export default projects
