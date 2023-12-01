import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPackage } from "../Slice/packageSlice";

const PackageForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
    amountExGST: 0,
    usersCount: 0,
    addOnUsers: 0,
    schemeType: "staff", // Default to "staff"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      name: name,
      amount: amount,
      amountExGST: amountExGST,
      usersCount: usersCount,
      addOnUsers: addOnUsers,
      schemeType: schemeType,
    });

    dispatch(addNewPackage(formData));
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <form className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {/* ----------------------- */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {/* ----------------------------- */}

        <div className="mb-4">
          <label
            htmlFor=" Amount Ex GST"
            className="block text-sm font-medium text-gray-700"
          >
            Amount ExGST:
          </label>
          <input
            type="number"
            id="amountExGST"
            name="amountExGST"
            value={formData.amountExGST}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {/* ----------------------------- */}
        <div className="mb-4">
          <label
            htmlFor=" userscount"
            className="block text-sm font-medium text-gray-700"
          >
            Users Count:
          </label>
          <input
            type="number"
            id="usersCount"
            name="usersCount"
            value={formData.usersCount}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {/* ----------------------------- */}
        <div className="mb-4">
          <label
            htmlFor=" userscount"
            className="block text-sm font-medium text-gray-700"
          >
            Add On Users:
          </label>
          <input
            type="number"
            id="addOnUsers"
            name="addOnUsers"
            value={formData.addOnUsers}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* ...  ... */}

        <div className="mb-4">
          <label
            htmlFor="schemeType"
            className="block text-sm font-medium text-gray-700"
          >
            Scheme Type:
          </label>
          <select
            id="schemeType"
            name="schemeType"
            value={formData.schemeType}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="staff">Staff</option>
            <option value="franchise">Franchise</option>
          </select>
        </div>

        <div className="mt-4">
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default PackageForm;
