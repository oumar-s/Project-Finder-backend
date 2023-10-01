const AccountView = (props) => {
    if(props.type === "default"){
        if(props.requests.length === 0){
            return (
                <div className="container col-6 my-5 text-center" style={{minHeight: "100vh"}}>
                    <p>Select one of the options</p>
                    <div className="m-2" style={{display: 'inline-block'}}>
                        <button onClick={props.mineHandler} className="btn btn-info">Requests To Join My Project</button>
                    </div>
                    <div className="m-2" style={{display: 'inline-block'}}>
                        <button onClick={props.otherHandler} className="btn btn-info">My requests to Join other people's projects</button>
                    </div>
                </div>
                
            );
        }
    }
    
    if(props.type === "mine"){
        if(props.requests.length === 0){
            return (
                <div className="container col-6 my-5 text-center" style={{minHeight: "100vh"}}>
                    <p>No data</p>
                    <div className="m-2" style={{display: 'inline-block'}}>
                        <button onClick={props.mineHandler} className="btn btn-info">Requests To Join My Project</button>
                    </div>
                    <div className="m-2" style={{display: 'inline-block'}}>
                        <button onClick={props.otherHandler} className="btn btn-info">My requests to Join other people's projects</button>
                    </div>
                </div>
            );
        }
        return (
            <div className="my-5" style={{minHeight: "100vh"}}>
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
                                            <p>Owner: You</p>
                                            <p>Requester: {request.requester.firstName}</p>
                                            <h6>Status: {request.status}</h6>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ul>
                <div className="container col-6 text-center">
                    <div className="m-2" style={{display: 'inline-block'}}>
                        <button onClick={props.mineHandler} className="btn btn-info">Requests To Join My Project</button>
                    </div>
                    <div className="m-2" style={{display: 'inline-block'}}>
                        <button onClick={props.otherHandler} className="btn btn-info">My requests to Join other people's projects</button>
                    </div>
                </div>
            </div>
        );
    }

    if(props.type === "other"){
        if(props.requests.length === 0){
            return (
                <div className="container col-6 my-5 text-center" style={{minHeight: "100vh"}}>
                    <p>No data</p>
                    <div className="m-2" style={{display: 'inline-block'}}>
                        <button onClick={props.mineHandler} className="btn btn-info">Requests To Join My Project</button>
                    </div>
                    <div className="m-2" style={{display: 'inline-block'}}>
                        <button onClick={props.otherHandler} className="btn btn-info">My requests to Join other people's projects</button>
                    </div>
                </div>
            );
        }
        return (
            <div className="my-5" style={{minHeight: "100vh"}}>
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
                    <div className="m-2" style={{display: 'inline-block'}}>
                        <button onClick={props.mineHandler} className="btn btn-info">Requests To Join My Project</button>
                    </div>
                    <div className="m-2" style={{display: 'inline-block'}}>
                        <button onClick={props.otherHandler} className="btn btn-info">My requests to Join other people's projects</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default AccountView;