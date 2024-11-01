import TeamMembersListView from "./teamMembersListView";
import { React, useState } from 'react';
import { useParams } from "react-router-dom";
import { useGetTeamMembersQuery } from "../../features/api/apiSlice";

export const TeamMembersListContainer = () => {
  const params = useParams();
  const { data: members, error: membersError, isLoading: membersLoading } = useGetTeamMembersQuery(params.teamId);

  const member = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      profileImage: "/path/to/image.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      profileImage: "/path/to/image.jpg"
    }
  ];

  const handleDelete = (memberId) => {
    // Handle member deletion
    console.log(`Deleting member ${memberId}`);
  };
  console.log("members", members);

  if(membersLoading) {
    return <div>Loading...</div>
  }
  if(membersError) {
    return <div>Error: {membersError.message}</div>
  }
  return (

    <TeamMembersListView
      members={members}
      onDeleteMember={handleDelete}
    />
  )

}