import { Link } from "react-router-dom"

const allProjectsListView = (props) => {
    if (!props.allProjects.length) {
        return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>There are no projects.</div>
    }

    return (
        <div className="flex place-content-center" style={{ minHeight: "calc(100vh - 268px)" }}>
            <div className="flex flex-col gap-8 w-11/12 md:w-1/2">
                {props.allProjects.map((projectMember) => {
                    return (
                        <div key={projectMember.id} className='card  border rounded-md '>
                            {console.log(projectMember)}
                            <div className="card-header flex items-center border-b px-4 pb-4 bg-[#f6f8fa] text-lg md:text-xl h-16 text-blue-500">

                                <Link className="" to={"/projects/" + projectMember.project.id + "/all"}>
                                    <span className="hover:border-b-2 hover:border-blue-500"> {projectMember.project.projectTitle} </span>
                                </Link>
                            </div>
                            <div className="card-body flex flex-col gap-8 p-4 text-slate-500 text-sm">
                                {/* <h5 class="card-title">Special title treatment</h5> */}
                                <div className="card-text ">{projectMember.project.projectDescription}</div>

                                <div className="font-bold">
                                    Owner: {projectMember.project.owner.firstName} {projectMember.project.owner.lastName}
                                </div>
                            </div>

                            <div> 
                                {props.settingsPage && <button className="text-blue-500 hover:text-blue-800" onClick={() => {props.leaveProject(projectMember.id)}}>Leave</button>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default allProjectsListView;