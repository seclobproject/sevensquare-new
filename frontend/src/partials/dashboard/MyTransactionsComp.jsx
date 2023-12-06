import React, { useEffect } from "react";

import { Link, NavLink } from "react-router-dom";

// Redux imports start
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList, verifyUsers } from "../../Slice/usersSlice";
import axios from "axios";

// Redux imports end

function MyTransactionsComp() {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.getUserReducer);

  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);

  const handleVerification = async (id) => {
    dispatch();
  };
  // const HandleDelete = (id) => {
  //   dispatch(deletePackage(id));
  // };
  const viewProfile = () => {};

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          My Transactions
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
                  <div className="font-semibold text-left"></div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Reference ID</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Phone</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Address</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">View Tree</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">View Profile</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Edit</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {data &&
                data.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="text-slate-800 dark:text-slate-100">
                            {user.ownSponserId}
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{user.name}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-emerald-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{user.phone}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{user.address}</div>
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
                              View Profile
                            </button>
                          </Link>
                        </div>
                      </td>

                      <td className="p-2">
                        <div className="text-center">
                          <button className="btn bg-blue-600 hover:bg-blue-700 text-white">
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
  );
}

export default MyTransactionsComp;
