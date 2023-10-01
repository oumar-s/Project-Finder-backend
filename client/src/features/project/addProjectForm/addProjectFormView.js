const AddProjectFormView = (props) => {
    const { handleTitleChange, handleDescriptionChange, handleSubmit, formData } = props;
    return (
        <form className="container col-6 my-5" style={{ minHeight: "100vh" }} onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
                <label className="form-label">Project Title</label>
                <input value={formData.title} type="text" className="form-control" name="projectTitle" onChange={(e) => handleTitleChange(e)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea value={formData.description} className="form-control" name="projectDescription" rows="3" onChange={(e) => handleDescriptionChange(e)} />
            </div>

            <div className="d-grid col-3 mx-auto">
                <button type="submit" className="btn btn-success" >Post </button>
            </div>
        </form>
    );
}

export default AddProjectFormView;