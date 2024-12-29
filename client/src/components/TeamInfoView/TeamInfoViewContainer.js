import TeamInfoViewView from "./TeamInfoViewView";

export default function TeamInfoViewContainer({ team, teamMembers, teamProjects }) {
  // ...any additional logic...
  return (
    <TeamInfoViewView
      team={team}
      teamMembers={teamMembers}
      teamProjects={teamProjects}
    />
  );
}
