import React from "react";
import TeamInfoViewContainer from "../components/TeamInfoView/TeamInfoViewContainer";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";
import { useGetTeamQuery, useGetProjectsForTeamQuery, useGetTeamMembersQuery } from '../features/api/apiSlice';
import TabNav from '../components/TabNav';
import ErrorMessage from '../components/ErrorMessage';

function TeamInfoViewPage() {
  const params = useParams();
  const { data: team, error: teamError, isLoading: teamLoading } = useGetTeamQuery(params.teamId);
  const { data: teamMembers, error: teamMembersError, isLoading: teamMembersLoading } = useGetTeamMembersQuery(params.teamId);
  const { data: teamProjects, error: teamProjectsError, isLoading: teamProjectsLoading } = useGetProjectsForTeamQuery(params.teamId);  

  const isLoading = teamLoading || teamMembersLoading || teamProjectsLoading;
  const hasError = teamError || teamMembersError || teamProjectsError;

  if (isLoading || hasError) {
    return (
      <div>
        <Navbar page="Team" />
        <ErrorMessage loading={isLoading} error={hasError} />
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" },
    { id: 2, name: 'Projects', link: "/teams/" + params.teamId + "/projects" },
    { id: 3, name: 'Members', link: "/teams/" + params.teamId + "/members" },
    { id: 5, name: 'Requests', link: "/teams/" + params.teamId + "/requests" },
    { id: 4, name: 'New project', link: "/teams/" + params.teamId + "/new-project" },
  ];

  return (
    <div>
      <Navbar page="Team" />
      {/* <TabNav tabs={tabs} /> */}
      <div className="min-h-screen">
        <TeamInfoViewContainer
          team={team}
          teamMembers={teamMembers}
          teamProjects={teamProjects}
        />
      </div>
      <Footer />
    </div>
  );
}

export default TeamInfoViewPage;