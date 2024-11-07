import { useGetAllProjectsQuery, useAddRequestToProjectMutation } from "../../api/apiSlice";
import AllProjectsView from "./allProjectsView";

export function ProjectsContainer() {
  const { data, isSuccess, error, isLoading } = useGetAllProjectsQuery();
  const [addRequestToProject] = useAddRequestToProjectMutation();

  if (isLoading) {
    return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>Loading projects...</div>;
  }

  if (error) {
    return <div>Error! Try again: {error.message}</div>;
  }

  const handleJoinProject = async (projectId) => {
    await addRequestToProject(projectId);
    console.log("join project clicked"); 
  }

  if (isSuccess) {
    return (
      <AllProjectsView allProjects={data} handleJoinProject={handleJoinProject} />
    );
  }
}




