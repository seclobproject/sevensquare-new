import React, { useState } from "react";

const Popup = ({ isOpen, onClose, onSubmit }) => {

  const [referenceId, setReferenceId] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setReferenceId(event.target.value);
  };

  const handleSubmit = () => {
    if (referenceId != "") {
      onSubmit(referenceId);
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <>
      {/* Background overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          {/* Popup */}
          <div className="bg-slate-300 p-8 rounded-lg shadow-md w-96">
            {/* Title */}
            <div className="mb-4 text-lg font-semibold">Verification</div>
            {/* Reference ID input */}
            <div className="mb-4">
              <label
                htmlFor="referenceId"
                className="block text-sm font-medium text-gray-700"
              >
                Reference ID
              </label>
              <input
                type="text"
                id="referenceId"
                name="referenceId"
                value={referenceId}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>

            {error && (
              <div
                className="my-2 bg-red-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  Please provide transaction reference Number!
                </span>
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="mx-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Close
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
