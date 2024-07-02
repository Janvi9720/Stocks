import axios from "axios";

// axios instance
const api = axios.create({ baseURL: process.env.REACT_APP_STOCKS_API });

// send jwt token in request if user is logged in
// api.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }
//   return req;
// });

const customHeaders = (accessToken) => {
  return {
    "authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

// authentication and user
export const register = (formInput, accessToken) => api.post("/user/register", formInput, { headers: customHeaders(accessToken) });
export const login = (formInput) => api.post("/user/login", formInput);
export const userList = (accessToken) => api.get("/user/userlist", { headers: customHeaders(accessToken) })

export const userInfo = (accessToken) => api.get(`/user/userinfo/`, { headers: customHeaders(accessToken) });
export const updateUsername = (formInput, accessToken) =>
  api.patch("/user/username", formInput, { headers: customHeaders(accessToken) });
export const removeUser = (id, accessToken) => api.delete(`/user/removeuser/${id}`, { headers: customHeaders(accessToken) });

// available market stocks
export const fetchStocks = () => api.get("/stocks");
export const fetchStock = (id) => api.get(`/stocks/${id}`);

// user bought stocks
export const purchasedStocks = (accessToken) => api.get("/purchased", { headers: customHeaders(accessToken) });
export const purchasedStock = (id, accessToken) => api.get(`/purchased/${id}`, { headers: customHeaders(accessToken) });
export const addPurchasedStock = (formInput, accessToken) =>
  api.post("/purchased", formInput, { headers: customHeaders(accessToken) });
export const updatePurchasedStock = (id, formInput, accessToken) =>
  api.patch(`/purchased/${id}`, formInput, { headers: customHeaders(accessToken) });
export const removePurchasedStock = (id, accessToken) => api.delete(`/purchased/${id}`, { headers: customHeaders(accessToken) });

// transactions
export const fetchTransactions = (accessToken) => api.get("/transactions", { headers: customHeaders(accessToken) });

//logs
export const fetchLogs = (accessToken) => api.get("/logs", { headers: customHeaders(accessToken) });

// blogs
export const fetchBlogs = () => api.get("/blogs");
export const fetchBlogsId = (id) => api.get(`/blogs/${id}`);
export const createBlog = (formInput, accessToken) => api.post("/blogs", formInput, { headers: {
  "authorization": `Bearer ${accessToken}`,
  "Content-Type": "multipart/form-data",
} });
export const updateBlog = (id, formInput, accessToken) => api.put(`/blogs/${id}`, formInput, { headers: {
  "authorization": `Bearer ${accessToken}`,
  "Content-Type": "multipart/form-data",
} })
export const removeBlog = (id, accessToken) => api.delete(`/blogs/${id}`, { headers: customHeaders(accessToken) });

// survey
export const fetchSurveyId = (id, accessToken) => api.get(`/survey/${id}`, { headers: customHeaders(accessToken) });
export const createSurvey = (formInput, accessToken) => api.post("/survey", formInput, { headers: customHeaders(accessToken) });