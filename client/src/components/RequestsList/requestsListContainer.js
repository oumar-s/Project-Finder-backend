import RequestsListView from "./requestsListView";

export function RequestsListContainer(props) {
  
  console.log('requests',props.requests)
    return (
      < RequestsListView requests={props.requests} requestType={props.requestType} acceptRequest={props.acceptRequest} declineRequest={props.declineRequest} />
    );
  
}




