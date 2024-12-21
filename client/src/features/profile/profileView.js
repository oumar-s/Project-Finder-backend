import { Link } from "react-router-dom";
import {
    Mail,
    Code2,
    Briefcase,
    Star,
    ExternalLink
} from 'lucide-react';
const ProfileView = ({ members, profile }) => {
    const skills = profile.skills ? profile.skills.split(",") : [];
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Sidebar */}
            <aside className="w-80 bg-white p-6 border-r border-gray-200">
                <div className="flex flex-col items-center space-y-4">
                    {/* Profile Picture */}
                    <div className="relative">
                        <img
                            src={profile.profilePic ? profile.profilePic : "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-blue-100"
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
            <main className="flex-1 p-8">
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

export default ProfileView;