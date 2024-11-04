import ProfileView from "./profileView";
import { useGetUserQuery } from "../api/apiSlice";
export function AccountContainer() {
  const { data, isError, isLoading, isSuccess } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading user Info...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  if (isSuccess) {
    return (
      <ProfileView profile={data} />
    )
  }
}