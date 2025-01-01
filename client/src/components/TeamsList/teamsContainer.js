import AllTeamsView from "./teamsView";
import { useState } from "react";

export function TeamsListContainer({teams, isTeamMemberList}) {

  
  
    console.log("all teams: ", teams);
    return (
      <AllTeamsView teams={teams}  isTeamMemberList={isTeamMemberList}
      />
    );
  
}




