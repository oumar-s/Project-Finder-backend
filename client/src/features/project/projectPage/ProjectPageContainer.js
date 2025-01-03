import ProjectPageView from "./ProjectPageView";
import ErrorMessage from "../../../components/ErrorMessage";
import { useGetProjectQuery } from "../../api/apiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";


export function ProjectPageContainer({tasks, members}) {
  const params = useParams();
  const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);

  if(projectLoading || projectError) {
    return <ErrorMessage loading={projectLoading} error={projectError} />;
  }

  return (
    <ProjectPageView project={project} tasks={tasks} members={members}/>
  );
}
