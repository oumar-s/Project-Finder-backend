import { useGetUserTeamsQuery } from "../../features/api/apiSlice";
import AllTeamsListView from "./allTeamsListView";
import { useAuth } from "../../context/authContext";
import ErrorMessage from '../../components/ErrorMessage';

export function AllTeamsListContainer({settingsPage, leaveTeam}) {
  const auth = useAuth();
  const { data, isSuccess, error, isLoading } = useGetUserTeamsQuery(auth.user?.id);

  if (isLoading || error) {
    return <ErrorMessage loading={isLoading} error={error} />;
  }

  if (isSuccess) {
    console.log("all teams: ", data);
    return (
      <AllTeamsListView allTeams={data} settingsPage={settingsPage} leaveTeam={leaveTeam}/>
    );
  }
}




