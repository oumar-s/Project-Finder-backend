const AddTeamFormView = (props) => {
    const { handleTeamNameChange, handleTeamDescriptionChange, handleTeamIconChange, handleTeamBannerChange, handleAdd, formData } = props;
    return (
        <div className="flex flex-col items-center gap-8 m-8 " style={{ minHeight: "100vh" }}>
            <form className="bg-[#f6f8fa]" onSubmit={(e) => handleAdd(e)}>
                <div className="mb-3">
                    <label className="">Team Name: </label>
                    <input value={formData.title} type="text" className="border p-3 rounded-md h-8" name="projectTitle" onChange={(e) => handleTeamNameChange(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Team Description: </label>
                    <textarea value={formData.description} className="border p-3 rounded-md h-8" name="projectDescription" onChange={(e) => handleTeamDescriptionChange(e)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Team Icon: </label>
                    <input type="file"  className="" name="teamIcon"  onChange={(e) => handleTeamIconChange(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Team Banner: </label>
                    <input type="file"  className="" name="teamBanner"  onChange={(e) => handleTeamBannerChange(e)} />
                </div>

                <div className="d-grid col-3 mx-auto">
                    <button type="submit" className="btn btn-success" >Add </button>
                </div>
            </form>
        </div>
    );
}

export default AddTeamFormView;