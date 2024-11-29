import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AddTeamFormContainer } from '../features/team/addTeamForm/addTeamFormContainer';
function AddTeamPage() {
  return (
    <div >
      <Navbar />
      <div className='min-h-screen p-8'>
        <AddTeamFormContainer />
      </div>

      <Footer />
    </div>
  );
}

export default AddTeamPage;