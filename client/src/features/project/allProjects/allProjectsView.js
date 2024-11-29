import { Link } from "react-router-dom"
import { Users, UserCheck, FolderPlus, Check, Loader2, X } from 'lucide-react';

// Custom Alert Component
// Custom Toast Component
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


const AllProjectsView = ({projects, type, handleJoinProject,  loadingProjects, joinedProjects, showAlert, setShowAlert}) => {
    const getStatusStyles = (status) => {
        switch (status) {
          case 'open':
            return 'bg-emerald-100 text-emerald-700';
          case 'closed':
            return 'bg-gray-100 text-gray-700';
          case 'waitlist':
            return 'bg-amber-100 text-amber-700';
          default:
            return 'bg-gray-100 text-gray-700';
        }
      };
    if (!projects.length) {
        return <div className="h-screen text-center py-8 text-gray-500" >There are no projects.</div>
    }
    return (
        <div className="flex flex-col gap-4">
          
        {  console.log("all projects view: ", projects)}
          {/* <div className="space-y-4"> */}
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
              >
                {showAlert.visible && showAlert.projectId === project.id && (
                <Toast onClose={() => setShowAlert({ visible: false, projectId: null })}>
                  Successfully joined {project.projectTitle}!
                </Toast>
              )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link 
                        to={`/projects/${project.id}/info`}
                        className="text-lg font-semibold text-purple-600 mb-1 hover:underline ">
                      {project.projectTitle}
                    </Link>
                    <p className="text-gray-600 text-sm mb-3">
                      {project.projectDescription}
                    </p>
                  </div>
                  {/* <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(project.projectStatus)}`}
                  >
                    {project.projectStatus}
                  </span> */}
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
                  
                  {project.projectStatus === 'Open' && (
                  joinedProjects.has(project.id) ? (
                    <button 
                      disabled 
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-500 bg-emerald-100 rounded-md"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Joined
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
                          Joining...
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
          {/* </div> */}
        </div>
      );
}

export default AllProjectsView;