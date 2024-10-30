import { useGetAllTeamsQuery } from "../../api/apiSlice";
import AllTeamsView from "./allTeamsView";

export function AllTeamsContainer() {
  const { data, isSuccess, error, isLoading } = useGetAllTeamsQuery();

  
  if (isLoading) {
    return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>Loading projects...</div>;
  }

  if (error) {
    return <div>Error! Try again: {error.message}</div>;
  }
  if (isSuccess) {
    console.log("all teams: ", data);
    return (
      <AllTeamsView allTeams={data} />
    );
  }
}




