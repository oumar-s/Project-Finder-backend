import PublicProfileView from "./PublicProfileView";
import { useGetAllProjectsForUserQuery, useGetUserByIdQuery } from "../../features/api/apiSlice";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";

export function PublicProfileContainer() {
  const params = useParams();
  const userId = params.userId;
  const { data: user, error: isUserError, isLoading: isUserLoading } = useGetUserByIdQuery(userId);
  const { data: projectMembers, error: isProjectMembersError, isLoading: isProjectMembersLoading } = useGetAllProjectsForUserQuery(userId);

  const isLoading = isUserLoading || isProjectMembersLoading;
  const hasError = isUserError || isProjectMembersError;

  if (isLoading || hasError) {
    return <ErrorMessage loading={isLoading} error={hasError} />;
  }

  console.log('data', projectMembers);
  console.log('user', user);
  return (
    <PublicProfileView members={projectMembers} profile={user} />
  )
}
