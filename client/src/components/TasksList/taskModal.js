const TaskModal = ({ task, onClose, getStatusColor }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };
    if (!task) return null;

    return (
      <dialog open={true} onOpenChange={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              X
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{task.taskName}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.taskStatus)}`}>
                {task.taskStatus}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">{task.taskDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Assigned To</h3>
                  <p className="mt-1 text-gray-900">{task.assignee.firstName}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created By</h3>
                  <p className="mt-1 text-gray-900">{task.owner.firstName}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Project</h3>
                  <p className="mt-1 text-gray-900">{task.project.projectTitle}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created On</h3>
                  <p className="mt-1 text-gray-900">{formatDate(task.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    );
  };

  export default TaskModal;