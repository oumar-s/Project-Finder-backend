import React from 'react';
//import { Users, Code, Star} from 'lucide-react';
import Navbar from './navbar';
import { Users, Settings, Briefcase } from 'lucide-react';

const TeamPage = () => {
  // Sample team data (would typically come from props or state)
  const teamData = {
    name: "Open Source Innovators",
    description: "Driving collaborative innovation through open-source development",
    bannerImage: "/api/placeholder/1200/300",
    teamImage: "/api/placeholder/300/300",
    projects: [
      { name: "Project Alpha", description: "Revolutionizing web frameworks" },
      { name: "Project Beta", description: "AI-powered collaboration tools" },
      { name: "Project Gamma", description: "Sustainable coding platforms" },
      { name: "Project Delta", description: "Decentralized development ecosystem" }
    ],
    members: [
      { name: "Alex Rodriguez", role: "Lead Developer" },
      { name: "Sam Chen", role: "UX Designer" },
      { name: "Jordan Kim", role: "DevOps Engineer" },
      { name: "Taylor Wong", role: "Product Manager" }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Section 1: Team Banner */}
      <div className="w-full h-64 bg-blue-500 relative">
        <img 
          src={teamData.bannerImage} 
          alt="Team Banner" 
          className="w-full h-full object-cover absolute inset-0 opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg">
            {teamData.name}
          </h1>
        </div>
      </div>

      {/* Section 2: Team Details */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
        <div className="w-64 h-64 flex-shrink-0 mr-8">
          <img 
            src={teamData.teamImage} 
            alt="Team Profile" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            {teamData.name}
          </h2>
          <p className="text-gray-700">
            {teamData.description}
          </p>
        </div>
      </div>

      {/* Section 3: Projects and Team Members */}
      <div className="container mx-auto px-4 py-8 grid md:flex md:justify-between gap-8">
        {/* Part (a): Projects */}
        <div className='flex flex-col w-full'>
          <div className="flex items-center mb-6">
            <Briefcase className="mr-2 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-800">Your Projects</h3>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            {teamData.projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="font-medium text-purple-700 mb-2">{project.name}</h4>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
          {/* <div className="flex items-center mb-6">
            <Briefcase className="mr-2 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-800">Your Projects</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {teamData.projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="font-medium text-purple-700 mb-2">{project.name}</h4>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div> */}
        </div>
        

        {/* Part (b): Team Members - Visible on MD and larger screens */}
        <div className="hidden md:block w-1/3">
          <div className="flex items-center mb-6">
            <Users className="mr-2 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-800">Team Members</h3>
          </div>
          <div className="flex flex-col gap-2">
            {teamData.members.map((member, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="font-medium text-teal-700">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members for Mobile (MD screens and below) */}
        <div className="md:hidden">
          <div className="flex items-center mb-6">
            <Users className="mr-2 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-800">Team Members</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {teamData.members.map((member, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="font-medium text-teal-700">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;