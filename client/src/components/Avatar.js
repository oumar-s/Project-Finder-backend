import React from "react";

import { useAuth } from "../context/authContext";

function Avatar({type}) {
    const auth = useAuth();
    if(type === '1'){
        return (
            <div className="">
                <div className="image rounded-full overflow-hidden w-8 h-8">
                    <img className="object-cover w-full h-full" src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" alt="user profile" />
                </div>
            </div>
        )
    }
    if(type === '2'){
        return (
            <div className="flex gap-2">
                <div className="image rounded-full overflow-hidden w-8 h-8">
                    <img className="object-cover w-full h-full" src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" alt="user profile" />
                </div>
                <div className="">
                    <h1 className=" font-semibold">{auth.user.firstName } </h1>
                </div>
            </div>
        )
    }



}



export default Avatar