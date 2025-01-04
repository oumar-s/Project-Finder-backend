import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../context/authContext';
import PrivateRouteRequiresAuth from '../components/PrivateRouteRequiresAuth';
import PublicRoute from '../components/PublicRoute';
import ExplorePage from '../pages/ExplorePage';
import AboutPage from '../pages/AboutPage';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import AddProjectInTeamPage from '../pages/AddProjectInTeamPage';
import AddProjectPage from '../pages/AddProjectPage';
import ProjectAllTasksPage from '../pages/ProjectAllTasksPage';
import FilteredProjectsPage from '../pages/FilteredProjectsPage';
import ProjectMembersPage from '../pages/ProjectMembersPage';
import CreateTaskPage from '../pages/CreateTaskPage';
import ProjectRequestsPage from '../pages/ProjectRequestsPage';
import ProjectInfoPage from '../pages/ProjectInfoPage';
import ProjectInfoViewPage from '../pages/ProjectInfoViewPage';
import SettingsPage from '../pages/SettingsPage';
import ProfilePage from '../pages/ProfilePage';
import PublicProfilePage from '../pages/PublicProfilePage';
import ProfileTeamsPage from '../pages/ProfileTeamsPage';
import ProfileProjectsPage from '../pages/ProfileProjectsPage';
import ProfileTasksPage from '../pages/ProfileTasksPage';
import AddTeamPage from '../pages/AddTeamPage';
import AllTeamsPage from '../pages/AllTeamsPage';
import TeamMembersPage from '../pages/TeamMembersPage';
import TeamProjectsPage from '../pages/TeamProjectsPage';
import TeamOverviewPage from '../pages/TeamOverviewPage';
import TeamRequestsPage from '../pages/TeamRequestsPage';
import TeamInfoViewPage from '../pages/TeamInfoViewPage';
import Test from '../components/test';


function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
					<Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
					<Route path="/sign-up" element={<PublicRoute><SignUpPage /></PublicRoute>} />
					<Route path="/projects" element={<PublicRoute><ExplorePage /></PublicRoute>} />
					<Route path="/teams" element={<PublicRoute><AllTeamsPage /></PublicRoute>} />
					<Route path="/about" element={<PublicRoute><AboutPage /></PublicRoute>} />
					<Route path="/project-info-view/:projectId" element={<PublicRoute><ProjectInfoViewPage /></PublicRoute>} />
					<Route path="/team-info-view/:teamId" element={<PublicRoute><TeamInfoViewPage /></PublicRoute>} />
					<Route path="/test" element={<PublicRoute><Test /></PublicRoute>} />
					<Route path="/profile/:userId" element={<PublicRoute><PublicProfilePage /></PublicRoute>} />

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
								<AddProjectInTeamPage />
							</PrivateRouteRequiresAuth>
						}
					/>
					<Route
						path="/new-project"
						element={
							<PrivateRouteRequiresAuth>
								<AddProjectPage />
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
								<SettingsPage />
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
								<ProjectAllTasksPage />{" "}
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
						path="/projects/:projectId/members"
						element={
							<PrivateRouteRequiresAuth>
								{" "}
								<ProjectMembersPage />{" "}
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
