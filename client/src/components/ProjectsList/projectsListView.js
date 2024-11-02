import React from 'react';
import { Link } from 'react-router-dom';
//import { UserCircle, X } from 'lucide-react';

const ProjectsListView = ({ projects }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
          >
            <Link 
              to={`/projects/${project.id}/all`} 
              className="block mb-4 hover:text-blue-600 transition-colors"
            >
              <h3 className="text-xl font-semibold text-gray-900 hover:underline">
                {project.projectTitle}
              </h3>
            </Link>
            <p className="text-gray-600 line-clamp-3">
              {project.projectDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsListView;