import { Link } from "react-router-dom"

const AllTeamsView = (props) => {
    if (!props.allTeams.length) {
        return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>There are no projects.</div>
    }

    return (
        <div className="flex place-content-center" style={{ minHeight: "calc(100vh - 268px)" }}>
            <div className="flex flex-col gap-8 w-11/12 md:w-1/2">
                {props.allTeams.map((team) => {
                    return (
                        <div key={team.id} className='card flex  p-4 place-content-between  border rounded-md '>

                            <div className="team-info flex gap-4">
                                <div className="team-image ">
                                    <Link className="" to={"/teams/" + team.id}>
                                        <img className="object-cover w-24 h-24 rounded-md" src="https://i0.wp.com/seds.org/wp-content/uploads/2020/03/placeholder.png?w=1200&ssl=1" alt="team" />
                                    </Link>
                                </div>
                                <div className="team-name-and-desc">
                                    <div className="team-name text-lg md:text-xl text-blue-500">
                                        <Link className="" to={"/projects/" + team.id}>
                                            <span className="hover:border-b-2 hover:border-blue-500"> {team.teamName} </span>
                                        </Link>
                                    </div>
                                
                                    {/* <h5 class="card-title">Special title treatment</h5> */}
                                    <div className="team-desc text-slate-500">{team.teamDescription}</div>
                                </div>

                            </div>
                            <div>
                                <Link className="text-sm text-white bg-emerald-600 rounded-md px-4 py-2" to={"/teams/" + team.id}>
                                    Join
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AllTeamsView;