import ProjectInfoViewView from "./ProjectInfoViewView";
import { useAddRequestToProjectMutation } from "../../features/api/apiSlice";
import { useAuth } from "../../context/authContext";
import { useState } from "react";

export function ProjectInfoViewContainer({ project, members, tasks }) {
  const auth = useAuth();
  const isAuthenticated = auth.user;
  const [showAlert, setShowAlert] = useState({ visible: false, projectId: null });
  const [loadingProject, setLoadingProject] = useState(false);
  const [joinedProject, setJoinedProject] = useState(false);
  const [addRequestToProject] = useAddRequestToProjectMutation();

  const handleJoinProject = async (projectId) => {
    setLoadingProject(true);
    await addRequestToProject(projectId);
    setLoadingProject(false);
    setJoinedProject(true);
    console.log("join project clicked");
    setShowAlert({ visible: true, projectId });
    setTimeout(() => {
      setShowAlert({ visible: false, projectId: null });
    }, 3000);
  }

  return (
    <ProjectInfoViewView
      project={project}
      members={members}
      tasks={tasks}
      isAuthenticated={isAuthenticated}
      showAlert={showAlert}
      setShowAlert={setShowAlert}
      loadingProject={loadingProject}
      joinedProject={joinedProject}
      handleJoinProject={handleJoinProject}
    />
  );
}
