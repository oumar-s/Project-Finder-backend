import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectsContainer } from '../../features/project/allProjects/allProjectsContainer';
import { Users, Users2, Check, X, Loader2 } from 'lucide-react';
import DefaultBanner from '../../assets/images/DefaultBanner.png';


const TeamInfoViewView = ({ team, teamMembers, teamProjects, isAuthenticated, handleJoinTeamRequest, showAlert, setShowAlert, loadingTeam, joinedTeam }) => {
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
    <div className="min-h-screen pt-4">
      {showAlert.visible && showAlert.teamId === team.id && (
        <Toast onClose={() => setShowAlert({ visible: false, teamId: null })}>
          A request has been made to join {team.teamName}!
        </Toast>
      )}
      {/* Section 1: Team Banner */}
      <div className="w-11/12 h-64 mx-auto rounded-2xl bg-gray-200 relative overflow-hidden">
          <img
              src={team.teamBanner ? team.teamBanner : DefaultBanner}
              alt="Team Banner"
              className="absolute inset-0 w-full h-full rounded-2xl object-cover"
          />
      </div>

      {/* Section 2: Team Details */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
        <div className="w-64 h-64 flex-shrink-0 mr-8 rounded-lg bg-gray-200">
          {team.teamIcon ?
            <img
              src={team.teamIcon}
              alt="Team Profile"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            /> :
            <Users2 className="w-full h-full text-blue-800 object-cover rounded-lg shadow-lg" />
          }
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
      { isAuthenticated ?
        
      <div className="container mx-auto px-4 my-4 flex justify-center md:justify-end">
        <button 
          onClick={() => handleJoinTeamRequest(team.id)}
          disabled={joinedTeam || loadingTeam}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loadingTeam ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
              Requesting...
            </>
          ) : joinedTeam ? (
            <>
              <Check className="mr-2 h-4 w-4 inline-block" />
              Request made
            </>
          ) : (
            'Join Team'
          )}
        </button>
      </div>
      :
      <div className="text-red-500 font-semibold my-4 text-center">
      You must login to join this team
      </div>
      }

      {/* Section 3: Projects and Team Members */}
      <div className="container mx-auto px-4 py-8 grid md:flex md:justify-between gap-8">
        <div className='flex flex-col gap-12 w-full'>
          {/* Part (a): Projects */}
          {/* <div className='flex flex-col w-full'>
                        <div className="flex items-center mb-6">
                            <Briefcase className="mr-2 text-blue-600" />
                            <h3 className="text-xl font-semibold text-blue-800">Your Projects</h3>
                        </div>
                        <ProjectsListContainer projects={myProjects} />

                    </div> */}
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
            <EmptyState
            icon={Users}
            title="No team members found"
            description="Add team members to get started."
          />
          )}
        </div>
      </div>
    </div>
  );
}
export default TeamInfoViewView;

