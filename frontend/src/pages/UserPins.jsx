import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import UserPinList from "../partials/dashboard/UserPinList";

function UserPins() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const userId = userInfo._id;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <UserPinList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserPins;
