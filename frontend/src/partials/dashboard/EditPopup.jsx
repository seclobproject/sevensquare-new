import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackage } from "../../Slice/packageSlice";
import { userDetails } from "../../Slice/usersSlice";

const EditPopup = ({ isOpen, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const { loading, data: packageData } = useSelector(
    (state) => state.packageReducer
  );

  const [referenceId, setReferenceId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: 0,
    email: "",
    address: "",
    password: "",
    packageChosen: "",
  });

  useEffect(() => {
    dispatch(fetchPackage());
  }, [dispatch]);

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
      {/* Background overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          {/* Popup */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md w-96">
            {/* Title */}
            <div className="mb-4 text-lg font-semibold">Edit Profile</div>
            {/* Reference ID input */}
            <div className="mb-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block dark:text-white text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border dark:border-slate-900 rounded py-2 px-3 dark:bg-slate-700"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block dark:text-white text-sm font-bold mb-2">
                    Phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border dark:border-slate-900 rounded py-2 px-3 dark:bg-slate-700"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block dark:text-white text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border dark:border-slate-900 rounded py-2 px-3 dark:bg-slate-700"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block dark:text-white text-sm font-bold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border dark:border-slate-900 rounded py-2 px-3 dark:bg-slate-700"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block dark:text-white text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border dark:border-slate-900 rounded py-2 px-3 dark:bg-slate-700"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="packageChosen"
                    className="block mb-2 text-sm dark:text-white font-bold"
                  >
                    Package
                  </label>
                  <select
                    name="packageChosen"
                    id="packageChosen"
                    defaultValue={formData.packageChosen}
                    onChange={handleInputChange}
                    className="w-full border dark:border-slate-900 rounded py-2 px-3 dark:bg-slate-700 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                    required
                  >
                    <option value="">Select a package</option>
                    {packageData &&
                      packageData.map((eachPackage) => (
                        <option value={eachPackage.id} key={eachPackage.id}>
                          {eachPackage.amount}
                        </option>
                      ))}
                  </select>
                </div>

                {/* <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div> */}
              </form>
            </div>

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
          </div>
        </div>
      )}
    </>
  );
};

export default EditPopup;
