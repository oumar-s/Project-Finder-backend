import { AllProjectsListContainer} from '../components/AllProjectsList/allProjectsListContainer';
import { AllTeamsListContainer } from '../components/AllTeamsList/allTeamsListContainer';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function AccountPage() {

    return (
        <div >
            <Navbar />

            <div className="">
            Teams:
            <AllTeamsListContainer settingsPage={true} />
            </div>

            <div className="" >
            Projects:
            <AllProjectsListContainer settingsPage={true}/>
            </div>
            
            <Footer />
        </div>
    );
}