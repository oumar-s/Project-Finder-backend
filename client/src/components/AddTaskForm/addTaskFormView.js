import { Type, MessageCircle, Users, Check, X } from 'lucide-react';

const Toast = ({ children, onClose }) => (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
      <div className="flex items-center gap-2 w-max px-4 py-3 bg-white border border-emerald-200 rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-full">
          <Check className="h-4 w-4 text-emerald-600" />
        </div>
        <span className="text-sm font-medium text-gray-700">{children}</span>
        <button 
          onClick={onClose} 
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
);

const AddTaskFromView = (props) => {
    const { members, handleChange, handleSubmit, formData, showToast, setShowToast } = props;
    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
            {showToast && (
                <Toast onClose={() => setShowToast(false)}>
                    Task created successfully!
                </Toast>
            )}
          <div className="flex items-center mb-6 text-gray-700">
            <h2 className="text-2xl font-semibold">Add New Task</h2>
          </div>
    
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Task name */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                <Type className="inline-block mr-2 text-blue-500" size={18} />
                Task Name
              </label>
              <input
                type="text"
                id="title"
                name="taskName"
                required
                value={formData.taskName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
              />
            </div>
    
            {/* Task description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                <MessageCircle className="inline-block mr-2 text-purple-500" size={18} />
                Task Description
              </label>
              <textarea
                id="description"
                name="taskDescription"
                required
                value={formData.taskDescription}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your project's goals and impact"
              />
            </div>
    
            
    
            { /*Team Selection */}
            <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline-block mr-2 text-emerald-500" size={18} />
                Select Member
              </label>
              <select
                id="member"
                name="assignedTo"
                required
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Choose a member</option>
                {members.map((member, index) => (
                  <option key={index} value={member.user.id}>
                    {member.user.firstName} {member.user.lastName}
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

export default AddTaskFromView;