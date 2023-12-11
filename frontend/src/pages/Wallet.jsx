import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WalletList from '../partials/dashboard/WalletList';
import { NavLink } from "react-router-dom";

function Wallet() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  const userId = userInfo._id;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <WalletList />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default Wallet;
