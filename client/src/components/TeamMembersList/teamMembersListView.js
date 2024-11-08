import React from 'react';
//import { UserCircle, X } from 'lucide-react';
import { useAuth } from '../../context/authContext';

const TeamMembersListView = ({ members, onDeleteMember, type, isOwner }) => {
  const auth = useAuth();
  console.log("members", members);
  if (type === "team") {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-2">
        <h2 className="text-xl font-medium text-gray-900">Members</h2>
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              {member.user.profilePic ? (
                <img
                  src='https://via.placeholder.com/150'
                  alt={member.user.firstName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div>profile image</div>
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
                onClick={() => onDeleteMember(member.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                aria-label={`Remove ${member.user.firstName}`}
              >
                <div>X</div>
              </button>
            }
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-2">
        <h2 className="text-xl font-medium text-gray-900">Members</h2>
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              {member.user.profilePic ? (
                <img
                  src='https://via.placeholder.com/150'
                  alt={member.user.firstName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div>profile image</div>
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
                onClick={() => onDeleteMember(member.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                aria-label={`Remove ${member.user.firstName}`}
              >
                <div>X</div>
              </button>
            }
          </div>
        ))}
      </div>
    );
  }
};

export default TeamMembersListView;