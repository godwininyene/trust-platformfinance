import React from "react";

const SuspendedAccount = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Suspended</h1>
        
        <div className="mb-6">
          <p className="text-gray-600">This Account has been suspended.</p>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-500 text-sm">
            Contact your hosting provider for more information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuspendedAccount;