import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck} from 'lucide-react';

const ProjectsListView = ({ projects }) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
      {/* <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Team Projects</h2>
      </div> */}
    {console.log("team projects view: ", projects)}
      {/* <div className=""> */}
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
          >
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
            </div>
          </div>
        ))}
      {/* </div> */}
    </div>
  );
};

export default ProjectsListView;