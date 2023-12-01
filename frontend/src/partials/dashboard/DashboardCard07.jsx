import React, { useEffect } from "react";

// Redux imports start
import { useDispatch, useSelector } from "react-redux";
import { deletePackage, fetchPackage } from "../../Slice/packageSlice";
// Redux imports end

function DashboardCard07() {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.packageReducer);

  useEffect(() => {
    dispatch(fetchPackage());
  }, [dispatch]);

  const HandleDelete = (id) => {
    dispatch(deletePackage(id));
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Packages
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
                  <div className="font-semibold text-left">Package Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Amount</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Amount ExGST</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Users' count</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Addon users</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Scheme type</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {data &&
                data.map((eachPack) => {
                  return (
                    <tr key={eachPack.id}>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="text-slate-800 dark:text-slate-100">
                            {eachPack.packageName}
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{eachPack.amount}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-emerald-500">
                          {eachPack.amountExGST}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{eachPack.usersCount}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{eachPack.addOnUsers}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{eachPack.schemeType}</div>
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

export default DashboardCard07;
