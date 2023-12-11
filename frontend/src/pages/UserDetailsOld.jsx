import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import UsersList from "../partials/dashboard/UsersList";

import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../Slice/usersSlice";

import { NavLink, useParams } from "react-router-dom";

const UserDetailsOld = () => {

  const dispatch = useDispatch();
  const { userId } = useParams();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  // const userId = userInfo._id;

  const { data: user } = useSelector((state) => state.getUserDetailReducer);
  let bankDetails = {};
  if (user && user.bankDetails) {
    bankDetails = {
      holderName: user.bankDetails.holderName,
    };
  }

  useEffect(() => {
    dispatch(userDetails(userId));
  }, [userId, dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8"></div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                    User Details
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
                            <div className="font-semibold text-left">Name</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Name
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Phone
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Package Amount
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Status
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        <tr>
                          <td className="p-2">
                            <div className="flex items-center">
                              <div className="text-slate-800 dark:text-slate-100"></div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {user && user.name}
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
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDetailsOld;
