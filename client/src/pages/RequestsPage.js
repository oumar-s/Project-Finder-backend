import { RequestsContainer } from '../features/request/RequestsContainer';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function RequestsPage() {

    return (
        <div >
            <Navbar />

            <RequestsContainer />

            <Footer />
        </div>
    );
}