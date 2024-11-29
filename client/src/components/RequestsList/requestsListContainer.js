import RequestsListView from "./requestsListView";
import React, { useState} from "react";

export const RequestsListContainer = ({ requests, teamOwnerID,  requestType, acceptRequest, declineRequest }) => {

  const [requestsState, setRequestsState] = useState(requests);
  const [requestz, setRequestz] = ([
    { id: 1, requesterName: "Sarah Chen", teamName: "Frontend Guild", status: 'pending' },
    { id: 2, requesterName: "Mike Johnson", teamName: "DevOps Team", status: 'pending' },
    { id: 3, requesterName: "Alex Kumar", teamName: "Design Systems", status: 'pending' },
  ]);

  const handleAction = (request, action) => {
    const requestId = request.id;
    setRequestsState(requestsState.map(request => {
      if (request.id === requestId) {
        return { ...request, status: action };
      }
      return request;
    }));

    if (action === 'Accepted') {
      acceptRequest(request);
    } else if (action === 'Declined') {
      declineRequest(request);
    }
  };
  
  console.log('requests', requests)
    return (
      < RequestsListView requests={requestsState} requestType={requestType} teamOwnerID={teamOwnerID} handleAction={handleAction} acceptRequest={acceptRequest} declineRequest={declineRequest} />
    );
  
}




