import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

// Redux imports start
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, fetchUsersList, verifyUsers } from "../../Slice/usersSlice";
import EditPopup from "./EditPopup";
// Redux imports end

function UsersList() {
  const [filterStatus, setFilterStatus] = useState("");
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
            Users
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
            <div className="flex items-center">
              Filter Status:&nbsp;&nbsp;
              <select
                value={filterStatus}
                className="border dark:border-slate-900 rounded py-2 px-3 dark:bg-slate-700 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Date</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Sponsor Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Phone</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">
                      Package Amount
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Status</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">View Tree</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">
                      View Profile
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Edit</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {data &&
                  data
                    .filter((item) => {
                      const statusMatch = filterStatus
                        ? item.userStatus === filterStatus
                        : true;
                      const nameMatch =
                        search.toLowerCase() === "" ||
                        item.name.toLowerCase().includes(search);

                      return statusMatch && nameMatch;
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
                            <div className="flex items-center">
                              <div className="text-slate-800 dark:text-slate-100">
                                {formattedDate}
                              </div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {user.sponser && user.sponser.name}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.name}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center text-emerald-500">
                              {user.phone}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {user.packageChosen && user.packageChosen.amount}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.userStatus}</div>
                          </td>

                          <td className="p-2">
                            <div className="text-center flex flex-col gap-2">
                              <Link
                                to={`/users-list/${user._id}`}
                                className="hidden xs:block ml-2"
                              >
                                <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
                                  View Tree
                                </button>
                              </Link>
                            </div>
                          </td>

                          <td className="p-2">
                            <div className="text-center flex flex-col gap-2">
                              <Link
                                to={`/user-details/${user._id}`}
                                className="hidden xs:block ml-2"
                              >
                                <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
                                  All Details
                                </button>
                              </Link>
                            </div>
                          </td>

                          <td className="p-2">
                            <div className="text-center">
                              <Link>
                                <button
                                  onClick={() => openPopup(user._id)}
                                  className="btn bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  Edit
                                </button>
                              </Link>
                            </div>
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

export default UsersList;
