import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
import { scrollToSection } from '../utils/scroll'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Navbar({ isDark, onToggle }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-slate-700'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-gray-50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          My Portfolio
        </Link>
        
        <div className="flex items-center gap-6">
          {/* Navigation links - hidden on mobile, only show on home */}
          {isHome && (
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm font-medium group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>
          )}

          <div className="flex items-center gap-3">
            <DarkModeToggle isDark={isDark} onToggle={onToggle} />
            <a 
              href="https://github.com/dmasprstya" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            {/* Mobile menu button */}
            {isHome && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && isHome && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm font-medium py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
