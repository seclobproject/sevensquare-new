import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList, verifyUsers } from "../../Slice/usersSlice";

function VerifiedUsersComponent() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getUserReducer);

  let users = [];
  data &&
    data.map((user) => {
      if (user.userStatus === "approved") {
        users.push(user);
      }
    });

  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);

  const handleVerification = async (id) => {
    dispatch(verifyUsers(id));
    window.location.reload();
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Verified Users
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
                  <div className="font-semibold text-left"> Sponsor Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Name</div>
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
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-slate-800 dark:text-slate-100">
                          {user.sponser && user.sponser.name}
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VerifiedUsersComponent;
