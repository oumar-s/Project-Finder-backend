import { Link } from "react-router-dom";
const ProfileView = (props) => {
    return(
        <div className="container my-5" style={{ minHeight: "100vh" }}>
            <div className="flex">
                <div className="profile-image">
                    <img className="object-cover w-full h-full" src="../../assets/images/profile_image.png" alt="user profile" />
                    <p>First Name: {props.profile.firstName}</p>
                    <p>Last Name: {props.profile.lastName}</p>
                    <p>Email: {props.profile.email}</p>
                    <div>Skills: {props.profile.skills}</div>
                </div>
                <div className="info">
                    <p>bio: {props.profile.bio}</p>
                    <div>
                        <p>Projects:</p>
                        {props.members.map((member) => (
                            <div key={member.id}>
                                <Link to={`/projects/${member.project.id}/all`}>
                                    <p>{member.project.projectTitle}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileView;