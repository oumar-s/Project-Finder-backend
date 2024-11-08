import TeamMembersListView from "./teamMembersListView";
import { React } from 'react';

export const TeamMembersListContainer = (props) => {

  
  return (

    <TeamMembersListView
      members={props.members}
      onDeleteMember={props.onDeleteMember}
      type={props.type}
      isOwner={props.isOwner}
    />
  )

}