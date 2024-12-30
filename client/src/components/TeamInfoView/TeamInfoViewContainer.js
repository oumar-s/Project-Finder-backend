import TeamInfoViewView from "./TeamInfoViewView";
import { useAddRequestToTeamMutation} from "../../features/api/apiSlice";
import { useAuth } from "../../context/authContext";
import { useState } from "react";

export default function TeamInfoViewContainer({ team, teamMembers, teamProjects }) {
  const auth = useAuth();
  const isAuthenticated = auth.user;
  const [showAlert, setShowAlert] = useState({ visible: false, teamId: null });
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [joinedTeam, setJoinedTeam] = useState(false);

  const [addRequestToTeam] = useAddRequestToTeamMutation();

  console.log("team info view container add request", addRequestToTeam);
  const handleJoinTeamRequest = async (teamId) => {
    setLoadingTeam(true);
    await addRequestToTeam(teamId);
    setLoadingTeam(false);
    setJoinedTeam(true);
    setShowAlert({ visible: true, teamId });
    setTimeout(() => {
      setShowAlert({ visible: false, teamId: null });
    }, 3000);
  }

  return (
    <TeamInfoViewView
      team={team}
      teamMembers={teamMembers}
      teamProjects={teamProjects}
      isAuthenticated={isAuthenticated}
      showAlert={showAlert}
      setShowAlert={setShowAlert}
      loadingTeam={loadingTeam}
      joinedTeam={joinedTeam}
      handleJoinTeamRequest={handleJoinTeamRequest}
    />
  );
}
