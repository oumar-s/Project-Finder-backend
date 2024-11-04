import { AllTasksListContainer } from '../components/AllTasksList/allTasksListContainer';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function Dashboard() {

    return (
        <div >
            <Navbar />

            <AllTasksListContainer />
            
            <Footer />
        </div>
    );
}