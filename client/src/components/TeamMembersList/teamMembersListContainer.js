import TeamMembersListView from "./teamMembersListView";
export const TeamMembersListContainer = () => {
    

const members = [
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
  
  return (

  <TeamMembersListView 
    members={members} 
    onDeleteMember={handleDelete} 
  />
  )

}