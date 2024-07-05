import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserList, removeUserAccount } from "../../../actions/auth";
import Modal from "../../Common/Modal";
import SurveyDetails from "../../Survey/SurveyDetails";

export default function UserList() {
  const [searchFilter, setSearchFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [stocksPerPage] = useState(12);
  const users = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const handleDeleteUser = (id) => {
    dispatch(removeUserAccount(id, navigate));
    window.location.reload();
  };
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
      user.name.toLowerCase().includes(searchFilter.toLowerCase())
    )
    : [];

  const handleOpenModal = (email) => {
    setShowModal(true);
    setCurrentUserId(email);
  };

  const handleCloseModal = () => {
    setCurrentUserId("");
    setShowModal(false);
  };

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
                  className="cursor-pointer w-1/12 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white text-left text-sm uppercase font-bold"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="cursor-pointer hidden md:table-cell w-1/5 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-left text-sm uppercase font-bold"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="cursor-pointer w-1/5 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800  text-left dark:text-white text-sm uppercase font-bold"
                >
                  Coins
                </th>

                <th
                  scope="col"
                  className="hidden md:table-cell w-1/6 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800  text-left dark:text-white text-sm uppercase font-bold"
                >
                  User Type
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell w-1/6 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800  text-left dark:text-white text-sm uppercase font-bold"
                >
                  survey
                </th>
                <th
                  scope="col"
                  className="w-1/6 px-5 py-3 bg-gray-50 dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 text-gray-800  text-left dark:text-white text-sm uppercase font-bold"
                >
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user?._id}
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
                    <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm cursor-pointer">
                      <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                        {user.coins}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm cursor-pointer">
                      <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                        {user.userType}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="22.5"
                        viewBox="0 0 576 512"
                        onClick={() => handleOpenModal(user?._id)}
                      >
                        <path
                          fill="#111827"
                          d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                        />
                      </svg>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleDeleteUser(user?._id)}
                        height="20"
                        width="17.5"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="#f1250e"
                          d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                        />
                      </svg>
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

      <Modal showModal={showModal} handleCloseModal={handleCloseModal} title="">
        <SurveyDetails
          currentUserId={currentUserId}
        />
      </Modal>
    </>
  );
}
