const AccountView = (props) => {
    return(
        <div className="container my-5" style={{ minHeight: "100vh" }}>
            <div className="flex">
                <div className="profile-image">
                    <img className="object-cover w-full h-full" src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" alt="user profile" />
                </div>
                <div className="">
                    <p>First Name: {props.profile.firstName}</p>
                    <p>Last Name: {props.profile.lastName}</p>
                    <p>Email: {props.profile.email}</p>
                </div>
            </div>
        </div>
    );
}

export default AccountView;