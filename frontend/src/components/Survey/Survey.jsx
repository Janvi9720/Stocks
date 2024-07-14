import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSurvey } from "./../../constants/userSurvey.js";
import { getSurveyById, createNewSurvey } from "../../actions/survey.js";
import { getUserInfo } from "../../actions/auth";
import { useAuth0 } from "../../react-auth0-spa.js";

function SurveyForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth0();
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
    if (user?.result) {
      dispatch(getSurveyById(user?.result?._id));
    }
  }, [dispatch, user]);

  return (
    <div className="relative min-h-screen flex bg-[#1F2937] dark:bg-[#111827]">
      <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5 pt-[23%] md:pt-[10%] p-[6%] lg:py-[6%] w-full">
        <div className="text-4xl font-bold text-white text-center">
          Want to get personalized stock recommendations and <br /> insights
          tailored to your preferences?
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-12 md:w-4/5 mx-auto rounded-lg bg-[#E5E7EB] dark:bg-[#1F2937] dark:text-[#fff]"
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
              {/* <div className="text-base font-light text-center">Step 1/5</div> */}
              <div className="mt-4 w-full h-2 bg-[#fff]">
                <div className="h-full bg-[#1F2937] rounded-none dark:bg-[#111827] w-1/5"></div>
              </div>
              <div className="mt-6 text-2xl text-center font-bold">
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
                      className="w-4 h-4 text-[#1F2937] bg-gray-100 border-gray-300 focus:ring-[#1F2937] dark:focus:ring-[#E5E7EB] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`survey-${option.value}`}
                      className="ms-2 font-bold text-gray-900 dark:text-gray-300"
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
                  className="mt-4 bg-[#1F2937] dark:bg-[#111827] text-white font-bold py-2 px-4 rounded-full"
                >
                  <img src="/svg/arrow_right.svg" alt="Arrow Right" />
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
              {/* <div className="text-base font-light text-center">Step 2/5</div> */}
              <div className="mt-4 w-full h-2 bg-[#fff]">
                <div className="h-full bg-[#1F2937] rounded-none dark:bg-[#111827] w-2/5"></div>
              </div>
              <div className="mt-6 text-2xl text-center font-bold">
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
                      className="w-4 h-4 text-[#1F2937] bg-gray-100 border-gray-300 focus:ring-[#1F2937] dark:focus:ring-[#E5E7EB] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`survey-${option.value}`}
                      className="ms-2 text-l font-bold text-gray-900 dark:text-gray-300"
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
                  className="mr-4 bg-[#1F2937] dark:bg-[#111827] text-white font-bold py-2 px-4 rounded-full"
                >
                  <img src="/svg/arrow_left.svg" alt="Arrow Left" />
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#1F2937] dark:bg-[#111827] text-white font-bold py-2 px-4 rounded-full"
                >
                  <img src="/svg/arrow_right.svg" alt="Arrow Right" />
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
              {/* <div className="text-base font-light text-center">Step 3/5</div> */}
              <div className="mt-4 w-full h-2 bg-[#fff]">
                <div className="h-full bg-[#1F2937] rounded-none dark:bg-[#111827] w-3/5"></div>
              </div>
              <div className="mt-6 text-2xl text-center font-bold">
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
                      className="w-4 h-4 text-[#1F2937] bg-gray-100 border-gray-300 focus:ring-[#1F2937] dark:focus:ring-[#E5E7EB] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`survey-${option.value}`}
                      className="ms-2 text-l font-bold text-gray-900 dark:text-gray-300"
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
                  className="mr-4 bg-[#1F2937] dark:bg-[#111827] text-white font-bold py-2 px-4 rounded-full"
                >
                  <img src="/svg/arrow_left.svg" alt="Arrow Left" />
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#1F2937] dark:bg-[#111827] text-white font-bold py-2 px-4 rounded-full"
                >
                  <img src="/svg/arrow_right.svg" alt="Arrow Right" />
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
              {/* <div className="text-base font-light text-center">Step 4/5</div> */}
              <div className="mt-4 w-full h-2 bg-[#fff]">
                <div className="h-full bg-[#1F2937] rounded-none dark:bg-[#111827] w-4/5"></div>
              </div>
              <div className="mt-6 text-2xl text-center font-bold">
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
                      className="w-4 h-4 text-[#1F2937] bg-gray-100 border-gray-300 focus:ring-[#1F2937] dark:focus:ring-[#E5E7EB] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`survey-${option.value}`}
                      className="ms-2 text-l font-bold text-gray-900 dark:text-gray-300"
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
                  className="mr-4 bg-[#1F2937] dark:bg-[#111827] text-white font-bold py-2 px-4 rounded-full"
                >
                  <img src="/svg/arrow_left.svg" alt="Arrow Left" />
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#1F2937] dark:bg-[#111827] text-white font-bold py-2 px-4 rounded-full"
                >
                  <img src="/svg/arrow_right.svg" alt="Arrow Right" />
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
              {/* <div className="text-base font-light text-center">Step 5/5</div> */}
              <div className="mt-4 w-full h-2 bg-[#fff]">
                <div className="h-full bg-[#1F2937] rounded-none dark:bg-[#111827] w-full"></div>
              </div>
              <div className="mt-6 text-2xl text-center font-bold">
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
                      className="w-4 h-4 text-[#1F2937] bg-gray-100 border-gray-300 focus:ring-[#1F2937] dark:focus:ring-[#E5E7EB] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`survey-${option.value}`}
                      className="ms-2 text-l font-bold text-gray-900 dark:text-gray-300"
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
                  className="mr-4 bg-[#1F2937] dark:bg-[#111827] text-white font-bold py-2 px-4 rounded-full"
                >
                  <img src="/svg/arrow_left.svg" alt="Arrow Left" />
                </button>
                <button
                  type="submit"
                  className="bg-[#1F2937] dark:bg-[#111827] text-white font-bold py-2 px-4 rounded-full"
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

export default SurveyForm;
