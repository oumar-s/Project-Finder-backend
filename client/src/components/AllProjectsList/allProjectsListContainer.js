import { useGetAllProjectsForUserQuery } from "../../features/api/apiSlice";
import AllProjectsListView from "./allProjectsListView";
import { useAuth } from "../../context/authContext";
import ErrorMessage from "../ErrorMessage";

export function AllProjectsListContainer({settingsPage, leaveProject}) {
  const auth = useAuth();
  const { data, isSuccess, error, isLoading } = useGetAllProjectsForUserQuery(auth.user?.id);

  if (isLoading || error) {
    <ErrorMessage loading={isLoading} error={error} />
  }

  if (isSuccess) {
    console.log("all teams: ", data);
    return (
      <AllProjectsListView allProjects={data} leaveProject={leaveProject} settingsPage={settingsPage} />
    );
  }
}




