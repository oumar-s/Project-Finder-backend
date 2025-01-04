import {useAddRequestToProjectMutation } from "../../api/apiSlice";
import { useAuth } from "../../../context/authContext";
import AllProjectsView from "./allProjectsView";
import { useState } from "react";

export function ProjectsContainer({projects, type, title}) {
  const { user } = useAuth();
  const isAuthenticated = user ? true : false;
  const [joinedProjects, setJoinedProjects] = useState(new Set());
  const [loadingProjects, setLoadingProjects] = useState(new Set());
  const [showAlert, setShowAlert] = useState({ visible: false, projectId: null });
  const [addRequestToProject] = useAddRequestToProjectMutation();


  const handleJoinProject = async (projectId) => {
    setLoadingProjects(prev => new Set([...prev, projectId]));
    try {
      const response = await addRequestToProject(projectId).unwrap();
      setJoinedProjects(prev => new Set([...prev, projectId]));
      setShowAlert({ visible: true, projectId, type: 'success', message: `A request has been made to join the project!` });
    } catch (error) {
      setShowAlert({ 
        visible: true, 
        projectId, 
        type: 'error', 
        message: error.data?.error || 'Failed to send request'
      });
    } finally {
      setLoadingProjects(prev => {
        const next = new Set(prev);
        next.delete(projectId);
        return next;
      });
      
      setTimeout(() => {
        setShowAlert({ visible: false, projectId: null });
      }, 4000);
    }
  }

    return (
      <div className="">
      <AllProjectsView projects={projects} 
      type={type}
      handleJoinProject={handleJoinProject}
      joinedProjects={joinedProjects}
      loadingProjects={loadingProjects}
      showAlert={showAlert}
      setShowAlert={setShowAlert}
      isAuthenticated={isAuthenticated}
       />
      </div>
    );

}




