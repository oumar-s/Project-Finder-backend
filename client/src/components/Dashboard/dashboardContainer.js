import DashboardView from "./dashboardView";
import { useGetUserTeamsQuery, useGetAllProjectsForUserQuery } from "../../features/api/apiSlice";
import React, { useState } from 'react';

import { useAuth } from "../../context/authContext";
export function DashboardContainer() {
  const auth = useAuth();
  //const teams = ['Team A', 'Team B', 'Team C'];
  const { data: teams, error: teamsError, isLoading: teamsLoading, isSuccess: teamsSuccess } = useGetUserTeamsQuery(auth.user?.id);
  const { data: projects, error: projectsError, isLoading: projectsLoading, isSuccess: projectsSuccess } = useGetAllProjectsForUserQuery(auth.user?.id);
  
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);

  if (teamsLoading || projectsLoading) {
    return <div>Loading...</div>;
  }

  if (teamsError || projectsError) {
    return <div>Error: {teamsError?.message || projectsError?.message}</div>;
  }

  

  

  

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'in progress':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
    console.log('teams', teams);
    const teamz = [];
    
    return (
      <div className="">
        <DashboardView
          teams={teams}
          projects={projectsByTeam}
          selectedTeam={selectedTeam || teams[0]?.team}
          setSelectedTeam={setSelectedTeam}
          onTeamSelect={setSelectedTeam}
          isTeamDropdownOpen={isTeamDropdownOpen}
          setIsTeamDropdownOpen={setIsTeamDropdownOpen}
          //tasks={tasks}
          getStatusColor={getStatusColor}
        />
      </div>
    );
  }
}