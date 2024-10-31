import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../context/authContext';
import PrivateRouteRequiresAuth from '../components/PrivateRouteRequiresAuth';
import ExplorePage from '../pages/ExplorePage';
import AboutPage from '../pages/AboutPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import PostPage from '../pages/PostPage';
import ProjectPage from '../pages/ProjectPage';
import AccountPage from '../pages/AccountPage';
import RequestsPage from '../pages/RequestsPage';
import ProfilePage from '../pages/ProfilePage';
import AddTeamPage from '../pages/AddTeamPage';
import AllTeamsPage from '../pages/AllTeamsPage';
import TeamMembersPage from '../pages/TeamMembersPage';
import TeamProjectsPage from '../pages/TeamProjectsPage';
import TeamOverviewPage from '../pages/TeamOverviewPage';


function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/home" element={<ExplorePage />} />
					<Route path="/teams" element={<AllTeamsPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route
						path="/teams/:teamId/new-project"
						element={
							<PrivateRouteRequiresAuth>
								<PostPage />
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/add-team"
						element={
							<PrivateRouteRequiresAuth>
								<AddTeamPage />
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/account"
						element={
							<PrivateRouteRequiresAuth>
								<AccountPage />
							</PrivateRouteRequiresAuth>
						}
					/>
						<Route
						path="/requests"
						element={
							<PrivateRouteRequiresAuth>
								<RequestsPage />
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/profile"
						element={
							<PrivateRouteRequiresAuth>
								<ProfilePage />
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route path="/logout" element={<LandingPage />} />
					<Route
						path="/projects/:projectId"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<ProjectPage />{" "}
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/teams/:teamId/overview"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<TeamOverviewPage />{" "}
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/teams/:teamId/projects"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<TeamProjectsPage />{" "}
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/teams/:teamId/members"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<TeamMembersPage />{" "}
							</PrivateRouteRequiresAuth>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
