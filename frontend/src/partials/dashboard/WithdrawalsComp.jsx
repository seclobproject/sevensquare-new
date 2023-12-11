import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

// Redux imports start
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList, verifyUsers } from "../../Slice/usersSlice";
import {
  fetchTransactions,
  rejectTransaction,
  verifyTransaction,
} from "../../Slice/transactionSlice";
import DashboardCard10 from "./DashboardCard10";
import BankDetailsPopup from "./bankDetailsPopup";

// Redux imports end

function WithdrawalsComp() {
  const dispatch = useDispatch();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Pending");

  const [bankDetails, setBankDetails] = useState({});

  const { data } = useSelector((state) => state.fetchTransactionReducer);

  const { data: verifiedData } = useSelector(
    (state) => state.verifyTransactionReducer
  );

  const { data: rejectedData } = useSelector(
    (state) => state.rejectTransactionReducer
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch, verifiedData, rejectedData]);

  const closePopup = () => {
    setPopupOpen(false);
  };

  const approvePay = (userId, transId) => {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      dispatch(verifyTransaction({ userId, transId }));
    }
  };

  const rejectPay = (userId, transId) => {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      dispatch(rejectTransaction({ userId, transId }));
    }
  };

  const bankDetailFn = (bank) => {
    setBankDetails(bank);
    if (bankDetails) setPopupOpen(true);
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Withdrawal Details
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
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          {data &&
            data
              .filter((item) => {
                const nameMatch =
                  search.toLowerCase() === "" ||
                  item.username.toLowerCase().includes(search);

                return nameMatch;
              })
              .map((user) => (
                <div
                  key={user.userId}
                  className="bg-slate-100 dark:bg-slate-600"
                >
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
                          <div className="font-semibold text-left">Amount</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            TDS Amount
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Last Amount
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Status
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Bank Details
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Manage
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      {user &&
                        user.transactions
                          .filter((item) => {
                            const statusMatch = filterStatus
                              ? item.status === filterStatus
                              : true;

                            return statusMatch;
                          })
                          .map((transaction) => (
                            <tr key={transaction._id}>
                              <td className="p-2">
                                <div className="text-left text-slate-800 dark:text-slate-100">
                                  {transaction.amount}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center text-slate-800 dark:text-slate-100">
                                  {transaction.TDSAmount}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center text-slate-800 dark:text-slate-100">
                                  {transaction.lastAmount}
                                </div>
                              </td>
                              <td className="p-2">
                                <div
                                  className={
                                    transaction.status === "Rejected"
                                      ? "text-center text-red-500 dark:text-red-500"
                                      : transaction.status === "Pending"
                                      ? "text-center text-blue-500 dark:text-blue-500"
                                      : "text-center text-green-500 dark:text-green-500"
                                  }
                                >
                                  {transaction.status}
                                </div>
                              </td>
                              <td className="p-2">
                                {user &&
                                JSON.stringify(user.bankDetails) != "{}" ? (
                                  <div className="text-center flex items-center flex-col gap-2">
                                    {/* <Link
                                      to={`/user-details/${user.userId}`}
                                      className="hidden xs:block ml-2"
                                    > */}
                                    <button
                                      onClick={() =>
                                        bankDetailFn(user.bankDetails)
                                      }
                                      className="btn bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                      Bank Details
                                    </button>
                                    {/* </Link> */}
                                  </div>
                                ) : (
                                  <div className="text-center flex items-center flex-col gap-2">
                                    Not available
                                  </div>
                                )}
                              </td>
                              {transaction.status === "Pending" ? (
                                <td className="p-2 flex justify-center">
                                  <div
                                    className="text-center flex items-center flex-col gap-2"
                                    style={{ width: "130px" }}
                                  >
                                    <button
                                      onClick={() =>
                                        approvePay(user.userId, transaction._id)
                                      }
                                      className="btn bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                      Approve
                                    </button>
                                  </div>

                                  <div
                                    className="text-center flex items-center flex-col gap-2"
                                    style={{ width: "130px" }}
                                  >
                                    <button
                                      onClick={() =>
                                        rejectPay(user.userId, transaction._id)
                                      }
                                      className="btn bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                </td>
                              ) : (
                                <td className="pt-4 flex justify-center">
                                  <div
                                    className="text-center flex items-center flex-col gap-2"
                                    style={{ width: "130px" }}
                                  >
                                    Already Managed
                                  </div>
                                </td>
                              )}
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              ))}
        </div>
      </div>
      <BankDetailsPopup
        bankDetails={bankDetails}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </div>
  );
}

export default WithdrawalsComp;
