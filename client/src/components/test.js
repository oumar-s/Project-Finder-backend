import React, { useState } from 'react';
import { Plus, GitBranch, Users, ExternalLink } from 'lucide-react';

// Sample teams (could be passed as a prop or fetched from an API)
const TEAMS = [
  { id: 'web-dev', name: 'Web Development' },
  { id: 'ai-ml', name: 'AI & Machine Learning' },
  { id: 'mobile-app', name: 'Mobile Applications' },
  { id: 'cloud-infra', name: 'Cloud Infrastructure' },
  { id: 'data-science', name: 'Data Science' }
];

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    repoLink: '',
    team: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement project submission logic
    console.log('Project submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-700 flex items-center">
          <Plus className="mr-2 text-blue-500" />
          Add New Project
        </h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <GitBranch className="mr-2 text-blue-500" size={18} />
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your project's goals and features"
          />
        </div>

        <div>
          <label htmlFor="repoLink" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <ExternalLink className="mr-2 text-purple-500" size={18} />
            Repository Link
          </label>
          <input
            type="url"
            id="repoLink"
            name="repoLink"
            value={formData.repoLink}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="https://github.com/username/project"
          />
        </div>

        <div>
          <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Users className="mr-2 text-teal-500" size={18} />
            Team
          </label>
          <select
            id="team"
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select a Team</option>
            {TEAMS.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Plus className="mr-2" /> Create Project
        </button>
      </form>
    </div>
  );
};

export default AddProjectForm;