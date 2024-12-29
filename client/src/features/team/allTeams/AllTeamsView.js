import { Link } from "react-router-dom"
import { Users, Info, UserCheck, Check, Loader2, X } from 'lucide-react';

const AllTeamsView = ({teams, isAuthenticated, type, handleJoinTeam, loadingTeams, joinedTeams, showAlert, setShowAlert}) => {
    if (!teams.length) {
        return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>There are no projects.</div>
    }
// Custom Toast Component
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
    const getStatusStyles = (status) => {
        switch (status) {
          case 'open':
            return 'bg-emerald-100 text-emerald-700';
          case 'closed':
            return 'bg-gray-100 text-gray-700';
          case 'waitlist':
            return 'bg-amber-100 text-amber-700';
          default:
            return 'bg-gray-100 text-gray-700';
        }
      };
    return (
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">All Teams</h2>
            {/*teams.length > 0 && (empty state <>No teams</>)*/}
            {/* <div className="flex gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700">
                Open
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-700">
                Waitlist
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                Closed
              </span>
            </div> */}
          </div>
          {!isAuthenticated && (
            <div className="mb-8 text-red-500">
              You must login to join a team
            </div>
          )}
        {  console.log("all projects view: ", teams)}
          <div className="space-y-4">
            {teams.map((team) => (
              <div 
                key={team.id} 
                className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
              >
                {showAlert.visible && showAlert.teamId === team.id && (
                <Toast onClose={() => setShowAlert({ visible: false, teamId: null })}>
                  Successfully joined {team.teamName}!
                </Toast>
              )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link 
                        to={isAuthenticated ? `/teams/${team.id}/overview` : '/team-info-view/' + team.id}
                        className="text-lg font-semibold text-blue-500 mb-1 hover:underline ">
                      {team.teamName}
                    </Link>
                    <p className="text-gray-600 text-sm mb-3">
                      {team.teamDescription}
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
                      <Info size={18} className="mr-2" />
                      <span className="text-sm">
                        {team.teamStatus}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <UserCheck size={18} className="mr-2" />
                      <span className="text-sm font-medium">
                        {team.owner.firstName} 
                      </span>
                    </div>
                  </div>
                  
                  {isAuthenticated && team.teamStatus === 'Open' && (
                    joinedTeams.has(team.id) ? (
                      <button 
                        disabled 
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-500 bg-emerald-100 rounded-md"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Joined
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleJoinTeam(team.id)}
                        disabled={loadingTeams.has(team.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loadingTeams.has(team.id) ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Joining...
                          </>
                        ) : (
                          'Join Team'
                        )}
                      </button>
                    )
                  )}
                  {team.teamStatus === 'Waitlist' && (
                    <button className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600 transition-colors">
                      Join Waitlist
                    </button>
                  )}
                  {team.teamStatus === 'Closed' && (
                    <button disabled className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md cursor-not-allowed">
                      Closed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default AllTeamsView;