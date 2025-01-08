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
    try {
      const response = await addRequestToProject(projectId).unwrap();
      setJoinedProject(true);
      setShowAlert({ visible: true, projectId, type: 'success', message: `A request has been made to join the project!` });
    } catch (error) {
      setShowAlert({ 
        visible: true, 
        projectId, 
        type: 'error', 
        message: error.data?.error || 'Failed to send request'
      });
    } finally {
      setLoadingProject(false);
      setTimeout(() => {
        setShowAlert({ visible: false, projectId: null });
      }, 4000);
    }
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
