const TeamPageView = (props) => {
    return (
        <div className="container col-6 my-5" style={{minHeight: "100vh"}}>
            <h1>{props.team.teamName}</h1>
            <p>{props.team.teamDescription}</p>
            
            
            
            {/* Conditional rendering based on the buttonClicked state */}
            {/* {props.buttonClicked ? (
                <button type="button" className="btn btn-success d-grid col-3 mx-auto my-4">
                    Request sent!
                </button>) : (
                <button type="button" className="btn btn-primary d-grid col-3 mx-auto my-4" onClick={props.joinHandler}>
                    Join
                </button>
            )} */}
        </div>
    )
}
export default TeamPageView;

