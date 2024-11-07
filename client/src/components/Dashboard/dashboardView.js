import { Link } from "react-router-dom";
const DashboardView = ({ teams, projects, selectedTeam, onTeamSelect }) => {
  return (
    <div className="w-1/4 p-6 border-r">
      <div className="mb-4">
        <label htmlFor="team-select" className="block font-medium mb-2">
          Select Team
        </label>
        <div className="relative">
          <select
            id="team-select"
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedTeam || ''}
            onChange={(e) => onTeamSelect(e.target.value)}
          >
            <option value="">Select a team</option>
            {teams.map((teamMember) => (
              <option key={teamMember.id} value={teamMember.team.teamName}>
                {teamMember.team.teamName}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Projects</h3>
        <ul>
          {selectedTeam && projects[selectedTeam]?.map((project) => (
            <li
              key={project.id}
              className="text-gray-700 hover:text-gray-900 py-1 px-2 rounded-md"
            >
              <Link to={`/projects/${project.id}/all`}>
                {project.projectTitle}
              </Link>              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardView;