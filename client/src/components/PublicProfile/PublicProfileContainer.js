import PublicProfileView from ".//PublicProfileView";
import { useGetAllProjectsForUserQuery, useGetUserByIdQuery } from "../../features/api/apiSlice";
import { useParams } from "react-router-dom";

export function PublicProfileContainer() {
  const params = useParams();
  const userId = params.userId;
  const { data: user, error: isUserError, isLoading: isUserLoading } = useGetUserByIdQuery(userId);
  const { data: projectMembers, error: isProjectMembersError, isLoading: isProjectMembersLoading } = useGetAllProjectsForUserQuery(userId);

  if (isUserLoading || isProjectMembersLoading) {
    return <div>Loading...</div>;
  }

  if (isUserError || isProjectMembersError) {
    return <div>There was an error.</div>;
  }

  console.log('data', projectMembers);
  console.log('user', user);
    return (
      <PublicProfileView members={projectMembers} profile={user} />
    )
  }
