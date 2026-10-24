import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { scrollToSection } from '../utils/scroll'

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-8 sm:py-10 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <div className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
            © 2026. dmasprstya.
          </div>

          {/* Right: Social icons + text links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/dmasprstya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm"
            >
              <SiGithub className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mdimasprasetyawongso"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm"
            >
              <FaLinkedin className="w-5 h-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="mailto:mdimasprasetyawongso@gmail.com"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm"
            >
              <HiMail className="w-5 h-5" />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
