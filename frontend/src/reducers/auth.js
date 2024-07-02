import {
  AUTH,
  DELETE_USER,
  LOGOUT,
  GET_ALL_USERS,
  USER_INFO,
  USER_UPDATE_NAME,
} from "../constants/actions";

// handle user actions
const AuthReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      let profile = JSON.parse(localStorage.getItem("profile"));
      let userData = action?.data
      userData.token = profile.token; 
      localStorage.setItem("profile", JSON.stringify(userData));
      return { ...state, authData: action.data, errors: null };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null, errors: null };
    case GET_ALL_USERS:
      return action.payload;
    case USER_INFO:
      const userObject = JSON.parse(localStorage.getItem("profile"));
      localStorage.setItem("profile", JSON.stringify(userObject));
      return { ...state, authData: action.data, errors: null };
    case USER_UPDATE_NAME:
      const userObjectNewName = JSON.parse(localStorage.getItem("profile"));
      userObjectNewName.result.name = action?.data.name;
      localStorage.setItem("profile", JSON.stringify(userObjectNewName));
      return { ...state, authData: action.data, errors: null };
    case DELETE_USER:
      localStorage.removeItem("profile");
      return { ...state, authData: null, errors: null };
    default:
      return state;
  }
};

export default AuthReducer;
