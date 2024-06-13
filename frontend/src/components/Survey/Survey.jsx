import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectPlannerForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    occupation: "",
    completionDate: "",
    projectDetails: "",
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

  const redoStep = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    console.log(formData);
  };

  return (
    <div
      className="relative min-h-screen flex"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5 p-[6%]">
        <div className="text-3xl font-BG text-center ">
          Want to get personalized stock recommendations and <br /> insights
          tailored to your preferences?
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-12 md:w-4/5 mx-auto rounded-3xl"
          style={{ backgroundColor: "#ebe9d8" }}
        >
          {step === 1 && (
            <motion.div
              key={step} // Add this line
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center  ">Step 1/5</div>
              <div
                className="mt-4 w-full h-2"
                style={{ backgroundColor: "#e0cfc8" }}
              >
                <div className="h-full bg-black rounded-3xl w-1/5"></div>
              </div>
              <div className="mt-12 text-3xl  text-center">
                Which stock market sectors are you primarily interested in?
              </div>

              <div>
                {/* Name input field */}
                {/* <input
                  type="text"
                  placeholder="Name"
                  name="name" // This should match your formData property
                  className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                  style={{ backgroundColor: "#e0cfc8" }}
                  value={formData.name} // This correctly points to formData.name
                  onChange={handleChange}
                /> */}

                <div class="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Technology
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Energy
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Healthcare
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Consumer Goods
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Others (please specify)
                  </label>
                </div>
              </div>

              {/* Number input field */}
              {/* <div>
                <input
                  type="text"
                  placeholder="Number"
                  name="number" // This should match your formData property
                  className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                  style={{ backgroundColor: "#e0cfc8" }}
                  value={formData.number} // This should point to formData.number
                  onChange={handleChange}
                />
              </div> */}

              {/* Occupation input field */}
              {/* <div>
                <input
                  type="text"
                  placeholder="Occupation"
                  name="occupation" // This should match your formData property
                  className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                  style={{ backgroundColor: "#e0cfc8" }}
                  value={formData.occupation} // This should point to formData.occupation
                  onChange={handleChange}
                />
              </div> */}
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
              key={step} // Add this line
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center  ">Step 2/5</div>
              <div
                className="mt-4 w-full h-2"
                style={{ backgroundColor: "#e0cfc8" }}
              >
                <div className="h-full bg-black rounded-3xl w-2/5"></div>
              </div>
              <div className="mt-12 text-3xl  text-center">
                What is your investment strategy?
              </div>
              <div>
                <div class="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Long-term buy and hold
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Active trading
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Value investing
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Growth investing
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Other (please specify)
                  </label>
                </div>
              </div>
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className=" mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className=" bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key={step} // Add this line
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center  ">Step 3/5</div>
              <div
                className="mt-4 w-full h-2"
                style={{ backgroundColor: "#e0cfc8" }}
              >
                <div className="h-full bg-black rounded-3xl w-3/5"></div>
              </div>
              <div className="mt-12 text-3xl  text-center">
                How often would you like to receive stock updates and
                predictions?
              </div>
              <div>
                <div class="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Daily
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Weekly
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Bi-weekly
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Monthly
                  </label>
                </div>
              </div>
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className=" mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className=" bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key={step} // Add this line
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center  ">Step 4/5</div>
              <div
                className="mt-4 w-full h-2"
                style={{ backgroundColor: "#e0cfc8" }}
              >
                <div className="h-full bg-black rounded-3xl w-4/5"></div>
              </div>
              <div className="mt-12 text-3xl  text-center">
                Would you prefer to receive real-time alerts for significant
                stock market events?
              </div>
              <div>
                <div class="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No
                  </label>
                </div>
              </div>
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className=" mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className=" bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          {step === 5 && (
            <motion.div
              key={step} // Add this line
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center  ">Step 5/5</div>
              <div
                className="mt-4 w-full h-2"
                style={{ backgroundColor: "#e0cfc8" }}
              >
                <div className="h-full bg-black rounded-3xl w-5/5"></div>
              </div>
              <div className="mt-12 text-3xl  text-center">
                What level of detail would you prefer for stock analysis and
                predictions?
              </div>
              <div>
                <div class="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Beginner (simple explanations and basic insights)
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Intermediate (moderate level of technical analysis)
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Advanced (in-depth technical and fundamental analysis)
                  </label>
                </div>
              </div>
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className=" mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className=" bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          )}
          {/* {step === 4 && (
            <motion.div
              key={step} // Add this line
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="mt-12 text-base  text-center">
                Your submission has been received! We will aim to get back to
                you within 3 working days.
              </div>
              <div>
                <div className="flex justify-between mt-12">
                  <button
                    type="button"
                    onClick={redoStep}
                    className=" bg-black text-white font-bold py-2 px-4 rounded"
                  >
                    Redo the planner
                  </button>
                </div>
              </div>
            </motion.div>
          )} */}
        </form>
      </div>
    </div>
  );
}

export default ProjectPlannerForm;
