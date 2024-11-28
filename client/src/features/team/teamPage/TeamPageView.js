import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectsListContainer } from '../../../components/ProjectsList/projectsListContainer';
import { ProjectsContainer } from '../../project/allProjects/allProjectsContainer'; 
import { Users, Briefcase } from 'lucide-react';
const TeamPageView = ({ team, teamMembers, teamProjects, myProjects }) => {
    const members = [
        { name: "Alex Rodriguez", role: "JavaScript, SQL" },
        { name: "Sam Chen", role: "JavaScript, SQL" },
        { name: "Jordan Kim", role: "billyfil@example.com" },
        { name: "Taylor Wong", role: "billyfil@example.com" }
    ]
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Section 1: Team Banner */}
            <div className="w-full h-64 object-cover">
                <img
                    src={team.teamBanner}
                    alt="Team Banner"
                    className="w-full h-full"
                />
                {/* <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg">
                {team.teamName}
              </h1>
            </div> */}
            </div>

            {/* Section 2: Team Details */}
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
                <div className="w-64 h-64 flex-shrink-0 mr-8">
                    <img
                        src={team.teamIcon}
                        alt="Team Profile"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                        {team.teamName}
                    </h2>
                    <p className="text-gray-700">
                        {team.teamDescription}
                    </p>
                </div>
            </div>

            {/* Section 3: Projects and Team Members */}
            <div className="container mx-auto px-4 py-8 grid md:flex md:justify-between gap-8">
                <div className='flex flex-col gap-12 w-full'>
                    {/* Part (a): Projects */}
                    <div className='flex flex-col w-full'>
                        <div className="flex items-center mb-6">
                            <Briefcase className="mr-2 text-blue-600" />
                            <h3 className="text-xl font-semibold text-blue-800">Your Projects</h3>
                        </div>
                        <ProjectsListContainer projects={myProjects} />

                    </div>
                    <div className='flex flex-col w-full'>
                        <div className="flex items-center mb-6">
                            <Briefcase className="mr-2 text-blue-600" />
                            <h3 className="text-xl font-semibold text-blue-800">Team Projects</h3>
                        </div>

                        <ProjectsContainer projects={teamProjects} />
                    </div>
                </div>






                {/* Part (b): Team Members - Visible on MD and larger screens */}
                <div className="hidden md:block w-1/3">
                    <div className="flex items-center mb-6">
                        <Users className="mr-2 text-blue-600" />
                        <h3 className="text-xl font-semibold text-blue-800">Team Members</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h4 className="font-medium text-teal-700">{member.user.firstName + " " + member.user.lastName}</h4>
                                <p className="text-gray-600 text-sm">{member.user.email}</p>
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
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h4 className="font-medium text-teal-700">{member.user.firstName + " " + member.user.lastName}</h4>
                                <p className="text-gray-600 text-sm">{member.user.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TeamPageView;

