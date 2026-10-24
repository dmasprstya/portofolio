import { Link } from 'react-router-dom'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'

function ProjectCard({ project }) {
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Glassmorphism card background */}
      <div className="absolute inset-0 rounded-2xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-white/80 dark:border-white/10 transition-all duration-300 group-hover:border-violet-300/60 dark:group-hover:border-violet-500/40" />

      {/* Gradient glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.07) 60%, transparent 100%)',
        }}
      />

      {/* Top accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-violet-400/60 dark:via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-7">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-xs font-medium text-violet-500/80 dark:text-violet-400/70 uppercase tracking-wider">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed line-clamp-3 flex-1">
          {project.shortDescription}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-[11px] font-medium rounded-full
                bg-indigo-50 dark:bg-indigo-950/60
                text-indigo-600 dark:text-indigo-300
                border border-indigo-100 dark:border-indigo-800/60
                transition-colors duration-200
                group-hover:bg-violet-50 group-hover:border-violet-200/80 group-hover:text-violet-700
                dark:group-hover:bg-violet-950/50 dark:group-hover:border-violet-700/40 dark:group-hover:text-violet-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100/80 dark:border-white/[0.07]">
          <Link
            to={`/project/${project.slug}`}
            className="flex items-center gap-1.5 text-sm font-semibold
              text-violet-600 dark:text-violet-400
              hover:text-violet-800 dark:hover:text-violet-200
              transition-colors duration-200"
          >
            View Details
            <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm
                text-gray-400 dark:text-gray-500
                hover:text-gray-700 dark:hover:text-gray-200
                transition-colors duration-200"
              title="GitHub"
            >
              <FiGithub className="w-4 h-4" />
              <span className="text-xs">GitHub</span>
            </a>

            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm
                  text-pink-500 dark:text-pink-400
                  hover:text-pink-700 dark:hover:text-pink-200
                  transition-colors duration-200"
                title="Live Demo"
              >
                <FiExternalLink className="w-4 h-4" />
                <span className="text-xs">Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
