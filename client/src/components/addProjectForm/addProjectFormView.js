import { Plus, GitBranch, Users, ExternalLink, FileText, Image, Type, MessageCircle } from 'lucide-react';
const AddProjectFormView = (props) => {
    const { handleTitleChange, handleDescriptionChange, handleRepositoryChange, handleTeamChange, handleChange, handleSubmit, formData } = props;
    const teams = [
        { id: 1, name: 'Open Source Collective'},
        { id: 2, name: 'Innovation Accelerator'},
        { id: 3, name: 'Community Builders'},
        { id: 4, name: 'Tech for Good'},
        { id: 5, name: 'Emerging Technologies'},
      ];
    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <div className="flex items-center mb-6 text-purple-600">
            <h2 className="text-2xl font-semibold">Add New Project</h2>
          </div>
    
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Project Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                <Type className="inline-block mr-2 text-blue-500" size={18} />
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="projectTitle"
                required
                value={formData.projectTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
              />
            </div>
    
            {/* Project Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                <MessageCircle className="inline-block mr-2 text-purple-500" size={18} />
                Project Description
              </label>
              <textarea
                id="description"
                name="projectDescription"
                required
                value={formData.projectDescription}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your project's goals and impact"
              />
            </div>
    
            {/* Repository Link */}
            <div>
              <label htmlFor="repoLink" className="block text-sm font-medium text-gray-700 mb-2">
                <ExternalLink className="inline-block mr-2 text-teal-500" size={18} />
                Repository Link
              </label>
              <input
                type="url"
                id="repoLink"
                name="projectRepository"
                value={formData.projectRepository}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="https://github.com/username/project"
              />
            </div>
    
            {/* Team Selection*/}
            <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline-block mr-2 text-emerald-500" size={18} />
                Select Team
              </label>
              <select
                id="team"
                name="teamId"
                required
                value={formData.teamId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Choose a team</option>
                {teams.map((team, index) => (
                  <option key={index} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div> 
    
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center"
              >
                
                Create project
              </button>
            </div>
          </form>
        </div>
      );
}

export default AddProjectFormView;