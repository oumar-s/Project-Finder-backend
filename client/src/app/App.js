import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../context/authContext';
import PrivateRouteRequiresAuth from '../components/PrivateRouteRequiresAuth';
import ExplorePage from '../pages/ExplorePage';
import AboutPage from '../pages/AboutPage';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import PostPage from '../pages/PostPage';
import ProjectPage from '../pages/ProjectPage';
import FilteredProjectsPage from '../pages/FilteredProjectsPage';
import CreateTaskPage from '../pages/CreateTaskPage';
import ProjectRequestsPage from '../pages/ProjectRequestsPage';
import ProjectInfoPage from '../pages/ProjectInfoPage';
import AccountPage from '../pages/AccountPage';
import RequestsPage from '../pages/RequestsPage';
import ProfilePage from '../pages/ProfilePage';
import ProfileTeamsPage from '../pages/ProfileTeamsPage';
import ProfileProjectsPage from '../pages/ProfileProjectsPage';
import ProfileTasksPage from '../pages/ProfileTasksPage';
import AddTeamPage from '../pages/AddTeamPage';
import AllTeamsPage from '../pages/AllTeamsPage';
import TeamMembersPage from '../pages/TeamMembersPage';
import TeamProjectsPage from '../pages/TeamProjectsPage';
import TeamOverviewPage from '../pages/TeamOverviewPage';
import TeamRequestsPage from '../pages/TeamRequestsPage';
import Test from '../components/test';


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
					<Route path="/test" element={<Test />} />
					<Route
						path="/dashboard"
						element={
							<PrivateRouteRequiresAuth>
								<Dashboard />
							</PrivateRouteRequiresAuth>
						}
					/>
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
					<Route
						path="/profile/teams"
						element={
							<PrivateRouteRequiresAuth>
								<ProfileTeamsPage />
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/profile/projects"
						element={
							<PrivateRouteRequiresAuth>
								<ProfileProjectsPage />
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/profile/tasks"
						element={
							<PrivateRouteRequiresAuth>
								<ProfileTasksPage />
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route path="/logout" element={<LandingPage />} />
					<Route
						path="/projects/:projectId/all"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<ProjectPage />{" "}
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/projects/:projectId/my"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<FilteredProjectsPage />{" "}
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/projects/:projectId/new-task"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<CreateTaskPage />{" "}
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/projects/:projectId/requests"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<ProjectRequestsPage />{" "}
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/projects/:projectId/info"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<ProjectInfoPage />{" "}
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
					<Route
						path="/teams/:teamId/requests"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<TeamRequestsPage />{" "}
							</PrivateRouteRequiresAuth>
						}
					/>
					
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
