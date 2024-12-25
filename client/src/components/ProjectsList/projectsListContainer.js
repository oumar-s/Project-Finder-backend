import ProjectsListView from './projectsListView';
import { React } from 'react';

export const ProjectsListContainer = ({projects}) => {

  return (
    <ProjectsListView
      projects={projects}
    />
  )

}