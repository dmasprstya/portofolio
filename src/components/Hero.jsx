import { scrollToSection } from '../utils/scroll'
import { 
  SiLaravel, SiReact, SiNodedotjs, SiMysql, SiPostgresql,
  SiNextdotjs, SiVite, SiTailwindcss, SiGit, SiGithub,
  SiTypescript, SiDrizzle, SiSentry
} from 'react-icons/si'
import { FaServer, FaLock } from 'react-icons/fa'
import { TbRobot, TbNetwork } from 'react-icons/tb'
import { HiOutlineLightBulb } from 'react-icons/hi'

const techBadges = [
  { name: 'Laravel', icon: SiLaravel, color: 'text-red-500' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
  { name: 'MySQL', icon: SiMysql, color: 'text-blue-600' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-500' },
  { name: 'Drizzle ORM', icon: SiDrizzle, color: 'text-emerald-500' },
  { name: 'Eloquent', icon: FaServer, color: 'text-red-400' },
  { name: 'React', icon: SiReact, color: 'text-sky-500' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-gray-900 dark:text-gray-100' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
  { name: 'Vite', icon: SiVite, color: 'text-purple-500' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-teal-500' },
  { name: 'Git', icon: SiGit, color: 'text-orange-500' },
  { name: 'GitHub', icon: SiGithub, color: 'text-gray-900 dark:text-gray-100' },
  { name: 'REST API', icon: FaServer, color: 'text-indigo-500' },
  { name: 'Sanctum', icon: FaLock, color: 'text-red-400' },
  { name: 'Auth.js', icon: FaLock, color: 'text-yellow-600' },
  { name: 'Sentry', icon: SiSentry, color: 'text-purple-600' },
  { name: 'Full-stack Dev', icon: FaServer, color: 'text-blue-500' },
  { name: 'AI-assisted Dev', icon: TbRobot, color: 'text-emerald-500' },
  { name: 'Systems Architecture', icon: TbNetwork, color: 'text-amber-500' },
  { name: 'Agile/Scrum', icon: HiOutlineLightBulb, color: 'text-orange-400' },
]

function Hero() {
  return (
    <section id="hero" className="2xl:min-h-screen flex items-center py-8 px-4 sm:px-6 pt-20">
      <div className="container mx-auto max-w-[1120px]">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-gray-50 mb-4 mt-8">
              M. Dimas Prasetya Wongso
            </h1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              I design and build web systems end-to-end using modern tools and AI-assisted development. Focus on systems architecture, problem-solving, and delivery. Tech: React, Laravel, MySQL.
            </p>
            <a 
              href="#projects"
              onClick={(e) => scrollToSection(e, '#projects')}
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
            >
              View My Projects
            </a>
          </div>
          <div className="flex-none">
            <div className="grid grid-cols-3 gap-x-3 gap-y-2">
              {techBadges.map((badge, i) => {
                const Icon = badge.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-2 py-1.5 bg-white dark:bg-slate-700/60 border border-gray-200 dark:border-slate-600 rounded-lg w-fit"
                  >
                    <Icon className={`w-3.5 h-3.5 ${badge.color}`} />
                    <span className="text-xs text-gray-700 dark:text-gray-200 font-medium whitespace-nowrap">
                      {badge.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
