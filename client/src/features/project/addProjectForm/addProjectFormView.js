const AddProjectFormView = (props) => {
    const { handleTitleChange, handleDescriptionChange, handleRepositoryChange, handleSubmit, formData } = props;
    return (
        <form className="container col-6 my-5" style={{ minHeight: "100vh" }} onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
                <label className="form-label">Project Title</label>
                <input value={formData.projectTitle} type="text" className="border rounded-md" name="projectTitle" onChange={(e) => handleTitleChange(e)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea value={formData.projectDescription} className="border rounded-md" name="projectDescription" rows="3" onChange={(e) => handleDescriptionChange(e)} />
            </div>

            <div className="mb-3">
                <label className="form-label">Repo Link</label>
                <input value={formData.projectRepository} className="border rounded-md" name="" rows="3" onChange={(e) => handleRepositoryChange(e)} />
            </div>

            <div className="d-grid col-3 mx-auto">
                <button type="submit" className="" >Add </button>
            </div>
        </form>
    );
}

export default AddProjectFormView;