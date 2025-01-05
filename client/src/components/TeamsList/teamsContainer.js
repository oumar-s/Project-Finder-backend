import AllTeamsView from "./teamsView";

export function TeamsListContainer({ teams, isTeamMemberList }) {
  console.log("all teams: ", teams);
  return (
    <AllTeamsView teams={teams} isTeamMemberList={isTeamMemberList}
    />
  );

}




