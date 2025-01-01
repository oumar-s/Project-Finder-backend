import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AddProjectFormContainer } from '../components/addProjectForm/addFormContainer';
import TabNav from '../components/TabNav';
function AddProjectPage() {
  
    const tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/teams"}];

    return (
      <div >
        <Navbar page="Add project"/>
  
        <TabNav tabs={tabs}/>
        <div className='min-h-screen p-8'>
            <AddProjectFormContainer />
        </div>
  
        <Footer />
      </div>
    );
  }
  
  export default AddProjectPage;