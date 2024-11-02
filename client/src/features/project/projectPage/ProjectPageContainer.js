import ProjectPageView from "./ProjectPageView";
//import { useNavigate } from "react-router-dom";
import { useGetProjectQuery } from "../../api/apiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";


export function ProjectPageContainer() {
  const params = useParams();
  const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);

  if(projectLoading) {
    return <div>Loading...</div>
  }
  if(projectError) {
    return <div>Error: {projectError.message}</div>
  }
  return (
    <ProjectPageView project={project}/>
  );
  
}
  