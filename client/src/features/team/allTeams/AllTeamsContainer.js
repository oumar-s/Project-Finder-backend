import { useAddRequestToTeamMutation } from "../../api/apiSlice";
import { useAuth } from "../../../context/authContext";
import AllTeamsView from "./allTeamsView";
import { useState } from "react";

export function AllTeamsContainer({teams, type}) {
  const { user } = useAuth();
  const isAuthenticated = user ? true : false;
  const [joinedTeams, setJoinedTeams] = useState(new Set());
  const [loadingTeams, setLoadingTeams] = useState(new Set());
  const [showAlert, setShowAlert] = useState({ visible: false, teamId: null });
  const [addRequestToTeam] = useAddRequestToTeamMutation();

  const handleJoinTeam = async (teamId) => {
    setLoadingTeams(prev => new Set([...prev, teamId]));
    await addRequestToTeam(teamId);
    console.log("join team clicked"); 
    setLoadingTeams(prev => {
      const next = new Set(prev);
      next.delete(teamId);
      return next;
    });
    
    setJoinedTeams(prev => new Set([...prev, teamId]));
    setShowAlert({ visible: true, teamId });
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert({ visible: false, projectId: null });
    }, 3000);
  }
  
    console.log("all teams: ", teams);
    return (
      <AllTeamsView teams={teams} 
      isAuthenticated={isAuthenticated}
      type={type} 
      handleJoinTeam={handleJoinTeam} 
      joinedTeams={joinedTeams} 
      loadingTeams={loadingTeams} 
      showAlert={showAlert}
      setShowAlert={setShowAlert}
      />
    );
  
}




