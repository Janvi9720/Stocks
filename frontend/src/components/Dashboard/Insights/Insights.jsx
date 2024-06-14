import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "../../../actions/logs";
import { getPurchases } from "../../../actions/purchased";
import LogsSkeleton from "../Logs/LogsSkeleton";
import InsightsChart from "./InsightsChart";
import InsightsSkeleton from "./InsightsSkeleton";
import { getSurveyById } from "../../../actions/survey";

const Insights = (props) => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchasedReducer);
  const { user } = props;
  const logs = useSelector((state) => state.logsReducer);
  const survey = useSelector((state) => state.surveyReducer);

  useEffect(() => {
    dispatch(getLogs());
    dispatch(getSurveyById());
    dispatch(getPurchases());
  }, [dispatch]);

  const alerts = [
    "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    "Top 10 AI startups to watch in 2023.",
    "How blockchain is changing the financial industry.",
    "The rise of quantum computing: What you need to know.",
    "Tech trends that will dominate in 2024.",
    "The future of cybersecurity: Predictions for the next decade.",
    "The impact of 5G on IoT devices.",
    "Why edge computing is the next big thing.",
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 dark:bg-gray-800">
        <div className="max-w-lg bg-white rounded-lg shadow dark:bg-gray-900 w-full">
          <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-4 mx-auto">
              <h2 className="text-left text-xl font-bold text-gray-700 capitalize dark:text-gray-200 mb-2 pb-2">
                Stock Insights
              </h2>
              <div className="text-xs overflow-auto">
                <div className="rounded-lg flex flex-col sm:flex-row ">
                  <span className="w-full sm:w-1/2 h-12 relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight flex items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-yellow-200 dark:bg-yellow-700 opacity-50 rounded-full"
                    ></span>
                    <span className="text-lg sm:text-xl relative text-yellow-600 dark:text-yellow-400">
                      ${user?.result.coins.toFixed(2)}
                    </span>
                  </span>
                  {user?.result.coins > 100000 ? (
                    <span className="mt-2 sm:mt-0 ml-0 sm:ml-2 w-full sm:w-1/2 h-12 relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight flex items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-green-200 dark:bg-green-700 opacity-50 rounded-full"
                      ></span>
                      <span className="text-lg sm:text-xl relative text-green-600 dark:text-green-400">
                        + %
                        {(
                          Math.abs(1 - user?.result.coins / 100000) * 100
                        ).toFixed(2)}{" "}
                        profit
                      </span>
                    </span>
                  ) : (
                    <span className="mt-2 sm:mt-0 ml-0 sm:ml-2 w-full sm:w-1/2 h-12 relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight flex items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-red-200 dark:bg-red-700 opacity-50 rounded-full"
                      ></span>
                      <span className="text-lg sm:text-xl relative text-red-600 dark:text-red-400">
                        - %
                        {(
                          Math.abs(1 - user?.result.coins / 100000) * 100
                        ).toFixed(2)}{" "}
                        loss
                      </span>
                    </span>
                  )}
                </div>
              </div>
              {purchases?.length ? (
                <>
                  <div className="text-xs overflow-auto">
                    <div className="rounded-lg flex">
                      <InsightsChart
                        id={"insights-on-purchases-bar-chart"}
                        purchases={purchases}
                        styleSet={"h-full w-full mt-8"}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <InsightsSkeleton />
              )}
            </div>
          </div>
        </div>
        <div className="max-w-lg bg-white rounded-lg shadow dark:bg-gray-900 w-full mt-4 lg:mt-0">
          <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-4 mx-auto">
              <h2 className="text-left text-xl font-bold text-gray-700 capitalize dark:text-gray-200 mb-2 pb-2">
                Preferences
              </h2>
              <div className="overflow-auto">
                {survey.survey ? (
                  Object.entries(survey.survey.response).map(
                    ([key, value]) => (
                      <div
                        key={value}
                        className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <div className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs">
                          <p className="flex justify-between text-gray-900 dark:text-white whitespace-no-wrap">
                            <div className="mr-9 font-bold font-l">{key}</div>
                            <div className="font-semibold font-md">{key === "Level" ? survey.survey.response[key].split(" ")[0] : survey.survey.response[key]}</div>
                          </p>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-gray-700 dark:text-gray-200">
                    No preferences available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg bg-white rounded-lg shadow dark:bg-gray-900 w-full mt-4 lg:mt-0">
          <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-4 mx-auto">
              <h2 className="text-left text-xl font-bold text-gray-700 capitalize dark:text-gray-200 mb-2 pb-2">
                Real-time Alerts
              </h2>
              <div className="overflow-auto">
                {alerts.slice(0, 5).map((alert, index) => (
                  <div
                    key={index}
                    className="block max-w-sm p-2 mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {alert}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg bg-white rounded-lg shadow dark:bg-gray-800 w-full mt-4 lg:mt-0">
          <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-4 mx-auto">
              <h2 className="text-left text-xl font-bold text-gray-700 capitalize dark:text-gray-200 mb-2 pb-2">
                Recent Activity
              </h2>
              {!logs?.length ? (
                <LogsSkeleton />
              ) : (
                <div className="overflow-auto">
                  {logs.slice(0, 5).map((log) => (
                    <div
                      key={log._id}
                      className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs">
                        <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                          {log.logAction}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs">
                        <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                          {new Date(log.loggedAt).toDateString()}{" "}
                          {new Date(log.loggedAt).toLocaleTimeString()}
                        </p>
                      </td>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </>
  );
};

export default Insights;
