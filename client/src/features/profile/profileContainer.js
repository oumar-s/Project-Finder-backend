import ProfileView from "./profileView";
import { useGetAllProjectsForUserQuery } from "../api/apiSlice";
import { useAuth } from "../../context/authContext";
export function ProfileContainer() {
  const auth = useAuth();
  const { data, error: isError, isLoading } = useGetAllProjectsForUserQuery(auth.user?.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  console.log('data', data)
    return (
      <ProfileView members={data} profile={auth.user} />
    )
  }
