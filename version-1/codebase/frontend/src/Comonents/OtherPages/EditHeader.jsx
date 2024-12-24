import React, { useState } from 'react';
import logo from "../../assets/logo.png";

const EditHeader = () => {
  const [showModal, setShowModal] = useState(false);

  const handleHeaderClick = () => {
    setShowModal(true); // Show modal on header click
  };

  const handleConfirmRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  const handleCancel = () => {
    setShowModal(false); // Close modal without refreshing
  };

  return (
    <>
      <header
        onClick={handleHeaderClick}
        className="bg-white shadow-md sticky top-0 z-50 h-20 flex justify-center items-center cursor-pointer"
      >
        <img src={logo} alt="Logo" className="h-12" />
      </header>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-lg font-semibold">If you refresh, your data may be lost. Do you want to continue?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={handleConfirmRefresh}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Refresh
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditHeader;
