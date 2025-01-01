import ProfileView from "./profileView";
import { useGetAllProjectsForUserQuery, useGetUserQuery } from "../api/apiSlice";
import { useAuth } from "../../context/authContext";
export function ProfileContainer() {
  const auth = useAuth();
  const { data: user, error: isUserError, isLoading: isUserLoading } = useGetUserQuery();
  const { data: projectMembers, error: isProjectMembersError, isLoading: isProjectMembersLoading } = useGetAllProjectsForUserQuery(auth.user?.id);

  if (isUserLoading || isProjectMembersLoading) {
    return <div>Loading...</div>;
  }

  if (isUserError || isProjectMembersError) {
    return <div>There was an error.</div>;
  }

  console.log('data', projectMembers);
  console.log('user', user);
    return (
      <ProfileView members={projectMembers} profile={user} />
    )
  }
