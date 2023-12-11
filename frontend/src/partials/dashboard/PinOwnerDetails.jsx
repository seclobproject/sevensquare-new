import React from "react";

function PinOwnerDetails(props) {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Sponsor ID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Phone</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">View Pins</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="font-medium text-slate-800 dark:text-slate-100">
                      {props.sponserId}
                    </div>
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    {props.name}
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="font-medium">{props.phone}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <button
                    onClick={() => props.toggleState(props.id)}
                    className="btn bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    All Pins
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PinOwnerDetails;
