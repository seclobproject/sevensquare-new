import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

// Redux imports start
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList, verifyUsers } from "../../Slice/usersSlice";
import {
  fetchTransactions,
  verifyTransaction,
} from "../../Slice/transactionSlice";
import DashboardCard10 from "./DashboardCard10";
import Popup from "./Popup";

// Redux imports end

function TransactionsComp() {
  const dispatch = useDispatch();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [transId, setTransId] = useState(null);

  const { data } = useSelector((state) => state.fetchTransactionReducer);
  const { data: verifiedData } = useSelector(
    (state) => state.verifyTransactionReducer
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch, verifiedData]);

  const openPopup = (userId, transId) => {
    setUserId(userId);
    setTransId(transId);

    setPopupOpen(true);
  };

  const closePopup = () => {
    setUserId(null);
    setTransId(null);
    setPopupOpen(false);
  };

  const submitPopup = (referenceId) => {
    dispatch(verifyTransaction({ referenceId, userId, transId }));
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Payment Details
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          {data &&
            data.map((user) => (
              <div key={user.userId} className="bg-slate-100 dark:bg-slate-600">
                <DashboardCard10
                  username={user.username}
                  email={user.email}
                  phone={user.phone}
                  sponserID={user.sponserID}
                />
                <table className="table-auto w-full dark:text-slate-300">
                  {/* Table header */}
                  <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                    <tr>
                      <th className="p-2">
                        <div className="font-semibold text-left">
                          Reference ID
                        </div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-center">Amount</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-center">
                          Payment Status
                        </div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-center">
                          Bank Details
                        </div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-center">Verify</div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                    {user &&
                      user.transactions.map((transaction) => (
                        <tr key={transaction._id}>
                          <td className="p-2">
                            <div className="text-left text-slate-800 dark:text-slate-100">
                              {transaction.referenceID}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center text-slate-800 dark:text-slate-100">
                              {transaction.amount}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center text-slate-800 dark:text-slate-100">
                              {transaction.status}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center flex items-center flex-col gap-2">
                              <Link
                                to={`/user-details/${user.userId}`}
                                className="hidden xs:block ml-2"
                              >
                                <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
                                  User/Bank Details
                                </button>
                              </Link>
                            </div>
                          </td>
                          <td className="p-2 flex justify-center">
                            <div
                              className="text-center flex items-center flex-col gap-2"
                              style={{ width: "130px" }}
                            >
                              <button
                                onClick={() =>
                                  openPopup(user.userId, transaction._id)
                                }
                                className="btn bg-blue-500 hover:bg-blue-600 text-white"
                              >
                                Verify Payment
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={closePopup} onSubmit={submitPopup} />
    </div>
  );
}

export default TransactionsComp;
