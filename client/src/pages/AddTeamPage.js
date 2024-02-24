import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AddTeamFormContainer } from '../features/team/addTeamForm/addTeamFormContainer';
function AddTeamPage() {
  return (
    <div >
      <Navbar />

      <AddTeamFormContainer />

      <Footer />
    </div>
  );
}

export default AddTeamPage;