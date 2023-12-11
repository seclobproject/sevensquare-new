import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <img src="images/7sq-logo.png" alt="logo" />
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src="images/7sq-logo.png" alt="logo" width={'60px'} />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Inbox */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("packages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/packages"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("packages")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname.includes("packages")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("packages")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Packages
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Users */}

              <SidebarLinkGroup
                activecondition={pathname === "/" || pathname.includes("users")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname === "/" || pathname.includes("users")
                            ? "hover:text-slate-200"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current ${
                                  pathname.includes("users")
                                    ? "text-indigo-500"
                                    : "text-slate-600"
                                }`}
                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes("users")
                                    ? "text-indigo-300"
                                    : "text-slate-400"
                                }`}
                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Users
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/users"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                All Users
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/verify-users"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Verify Users
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/verified-users"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Verified Users
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/franchise-users"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Franchise Users
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("userpin") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/userpins"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("userpin")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <circle
                        className={`fill-current ${
                          pathname.includes("userpin")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        cx="18.5"
                        cy="5.5"
                        r="4.5"
                      />
                      <circle
                        className={`fill-current ${
                          pathname.includes("userpin")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        cx="5.5"
                        cy="5.5"
                        r="4.5"
                      />
                      <circle
                        className={`fill-current ${
                          pathname.includes("userpin")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        cx="18.5"
                        cy="18.5"
                        r="4.5"
                      />
                      <circle
                        className={`fill-current ${
                          pathname.includes("userpin")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        cx="5.5"
                        cy="18.5"
                        r="4.5"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      User Pins
                    </span>
                  </div>
                </NavLink>
              </li>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("wallet") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/wallet"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("wallet")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname.includes("wallet")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("wallet")
                            ? "text-indigo-600"
                            : "text-slate-700"
                        }`}
                        d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("wallet")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Wallet
                    </span>
                  </div>
                </NavLink>
              </li>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("withdrawal") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/withdrawal"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("withdrawal")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname.includes("withdrawal")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("withdrawal")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M1 1h22v23H1z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("withdrawal")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Withdrawal
                    </span>
                  </div>
                </NavLink>
              </li>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("salary") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/salary"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("salary")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname.includes("salary")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("salary")
                            ? "text-indigo-500"
                            : "text-slate-700"
                        }`}
                        d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("salary")
                            ? "text-indigo-600"
                            : "text-slate-600"
                        }`}
                        d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Salary
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
