import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

// Redux imports start
import { useDispatch, useSelector } from "react-redux";
import { fetchPins } from "../../Slice/pinSlice";
// Redux imports end

import PinOwnerDetails from "./PinOwnerDetails";

function UserPinList() {
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");

  const [showPins, setShowPins] = useState(null);

  const dispatch = useDispatch();

  const {
    loading,
    data,
    error: fetchPinError,
  } = useSelector((state) => state.fetchPinsReducer);

  let results;
  if (data != null) {
    const groupedResults = data.reduce((result, item) => {
      const addedBy = item.addedBy && item.addedBy._id || "";

      if (!result[addedBy]) {
        result[addedBy] = {
          addedBy: item.addedBy,
          pins: [],
        };
      }

      result[addedBy].pins.push({
        createdAt: item.createdAt,
        district: item.district,
        email: item.email,
        name: item.name,
        phone: item.phone,
        profession: item.profession,
        updatedAt: item.updatedAt,
        _id: item._id,
      });

      return result;
    }, {});

    results = Object.values(groupedResults);
  }

  useEffect(() => {
    dispatch(fetchPins());
  }, [dispatch]);

  // const toggleState = (toggleId) => {
  //   setShowPins(!showPins);
  // };

  const toggleState = (toggleId) => {
    setShowPins((showPins) => (showPins === toggleId ? null : toggleId));
  };

  return (
    <>
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            User Pins
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
            {results ? (
              results
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.addedBy.name.toLowerCase().includes(search);
                })
                .map((pin) => (
                  <div key={pin.addedBy && pin.addedBy._id}>
                    <PinOwnerDetails
                      sponserId={pin.addedBy && pin.addedBy.ownSponserId}
                      name={pin.addedBy && pin.addedBy.name}
                      phone={pin.addedBy && pin.addedBy.phone}
                      id={pin.addedBy && pin.addedBy._id}
                      toggleState={toggleState}
                    />
                    {pin.addedBy && showPins === pin.addedBy._id && (
                      <table className="table-auto w-full dark:text-slate-300">
                        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                          <tr>
                            <th className="p-2">
                              <div className="font-semibold text-left">
                                Name
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-left">
                                Phone
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                Email
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                Profession
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                District
                              </div>
                            </th>
                          </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                          {pin.pins &&
                            pin.pins.map((res) => (
                              <tr key={res && res._id}>
                                <td className="p-2">
                                  <div className="text-left">
                                    {res && res.name}
                                  </div>
                                </td>
                                <td className="p-2">
                                  <div className="text-left text-emerald-500">
                                    {res && res.phone}
                                  </div>
                                </td>
                                <td className="p-2">
                                  <div className="text-center">
                                    {res && res.email}
                                  </div>
                                </td>
                                <td className="p-2">
                                  <div className="text-center">
                                    {res && res.profession}
                                  </div>
                                </td>
                                <td className="p-2">
                                  <div className="text-center">
                                    {res && res.district}
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                ))
            ) : loading ? (
              <div>Loading...</div>
            ) : fetchPinError ? (
              <>Some error occured!</>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPinList;
