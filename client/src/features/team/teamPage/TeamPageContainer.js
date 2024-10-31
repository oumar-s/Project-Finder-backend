import TeamPageView from "./TeamPageView";
import { useGetTeamQuery, useGetProjectsForTeamQuery, useGetUserProjectsInTeamQuery } from "../../api/apiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/authContext";

export function TeamPageContainer() {
  const params = useParams();
  const auth = useAuth();
  console.log('auth', auth);
  const [buttonClicked, setButtonClicked] = useState(false);
  const { data: team, error: teamError, isLoading: teamLoading } = useGetTeamQuery(params.teamId);
  const { data: teamProjects, error: teamProjectsError, isLoading: teamProjectsLoading } = useGetProjectsForTeamQuery(params.teamId);
  const {data: myProjects, error: myProjectsError, isLoading: myProjectsLoading} = useGetUserProjectsInTeamQuery({teamId: params.teamId, userId: auth.user?.id});

  if (teamLoading || teamProjectsLoading || myProjectsLoading) return <div>Loading projects...</div>;
  if (teamError || teamProjectsError || myProjectsError) return <div>Error: {teamError?.message || teamProjectsError?.message || myProjectsError?.message}</div>;

  return (
    <TeamPageView team={team} teamProjects={teamProjects} myProjects={myProjects}/>
  );
}