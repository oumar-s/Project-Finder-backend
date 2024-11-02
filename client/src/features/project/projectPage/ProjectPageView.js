const ProjectPageView = (props) => {
    console.log('ProjectPageView', props.project)
    return (
        <div className="container col-6 my-5" style={{minHeight: "100vh"}}>
            <h1>{props.project.projectTitle}</h1>
            <p>{props.project.projectDescription}</p>
            <p>Owner: {props.project.owner.firstName} {props.project.owner.lastName}</p>    
        </div>
    )
}
export default ProjectPageView;

