import { PublicProfileContainer } from '../components/PublicProfile/PublicProfileContainer'; 
import TabNav from '../components/TabNav';
import { useAuth } from '../context/authContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


export default function PublicProfilePage() {
    const {user} = useAuth();
    let tabs = [];
    if(user){
        tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/teams"}];
    }
    return (
        <div className=''>
            <Navbar page="Profile" />

            {user && <TabNav tabs={tabs}/> }

            <PublicProfileContainer />

            <Footer />
        </div>
    );
}