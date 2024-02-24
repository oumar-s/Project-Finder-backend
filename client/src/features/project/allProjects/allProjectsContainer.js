import { useGetAllProjectsQuery } from "../../api/apiSlice";
import AllProjectsView from "./allProjectsView";

export function ProjectsContainer() {
  const { data, isSuccess, error, isLoading } = useGetAllProjectsQuery();

  if (isLoading) {
    return <div className="" style={{ minHeight: "calc(100vh - 268px)"}}>Loading projects...</div>;
  }

  if (error) {
    return <div>Error! Try again: {error.message}</div>;
  }
   if(isSuccess){
    return (
      <AllProjectsView allProjects={data} />
    );
  }
}
  
  


