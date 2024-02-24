const AddTeamFormView = (props) => {
    const { handleTeamNameChange, handleTeamDescriptionChange, handleAdd, formData } = props;
    return (
        <form className="container col-6 my-5" style={{ minHeight: "100vh" }} onSubmit={(e) => handleAdd(e)}>
            <div className="mb-3">
                <label className="form-label">Team Name</label>
                <input value={formData.title} type="text" className="form-control" name="projectTitle" onChange={(e) => handleTeamNameChange(e)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Team Description</label>
                <textarea value={formData.description} className="form-control" name="projectDescription" rows="3" onChange={(e) => handleTeamDescriptionChange(e)} />
            </div>

            <div className="d-grid col-3 mx-auto">
                <button type="submit" className="btn btn-success" >Add </button>
            </div>
        </form>
    );
}

export default AddTeamFormView;