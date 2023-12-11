import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersList,
  rejectUser,
  verifyUsers,
} from "../../Slice/usersSlice";
import ModalImage from "react-modal-image";

function VerifyUsersComponent() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getUserReducer);

  const [verifyStatus, setVerifyStatus] = useState(false);

  let users = [];
  data &&
    data.map((user) => {
      if (user.imgStatus == "progress") {
        users.push(user);
      }
    });

  const handleVerification = async (id) => {
    dispatch(verifyUsers(id));
  };

  const rejectVerification = async (id) => {
    dispatch(rejectUser(id));
  };

  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch, handleVerification,data]);

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Verify Users
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
                  <div className="font-semibold text-center">Screenshot</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Reference ID</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Verify</div>
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
                          {user.sponser.name}
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
                    <td
                      className="p-2"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {user && (
                        <div style={{ width: "80px" }}>
                          <ModalImage
                            small={`https://sevensquaregroup.in/uploads/${user.screenshot}`}
                            large={`https://sevensquaregroup.in/uploads/${user.screenshot}`}
                            alt="screenshot"
                          />
                        </div>
                      )}
                    </td>
                    <td className="p-2">
                      <div className="text-center">{user.referenceNo}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center flex flex-col gap-2">
                        <button
                          className="btn bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => handleVerification(user._id)}
                        >
                          Verify
                        </button>
                      </div>
                      <div className="text-center flex flex-col gap-2 mt-1">
                        <button
                          className="btn bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => rejectVerification(user._id)}
                        >
                          Reject
                        </button>
                      </div>
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

export default VerifyUsersComponent;
