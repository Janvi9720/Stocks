import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../actions/auth";
import { Link } from "react-router-dom";

export default function UserList() {
  const [searchFilter, setSearchFilter] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [stocksPerPage] = useState(12);
  const users = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);


  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="container pt-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchFilter}
            onChange={handleSearchChange}
            className="rounded-lg border-transparent flex-2 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
        </div>
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="table-fixed min-w-xl sm:min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="cursor-pointer w-1/12 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white text-left text-sm uppercase font-normal"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="cursor-pointer hidden md:table-cell w-1/5 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-left text-sm uppercase font-normal"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="cursor-pointer w-1/5 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800  text-left dark:text-white text-sm uppercase font-normal"
                >
                  Coins
                </th>

                <th
                  scope="col"
                  className="hidden md:table-cell w-1/6 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800  text-left dark:text-white text-sm uppercase font-normal"
                >
                  User Type
                </th>
                <th
                  scope="col"
                  className="w-1/6 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800  text-left dark:text-white text-sm uppercase font-normal"
                ></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-800  text-sm cursor-pointer">
                      <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                        {user.name}
                      </p>
                    </td>
                    <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm cursor-pointer">
                      <div className="flex items-center">
                        <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                          {user.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-800   text-sm cursor-pointer">
                      <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                        {user.coins}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-800   text-sm cursor-pointer">
                      <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                        {user.userType}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-800   text-sm">
                      <Link
                        // to={`/transaction/${stock._id}`}
                        className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <Link
                        // to={`/stock/${stock._id}`}
                        className="ml-2 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-500 rounded-md dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-700"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm"
                  >
                    <p className="text-gray-900 dark:text-white text-center whitespace-no-wrap">
                      No users found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
