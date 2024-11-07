import { Link } from "react-router-dom"

const RequestsListView = (props) => {
    if (!props.requests.length) {
        return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>There are no requests.</div>
    }

    return (
        <div className="flex place-content-center" style={{ minHeight: "calc(100vh - 268px)" }}>
            <div className="flex flex-col gap-8 w-11/12 md:w-1/2">
                {props.requests.map((request) => {

                    if(props.requestType === "team"){
                        return (
                            <div key={request.id} className='card  border rounded-md '>
                                {console.log(request)}
                                <div className="">
                                    <p>  
                                    <Link className="" to={"/profile/" + request.user.id}>
                                        <span className="hover:border-b-2 hover:border-blue-500"> {request.user.firstName} </span>
                                    </Link>
                                    wants to join your team: <Link className="" to={"/teams/" + request.team.id + "/overview"}>
                                        <span className="hover:border-b-2 hover:border-blue-500"> {request.team.teamName} </span>
                                    </Link>
                                    </p>
                                </div>

                                <div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => props.acceptRequest(request)}>Accept</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => props.declineRequest(request)}>Decline</button>
                                </div>

                            </div> 
                        );
                    }

                    if(props.requestType === "project"){
                        return (
                            <div key={request.id} className='card  border rounded-md '>
                                {console.log(request)}
                                <div className="">
                                    <p>  
                                    <Link className="" to={"/profile/" + request.user.id}>
                                        <span className="hover:border-b-2 hover:border-blue-500"> {request.user.firstName} </span>
                                    </Link>
                                    wants to join your project: <Link className="" to={"/projects/" + request.project.id + "/all"}>
                                        <span className="hover:border-b-2 hover:border-blue-500"> {request.project.projectTitle} </span>
                                    </Link>
                                    </p>
                                </div>

                                <div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => props.acceptRequest(request)}>Accept</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => props.declineRequest(request)}>Decline</button>
                                </div>

                            </div> 
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default RequestsListView;