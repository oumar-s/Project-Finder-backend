import { Link } from "react-router-dom"

const AllProjectsView = (props) => {
    if (!props.allProjects.length) {
        return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>There are no projects.</div>
    }

    return (
        <div className="flex place-content-center" style={{ minHeight: "calc(100vh - 268px)" }}>
            <div className="flex flex-col gap-8 w-11/12 md:w-1/2">
                {props.allProjects.map((project) => {
                    return (
                        <div key={project.id} className='card  border rounded-md '>
                            <div className="card-header flex items-center border-b px-4 pb-4 bg-[#f6f8fa] text-lg md:text-xl h-16 text-blue-500">
                                <Link className="" to={"/projects/" + project.id}>
                                    <span className="hover:border-b-2 hover:border-blue-500"> {project.projectTitle} </span>
                                </Link>
                            </div>
                            <div className="card-body flex flex-col gap-8 p-4 text-slate-500 text-sm">
                                {/* <h5 class="card-title">Special title treatment</h5> */}
                                <div className="card-text ">{project.projectDescription}</div>
                                
                                <div className="font-bold">
                                    Owner: {project.owner.firstName} {project.owner.lastName} 
                                </div>

                                <div>
                                    <Link className="text-white bg-emerald-600 rounded-md px-4 py-2" to={"/projects/" + project.id}>
                                        Join
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AllProjectsView;