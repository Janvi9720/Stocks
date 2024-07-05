import { createSurvey, fetchSurveyId } from "../api/index";
import {
  GET_SURVEY_BY_ID,
  CREATE_SURVEY,
  SURVEY_ERROR_OCCURRED,
} from "../constants/actions";

// Fetch a survey by ID
export const getSurveyById =
  (id = "") =>
  async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
      let response;
      if (id !== "") {
        response = await fetchSurveyId(id, user.token);
      } else {
        response = await fetchSurveyId(user?.result?._id , user.token);
      }
      dispatch({ type: GET_SURVEY_BY_ID, payload: response.data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: SURVEY_ERROR_OCCURRED,
          payload: error.response.data.message,
        });
      } else {
        dispatch({ type: SURVEY_ERROR_OCCURRED, payload: "Survey not found!" });
      }
    }
  };

// Add a new survey
export const createNewSurvey = (formInput) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const response = await createSurvey(formInput, user.token);
    dispatch({ type: CREATE_SURVEY, payload: response.data });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SURVEY_ERROR_OCCURRED,
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: SURVEY_ERROR_OCCURRED,
        payload: "Error creating survey!",
      });
    }
  }
};
