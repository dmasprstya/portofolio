// SIMONS screenshots
import simons_dashboard_admin from '../assets/simons/dashboard_admin.png'
import simons_dashboard_user from '../assets/simons/dashboard_user.png'
import simons_ambil_nomor_user from '../assets/simons/ambil_nomor_user.png'
import simons_audit_log_admin from '../assets/simons/audit_log_admin.png'
import simons_gap_request_admin from '../assets/simons/gap_request_admin.png'
import simons_gap_request_user from '../assets/simons/gap_request_user.png'
import simons_kelola_user_admin from '../assets/simons/kelola_user_admin.png'
import simons_klasifikasi_admin from '../assets/simons/klasifikasi_admin.png'
import simons_laporan_admin from '../assets/simons/laporan_admin.png'
import simons_riwayat_user from '../assets/simons/riwayat_user.png'
import simons_semua_surat_admin from '../assets/simons/semua_surat_admin.png'
import simons_sequence_admin from '../assets/simons/sequence_admin.png'

// RDI-CMS screenshots
import rdi_landing_page from '../assets/rdi-cms/landing-page.png'
import rdi_login_page from '../assets/rdi-cms/login_page.png'
import rdi_dashboard_admin from '../assets/rdi-cms/dashboard_admin.png'
import rdi_dashboard_editor_cms from '../assets/rdi-cms/dashboard_editor_cms.png'
import rdi_dashboard_guru from '../assets/rdi-cms/dashboard_guru.png'
import rdi_dashboard_staff from '../assets/rdi-cms/dashboard_staff.png'
import rdi_dahsboard_siswa from '../assets/rdi-cms/dahsboard_siswa.png'
import rdi_kelola_guru_page from '../assets/rdi-cms/kelola_guru_page.png'
import rdi_kelola_kelas_page from '../assets/rdi-cms/kelola_kelas_page.png'
import rdi_kelola_mapel_page from '../assets/rdi-cms/kelola_mapel_page.png'
import rdi_kelola_siswa_page from '../assets/rdi-cms/kelola_siswa_page.png'
import rdi_modul_siswa_page from '../assets/rdi-cms/modul_siswa_page.png'
import rdi_nilai_siswa_page from '../assets/rdi-cms/nilai_siswa_page.png'
import rdi_profil_siswa_page from '../assets/rdi-cms/profil_siswa_page.png'
import rdi_program_page1 from '../assets/rdi-cms/program_page1.png'
import rdi_program_page2 from '../assets/rdi-cms/program_page2.png'

const projects = [
  {
    slug: 'simons',
    title: 'SIMONS',
    subtitle: 'Sistem Informasi Manajemen Penomoran Surat',
    tagline: 'A production-grade document numbering system solving real government workflow problems',
    shortDescription: 'Full-stack web app for automating official letter numbering at Kanwil Kemenkumham Bangka Belitung — currently live in production with 1,900+ letters issued.',
    fullDescription: [
      'SIMONS is a production-deployed letter management system built for Kanwil Kemenkumham Bangka Belitung. The core engineering challenge was designing a reliable auto-numbering mechanism across multiple organizational units — solved through a custom Linear Daily Gap Rollover algorithm. The algorithm reserves a configurable gap buffer at each daily rollover, ensuring number continuity even when letters are issued out of sequence, then reclaims unused gap slots through a structured approval workflow.',
      'The admin dashboard surfaces real-time analytics: daily letter counts, pending gap requests, total letters issued (318+), and a breakdown chart of letter distribution per organizational division. The 4-level hierarchical classification system (e.g., AH.01.01 → W.7-AH.01.01-1934) mirrors the official Indonesian government document classification standard.',
      'Role-based access control separates admin and user concerns cleanly — admins handle gap approvals, user management (with CSV bulk import), classification tree configuration, and audit logs, while users focus on number issuance with a guided classification picker. Reports are filterable by classification, unit, date range, and urgency level, then exportable to Excel, CSV, or PDF. Stack: Laravel 12 (API) + React 18 (Vite) + MySQL.'
    ],
    tech: ['Laravel 12', 'React 18', 'MySQL', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/dmasprstya/simons',
    status: 'Complete & in production use',
    metrics: [
      {
        value: '100%',
        label: 'Numbering Accuracy',
        description: 'Zero duplicate or out-of-order letter numbers across all tested edge cases — including day rollover and end-of-year transitions — validated through functional testing of the Linear Daily Gap Rollover algorithm.',
        icon: 'accuracy'
      },
      {
        value: '≤ 1.5s',
        label: 'Avg. Response Time',
        description: 'Under a simulated load of 30 concurrent users (Apache JMeter), all critical flows — dashboard load, number issuance, gap request, and reports — responded within 0.7–1.5 seconds, confirming production-grade stability.',
        icon: 'speed'
      },
      {
        value: '100%',
        label: 'Audit Trail Coverage',
        description: 'Every user action — from login and letter issuance to gap approvals — is captured in the audit log without exception, enabling full administrative accountability and periodic audit readiness.',
        icon: 'shield'
      }
    ],
    screenshots: [
      simons_dashboard_admin,
      simons_dashboard_user,
      simons_ambil_nomor_user,
      simons_gap_request_admin,
      simons_gap_request_user,
      simons_klasifikasi_admin,
      simons_kelola_user_admin,
      simons_laporan_admin,
      simons_sequence_admin,
      simons_semua_surat_admin,
      simons_riwayat_user,
      simons_audit_log_admin,
    ]
  },
  {
    slug: 'rdi-cms',
    title: 'RDI-CMS',
    subtitle: 'Sistem Terintegrasi Rosman Djohan Institute',
    tagline: 'A multi-role education platform with a headless CMS for a public-facing landing page',
    shortDescription: 'Full-stack platform with 5 user roles, a headless CMS, student grade tracking, learning modules, and a public landing page — built with Next.js 14 + PostgreSQL.',
    fullDescription: [
      'RDI-CMS is a unified web platform for Rosman Djohan Institute, an international vocational education provider offering programs in Taiwan, Germany, and Japan. The system has two distinct surfaces: a role-based internal management portal and a CMS-driven public landing page — both sharing the same Next.js 14 backend.',
      'The internal portal serves 5 roles with fully separated dashboards and permissions. Admins oversee school-wide data (150 students, 25 teachers, 12 classes, 15 subjects). Teachers manage learning modules, input grades per subject, create announcements, and view class rosters. Students access their academic grades per semester, view learning modules, and manage profiles. A dedicated Editor role controls all landing page content through a section-based CMS without touching the codebase.',
      'The CMS editor provides section-by-section management of the public landing page — hero banner, trust partner logos, core programs (Taiwan/Germany/Japan), founder profiles, latest news, and CTA sections — all with live publish/draft status. The public landing page includes multi-step program detail pages, WhatsApp CTA integration, and structured institutional information. Built with Next.js 14 App Router + TypeScript + PostgreSQL (Supabase) + Drizzle ORM + Auth.js. Optimized with 27 database indexes and Sentry error tracking.'
    ],
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Auth.js', 'Drizzle ORM', 'Supabase'],
    github: 'https://github.com/dmasprstya/rdi-cms',
    status: 'Complete',
    metrics: [
      {
        value: '~95%',
        label: 'Faster Content Publishing',
        description: 'Content updates that previously required 2–3 days of coordination with an external developer now take the marketing team less than an hour to publish independently via the CMS — enabling real-time responses to program announcements and enrollment campaigns.',
        icon: 'speed'
      },
      {
        value: '< 1 min',
        label: 'Student Data Lookup',
        description: 'Searching for student records with specific criteria — previously a 15–20 minute process spread across multiple spreadsheets — is now resolved in under a minute through the centralized search system, eliminating cross-division data fragmentation.',
        icon: 'search'
      },
      {
        value: '87.75 / A',
        label: 'SUS Usability Score',
        description: 'A System Usability Scale evaluation with 10 respondents across all 5 user roles returned a mean score of 87.75 out of 100, placing the system in the "Excellent" category (Grade A) — confirming the interface is genuinely intuitive for non-technical staff and students alike.',
        icon: 'star'
      }
    ],
    screenshots: [
      rdi_landing_page,
      rdi_program_page1,
      rdi_program_page2,
      rdi_login_page,
      rdi_dashboard_admin,
      rdi_dashboard_editor_cms,
      rdi_dashboard_guru,
      rdi_dashboard_staff,
      rdi_dahsboard_siswa,
      rdi_kelola_siswa_page,
      rdi_kelola_guru_page,
      rdi_kelola_kelas_page,
      rdi_kelola_mapel_page,
      rdi_nilai_siswa_page,
      rdi_modul_siswa_page,
      rdi_profil_siswa_page,
    ]
  },
  {
    slug: 'hgo-',
    title: 'SPK HGO',
    subtitle: 'Medical Patient Prioritization System',
    tagline: 'Decision support system for hospital patient triage and management',
    shortDescription: 'React-based clinical decision support tool that helps hospital staff prioritize patients using structured DSS algorithms, with a focus on clean UX and system architecture.',
    fullDescription: [
      'SPK HGO is a React-based Decision Support System (DSS) designed for hospital environments to assist medical staff in triaging and prioritizing patients systematically. The project emphasizes clear system architecture and a clean, intuitive interface appropriate for time-sensitive clinical workflows.',
      'The system applies structured prioritization algorithms to patient data, helping staff make consistent triage decisions without relying solely on subjective judgment. The project scope includes UI/UX design, component architecture planning, and system flow documentation. Currently in active development.'
    ],
    tech: ['React', 'Architecture Design', 'UI/UX'],
    github: 'https://github.com/dmasprstya/hgo-app',
    status: 'In development',
    screenshots: []
  }
]

export default projects
