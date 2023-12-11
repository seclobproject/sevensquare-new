import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackage } from "../../Slice/packageSlice";
import { userDetails } from "../../Slice/usersSlice";

const BankDetailsPopup = ({ bankDetails, isOpen, onClose }) => {
  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md w-96">
            <div className="mb-4 text-lg font-semibold">Bank Details</div>

            <div className="mb-4">
              <p><strong>Bank Name:</strong> {bankDetails && bankDetails.bank}</p>
              <p><strong>Holder Name:</strong> {bankDetails && bankDetails.holderName}</p>
              <p><strong>Account Number:</strong> {bankDetails && bankDetails.accountNum}</p>
              <p><strong>IFSC Code:</strong> {bankDetails && bankDetails.ifscCode}</p>
            </div>

            <button onClick={onClose} className="mx-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BankDetailsPopup;
