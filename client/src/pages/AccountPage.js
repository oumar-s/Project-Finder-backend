import { AccountContainer } from '../features/account/AccountContainer';
import Navbar from '../common/navbar';
import Footer from '../common/footer';

export default function AccountPage() {

    return (
        <div >
            <Navbar />

            <AccountContainer />

            <Footer />
        </div>
    );
}