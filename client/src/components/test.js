import React from 'react';
import { 
  UsersIcon, 
  ClipboardIcon, 
  ExternalLinkIcon 
} from 'lucide-react';

const ProjectPage = () => {
  // Sample project data (would typically come from props or state)
  const project = {
    title: "Open Source Collaboration Platform",
    description: "A web application designed to connect developers, streamline project collaboration, and accelerate open-source innovation.",
    owner: "Jane Doe",
    repositoryLink: "https://github.com/synergy/collaboration-platform",
    tasks: [
      { id: 1, title: "Implement User Authentication", status: "In Progress" },
      { id: 2, title: "Design Database Schema", status: "Completed" },
      { id: 3, title: "Create API Endpoints", status: "Pending" },
      { id: 4, title: "Develop Frontend Components", status: "In Progress" }
    ],
    members: [
      { id: 1, name: "Jane Doe", role: "Project Lead", avatar: "/api/placeholder/40/40" },
      { id: 2, name: "John Smith", role: "Backend Developer", avatar: "/api/placeholder/40/40" },
      { id: 3, name: "Alex Johnson", role: "Frontend Developer", avatar: "/api/placeholder/40/40" },
      { id: 4, name: "Sarah Williams", role: "UX Designer", avatar: "/api/placeholder/40/40" }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Section 1: Project Overview */}
      <section className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-blue-700 mb-3">{project.title}</h1>
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Owner:</span>
                <span className="font-medium text-gray-700">{project.owner}</span>
              </div>
              
              <a 
                href={project.repositoryLink} 
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

      {/* Section 2: Tasks and Members */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Section 2a: Tasks */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-4">
            <ClipboardIcon className="mr-2 h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Project Tasks</h2>
          </div>
          <ul className="space-y-3">
            {project.tasks.map((task) => (
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
          </ul>
        </div>

        {/* Section 2b: Members */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-4">
            <UsersIcon className="mr-2 h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-800">Project Members</h2>
          </div>
          <ul className="space-y-4">
            {project.members.map((member) => (
              <li 
                key={member.id} 
                className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md"
              >
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;