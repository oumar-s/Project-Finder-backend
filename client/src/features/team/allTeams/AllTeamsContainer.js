import { useAddRequestToTeamMutation } from "../../api/apiSlice";
import { useAuth } from "../../../context/authContext";
import AllTeamsView from "./AllTeamsView";
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
    try {
      const response = await addRequestToTeam(teamId).unwrap();
      setJoinedTeams(prev => new Set([...prev, teamId]));
      setShowAlert({ visible: true, teamId, type: 'success', message: `A request has been made to join the team!` });
    } catch (error) {
      setShowAlert({ 
        visible: true, 
        teamId, 
        type: 'error', 
        message: error.data?.error || 'Failed to send request'
      });
    } finally {
      setLoadingTeams(prev => {
        const next = new Set(prev);
        next.delete(teamId);
        return next;
      });
      
      setTimeout(() => {
        setShowAlert({ visible: false, teamId: null });
      }, 4000);
    }
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




