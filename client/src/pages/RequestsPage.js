import { RequestsContainer } from '../features/request/RequestsContainer';
import Navbar from '../common/navbar';
import Footer from '../common/footer';

export default function RequestsPage() {

    return (
        <div >
            <Navbar />

            <RequestsContainer />

            <Footer />
        </div>
    );
}