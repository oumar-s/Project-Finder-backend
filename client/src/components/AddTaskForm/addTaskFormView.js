const AddTaskFromView = (props) => {
    const { handleTaskNameChange, handleDescriptionChange, handleAssignedToChange, handleSubmit, formData } = props;
    return (
        <form className="container col-6 my-5" style={{ minHeight: "100vh" }} onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
                <label className="form-label">Task Name</label>
                <input value={formData.taskName} type="text" className="border rounded-md" name="projectTitle" onChange={(e) => handleTaskNameChange(e)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea value={formData.taskDescription} className="border rounded-md" name="projectDescription" rows="3" onChange={(e) => handleDescriptionChange(e)} />
            </div>

            <div className="mb-3">
                <label className="form-label">Assigned To</label>
                <input value={formData.assignedTo} className="border rounded-md" name="" rows="3" onChange={(e) => handleAssignedToChange(e)} />
            </div>

            <div className="d-grid col-3 mx-auto">
                <button type="submit" className="" >Add </button>
            </div>
        </form>
    );
}

export default AddTaskFromView;