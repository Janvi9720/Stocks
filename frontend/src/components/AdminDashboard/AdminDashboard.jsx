import React, { useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import StockList from "./Stocks/StockList";
import UserList from "./UserList/UserList";
import Blogs from "./Blogs/Blog";

export default function AdminDashboard() {
  function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("-translate-x-full");
  }

  const [currentTab, setCurrentTab] = useState("dashboard");

  const shownTab = (tab) => {
    switch (tab) {
      case "stocksList":
        return <StockList />;
      case "userList":
        return <UserList />;
      case "blogs":
        return <Blogs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 pt-14 ">
        <div className="flex flex-col space-y-6 lg:h-screen lg:flex-row lg:items-center lg:space-x-6">
          <div className="relative min-h-screen md:flex w-full">
            {/* <!-- mobile menu bar --> */}
            <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
              {/* <!-- logo --> */}
              <a href="/dashboard" className="block p-4 text-white font-bold">
                Admin Panel
              </a>

              {/* <!-- mobile menu button --> */}
              <button
                className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
                onClick={toggleSidebar}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* <!-- sidebar --> */}
            <div
              id="sidebar"
              className="sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out z-10 dark:bg-[#374151]"
            >
              <a
                href="/dashboard"
                className="text-white flex items-center space-x-2 px-4"
              >
                <span className="text-2xl font-extrabold">Admin Panel</span>
              </a>

              {/* <!-- nav --> */}
              <nav>
                <li
                  onClick={() => setCurrentTab("dashboard")}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer dark:hover:bg-[#1F2937]"
                >
                  Dashboard
                </li>
                <li
                  onClick={() => setCurrentTab("userList")}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer dark:hover:bg-[#1F2937]"
                >
                  User List
                </li>
                <li
                  onClick={() => setCurrentTab("stocksList")}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer dark:hover:bg-[#1F2937]"
                >
                  Stocks
                </li>
                <li
                  onClick={() => setCurrentTab("blogs")}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer dark:hover:bg-[#1F2937]"
                >
                  Blogs
                </li>
              </nav>
            </div>

            <div className="w-full sm:w-5/6">{shownTab(currentTab)}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
