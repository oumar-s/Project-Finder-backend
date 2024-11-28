import RequestsListView from "./requestsListView";
import React, { useState} from "react";

export function RequestsListContainer(props) {

  const [requests, setRequests] = ([
    { id: 1, requesterName: "Sarah Chen", teamName: "Frontend Guild", status: 'pending' },
    { id: 2, requesterName: "Mike Johnson", teamName: "DevOps Team", status: 'pending' },
    { id: 3, requesterName: "Alex Kumar", teamName: "Design Systems", status: 'pending' },
  ]);

  const handleAction = (requestId, action) => {
    setRequests(requests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: action };
      }
      return request;
    }));
  };
  
  console.log('requests',props.requests)
    return (
      < RequestsListView requests={props.requests} requestType={props.requestType} acceptRequest={props.acceptRequest} declineRequest={props.declineRequest} />
    );
  
}




