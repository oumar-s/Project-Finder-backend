import React from 'react';

const ErrorMessage = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-xl">
          An error occurred. Please try again later.
        </div>
      </div>
    );
  }

  return null;
};

export default ErrorMessage;
