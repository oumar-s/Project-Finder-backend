import Members from "./Members";
const ProjectPageView = (props) => {
    console.log(props.members)
    return (
        <div className="container col-6 my-5" style={{minHeight: "100vh"}}>
            <h1>{props.project.projectTitle}</h1>
            <p>{props.project.projectDescription}</p>
            <p>Owner: {props.project.owner.firstName} {props.project.owner.lastName}</p>
            <h5>Members</h5>
            <Members members={props.members}/>
            
            
            {/* Conditional rendering based on the buttonClicked state */}
            {props.buttonClicked ? (
                <button type="button" className="btn btn-success d-grid col-3 mx-auto my-4">
                    Request sent!
                </button>) : (
                <button type="button" className="btn btn-primary d-grid col-3 mx-auto my-4" onClick={props.joinHandler}>
                    Join
                </button>
            )}
        </div>
    )
}
export default ProjectPageView;

