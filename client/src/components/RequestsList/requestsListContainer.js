import RequestsListView from "./requestsListView";
import React, { useState} from "react";

export const RequestsListContainer = ({ requests, teamOwnerID,  requestType, acceptRequest, declineRequest }) => {

  const [requestsState, setRequestsState] = useState(requests);
  

  const handleAction = async (request, action) => {
    const requestId = request.id;
    setRequestsState(requestsState.map(request => {
      if (request.id === requestId) {
        return { ...request, status: action };
      }
      return request;
    }));

    if (action === 'Accepted') {
      await acceptRequest(request);
    } else if (action === 'Declined') {
      await declineRequest(request);
    }

    setTimeout(async () => {
      setRequestsState(current => current.filter(r => r.status === "Pending"));
    }, 5000);
  };
  
  console.log('requests', requests)
    return (
      < RequestsListView requests={requestsState} requestType={requestType} teamOwnerID={teamOwnerID} handleAction={handleAction} acceptRequest={acceptRequest} declineRequest={declineRequest} />
    );
  
}




