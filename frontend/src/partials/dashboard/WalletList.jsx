import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

// Redux imports start
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList } from "../../Slice/usersSlice";
// Redux imports end

import AddBonusPopup from "./AddBonusPopup";
import { addBonus } from "../../Slice/bonusSlice";
import Transactions from "./Transactions";

function WalletList() {
  const [search, setSearch] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [toggle, setToggle] = useState(null);

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
    dispatch(addBonus({ user_Id, formData }));
  };

  const toggleHandler = (toggleId) => {
    setToggle((toggle) => (toggle === toggleId ? null : toggleId));
  };

  return (
    <>
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            User Wallet
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
                    <div key={user._id}>
                      <table className="table-auto w-full dark:text-slate-300">
                        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                          <tr>
                            <th className="p-2" style={{ width: "20%" }}>
                              <div className="font-semibold text-left">
                                Name
                              </div>
                            </th>
                            <th className="p-2" style={{ width: "20%" }}>
                              <div className="font-semibold text-center">
                                Sponsor Name
                              </div>
                            </th>
                            <th className="p-2" style={{ width: "15%" }}>
                              <div className="font-semibold text-center">
                                Amount
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                View Transactions
                              </div>
                            </th>
                            <th className="p-2" style={{ width: "20%" }}>
                              <div className="font-semibold text-center">
                                Add Bonus
                              </div>
                            </th>
                          </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                          <tr>
                            <td className="p-2" style={{ width: "20%" }}>
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {user.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2" style={{ width: "20%" }}>
                              <div className="text-center">
                                {user.sponser && user.sponser.name}
                              </div>
                            </td>
                            <td className="p-2" style={{ width: "15%" }}>
                              <div className="text-center">{user.earning}</div>
                            </td>
                            <td
                              className="p-2 flex justify-center">
                              <div className="text-center flex flex-col gap-2">
                                <button
                                  onClick={() => toggleHandler(user._id)}
                                  className="btn bg-blue-500 hover:bg-blue-600 text-white w-40"
                                >
                                  View Transactions
                                </button>
                              </div>
                            </td>
                            <td className="p-2" style={{ width: "20%" }}>
                              <div className="text-center">
                                <Link>
                                  <button
                                    onClick={() => openPopup(user._id)}
                                    className="btn bg-blue-600 hover:bg-blue-700 text-white"
                                  >
                                    Add Bonus
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {toggle === user._id && (
                        <Transactions transactions={user.allTransactions} />
                      )}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      <AddBonusPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onSubmit={submitPopup}
      />
    </>
  );
}

export default WalletList;
