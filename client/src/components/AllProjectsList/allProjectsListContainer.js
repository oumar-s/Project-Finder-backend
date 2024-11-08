import { useGetAllProjectsForUserQuery } from "../../features/api/apiSlice";
import AllProjectsListView from "./allProjectsListView";
import { useAuth } from "../../context/authContext";

export function AllProjectsListContainer({settingsPage, leaveProject}) {
  const auth = useAuth();
  const { data, isSuccess, error, isLoading } = useGetAllProjectsForUserQuery(auth.user?.id);

  
  if (isLoading) {
    return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>Loading projects...</div>;
  }

  if (error) {
    return <div>Error! Try again: {error.message}</div>;
  }

  
  if (isSuccess) {
    console.log("all teams: ", data);
    return (
      <AllProjectsListView allProjects={data} leaveProject={leaveProject} settingsPage={settingsPage} />
    );
  }
}




