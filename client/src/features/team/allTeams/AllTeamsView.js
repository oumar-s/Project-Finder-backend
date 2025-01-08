import { Link } from "react-router-dom"
import { Users, Info, UserCheck, Check, Loader2 } from 'lucide-react';
import Toast from '../../../components/Toast';

const AllTeamsView = ({ teams, isAuthenticated, type, handleJoinTeam, loadingTeams, joinedTeams, showAlert, setShowAlert }) => {
  const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
    <div className={`text-center p-6 ${className}`}>
      <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );

  if (!teams.length) {
    return (
      <EmptyState
        icon={Users}
        title="No teams"
        description="There are no teams available at the moment."
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">All Teams</h2>
      </div>
      {!isAuthenticated && (
        <div className="mb-8 text-red-500">
          You must login to join a team
        </div>
      )}
      {console.log("all projects view: ", teams)}
      <div className="space-y-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
          >
            {showAlert.visible && showAlert.teamId === team.id && (
              <Toast onClose={() => setShowAlert({ visible: false, teamId: null })} type={showAlert.type}>
                {showAlert.message}
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
                    Request made
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
                        Requesting...
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