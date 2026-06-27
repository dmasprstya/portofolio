import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi'
import projects from '../data/projects'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Project Not Found</h1>
          <Link to="/" className="text-blue-500 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Back button */}
        <Link 
          to="/#projects" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-6 sm:mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-start gap-4 mb-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">
              {project.title}
            </h1>
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
              project.status.includes('production') 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : project.status.includes('development')
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {project.status}
            </span>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400 italic mb-4">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <FiGithub className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
            Overview
          </h2>
          <div className="space-y-4">
            {project.fullDescription.map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Screenshots */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">
            Screenshots
          </h2>
          {project.screenshots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screenshots.map((src, index) => (
                <div 
                  key={index}
                  className="rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <img 
                    src={src} 
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Screenshots coming soon
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Add images to <code className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded text-xs">app/public/screenshots/</code> and update the data file.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
