import Navbar from '../common/navbar';
import Footer from '../common/footer';
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