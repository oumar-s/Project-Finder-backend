import React, { useState } from 'react';
import {
  User,
  Building2,
  Users,
  LogOut,
  Mail,
  UserCircle,
  Lock,
  Github,
  KeyRound,
  AtSign
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Lock },
    { id: 'projects', label: 'Manage Projects', icon: Building2 },
    { id: 'teams', label: 'Manage Teams', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Settings</h1>
        
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">Profile Settings</h2>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircle className="w-12 h-12 text-gray-400" />
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100">
                    Change Avatar
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      rows="4"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub Profile
                    </label>
                    <div className="flex items-center">
                      <Github className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="github.com/username"
                      />
                    </div>
                  </div>
                </div>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">Account Settings</h2>
                
                <div className="space-y-6">
                  {/* Username Section */}
                  <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                    <h3 className="text-md font-medium text-gray-900 flex items-center">
                      <User className="h-5 w-5 mr-2 text-gray-500" />
                      Username
                    </h3>
                    <div className="space-y-2">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="@username"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Update Username
                      </button>
                    </div>
                  </div>

                  {/* Email Section */}
                  <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                    <h3 className="text-md font-medium text-gray-900 flex items-center">
                      <AtSign className="h-5 w-5 mr-2 text-gray-500" />
                      Change Email
                    </h3>
                    <div className="space-y-2">
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Current email"
                      />
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="New email"
                      />
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm new email"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Update Email
                      </button>
                    </div>
                  </div>

                  {/* Password Section */}
                  <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                    <h3 className="text-md font-medium text-gray-900 flex items-center">
                      <KeyRound className="h-5 w-5 mr-2 text-gray-500" />
                      Change Password
                    </h3>
                    <div className="space-y-2">
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Current password"
                      />
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="New password"
                      />
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm new password"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">Manage Projects</h2>
                
                <div className="space-y-4">
                  {['Project Alpha', 'Project Beta', 'Project Gamma'].map((project) => (
                    <div key={project} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <Building2 className="h-5 w-5 text-purple-500 mr-3" />
                        <span className="font-medium text-gray-900">{project}</span>
                      </div>
                      <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700 flex items-center">
                        <LogOut className="h-4 w-4 mr-1" />
                        Leave
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'teams' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">Manage Teams</h2>
                
                <div className="space-y-4">
                  {['Frontend Team', 'Backend Team', 'Design Team'].map((team) => (
                    <div key={team} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-blue-500 mr-3" />
                        <span className="font-medium text-gray-900">{team}</span>
                      </div>
                      <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700 flex items-center">
                        <LogOut className="h-4 w-4 mr-1" />
                        Leave
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;