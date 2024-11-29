import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AddProjectFormContainer } from '../components/addProjectForm/addFormContainer';
import TabNav from '../components/TabNav';
function AddProjectPage() {
  
    const tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/home"}];

    return (
      <div >
        <Navbar />
  
        <TabNav tabs={tabs}/>
        <div className='h-screen p-8'>
            <AddProjectFormContainer />
        </div>
  
        <Footer />
      </div>
    );
  }
  
  export default AddProjectPage;