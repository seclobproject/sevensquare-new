import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "../../Slice/usersSlice";

function DashboardCard01() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.fetchProfileReducer
  );

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  if (!data) {
    return <div>Loading...</div>;
  }

  let unrealisedSum = 0;

  if (data.unrealisedEarning && data.unrealisedEarning.length > 0) {
    unrealisedSum = data.unrealisedEarning.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );
  }

  return (
    <div className="flex flex-row col-span-full sm:col-span-12 xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="w-1/2 px-5 pt-5 pb-5">
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
          Total Wallet Amount
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
            {data.earning}
          </div>
        </div>
      </div>
      <div className="w-1/2 px-5 pt-5 pb-5">
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
          Unrealised Earning
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
            {unrealisedSum}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
