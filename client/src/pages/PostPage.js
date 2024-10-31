import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AddProjectFormContainer } from '../features/project/addProjectForm/addFormContainer';
import TabNav from '../components/TabNav';
import { useParams } from "react-router-dom";
function PostPage() {

  let params = useParams();

    const tabs = [
        {id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview"}, {id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects"}, {id: 3, name: "Members", link: "/teams/" + params.teamId + "/members"}, {id: 2, name: "New project", link: "/teams/" + params.teamId + "/new-project"},
    ];
  return (
    <div >
      <Navbar />

      <TabNav tabs={tabs}/>

      <AddProjectFormContainer />

      <Footer />
    </div>
  );
}

export default PostPage;