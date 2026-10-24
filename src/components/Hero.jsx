import { scrollToSection } from '../utils/scroll'
import { 
  SiLaravel, SiReact, SiNodedotjs, SiMysql, SiPostgresql,
  SiNextdotjs, SiVite, SiTailwindcss, SiGit, SiGithub,
  SiTypescript, SiDrizzle, SiSentry
} from 'react-icons/si'
import { FaServer, FaLock } from 'react-icons/fa'
import { TbRobot, TbNetwork } from 'react-icons/tb'
import { HiOutlineLightBulb } from 'react-icons/hi'

const skillCategories = [
  {
    title: 'Backend',
    badges: [
      { name: 'Laravel', icon: SiLaravel, color: 'text-red-500' },
      { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
      { name: 'MySQL', icon: SiMysql, color: 'text-blue-600' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-500' },
    ]
  },
  {
    title: 'Frontend',
    badges: [
      { name: 'React', icon: SiReact, color: 'text-sky-500' },
      { name: 'Next.js', icon: SiNextdotjs, color: 'text-gray-900 dark:text-gray-100' },
      { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
      { name: 'Vite', icon: SiVite, color: 'text-purple-500' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-teal-500' },
    ]
  },
  {
    title: 'Tools',
    badges: [
      { name: 'Git', icon: SiGit, color: 'text-orange-500' },
      { name: 'GitHub', icon: SiGithub, color: 'text-gray-900 dark:text-gray-100' },
    ]
  },
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
          <div className="w-full lg:max-w-[480px] flex-none lg:mt-8">
            <div className="flex flex-col gap-5 sm:gap-6">
              {skillCategories.map((category, idx) => (
                <div key={idx} className="flex flex-col">
                  <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.badges.map((badge, i) => {
                      const Icon = badge.icon
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-slate-700/60 border border-gray-200 dark:border-slate-600 rounded-lg transition-all duration-200 hover:scale-[1.03] hover:border-blue-500 dark:hover:border-blue-400 shadow-sm dark:shadow-none"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
