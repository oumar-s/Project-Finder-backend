import TeamPageView from "./TeamPageView";
//import { useNavigate } from "react-router-dom";
import { useGetTeamQuery, useGetMembersQuery, useAddRequestMutation } from "../../api/apiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";


export function TeamPageContainer() {
  //const navigate = useNavigate();
  let params = useParams();
  const [buttonClicked, setButtonClicked] = useState(false);
  const { data, error, isLoading, isSuccess } = useGetTeamQuery(params.teamId);
  //const [addRequest] = useAddRequestMutation()
  

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  
  
  
  
  // const handleJoin = async () => {
  //   setButtonClicked(true);
  //   await addRequest(params.projectId);
  // }

  if(isSuccess)
  {return (
    <TeamPageView team={data} />
  )}
}
  