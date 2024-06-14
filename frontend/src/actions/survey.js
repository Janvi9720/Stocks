import { createSurvey, fetchSurveyId } from "../api/index";
import {
  GET_SURVEY_BY_ID,
  CREATE_SURVEY,
  SURVEY_ERROR_OCCURRED,
} from "../constants/actions";

// Fetch a survey by ID
export const getSurveyById = () => async (dispatch) => {
  try {
    const response = await fetchSurveyId();
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
  try {
    const response = await createSurvey(formInput);
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
