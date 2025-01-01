import ProjectPageView from "./ProjectPageView";
//import { useNavigate } from "react-router-dom";
import { useGetProjectQuery } from "../../api/apiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";


export function ProjectPageContainer({tasks, members}) {
  const params = useParams();
  const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);

  if(projectLoading) {
    return <div>Loading...</div>
  }
  if(projectError) {
    return <div>There was an error.</div>
  }
  return (
    <ProjectPageView project={project} tasks={tasks} members={members}/>
  );
  
}
  