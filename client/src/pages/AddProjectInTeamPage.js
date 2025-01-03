import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AddProjectFormContainer } from '../features/project/addProjectForm/addFormContainer';
import { useGetTeamQuery, useGetTeamMembersQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import TabNav from '../components/TabNav';
import { useParams } from "react-router-dom";
function AddProjectInTeamPage() {

  let params = useParams();
  const auth = useAuth();

  const { data: members, error: membersError, isLoading: membersLoading } = useGetTeamMembersQuery(params.teamId);
  const { data: team, error: teamError, isLoading: teamLoading } = useGetTeamQuery(params.teamId);

  if (membersLoading || teamLoading) {
    return <div>Loading...</div>
  }
  if (membersError || teamError) {
    return <div>Error: {membersError.message}</div>
  }

  const isOwner = team?.ownerID === auth.user?.id;
  const isMember = members?.some(member => member.user.id === auth.user?.id);
  console.log('team members', members);
  console.log('isOwner', isOwner);
  console.log('isMember', isMember);

  let tabs = [];

  if (isOwner) {
    tabs = [
      { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" },
      { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" },
      { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" },
      { id: 5, name: "Requests", link: "/teams/" + params.teamId + "/requests" },
      { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
    ]
  } else if (isMember) {
    tabs = [
      { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" },
      { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" },
      { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" },
      { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
    ]
  } else {

    tabs = [{ id: 1, name: 'My teams', link: "/profile/teams" }, { id: 2, name: "Explore", link: "/teams" }];
  }

  return (
    <div >
      <Navbar page="Team" />

      <TabNav tabs={tabs} />
      <div className='min-h-screen  p-8'>

        <AddProjectFormContainer />
      </div>

      <Footer />
    </div>
  );
}

export default AddProjectInTeamPage;