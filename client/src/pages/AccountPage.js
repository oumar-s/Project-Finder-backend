import { AccountContainer } from '../features/account/AccountContainer';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function AccountPage() {

    return (
        <div >
            <Navbar />

            <AccountContainer />

            <Footer />
        </div>
    );
}