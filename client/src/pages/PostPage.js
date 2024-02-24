import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AddProjectFormContainer } from '../features/project/addProjectForm/addFormContainer';
function PostPage() {
  return (
    <div >
      <Navbar />

      <AddProjectFormContainer />

      <Footer />
    </div>
  );
}

export default PostPage;