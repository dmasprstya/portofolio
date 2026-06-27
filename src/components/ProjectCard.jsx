import { Link } from 'react-router-dom'
import { FiGithub } from 'react-icons/fi'

function ProjectCard({ project }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-8 flex flex-col hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all duration-200">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-1">
        {project.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {project.subtitle}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
        {project.shortDescription}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, index) => (
          <span 
            key={index}
            className="px-3 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-4 pt-2">
        <Link 
          to={`/project/${project.slug}`}
          className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-medium text-sm transition-colors"
        >
          View Details →
        </Link>
        <a 
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors"
        >
          <FiGithub className="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
