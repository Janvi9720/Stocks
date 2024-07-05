// reducers/surveyReducer.js
import { GET_SURVEY_BY_ID, CREATE_SURVEY, SURVEY_ERROR_OCCURRED } from "../constants/actions";

const initialState = {
  survey: null,
  surveys: [],
  error: null,
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SURVEY_BY_ID:
      return {
        ...state,
        survey: action.payload,
        error: null,
      };
    case CREATE_SURVEY:
      return {
        ...state,
        survey: [...state.survey, action.payload],
        error: null,
      };
    case SURVEY_ERROR_OCCURRED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default surveyReducer;
