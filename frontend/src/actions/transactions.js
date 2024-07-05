import { fetchTransactions } from '../api/index.js';
import { GET_ALL_TRANSACTIONS, TRANSACTION_ERROR_OCCURRED } from '../constants/actions';

// GET /transactions
export const getTransactions = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await fetchTransactions(user.token);
    dispatch({ type: GET_ALL_TRANSACTIONS, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({ type: TRANSACTION_ERROR_OCCURRED, payload: error.response.data.message });
    } else {
      dispatch({ type: TRANSACTION_ERROR_OCCURRED, payload: "Transaction server is down!" });
    }
  }
};
