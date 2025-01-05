import { Link } from "react-router-dom"
import { Users, UserCheck, FolderGit2, Check, Loader2, X } from 'lucide-react';

// Custom Toast Component
const Toast = ({ children, onClose, type = 'success' }) => (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
    <div className={`flex items-center gap-2 w-max px-4 py-3 bg-white border rounded-lg shadow-lg
      ${type === 'success' ? 'border-emerald-200' : 'border-red-200'}`}>
      <div className={`flex items-center justify-center w-6 h-6 rounded-full
        ${type === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
        {type === 'success' ? (
          <Check className="h-4 w-4 text-emerald-600" />
        ) : (
          <X className="h-4 w-4 text-red-600" />
        )}
      </div>
      <span className={`text-sm font-medium ${type === 'success' ? 'text-gray-700' : 'text-red-700'}`}>
        {children}
      </span>
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const AllProjectsView = ({ projects, isAuthenticated, type, handleJoinProject, loadingProjects, joinedProjects, showAlert, setShowAlert }) => {
  const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
    <div className={`text-center p-6 ${className}`}>
      <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
  if (!projects.length) {
    return <EmptyState
      icon={FolderGit2}
      title="No projects found"
      description="Create a new project to get started."
    />

  }
  return (
    <div className="flex flex-col gap-4">
      {!isAuthenticated && (
        <div className="mb-4 text-red-500">
          You must login to join a project
        </div>
      )}
      {/* {console.log("all projects view: ", projects)} */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
        >
          {showAlert.visible && showAlert.projectId === project.id && (
            <Toast onClose={() => setShowAlert({ visible: false, projectId: null })} type={showAlert.type}>
              {showAlert.message}
            </Toast>
          )}
          <div className="flex justify-between items-start mb-4">
            <div>
              <Link
                to={isAuthenticated ? `/projects/${project.id}/info` : '/project-info-view/' + project.id}
                className="text-lg font-semibold text-purple-600 mb-1 hover:underline ">
                {project.projectTitle}
              </Link>
              <p className="text-gray-600 text-sm mb-3">
                {project.projectDescription}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-gray-600">
                <Users size={18} className="mr-2 text-blue-500" />
                <span className="text-sm">
                  {project.team.teamName}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <UserCheck size={18} className="mr-2" />
                <span className="text-sm font-medium">
                  {project.owner.firstName}
                </span>
              </div>
            </div>

            {isAuthenticated && project.projectStatus === 'Open' && (
              joinedProjects.has(project.id) ? (
                <button
                  disabled
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-500 bg-emerald-100 rounded-md"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Request made
                </button>
              ) : (
                <button
                  onClick={() => handleJoinProject(project.id)}
                  disabled={loadingProjects.has(project.id)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingProjects.has(project.id) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Requesting...
                    </>
                  ) : (
                    'Join Project'
                  )}
                </button>
              )
            )}
            {project.projectStatus === 'Waitlist' && (
              <button className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600 transition-colors">
                Join Waitlist
              </button>
            )}
            {project.projectStatus === 'Closed' && (
              <button disabled className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md cursor-not-allowed">
                Closed
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllProjectsView;