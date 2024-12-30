import ProjectsListView from './projectsListView';
import { React } from 'react';

export const ProjectsListContainer = ({projects, isPublicProfile}) => {

  return (
    <ProjectsListView
      projects={projects}
      isPublicProfile={isPublicProfile}
    />
  )

}