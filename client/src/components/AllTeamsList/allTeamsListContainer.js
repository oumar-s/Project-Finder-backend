import { useGetUserTeamsQuery } from "../../features/api/apiSlice";
import AllTeamsListView from "./allTeamsListView";
import { useAuth } from "../../context/authContext";

export function AllTeamsListContainer(settingsPage) {
  const auth = useAuth();
  const { data, isSuccess, error, isLoading } = useGetUserTeamsQuery(auth.user?.id);

  
  if (isLoading) {
    return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>Loading projects...</div>;
  }

  if (error) {
    return <div>Error! Try again: {error.message}</div>;
  }
  if (isSuccess) {
    console.log("all teams: ", data);
    return (
      <AllTeamsListView allTeams={data} settingsPage={settingsPage} />
    );
  }
}




