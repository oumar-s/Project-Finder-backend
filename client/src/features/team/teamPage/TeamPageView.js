import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectsListContainer } from '../../../components/ProjectsList/projectsListContainer';
import { ProjectsContainer } from '../../project/allProjects/allProjectsContainer'; 
import { Users, Briefcase, Users2, UserCheck } from 'lucide-react';
import DefaultBanner from '../../../assets/images/DefaultBanner.png';
import DefaultIcon from '../../../assets/images/DefaultIcon.png'; 
const TeamPageView = ({ team, teamMembers, teamProjects, myProjects }) => {
    const members = [
        { name: "Alex Rodriguez", role: "JavaScript, SQL" },
        { name: "Sam Chen", role: "JavaScript, SQL" },
        { name: "Jordan Kim", role: "billyfil@example.com" },
        { name: "Taylor Wong", role: "billyfil@example.com" }
    ];

    const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
        <div className={`text-center p-6 ${className}`}>
          <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      );
    return (
        <div className="min-h-screen pt-4">
            {/* Section 1: Team Banner */}
            <div className="w-11/12 h-64 mx-auto rounded-2xl bg-gray-200 shadow-lg relative overflow-hidden z-0">
                
                <img
                    src={team.teamBanner ? team.teamBanner : DefaultBanner}
                    alt="Team Banner"
                    className="absolute inset-0 w-full h-full rounded-2xl object-cover"
                />
            </div>

            {/* Section 2: Team Details */}
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
                <div className="w-64 h-64 flex-shrink-0 mr-8 rounded-lg bg-gray-200">
                    { team.teamIcon ? 
                    <img
                        src={team.teamIcon}
                        alt="Team Profile"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    /> :
                    <Users2 className="w-full h-full text-blue-800 object-cover rounded-lg shadow-lg" />
                    }
                </div>
                <div className="flex-grow">
                    <div className="mb-2 mt-4">
                        <h2 className="text-2xl font-semibold text-blue-800">
                            {team.teamName}
                        </h2>
                        
                    </div>
                    
                    <p className="text-gray-700 mb-8">
                        {team.teamDescription}
                    </p>
                    <div className="flex items-center text-gray-700">
                            <UserCheck className="mr-2 h-5 w-5 text-gray-500" />
                            <span className="font-medium">{team.owner.firstName} {team.owner.lastName}
                            </span>
                        </div>
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
                        <div className='max-h-96 overflow-y-auto p-1'>
                            <ProjectsListContainer projects={myProjects} />
                        </div>

                    </div>
                    <div className='flex flex-col w-full'>
                        <div className="flex items-center mb-6">
                            <Users2 className="mr-2 text-blue-600" />
                            <h3 className="text-xl font-semibold text-blue-800">Team Projects</h3>
                        </div>
                        <div className='max-h-96 overflow-y-auto p-1'>
                            <ProjectsContainer projects={teamProjects} />
                        </div>
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
                            <Link
                                key={index}
                                to={`/profile/${member.user.id}`}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h4 className="font-medium text-teal-700">{member.user.firstName + " " + member.user.lastName}</h4>
                                <p className="text-gray-600 text-sm">{member.user.email}</p>
                            </Link>
                        ))}
                    </div>
                    {teamMembers.length === 0 && (
                        <EmptyState
                        icon={Users}
                        title="No team members found"
                        description="Add team members to get started."
                    />
                    )}
                </div>

                {/* Team Members for Mobile (MD screens and below) */}
                <div className="md:hidden">
                    <div className="flex items-center mb-6">
                        <Users className="mr-2 text-blue-600" />
                        <h3 className="text-xl font-semibold text-blue-800">Team Members</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {teamMembers.map((member, index) => (
                            <Link
                                key={index}
                                to={`/profile/${member.user.id}`}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h4 className="font-medium text-teal-700">{member.user.firstName + " " + member.user.lastName}</h4>
                                <p className="text-gray-600 text-sm">{member.user.email}</p>
                            </Link>
                        ))}
                    </div>
                    {teamMembers.length === 0 && (
                        <div className="text-center py-4 text-gray-500" >
                            No team members yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default TeamPageView;

