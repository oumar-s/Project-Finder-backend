
const RequestsView = (props) => {
    if (props.type === "default") {
        return (
            <div className="container col-6 my-5 text-center" style={{ minHeight: "100vh" }}>
                <p>Select the type of request you want to view</p>
                <div className="m-2" style={{ display: 'inline-block' }}>
                    <button onClick={props.myRequestsHandler} className="btn btn-info">My Requests</button>
                </div>
                <div className="m-2" style={{ display: 'inline-block' }}>
                    <button onClick={props.otherRequestsHandler} className="btn btn-info">Other Requests</button>
                </div>
            </div>
        );
    }
    if (props.type === "myRequests") {
        if (props.requests.length === 0) {
            return (
                <div className="container col-6 my-5 text-center" style={{ minHeight: "100vh" }}>
                    <p>No requests</p>
                    <div className="m-2" style={{ display: 'inline-block' }}>
                        <button onClick={props.myRequestsHandler} className="btn btn-info">My Requests</button>
                    </div>
                    <div className="m-2" style={{ display: 'inline-block' }}>
                        <button onClick={props.otherRequestsHandler} className="btn btn-info">Other Requests</button>
                    </div>
                </div>
            );
        }
        return (
            <div className="my-5" style={{ minHeight: "100vh" }}>
                <ul className="container" >
                    <div className="row gx-4 gy-3">
                        {props.requests.map((request) => {
                            return (
                                <div key={request.id} className='col-sm-4'>
                                    <div className="card">
                                        <div className="card-header text-light-emphasis">
                                            {request.project.projectTitle}
                                        </div>
                                        <div className="card-body">
                                            <p>{request.project.projectDescription}</p>
                                            <p>Owner: {request.owner.firstName}</p>
                                            <h6>Status: {request.status}</h6>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </ul>
                <div className="container col-6 text-center">
                    <div className="m-2" style={{ display: 'inline-block' }}>
                        <button onClick={props.myRequestsHandler} className="btn btn-info">My Requests</button>
                    </div>
                    <div className="m-2" style={{ display: 'inline-block' }}>
                        <button onClick={props.otherRequestsHandler} className="btn btn-info">Other Requests</button>
                    </div>
                </div>
            </div>
        );
    }
    if (props.type === "otherRequests") {
        if (props.requests.length === 0) {
            return (
                <div className="container col-6 my-5 text-center" style={{ minHeight: "100vh" }}>
                    <p>No Requests</p>
                    <div className="m-2" style={{ display: 'inline-block' }}>
                        <button onClick={props.myRequestsHandler} className="btn btn-info">My Requests</button>
                    </div>
                    <div className="m-2" style={{ display: 'inline-block' }}>
                        <button onClick={props.otherRequestsHandler} className="btn btn-info">Other Requests</button>
                    </div>
                </div>
            );
        }
        return (
            <div className="my-5" style={{ minHeight: "100vh" }}>
                <ul className="container" >
                    <div className="row gx-4 gy-3">
                        {props.requests.map((request) => {
                            return (
                                <div key={request.id} className='col-sm-4'>
                                    <div className="card">
                                        <div className="card-header text-light-emphasis">
                                            {request.project.projectTitle}
                                        </div>

                                        <div className="card-body">
                                            <p>{request.project.projectDescription}</p>
                                            <p>Requester: {request.requester.firstName}</p>
                                            <h6>Status: {request.status}</h6>
                                            <div class="btn-toolbar" role="group" aria-label="Basic radio toggle button group">
                                                <div className="m-2">
                                                    <input onChange={props.approveHandler(request.id)} className="btn-check" type="radio" name={"options-base" + request.id} id={"a" + request.id} autocomplete="off" />
                                                    <label class="btn btn-outline-success" for={"a" + request.id}>Approve</label>
                                                </div>
                                                <div className="m-2">
                                                    <input onChange={props.denyHandler(request.id)} className="btn-check" type="radio" name={"options-base" + request.id} id={"b" + request.id + 1} autocomplete="off" />
                                                    <label class="btn btn-outline-danger" for={"b" + request.id + 1}>Disapprove</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </ul>
                <div className="container col-6 text-center">
                    <div className="m-2" style={{ display: 'inline-block' }}>
                        <button onClick={props.myRequestsHandler} className="btn btn-info">My Requests</button>
                    </div>
                    <div className="m-2" style={{ display: 'inline-block' }}>
                        <button onClick={props.otherRequestsHandler} className="btn btn-info">Other Requests</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default RequestsView;