import { useGetAllTeamsQuery, useAddRequestToTeamMutation } from "../../api/apiSlice";
import AllTeamsView from "./allTeamsView";

export function AllTeamsContainer() {
  const { data, isSuccess, error, isLoading } = useGetAllTeamsQuery();
  const [addRequestToTeam] = useAddRequestToTeamMutation();

  
  if (isLoading) {
    return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>Loading projects...</div>;
  }

  if (error) {
    return <div>Error! Try again: {error.message}</div>;
  }

  const handleJoinTeam = async (teamId) => {
    await addRequestToTeam(teamId);
    console.log("join team clicked"); 
  }
  if (isSuccess) {
    console.log("all teams: ", data);
    return (
      <AllTeamsView allTeams={data} handleJoinTeam={handleJoinTeam} />
    );
  }
}




