import { purchasedStocks, purchasedStock, addPurchasedStock, updatePurchasedStock, removePurchasedStock } from '../api/index.js';
import { GET_ALL_PURCHASED, GET_ONE_PURCHASED, ADD_PURCHASED, UPDATE_PURCHASED, REMOVE_PURCHASED, PURCHASED_ERROR_OCCURRED } from '../constants/actions';

// GET /purchased
export const getPurchases = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await purchasedStocks(user.token);
    dispatch({ type: GET_ALL_PURCHASED, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: error.response.data.message });
    } else {
      dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: "Investment server is down!" });
    }
  }
};

// GET /purchased/:id
export const getPurchase = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await purchasedStock(id, user.token);
    dispatch({ type: GET_ONE_PURCHASED, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: error.response.data.message });
    } else {
      dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: "Investment server is down!" });
    }
  }
};

// POST /purchased
export const addPurchase = (formInput, router) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await addPurchasedStock(formInput, user.token);
    dispatch({ type: ADD_PURCHASED, payload: data });
    router({ pathname: `/purchased/${data.stock}`, state: { updated: true } },  {replace: true});
  } catch (error) {
    if (error.response) {
      dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: error.response.data.message });
    } else {
      dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: "Investment server is down!" });
    }
  }
};

// PATCH /purchased/:id
export const updatePurchase = (id, formInput, router, sharesBought, sharesHeld) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await updatePurchasedStock(id, formInput, user.token);
    dispatch({ type: UPDATE_PURCHASED, payload: data });
    if (sharesBought < 0 && (Math.abs(sharesBought) >= sharesHeld)) {
      router({ pathname: '/purchased/', state: { updated: true } },  {replace: true});
      return;
    }
    router({ pathname: `/purchased/${id}`, state: { updated: true } },  {replace: true});
  } catch (error) {
    if (error.response) {
      dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: error.response.data.message });
    } else {
      dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: "Investment server is down!" });
    }
  }
};

// DELETE /purchased/:id
export const removePurchase = (id, router) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    await removePurchasedStock(id, user.token);
    dispatch({ type: REMOVE_PURCHASED, payload: null });
    router({ pathname: '/purchased/', state: { updated: true }},  {replace: true});
  } catch (error) {
    if (error.response) {
      dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: error.response.data.message });
    } else {
      dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: "Investment server is down!" });
    }
  }
};
