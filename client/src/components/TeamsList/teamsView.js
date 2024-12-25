import { Link } from "react-router-dom"
import { Users, Info, UserCheck, Check, Loader2, X } from 'lucide-react';

const TeamsListView = ({ teams, isTeamMemberList }) => {
  if (!teams.length) {
    return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>There are no projects.</div>
  }

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
        {isTeamMemberList === false ? <h2 className="text-2xl font-semibold text-gray-700">All Teams</h2>
                          : <h2 className="text-2xl font-semibold text-gray-700">All your teams</h2>}
      </div>
      {console.log("all projects view: ", teams)}
      <div className="space-y-4">
        {isTeamMemberList === false ?
          teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
            >

              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link
                    to={`/teams/${team.id}/overview`}
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
              </div>
            </div>
          )) :

          teams.map((teamMember) => (
            <div
              key={teamMember.id}
              className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
            >

              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link
                    to={`/teams/${teamMember.team.id}/overview`}
                    className="text-lg font-semibold text-blue-500 mb-1 hover:underline ">
                    {teamMember.team.teamName}
                  </Link>
                  <p className="text-gray-600 text-sm mb-3">
                    {teamMember.team.teamDescription}
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
                      {teamMember.team.teamStatus}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <UserCheck size={18} className="mr-2" />
                    <span className="text-sm font-medium">
                      {teamMember.team.owner.firstName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default TeamsListView;