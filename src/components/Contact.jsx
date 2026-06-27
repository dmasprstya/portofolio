import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

function Contact() {
  return (
    <section id="contact" className="2xl:min-h-screen py-8 2xl:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Let's Work Together
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          I'm currently open to collaboration opportunities, freelance projects, 
          or just a good tech conversation. Feel free to reach out!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a 
            href="mailto:mdimasprasetyawongso@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Hubungi Saya via Email
          </a>
          <a 
            href="https://github.com/dmasprstya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 font-medium rounded-lg transition-colors"
          >
            <SiGithub className="w-5 h-5" />
            View GitHub
          </a>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <a 
            href="https://www.linkedin.com/in/mdimasprasetyawongso" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaLinkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <span>•</span>
          <a 
            href="mailto:mdimasprasetyawongso@gmail.com"
            className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="Email"
          >
            <HiMail className="w-4 h-4" />
            Email
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
