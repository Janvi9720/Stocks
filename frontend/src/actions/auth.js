import {
  login,
  register,
  userList,
  userInfo,
  updateUsername,
  removeUser,
} from "../api/index.js";
import {
  AUTH,
  AUTH_ERROR_OCCURRED,
  DELETE_USER,
  USER_ERROR_OCCURRED,
  GET_ALL_USERS,
  USER_INFO,
  USER_UPDATE_NAME,
} from "../constants/actions";

// POST /user/login
export const loginUser = (formInput, router, state) => async (dispatch) => {
  try {
    const { data } = await login(formInput);
    dispatch({ type: AUTH, data });
    router(state?.from || "/", { replace: true });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: AUTH_ERROR_OCCURRED,
        payload: error.response.data.message,
      });
    } else {
      dispatch({ type: AUTH_ERROR_OCCURRED, payload: "Auth server is down!" });
    }
  }
};

// POST /user/register
export const registerUser = (formInput) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await register(formInput, user.token);
    dispatch({ type: AUTH, data });
    // window.history.replaceState({}, document.title, '/');
    // window.location.reload();
    window.location.href = '/';

  } catch (error) {
    if (error.response) {
      if(error.response.data.message === "User already exists."){
        console.log("User already exists");
        const data = error.response.data.data;
        dispatch({ type: AUTH, data });
      }else{
        dispatch({
          type: AUTH_ERROR_OCCURRED,
          payload: error.response.data.message,
        });
      }
    } else {
      dispatch({ type: AUTH_ERROR_OCCURRED, payload: "Auth server is down!" });
    }
  }
};

// GET /user/userlist
export const getUserList = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await userList(user.token);
    dispatch({ type: GET_ALL_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// GET /user/userinfo
export const getUserInfo = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await userInfo(user.token);
    dispatch({ type: USER_INFO, data });
  } catch (error) {
    console.log(error);
  }
};

// PATCH /user/username
export const updateUserName = (formInput, router) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await updateUsername(formInput, user.token);
    dispatch({ type: USER_UPDATE_NAME, data });
    router("/", { replace: true });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: USER_ERROR_OCCURRED,
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: USER_ERROR_OCCURRED,
        payload: "Accounts server is down!",
      });
    }
  }
};

// DELETE /user/removeuser
export const removeUserAccount =
  (id = "", router) =>
  async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
      if (id !== "") {
        await removeUser(id, user.token);
      } else {
        await removeUser();
        dispatch({ type: DELETE_USER, payload: id });
        router("/", { replace: true });
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response) {
        dispatch({
          type: USER_ERROR_OCCURRED,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: USER_ERROR_OCCURRED,
          payload: "Accounts server is down!",
        });
      }
    }
  };
