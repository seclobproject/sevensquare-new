import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackage } from "../../Slice/packageSlice";
import { userDetails } from "../../Slice/usersSlice";

const AddBonusPopup = ({ isOpen, onClose, onSubmit }) => {

  const [formData, setFormData] = useState({
    note: "Bonus Amount",
    amount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md w-96">
            
            <div className="mb-4 text-lg font-semibold">Gift Bonus</div>
            
            <div className="mb-4">
              <form onSubmit={handleSubmit}>

                <div className="mb-4">
                  <label className="block dark:text-white text-sm font-bold mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full border dark:border-slate-900 rounded py-2 px-3 dark:bg-slate-700"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block dark:text-white text-sm font-bold mb-2">
                    Note
                  </label>
                  <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    className="w-full border dark:border-slate-900 rounded py-2 px-3 dark:bg-slate-700"
                    required
                  />
                </div>

              </form>
            </div>

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
          </div>
        </div>
      )}
    </>
  );
};

export default AddBonusPopup;
