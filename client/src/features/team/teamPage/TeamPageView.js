import React from 'react';
import { Link } from 'react-router-dom';
const TeamPageView = (props) => {
    return (
        <div className="container col-6 my-5" style={{minHeight: "100vh"}}>

            <div className="">
                {/* banner */}
            </div>

            <div className="flex">
                <div className="team-image">
                    <img className="object-cover w-24 h-24 rounded-md" src="https://www.shutterstock.com/shutterstock/videos/1065380521/thumb/3.jpg?ip=x480" alt="team-icon" />
                </div>
                <div className="team-name-and-desc">
                    <div className="team-name text-lg md:text-xl text-blue-500">
                            <span className="hover:border-b-2 hover:border-blue-500"> {props.team.teamName} </span>
                    </div>
                </div>
            </div>
            <h1>{props.team.teamName}</h1>
            <p>{props.team.teamDescription}</p>
            
            
            
            {/* Conditional rendering based on the buttonClicked state */}
            {/* {props.buttonClicked ? (
                <button type="button" className="btn btn-success d-grid col-3 mx-auto my-4">
                    Request sent!
                </button>) : (
                <button type="button" className="btn btn-primary d-grid col-3 mx-auto my-4" onClick={props.joinHandler}>
                    Join
                </button>
            )} */}
        </div>
    )
}
export default TeamPageView;

