import { Link } from "react-router-dom"

const AllProjectsView = (props) => {
    if (!props.allProjects.length) {
        return <div>There are no projects.</div>
    }

    return (
        <div className="my-5" style={{ minHeight: "100vh" }}>
            <ul className="container">
                <div className="row gx-4 gy-3">
                    {props.allProjects.map((project) => {
                        return (
                            <div key={project.id} className='col-sm-4'>
                                <div className="card">
                                    <div className="card-header text-light-emphasis">{project.projectTitle}</div>
                                    <div className="card-body">
                                        {/* <h5 class="card-title">Special title treatment</h5> */}
                                        <p className="card-text">{project.projectDescription}</p>
                                        <p>Owner: {project.owner.firstName} {project.owner.lastName} </p>
                                        <Link className="btn btn-info mx-auto" to={"/projects/" + project.id}>
                                            Join
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ul>
        </div>
    );
}

export default AllProjectsView;