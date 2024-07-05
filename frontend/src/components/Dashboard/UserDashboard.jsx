import React, { useState } from "react";
import General from "./General/General";
import Account from "./Account/Account";
import Insights from "./Insights/Insights";
import Transactions from "./Transactions/Transactions";
import Logs from "./Logs/Logs";

const Dashboard = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const [currentTab, setCurrentTab] = useState("Insights");

  function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("-translate-x-full");
  }

  const shownTab = (tab) => {
    switch (tab) {
      case "Account":
        return <Account user={user} />;
      case "General":
        return <General />;
      case "Transactions":
        return <Transactions />;
      case "Logs":
        return <Logs />;
      default:
        return <Insights user={user} />;
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
                User Panel
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
                <span className="text-2xl font-extrabold">User Panel</span>
              </a>

              {/* <!-- nav --> */}
              <nav>
                <li
                  onClick={() => setCurrentTab("Insights")}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer dark:hover:bg-[#1F2937]"
                >
                  Dashboard
                </li>
                <li
                  onClick={() => setCurrentTab("Account")}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer dark:hover:bg-[#1F2937]"
                >
                  Account
                </li>
                <li
                  onClick={() => setCurrentTab("Transactions")}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer dark:hover:bg-[#1F2937]"
                >
                  Transactions
                </li>
                <li
                  onClick={() => setCurrentTab("Logs")}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer dark:hover:bg-[#1F2937]"
                >
                  Logs
                </li>
              </nav>
            </div>

            <div className="w-full sm:w-5/6 p-[2%] overflow-y-scroll h-[100vh]">
              {shownTab(currentTab)}
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
