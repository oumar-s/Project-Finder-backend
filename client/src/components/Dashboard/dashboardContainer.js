import DashboardView from "./dashboardView";
import { MyTasksListContainer } from "../DashboardTasksList/myTasksListContainer";
import { useGetUserTeamsQuery, useGetAllProjectsForUserQuery } from "../../features/api/apiSlice";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
export function DashboardContainer() {
  const auth = useAuth();
  const [selectedTeam, setSelectedTeam] = useState(null);


  //const teams = ['Team A', 'Team B', 'Team C'];
  const { data: teams, error: teamsError, isLoading: teamsLoading, isSuccess: teamsSuccess } = useGetUserTeamsQuery(auth.user?.id);
  const { data: projects, error: projectsError, isLoading: projectsLoading, isSuccess: projectsSuccess } = useGetAllProjectsForUserQuery(auth.user?.id);

  const tasks = [
    { id: 1, title: 'Task 1', project: 'Project 1', status: 'In Progress' },
    { id: 2, title: 'Task 2', project: 'Project 2', status: 'Completed' },
    { id: 3, title: 'Task 3', project: 'Project 4', status: 'To Do' },
    { id: 4, title: 'Task 4', project: 'Project 6', status: 'In Progress' },
    { id: 5, title: 'Task 5', project: 'Project 7', status: 'Completed' },
  ];

  if (teamsError || projectsError) {
    return <div>Error! Try again</div>;
  }
  if (teamsLoading || projectsLoading) {
    return <div> Loading... </div>;
  }


  if (teamsSuccess && projectsSuccess) {
    console.log('projects for user', projects);
    const projectsByTeam = projects.reduce((acc, projectMember) => {
      const teamName = projectMember?.project?.team?.teamName;
      const projectId = projectMember?.project?.id;
      const projectTitle = projectMember?.project?.projectTitle;
      if (!acc[teamName]) {
        acc[teamName] = [];
      }
      acc[teamName].push({
        id: projectId,
        projectTitle: projectTitle,
      });
      return acc;
    }, {});

    console.log('projectsByTeam', projectsByTeam);
    return (
      <div className="flex h-screen">
        <DashboardView
          teams={teams}
          projects={projectsByTeam}
          selectedTeam={selectedTeam}
          onTeamSelect={setSelectedTeam}
        />
        <MyTasksListContainer />
      </div>
    );
  }
}