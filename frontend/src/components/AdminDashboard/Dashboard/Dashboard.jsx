import React, { useEffect } from "react";
import { StashCard } from "./../../Common/Card";
import { useDispatch, useSelector } from "react-redux";
import { getStocks } from "./../../../actions/stocks";
import { getUserList } from "../../../actions/auth";
import { getLogs } from "../../../actions/logs";

export default function Dashboard({ setCurrentTab }) {
  const stocks = useSelector((state) => state.stocksReducer);
  const users = useSelector((state) => state.authReducer);
  const logs = useSelector((state) => state.logsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getLogs());
    dispatch(getStocks());
  }, [dispatch]);

  const renderStockItem = (stock) => (
    <>
      <div className="flex flex-col flex-wrap ">
        <span className="font-semibold">{stock.name}</span>
        <span className="text-gray-500">{stock.ticker}</span>
      </div>
      <span className={`text-sm text-green-500`}>{stock.currentPrice}</span>
    </>
  );

  const renderRecentActivityItem = (logs) => (
    <>
      <div className="flex flex-col flex-wrap ">
        <span className="font-semibold">{logs.userId}</span>
        <span className="text-gray-500 ">{logs.logAction}</span>
      </div>
      <span className="text-sm">
        {new Date(logs.loggedAt).toISOString().split("T")[0]}
      </span>
    </>
  );

  const renderSubscriberItem = (user) => (
    <>
      <div className="flex flex-col flex-wrap ">
        <span>{user.name}</span>
        <span className="text-sm text-gray-500">{user.email}</span>
      </div>
      <span
        // className={`text-sm font-semibold ${user.usertype === 'Active'
        //   ? 'text-green-500'
        //   : subscriber.status === 'Pending'
        //     ? 'text-yellow-500'
        //     : 'text-red-500'
        //   }`}
        className="text-sm font-semibold font-black-500"
      >
        {user.userType}
      </span>
    </>
  );
  return (
    <>
      <div className="w-full g-3 flex flex-col md:flex-row p-5">
        <StashCard
          title="Total Subscribers"
          value="12,345"
          extra="+5.2% from last month"
        />
        <StashCard
          title="Acive Stocks"
          value="5"
          extra="+5.2% from last month"
        />
        <StashCard
          title="Prediction Updates"
          value="8"
          extra="+8 new this week"
        />
        <StashCard
          title="Revenue Growth"
          value="+18.2%"
          extra="from last quarter"
        />
      </div>
      <div className="w-full flex flex flex-col lg:flex-row px-5 justify-around">
        <div className="bg-white shadow-md rounded-lg w-full flex-1 m-2 p-4">
          <div className="flex justify-between p-2 justify-items-center mb-4">
            <span className="font-bold text-lg">Stocks</span>
            <span className="text-gray-500 font-semibold text-sm mt-1">
              View All
            </span>
          </div>
          {stocks &&
            stocks
              .slice(0, 5)
              .map((item, index) => (
                <div className="flex justify-between items-center mb-2">
                  {renderStockItem(item)}
                </div>
              ))}
        </div>
        <div className="bg-white shadow-md rounded-lg w-full flex-1 m-2 p-4">
          <div className="flex justify-between p-2 justify-items-center mb-4">
            <span className="font-bold text-lg">Subscribers</span>
            <span className="text-gray-500 font-semibold text-sm mt-1">
              View All
            </span>
          </div>
          {Array.isArray(users) &&
            users.map((item, index) => (
              <div className="flex justify-between items-center mb-2">
                {renderSubscriberItem(item)}
              </div>
            ))}
        </div>
        <div className="bg-white shadow-md rounded-lg w-full flex-1 m-2 p-4">
          <div className="flex justify-between p-2 justify-items-center mb-4">
            <span className="font-bold text-lg">Recent Activity</span>
            <span className="text-gray-500 font-semibold text-sm mt-1">
              View All
            </span>
          </div>
          {logs &&
            logs
              .slice(0, 5)
              .map((item, index) => (
                <div className="flex justify-between items-center mb-2">
                  {renderRecentActivityItem(item)}
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
