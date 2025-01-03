import ProfileView from "./profileView";
import { useGetAllProjectsForUserQuery, useGetUserQuery } from "../api/apiSlice";
import { useAuth } from "../../context/authContext";
import ErrorMessage from "../../components/ErrorMessage";

export function ProfileContainer() {
  const auth = useAuth();
  const { data: user, error: isUserError, isLoading: isUserLoading } = useGetUserQuery();
  const { data: projectMembers, error: isProjectMembersError, isLoading: isProjectMembersLoading } = useGetAllProjectsForUserQuery(auth.user?.id);

  const isLoading = isUserLoading || isProjectMembersLoading;
  const hasError = isUserError || isProjectMembersError;

  if (isLoading || hasError) {
    return <ErrorMessage loading={isLoading} error={hasError} />;
  }

  console.log('data', projectMembers);
  console.log('user', user);
    return (
      <ProfileView members={projectMembers} profile={user} />
    )
  }
