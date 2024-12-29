import React from "react";
import { ProjectInfoViewContainer } from "../components/ProjectInfoView/ProjectInfoViewContainer";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";
import { useGetProjectQuery, useGetProjectMembersQuery, useGetProjectTasksQuery } from '../features/api/apiSlice';
import TabNav from '../components/TabNav';

function ProjectInfoViewPage() {
  const params = useParams();
  const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);
  const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetProjectTasksQuery(params.projectId);
  const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);

  if (membersLoading || tasksLoading || projectLoading) {
    return <div>Loading...</div>;
  }
  if (membersError || tasksError || projectError) {
    return <div>There was an error. Please try again.</div>;
  }

  return (
    <div>
      <Navbar />
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