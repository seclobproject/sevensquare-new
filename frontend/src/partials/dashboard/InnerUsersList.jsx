import React, { useEffect, useState } from "react";

import { Link, NavLink, useParams } from "react-router-dom";

// Redux imports start
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, getUserById, verifyUsers } from "../../Slice/usersSlice";
import axios from "axios";
import EditPopup from "./EditPopup";

// Redux imports end

function InnerUsersList() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Edit button clicked user_id
  const [user_Id, setUser_Id] = useState("");

  const dispatch = useDispatch();
  const { userId } = useParams();

  const { data } = useSelector((state) => state.getUserByIdReducer);

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);


  const openPopup = (userId) => {
    setUser_Id(userId);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const submitPopup = (formData) => {
    dispatch(editUserProfile({user_Id, formData}))
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
                {data.members &&
                  data.members.map((user) => {
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
                            {data.sponserUser && data.sponserUser.name}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-emerald-500">
                            {user.name}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">{user.phone}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">
                            {user.packageAmount}
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
                            <button
                              onClick={() => openPopup(user._id)}
                              className="btn bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Edit
                            </button>
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

export default InnerUsersList;
