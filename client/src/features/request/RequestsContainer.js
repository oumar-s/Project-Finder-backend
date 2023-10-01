
import RequestsView from "./RequestsView";
import { useGetMyRequestsQuery, useGetOtherRequestsQuery, useApproveOtherRequestsMutation, useDenyOtherRequestsMutation } from "../api/apiSlice";
import { useState } from "react";
export function RequestsContainer() {
  const { data: myProjectsData, error: myProjectsError, isSuccess: myProjectsIsSuccess, isLoading: myProjectsIsloading } = useGetMyRequestsQuery();
  const { data: otheProjectsData, error: otherProjectsError, isSuccess: otherProjectsIsSuccess, isLoading: otherProjectsIsLoading } = useGetOtherRequestsQuery();
  const [approveRequest] = useApproveOtherRequestsMutation();
  const [denyRequest] = useDenyOtherRequestsMutation()

  const [requests, setRequests] = useState([]);
  const [type, setType] = useState("default");
  
  if (myProjectsIsloading || otherProjectsIsLoading) {
    return <div>Loading requests...</div>;
  }

  if (myProjectsError || otherProjectsError) {
    return <div>Error: {otherProjectsError.message ?? myProjectsError.message} </div>;
  }



  const handleOtherRequests = async () => {
    setRequests(otheProjectsData);
    setType("otherRequests");

  }
  const handleMyRequests = async () => {
    setRequests(myProjectsData)
    setType("myRequests")

  }
  function handleApprove(requestId) {
    return async () => {
      await approveRequest(requestId);

    }
  }
  function handleDeny(requestId) {
    return async () => {
      await denyRequest(requestId);

    }
  }

  if (otherProjectsIsSuccess && myProjectsIsSuccess) {
    return (
      <RequestsView requests={requests} otherRequestsHandler={handleOtherRequests} myRequestsHandler={handleMyRequests} approveHandler={handleApprove} denyHandler={handleDeny} type={type} />
    )
  }
}