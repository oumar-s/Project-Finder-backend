import React from 'react';
//import { UserCircle, X } from 'lucide-react';

const TeamMembersListView = ({ members, onDeleteMember }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
      {members.map((member) => (
        <div 
          key={member.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            {member.profileImage ? (
              <img 
                src={member.profileImage} 
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div>profile image</div>
            )}
            <div>
              <h3 className="font-medium text-gray-900">{member.name}</h3>
              {member.email && (
                <p className="text-sm text-gray-500">{member.email}</p>
              )}
            </div>
          </div>
          
          <button
            onClick={() => onDeleteMember(member.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            aria-label={`Remove ${member.name}`}
          >
            <div>X</div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TeamMembersListView;