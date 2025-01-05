import Navbar from '../components/navbar';
import Footer from '../components/footer';
import TabNav from '../components/TabNav';
import { AddTeamFormContainer } from '../features/team/addTeamForm/addTeamFormContainer';
function AddTeamPage() {

  const tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/teams"}];
  return (
    <div >
      <Navbar page="Add team" />
      <TabNav tabs={tabs}/>
      <div className='min-h-screen p-8'>
        <AddTeamFormContainer />
      </div>
      <Footer />
    </div>
  );
}
export default AddTeamPage;