import { Link } from 'react-router-dom';
import { MyTasksListContainer } from '../../../components/TasksListDisplay/myTasksListContainer';
import {
  UsersIcon,
  ClipboardIcon,
  ExternalLinkIcon,
  UserCheck,
  Users2Icon
} from 'lucide-react';

const ProjectPageView = ({ project, tasks, members }) => {
  // console.log('ProjectPageView', project)
  const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
    <div className={`text-center p-6 ${className}`}>
      <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Section 1: Project Overview */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8 border border-purple-200">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-purple-600 mb-3">{project.projectTitle}</h1>
            <p className="text-gray-600 mb-4">{project.projectDescription}</p>

            <div className="flex items-center space-x-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0  flex-auto">
                <div className="flex items-center text-gray-700">
                  <UserCheck className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="font-medium">{project.owner.firstName} {project.owner.lastName}</span>
                </div>
                <Link
                  to={`/teams/${project.team.id}/overview`}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Users2Icon className="mr-2 h-5 w-5" />
                  {project.team.teamName}
                </Link>
                {project.projectRepository &&
                  <a
                    href={project.projectRepository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLinkIcon className="mr-2 h-5 w-5" />
                    Repository
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Tasks and Members */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Section 2a: Tasks */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-purple-200">
          <div className="flex items-center mb-4">
            <ClipboardIcon className="mr-2 h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Project Tasks</h2>
          </div>
          <div className='max-h-96 overflow-y-auto'>
            <MyTasksListContainer tasks={tasks} />
          </div>

        </div>

        {/* Section 2b: Members */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-purple-200">
          <div className="flex items-center mb-4">
            <UsersIcon className="mr-2 h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-800">Project Members</h2>
          </div>
          <div className="flex flex-col gap-2">
            {members.map((teamMember) => (
              <Link
                key={teamMember.id}
                to={`/profile/${teamMember.user.id}`}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div>
                  <p className="font-medium text-teal-700">{teamMember.user.firstName} {teamMember.user.lastName}</p>
                  <p className="text-gray-600 text-sm">{teamMember.user.email}</p>
                </div>
              </Link>
            ))}
            {members.length === 0 && (
              <EmptyState
                icon={UsersIcon}
                title="No team members found"
                description="There are currently no team members in this project."
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProjectPageView;

