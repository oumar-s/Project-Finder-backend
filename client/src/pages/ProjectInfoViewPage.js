import React from "react";
import { ProjectInfoViewContainer } from "../components/ProjectInfoView/ProjectInfoViewContainer";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";
import { useGetProjectQuery, useGetProjectMembersQuery, useGetProjectTasksQuery} from '../features/api/apiSlice';
import ErrorMessage from '../components/ErrorMessage';

function ProjectInfoViewPage() {
  const params = useParams();
  const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);
  const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetProjectTasksQuery(params.projectId);
  const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);
  
  const isLoading = membersLoading || tasksLoading || projectLoading;
  const hasError = membersError || tasksError || projectError;

  if (isLoading || hasError) {
    return (
      <div>
        <Navbar page="Project" />
        <ErrorMessage loading={isLoading} error={hasError} />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar page="Project" />
      <div className="min-h-screen">
        <ProjectInfoViewContainer
          project={project}
          members={members}
          tasks={tasks}
        />
      </div>
        <Footer />
    </div>
  );
}

export default ProjectInfoViewPage;