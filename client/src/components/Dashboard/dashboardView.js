import { MyTasksListContainer } from "../TasksListDisplay/myTasksListContainer";
import { Link } from "react-router-dom";
import { ChevronDown, CheckSquare, Users, FolderGit2, ExternalLink, AlertCircle, LinkIcon } from 'lucide-react';
const DashboardView = ({ teams, projects, selectedTeam, setSelectedTeam, onTeamSelect, isTeamDropdownOpen, setIsTeamDropdownOpen, tasks, getStatusColor }) => {
  console.log('selected team', selectedTeam);
  const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
    <div className={`text-center p-6 ${className}`}>
      <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
  return (
    <div className="bg-gray-50">
      <div className="md:flex">
        {/* Sidebar for large screens */}
        <div className="hidden md:block md:w-96 md:min-h-screen  md:pt-8 bg-white border-r border-gray-200">
          <div className="p-4 h-full overflow-y-auto">
            {/* Team Selector */}
            <div className="mb-6">
              <div className="mb-4">
                {teams.length > 0 ? (
                  <div className="relative">
                    <div className="flex">
                    <button
                      onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                      className="w-full flex items-center justify-between p-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        {selectedTeam?.teamName}
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <Link
                      to={`/teams/${selectedTeam.id}/overview`}
                      className="ml-2 p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    </div>
                    
                    {isTeamDropdownOpen && (
                      <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        {teams.map((teamMember) => (
                          <button
                            key={teamMember.id}
                            onClick={() => {
                              setSelectedTeam(teamMember.team);
                              setIsTeamDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                          >
                            {teamMember.team.teamName}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* <div className="self-end">
                      {selectedTeam && (
                        <button

                          className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-100"
                        >
                          <Eye className="h-4 w-4" /> View Team
                        </button>
                      )}
                    </div> */}
                  </div>
                  
                ) : (
                  <div>
                  <div className="text-sm font-semibold text-gray-600 mb-2 pl-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        Teams
                      </div>
                  <EmptyState
                    icon={Users}
                    title="No teams available"
                    description="Join or create a team to get started"
                    className="bg-gray-50 rounded-lg"
                  />
                  </div>
                )}
              </div>

              {/* Projects List */}
              <div className="">
                <h2 className="text-sm font-semibold text-gray-600 mb-2 pl-2 flex items-center gap-2">
                  <FolderGit2 className="h-4 w-4 text-purple-500" />
                  Projects
                </h2>
                {teams.length > 0 && selectedTeam ? (
                  projects[selectedTeam.teamName]?.length > 0 ? (
                    <div className="flex flex-col">
                      {projects[selectedTeam.teamName]?.map((project) => (
                        <Link
                          to={`/projects/${project.id}/all`}
                          key={project.id}
                          className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 rounded-md"
                        >
                          {project.projectTitle}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      icon={FolderGit2}
                      title="No projects found"
                      description="Join or create a project in this team to get started"
                      className="bg-gray-50 rounded-lg"
                    />
                  )
                ) : (
                  <EmptyState
                    icon={AlertCircle}
                    title="Select a team"
                    description="Choose a team to view its projects"
                    className="bg-gray-50 rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Includes all content for mobile */}
        <div className="w-full">
          <div className="p-8 md:p-8">
            {/* Mobile-only team and projects section */}
            <div className="md:hidden space-y-6 mb-8">
              {/* Team Selector */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Teams
                </h2>
                {teams.length > 0 ? (
                  <div className="relative">
                    <div className="flex">
                    <button
                      onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                      className="w-full flex items-center justify-between p-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100"
                    >
                      <div className="flex items-center  gap-2">
                        {selectedTeam?.teamName}
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <Link
                      to={`/teams/${selectedTeam.id}/overview`}
                      className="ml-2 p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    </div>
                    
                    {isTeamDropdownOpen && (
                      <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        {teams.map((teamMember) => (
                          <button
                            key={teamMember.id}
                            onClick={() => {
                              setSelectedTeam(teamMember.team);
                              setIsTeamDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                          >
                            {teamMember.team.teamName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <EmptyState
                    icon={Users}
                    title="No teams available"
                    description="Join or create a team to get started"
                    className="bg-white border border-gray-200 rounded-lg"
                  />
                )}
              </div>

              {/* Projects List */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FolderGit2 className="h-5 w-5 text-purple-500" />
                  Projects
                </h2>
                {teams.length > 0 && selectedTeam ? (
                  projects[selectedTeam.teamName]?.length > 0 ? (
                    <div className="flex flex-col bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {projects[selectedTeam.teamName]?.map((project) => (
                        <Link
                          to={`/projects/${project.id}/all`}
                          key={project.id}
                          className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {project.projectTitle}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      icon={FolderGit2}
                      title="No projects found"
                      description="Join or create a project in this team to get started"
                      className="bg-white border border-gray-200 rounded-lg"
                    />
                  )
                ) : (
                  <EmptyState
                    icon={AlertCircle}
                    title="Select a team"
                    description="Choose a team to view its projects"
                    className="bg-white border border-gray-200 rounded-lg"
                  />
                )}
              </div>
            </div>
            {/**Tasks */}
            <div className="">  
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-blue-500" />
          My tasks
        </h2>
              <MyTasksListContainer tasks={tasks} />
            </div>


            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;