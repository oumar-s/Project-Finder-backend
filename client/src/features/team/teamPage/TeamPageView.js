import React from 'react';
import { Link } from 'react-router-dom';
const TeamPageView = (props) => {
    return (
        <div className="container col-6 my-5" style={{minHeight: "100vh"}}>

            <div className="bg-[#f6f8fa]">
                {/* banner */}
                Banner
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
            <div className="flex flex-col gap-8 w-11/12 md:w-1/2" id="my-projects"> 
                <h4 className="text-lg md:text-lg">Your Projects:</h4>

                {console.log("myProjects", props.myProjects)}
                {props.myProjects.map((project) => {
                    return (
                        <div className="project" key={project.id}>
                            <Link to={`/project/${project.id}`}>
                                <div className="project-name">
                                    <span className="hover:border-b-2 hover:border-blue-500"> {project.projectTitle} </span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>

            <div className="flex flex-col gap-8 w-11/12 md:w-1/2" id="team-projects"> 
                <h4 className="text-lg md:text-lg">Team Projects:</h4>

                {props.teamProjects.map((project) => {
                    return (
                        <div className="project" key={project.id}>
                            <Link to={`/project/${project.id}`}>
                                <div className="project-name">
                                    <span className="hover:border-b-2 hover:border-blue-500"> {project.projectTitle} </span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
            
            
            
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

