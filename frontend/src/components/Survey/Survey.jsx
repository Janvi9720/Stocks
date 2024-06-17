import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSurvey } from "./../../constants/userSurvey.js";
import { getSurveyById, createNewSurvey } from "../../actions/survey.js";
import { getUserInfo } from "../../actions/auth";

function ProjectPlannerForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    "Stock Market Sector": "",
    "Investment Strategy": "",
    "Real-time updates": "",
    "Updates Frequency": "",
    Level: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formInput = { response: formData, comment: "" };
    dispatch(createNewSurvey(formInput));
    dispatch(getUserInfo());
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      dispatch(getSurveyById(id));
    }
  }, [dispatch, id]);

  return (
    <div
      className="relative min-h-screen flex bg-white dark:bg-[#111827]"
    >
      <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5 p-[6%]">
        <div className="text-3xl font-BG text-center dark:text-white">
          Want to get personalized stock recommendations and <br /> insights
          tailored to your preferences?
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-12 md:w-4/5 mx-auto rounded-3xl bg-[#E5E7EB] dark:bg-[#1F2937] dark:text-[#fff]"
        >
          {step === 1 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center">Step 1/5</div>
              <div className="mt-4 w-full h-2 bg-[#fff]">
                <div className="h-full bg-black rounded-none w-1/5"></div>
              </div>
              <div className="mt-6 text-xl text-center">
                {userSurvey[0].label}
              </div>
              <div className="grid gap-[8%] p-[2%]">
                {userSurvey[0].options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`survey-${option.value}`}
                      type="radio"
                      checked={
                        formData[userSurvey[0].questionId] === option.label
                      }
                      value={option.label}
                      name={`${userSurvey[0].questionId}`}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`survey-${option.value}`}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="mt-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center">Step 2/5</div>
              <div className="mt-4 w-full h-2 bg-[#fff]">
                <div className="h-full bg-black rounded-none w-2/5"></div>
              </div>
              <div className="mt-6 text-xl text-center">
                {userSurvey[1].label}
              </div>
              <div className="grid gap-[8%] p-[2%]">
                {userSurvey[1].options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`survey-${option.value}`}
                      type="radio"
                      value={option.label}
                      checked={
                        formData[userSurvey[1].questionId] === option.label
                      }
                      name={`${userSurvey[1].questionId}`}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`survey-${option.value}`}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className="mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center">Step 3/5</div>
              <div className="mt-4 w-full h-2 bg-[#fff]">
                <div className="h-full bg-black rounded-none w-3/5"></div>
              </div>
              <div className="mt-6 text-xl text-center">
                {userSurvey[2].label}
              </div>
              <div className="grid gap-[8%] p-[2%]">
                {userSurvey[2].options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`survey-${option.value}`}
                      type="radio"
                      value={option.label}
                      checked={
                        formData[userSurvey[2].questionId] === option.label
                      }
                      name={`${userSurvey[2].questionId}`}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`survey-${option.value}`}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className="mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center">Step 4/5</div>
              <div className="mt-4 w-full h-2 bg-[#fff]">
                <div className="h-full bg-black rounded-none w-4/5"></div>
              </div>
              <div className="mt-6 text-xl text-center">
                {userSurvey[3].label}
              </div>
              <div className="grid gap-[8%] p-[2%]">
                {userSurvey[3].options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`survey-${option.value}`}
                      type="radio"
                      value={option.label}
                      checked={
                        formData[userSurvey[3].questionId] === option.label
                      }
                      name={`${userSurvey[3].questionId}`}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`survey-${option.value}`}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className="mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          {step === 5 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center">Step 5/5</div>
              <div className="mt-4 w-full h-2 bg-[#fff]">
                <div className="h-full bg-black rounded-none w-full"></div>
              </div>
              <div className="mt-6 text-xl text-center">
                {userSurvey[4].label}
              </div>
              <div className="grid gap-[8%] p-[2%]">
                {userSurvey[4].options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`survey-${option.value}`}
                      type="radio"
                      value={option.label}
                      checked={
                        formData[userSurvey[4].questionId] === option.label
                      }
                      name={`${userSurvey[4].questionId}`}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`survey-${option.value}`}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className="mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProjectPlannerForm;
