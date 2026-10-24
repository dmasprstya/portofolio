import ProjectCard from './ProjectCard'
import projects from '../data/projects'

function Projects() {
  return (
    <section id="projects" className="2xl:min-h-screen py-8 2xl:py-24 px-4 sm:px-6">
      <div className="container mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-50 mb-6 text-center">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 py-2 px-1">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
