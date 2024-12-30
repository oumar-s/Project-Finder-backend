import { Link } from "react-router-dom"
import { Check, X, Clock } from 'lucide-react';

const RequestsListView = ({ requests, requestType, handleAction, teamOwnerID, acceptRequest, declineRequest }
) => {
    const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
        <div className={`text-center p-6 ${className}`}>
          <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      );
    if(!requests.length ){
        return <EmptyState 
          icon={Clock}
          title="No requests found"
          description="New requests will appear here."
        />
        
      }

    return (
        <div className="flex flex-col gap-4">
                {requests.map(request => (
                    <div
                        key={request.id}
                        className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4
                  ${request.status !== 'Pending' ? 'opacity-75' : ''}`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-900">{request.user.firstName}</span>
                                {requestType === 'team'? 
                                <span className="text-sm text-gray-500">
                                Requesting to join <span className="text-blue-600">{request.team.teamName}</span>
                            </span>:
                            <span className="text-sm text-gray-500">
                                Requesting to join <span className="text-blue-600">{request.project.projectTitle}</span>
                            </span>
                                }
                                
                            </div>

                            {request.status === 'Pending' ? (
                                <div className="flex gap-2">
                                    {/* <button
                        onClick={() => handleAction(request.id, 'waitlisted')}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                        title="Move to waitlist"
                      >
                        <Clock size={20} />
                      </button> */}
                                    <button
                                        onClick={() => handleAction(request, 'Accepted')}
                                        className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors"
                                        title="Accept request"
                                    >
                                        <Check size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleAction(request, 'Declined')}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                        title="Decline request"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ) : (
                                <span className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${request.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : ''}
                      ${request.status === 'Declined' ? 'bg-red-100 text-red-800' : ''}
                      ${request.status === 'waitlisted' ? 'bg-amber-100 text-amber-800' : ''}
                    `}>
                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </span>
                            )}
                        </div>
                    </div>
                ))}

            
        </div>
    );
}

export default RequestsListView;