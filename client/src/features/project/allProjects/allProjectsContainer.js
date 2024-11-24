import {useAddRequestToProjectMutation } from "../../api/apiSlice";
import AllProjectsView from "./allProjectsView";
import { useState } from "react";

export function ProjectsContainer({projects, type}) {
  const [joinedProjects, setJoinedProjects] = useState(new Set());
  const [loadingProjects, setLoadingProjects] = useState(new Set());
  const [showAlert, setShowAlert] = useState({ visible: false, projectId: null });
  const [addRequestToProject] = useAddRequestToProjectMutation();


  const handleJoinProject = async (projectId) => {
    setLoadingProjects(prev => new Set([...prev, projectId]));
    await addRequestToProject(projectId);
    console.log("join project clicked"); 
    setLoadingProjects(prev => {
      const next = new Set(prev);
      next.delete(projectId);
      return next;
    });
    
    setJoinedProjects(prev => new Set([...prev, projectId]));
    setShowAlert({ visible: true, projectId });
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert({ visible: false, projectId: null });
    }, 3000);
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
       />
      </div>
    );

}




