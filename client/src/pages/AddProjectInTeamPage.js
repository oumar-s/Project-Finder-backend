import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AddProjectFormContainer } from '../features/project/addProjectForm/addFormContainer';
import TabNav from '../components/TabNav';
import { useParams } from "react-router-dom";
function AddProjectInTeamPage() {

  let params = useParams();

  const tabs = [
    { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" },
    { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" },
    { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" },
    { id: 5, name: "Requests", link: "/teams/" + params.teamId + "/requests" },
    { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
]
  return (
    <div >
      <Navbar page="Team" />

      <TabNav tabs={tabs}/>
      <div className='min-h-screen  p-8'>
            
      <AddProjectFormContainer />
      </div>

      <Footer />
    </div>
  );
}

export default AddProjectInTeamPage;