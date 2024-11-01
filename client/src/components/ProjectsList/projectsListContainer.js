import ProjectsListView from './projectsListView';
import { useGetProjectsForTeamQuery } from '../../features/api/apiSlice';
import { React, useState } from 'react';
import { useParams } from "react-router-dom";

export const ProjectsListContainer = () => {
  const params = useParams();

  const { data: projects, error: projectsError, isLoading: projectsLoading } = useGetProjectsForTeamQuery(params.teamId);

  const project = [
    {
      id: 1,
      title: "Personal Portfolio Website",
      description: "A responsive personal portfolio showcasing my web development skills and projects."
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce application with user authentication and payment integration."
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team features."
    }
  ];

  if (projectsLoading) {
    return <div>Loading...</div>;
  }

  if (projectsError) {
    return <div>Error: {projectsError.message}</div>;
  }
  console.log("projects", projects);
  return (
    <ProjectsListView
      projects={projects}
    />
  )

}