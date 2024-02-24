import { ProfileContainer } from '../features/profile/profileContainer';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function ProfilePage() {

    return (
        <div >
            <Navbar page="Profile" />

            <ProfileContainer />

            <Footer />
        </div>
    );
}