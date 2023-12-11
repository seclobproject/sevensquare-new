import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

// Redux imports start
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, fetchUsersList } from "../../Slice/usersSlice";
import EditPopup from "./EditPopup";
// Redux imports end

function SalaryList() {
  const [search, setSearch] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [user_Id, setUser_Id] = useState("");

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.getUserReducer);

  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);

  const openPopup = (userId) => {
    setUser_Id(userId);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const submitPopup = (formData) => {
    dispatch(editUserProfile({ user_Id, formData }));
  };

  return (
    <>
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Salary
          </h2>
        </header>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <input
              type="text"
              name="phone"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search By Name"
              className="border dark:border-slate-900 rounded py-2 px-3 dark:bg-slate-700 mb-2"
              required
            />
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-center">Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Phone</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Salary</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {data &&
                  data
                    .filter((item) => {
                      const nameMatch =
                        search.toLowerCase() === "" ||
                        item.name.toLowerCase().includes(search);

                      return nameMatch;
                    })
                    .map((user) => {
                      const formattedDate = new Intl.DateTimeFormat("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "IST",
                      }).format(new Date(user.createdAt));

                      return (
                        <tr key={user._id}>
                          <td className="p-2">
                            <div className="text-center">{user.name}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center text-emerald-500">
                              {user.phone}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.unrealisedSalary}</div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <EditPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onSubmit={submitPopup}
        userId={user_Id}
      />
    </>
  );
}

export default SalaryList;
