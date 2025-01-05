import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, FolderGit2} from 'lucide-react';

const ProjectsListView = ({ projects, isPublicProfile }) => {
  const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
    <div className={`text-center p-6 ${className}`}>
      <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
  if(!projects.length ){
    return <EmptyState 
      icon={FolderGit2}
      title="No projects found"
      description="Create a new project to get started."
    />
    
  }
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
    {console.log("projectsList view: ", projects)}
      {/* <div className=""> */}
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
          >
            {console.log("isPublic profile ", project)}
            <div className="flex justify-between items-start mb-4">
              <div>
                <Link 
                    to={isPublicProfile ? `/project-info-view/${project.project?.id || project.id}` : `/projects/${project.project?.id || project.id}/info`}
                    className="text-lg font-semibold text-purple-600 mb-1 hover:underline ">
                  {project.projectTitle || project.project.projectTitle}
                </Link>
                <p className="text-gray-600 text-sm mb-3">
                  {project.projectDescription || project.project.projectDescription}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-600">
                  <Users size={18} className="mr-2 text-blue-500" />
                  <span className="text-sm">
                    {project.team?.teamName || project.project.team.teamName}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <UserCheck size={18} className="mr-2" />
                  <span className="text-sm font-medium">
                    {project.owner?.firstName || project.project.owner.firstName} 
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      {/* </div> */}
    </div>
  );
};

export default ProjectsListView;