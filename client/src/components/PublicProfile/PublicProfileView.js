import { Link } from "react-router-dom";
import { ProjectsListContainer } from "../../components/ProjectsList/projectsListContainer";
import {
    Mail,
    Code2,
    Briefcase,
    Star,
    ExternalLink
} from 'lucide-react';
const PublicProfileView = ({ members, profile }) => {
    const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
        <div className={`text-center p-6 ${className}`}>
          <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      );
    const skills = profile.skills ? profile.skills.split(",") : [];
    console.log('skills', skills);
    let projects = [];
    if(members.length > 4){
        const slicedMembers = members.slice(0, 4);
        projects = slicedMembers.map((member) => member.project);
    } else {
        projects = members.map((member) => member.project);
    }
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Left Sidebar */}
            <aside className="w-full md:w-80 bg-white p-6 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="flex flex-col items-center space-y-4">
                    {/* Profile Picture */}
                    <div className="relative">
                        <img
                            src={profile.profilePic ? profile.profilePic : "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"}
                            alt="Profile"
                            className="w-24 md:w-32 h-24 md:h-32 rounded-full border-4 border-blue-100"
                        />
                    </div>

                    {/* User Info */}
                    <div className="text-center space-y-2">
                        <h1 className="text-xl font-semibold text-gray-900">{profile.firstName} {profile.lastName}</h1>
                        {/* <p className="text-blue-600 font-medium">{user.username}</p> */}
                        <div className="flex items-center justify-center space-x-2 text-gray-600">
                            <Mail size={16} />
                            <span className="text-sm">{profile.email}</span>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="w-full pt-6">
                        <div className="flex items-center space-x-2 text-gray-700 mb-3">
                            <Code2 size={18} />
                            <h2 className="font-medium">Skills</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8">
                {/* Bio Section */}
                <section className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <Briefcase size={20} className="text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-900">Bio</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        {profile.bio}
                    </p>
                </section>

                {/* Featured Projects */}
                <section>
                    <div className="flex items-center space-x-2 mb-6">
                        <Star size={20} className="text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-900">Featured Projects</h2>
                    </div>
                    <div className="grid gap-6">
                        {projects.length > 0 ? (
                            <ProjectsListContainer projects={projects} isPublicProfile={true}/>
                        ) : (
                            <EmptyState
                                icon={Star}
                                title="No Projects Yet"
                                description="This user has not added any projects yet."
                            />
                        )}
                    </div>
                </section>

                {/* <div className="info">
                    <p>bio: {profile.bio}</p>
                    <div>
                        <p>Projects:</p>
                        {members.map((member) => (
                            <div key={member.id}>
                                <Link to={`/projects/${member.project.id}/all`}>
                                    <p>{member.project.projectTitle}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div> */}
            </main>
        </div>
    );
}

export default PublicProfileView;