import TeamPageView from "./TeamPageView";

export function TeamPageContainer({team, teamMembers, teamProjects, myProjects}) {
  
  

  return (
    <TeamPageView team={team} teamMembers={teamMembers} teamProjects={teamProjects} myProjects={myProjects}/>
  );
}