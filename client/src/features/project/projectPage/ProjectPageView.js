const ProjectPageView = (props) => {
    console.log('ProjectPageView', props.project)
    return (
        <div className="container col-6 my-5" >
            <h1>{props.project.projectTitle}</h1>
            <p>{props.project.projectDescription}</p>
            <p>Owner: {props.project.owner.firstName} {props.project.owner.lastName}</p>  
            <p>Repo Link: {props.project.projectRepository}</p>  
        </div>
    )
}
export default ProjectPageView;

