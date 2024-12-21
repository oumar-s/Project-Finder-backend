import React from 'react';
import { 
  Mail, 
  Code2, 
  Briefcase,
  Star,
  ExternalLink
} from 'lucide-react';

const ProfilePage = () => {
  // Sample data - would normally come from props or API
  const user = {
    name: "Sarah Chen",
    username: "@sarahc",
    email: "sarah.chen@example.com",
    profilePic: "/api/placeholder/150/150",
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS"],
    bio: "Full-stack developer passionate about open source and building collaborative tools. Currently working on developer productivity tools and contributing to various open-source projects.",
    featuredProjects: [
      {
        title: "DevCollab",
        description: "An open-source platform for real-time code collaboration",
        stars: 234,
        tech: ["React", "Socket.io", "Node.js"]
      },
      {
        title: "OpenAPI Tools",
        description: "Collection of developer tools for working with OpenAPI specifications",
        stars: 156,
        tech: ["TypeScript", "Express"]
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-80 bg-white p-6 border-r border-gray-200">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture */}
          <div className="relative">
            <img 
              src={user.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-100"
            />
          </div>

          {/* User Info */}
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
            <p className="text-blue-600 font-medium">{user.username}</p>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Mail size={16} />
              <span className="text-sm">{user.email}</span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="w-full pt-6">
            <div className="flex items-center space-x-2 text-gray-700 mb-3">
              <Code2 size={18} />
              <h2 className="font-medium">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Bio Section */}
        <section className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Briefcase size={20} className="text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Bio</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {user.bio}
          </p>
        </section>

        {/* Featured Projects */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Star size={20} className="text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Featured Projects</h2>
          </div>
          <div className="grid gap-6">
            {user.featuredProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                    {project.title}
                    <ExternalLink size={16} className="text-gray-400 ml-2" />
                  </h3>
                  <div className="flex items-center space-x-1 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm text-gray-600">{project.stars}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-purple-50 text-purple-600 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;