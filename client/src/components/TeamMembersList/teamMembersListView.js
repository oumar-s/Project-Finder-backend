import React from 'react';
import Avatar from "../../assets/images/profile_image.png";
import { useAuth } from '../../context/authContext';
import { Users } from 'lucide-react';

const ConfirmationModal = ({ isOpen, member, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-medium mb-4">Confirm Removal</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove {member?.user?.firstName} from the team?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const TeamMembersListView = ({ 
  members, 
  onDeleteClick, 
  type, 
  isOwner, 
  showConfirmModal, 
  selectedMember, 
  onConfirmDelete, 
  onCancelDelete 
}) => {
  const auth = useAuth();
  console.log("members", members);
  const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
    <div className={`text-center p-6 ${className}`}>
      <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
  if(!members.length ){
    return(
      <EmptyState
        icon={Users}
        title="No members found"
        description="Add members to get started."
      />
    )
  }
  if (type === "team") {
    return (
      <>
        <div className="w-full max-w-2xl mx-auto space-y-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                {member.user.profilePic ? (
                  <div className='border border-blue-200 rounded-full'><img
                    src={member.user.profilePic}
                    alt={member.user.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  /></div>
                ) : (
                  <div className='border border-blue-200 rounded-full'>
                    <img
                    src={Avatar}
                    alt={member.user.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-900">{member.user.firstName}</h3>
                  {member.user.email && (
                    <p className="text-sm text-gray-500">{member.user.email}</p>
                  )}
                </div>
              </div>

              {isOwner &&
                <button
                  onClick={() => onDeleteClick(member)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  aria-label={`Remove ${member.user.firstName}`}
                >
                  <div>X</div>
                </button>
              }
            </div>
          ))}
        </div>
        
        <ConfirmationModal
          isOpen={showConfirmModal}
          member={selectedMember}
          onConfirm={onConfirmDelete}
          onCancel={onCancelDelete}
        />
      </>
    );
  } else {
    return (
      <>
        <div className="w-full max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl font-medium text-gray-900">Members</h2>
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
              {member.user.profilePic ? (
                  <div className='border border-blue-200 rounded-full'><img
                    src={member.user.profilePic}
                    alt={member.user.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  /></div>
                ) : (
                  <div className='border border-blue-200 rounded-full'>
                    <img
                    src={Avatar}
                    alt={member.user.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-900">{member.user.firstName}</h3>
                  {member.user.email && (
                    <p className="text-sm text-gray-500">{member.user.email}</p>
                  )}
                </div>
              </div>

              {isOwner &&
                <button
                  onClick={() => onDeleteClick(member)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  aria-label={`Remove ${member.user.firstName}`}
                >
                  <div>X</div>
                </button>
              }
            </div>
          ))}
        </div>
        
        <ConfirmationModal
          isOpen={showConfirmModal}
          member={selectedMember}
          onConfirm={onConfirmDelete}
          onCancel={onCancelDelete}
        />
      </>
    );
  }
};

export default TeamMembersListView;