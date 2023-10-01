import { ProfileContainer } from '../features/profile/profileContainer';
import Navbar from '../common/navbar';
import Footer from '../common/footer';

export default function ProfilePage() {

    return (
        <div >
            <Navbar />

            <ProfileContainer />

            <Footer />
        </div>
    );
}