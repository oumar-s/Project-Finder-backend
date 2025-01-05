import { Users, Type, Upload, Image, MessageCircle, Check, X } from "lucide-react";

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

const AddTeamFormView = ({ handleChange, handleAdd, handleTeamIconUpload, handleTeamBannerUpload,
  setTeamImage, teamImage, teamBanner, setTeamBanner, formData, showToast, setShowToast }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>
          Team created successfully!
        </Toast>
      )}
      <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">

        Create New Team
      </h2>

      <form onSubmit={handleAdd} className="space-y-6">
        {/* Team Name Input */}
        <div>
          <label htmlFor="teamName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Type className="mr-2 text-blue-500 w-5 h-5" />
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter team name"
          />
        </div>

        {/* Team Description Input */}
        <div>
          <label htmlFor="teamDescription" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MessageCircle className="mr-2 text-purple-500 w-5 h-5" />
            Team Description
          </label>
          <textarea
            id="teamDescription"
            name="teamDescription"
            value={formData.teamDescription}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your team's mission and goals"
          />
        </div>

        {/* Team Image Upload */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Users className="mr-2 text-teal-500 w-5 h-5" />
            Team Image
          </label>
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer">
              <input
                type="file"
                name="teamImage"
                accept="image/*"
                onChange={handleTeamIconUpload(setTeamImage)}
                className="hidden"
              />
              <div className="w-24 h-24 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center hover:bg-blue-50 transition">
                {teamImage ? (
                  <img
                    src={teamImage}
                    alt="Team"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="text-blue-500" />
                )}
              </div>
            </label>
            <p className="text-sm text-gray-500">
              Upload a square image (recommended: 200x200px)
            </p>
          </div>
        </div>

        {/* Team Banner Upload */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Image className="mr-2 text-emerald-500 w-5 h-5" />
            Team Banner
          </label>
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer w-full">
              <input
                type="file"
                name="teamBanner"
                accept="image/*"
                onChange={handleTeamBannerUpload(setTeamBanner)}
                className="hidden"
              />
              <div className="h-32 w-full border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center hover:bg-purple-50 transition">
                {teamBanner ? (
                  <img
                    src={teamBanner}
                    alt="Team Banner"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="text-purple-500" />
                )}
              </div>
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Upload a wide banner image (recommended: 1200x300px)
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Team
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTeamFormView;