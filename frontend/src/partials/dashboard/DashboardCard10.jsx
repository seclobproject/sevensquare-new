import React from "react";

import Image01 from "../../images/user-36-05.jpg";
import Image02 from "../../images/user-36-06.jpg";
import Image03 from "../../images/user-36-07.jpg";
import Image04 from "../../images/user-36-08.jpg";
import Image05 from "../../images/user-36-09.jpg";

function DashboardCard10(props) {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Phone</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Sponser ID</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="font-medium text-slate-800 dark:text-slate-100">
                      {props.username}
                    </div>
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">{props.email}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    {props.phone}
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="font-medium text-slate-800 dark:text-slate-100">
                    {props.sponserID}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;
