import { MyTasksListContainer } from '../../components/TasksListDisplay/myTasksListContainer';
import { 
    UsersIcon, 
    ClipboardIcon, 
    ExternalLinkIcon,
    Check,
    X,
    Loader2
  } from 'lucide-react';
  
const ProjectInfoViewView = ({
  project, tasks, members,
  isAuthenticated, handleJoinProject,
  showAlert, setShowAlert,
  loadingProject, joinedProject
}) => {
    console.log('ProjectPageView', project)
    const Toast = ({ children, onClose }) => (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
        <div className="flex items-center gap-2 w-max px-4 py-3 bg-white border border-emerald-200 rounded-lg shadow-lg">
          <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-full">
            <Check className="h-4 w-4 text-emerald-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">{children}</span>
          <button 
            onClick={onClose} 
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
    const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
      <div className={`text-center p-6 ${className}`}>
        <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    );
      return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {showAlert.visible && showAlert.projectId === project.id && (
            <Toast onClose={() => setShowAlert({ visible: false, projectId: null })}>
              A request has been made to join {project.projectTitle}!
            </Toast>
          )}
          {/* Section 1: Project Overview */}
          <section className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div className="flex-grow">
                <h1 className="text-2xl font-bold text-purple-600 mb-3">{project.projectTitle}</h1>
                <p className="text-gray-600 mb-4">{project.projectDescription}</p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">Owner:</span>
                    <span className="font-medium text-gray-700">{project.owner.firstName} {project.owner.lastName}</span>
                  </div>
                  
                  <a 
                    href={project.projectRepository} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLinkIcon className="mr-2 h-5 w-5" />
                    Repository
                  </a>
                </div>
              </div>
            </div>
          </section>
          { isAuthenticated ?
        
        <div className="container mx-auto px-4 my-4 flex justify-center md:justify-end">
          <button 
            onClick={() => handleJoinProject(project.id)}
            disabled={joinedProject || loadingProject}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loadingProject ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                Requesting...
              </>
            ) : joinedProject ? (
              <>
                <Check className="mr-2 h-4 w-4 inline-block" />
                Request made
              </>
            ) : (
              'Join Project'
            )}
          </button>
        </div>
        :
        <div className="text-red-500 font-semibold my-4 text-center">
        You must login to join this project
        </div>
        }

    
          {/* Section 2: Tasks and Members */}
          <section className="grid md:grid-cols-2 gap-6">
            {/* Section 2a: Tasks */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                <ClipboardIcon className="mr-2 h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Project Tasks</h2>
              </div>
              {/* <ul className="space-y-3">
                {tasks.map((task) => (
                  <li 
                    key={task.id} 
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                  >
                    <span className="text-gray-700">{task.title}</span>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        task.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {task.status}
                    </span>
                  </li>
                ))}
              </ul> */}
              <div className='max-h-96 overflow-y-auto'>
                <MyTasksListContainer tasks={tasks} />
              </div>

            </div>
    
            {/* Section 2b: Members */}
            <div className="bg-white shadow-sm rounded-lg p-6 ">
              <div className="flex items-center mb-4">
                <UsersIcon className="mr-2 h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-800">Project Members</h2>
              </div>
              <ul className="flex flex-col gap-2">
                {members.map((teamMember) => (
                  <li 
                    key={teamMember.id} 
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-10 h-10 rounded-full"
                    /> */}
                    <div>
                      <p className="font-medium text-teal-700">{teamMember.user.firstName} {teamMember.user.lastName}</p>
                      <p className="text-gray-600 text-sm">{teamMember.user.email}</p>
                    </div>
                  </li>
                ))}
                {members.length === 0 && (
                  <EmptyState
                    icon={UsersIcon}
                    title="No team members found"
                    description="There are currently no team members in this project."
                  />
                )}
              </ul>
            </div>
          </section>
        </div>
      );
}
export default ProjectInfoViewView;
