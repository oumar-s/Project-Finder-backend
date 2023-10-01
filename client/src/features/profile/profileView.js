const ProfileView = (props) => {
    return(
        <div className="container my-5" style={{ minHeight: "100vh" }}>
            <div className="">
                <div className="">
                    <p>First Name: {props.profile.firstName}</p>
                    <p>Last Name: {props.profile.lastName}</p>
                    <p>Email: {props.profile.email}</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileView;