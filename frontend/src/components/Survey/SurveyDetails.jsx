import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSurveyById } from "../../actions/survey";

export default function SurveyDetails({ currentUserId = "" }) {
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.surveyReducer);
  useEffect(() => {
    dispatch(getSurveyById(currentUserId));
  }, [dispatch, currentUserId]);
  return (
    <>
      <div className="max-w-lg bg-white rounded-lg shadow dark:bg-gray-900 w-full mt-4 lg:mt-0">
        <div className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-4 mx-auto">
            <h2 className="text-left text-xl font-bold text-gray-700 capitalize dark:text-gray-200 mb-2 pb-2">
              Preferences
            </h2>
            <div className="overflow-auto">
              {survey.survey ? (
                Object.entries(survey.survey.response).map(([key, value]) => (
                  <div
                    key={value}
                    className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs">
                      <p className="flex justify-between text-gray-900 dark:text-white whitespace-no-wrap">
                        <div className="mr-9 font-bold font-l">{key}</div>
                        <div className="font-semibold text-end font-md">
                          {key === "Level"
                            ? survey.survey.response[key].split(" ")[0]
                            : survey.survey.response[key]}
                        </div>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 dark:text-gray-200">
                  No preferences available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
