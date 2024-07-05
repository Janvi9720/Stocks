// import { jwtDecode } from "jwt-decode";
import { fetchBlogs, fetchBlogsId, createBlog, updateBlog, removeBlog } from "../api/index";
import {
  BLOG_ERROR_OCCURRED,
  CREATE_BLOGS,
  UPDATE_BLOG,
  GET_ALL_BLOGS,
  GET_BLOG_BY_ID,
  REMOVE_BLOGS,
} from "../constants/actions";

// GET Blogs
export const getBlogs = () => async (dispatch) => {
  try {
    const { data } = await fetchBlogs();
    dispatch({ type: GET_ALL_BLOGS, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: BLOG_ERROR_OCCURRED,
        payload: error.response.data.message,
      });
    } else {
      dispatch({ type: BLOG_ERROR_OCCURRED, payload: "Blog not found!" });
    }
  }
};

// GET Blog by ID
export const getBlogById = (id) => async (dispatch) => {
  try {
    const { data } = await fetchBlogsId(id);
    dispatch({ type: GET_BLOG_BY_ID, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: BLOG_ERROR_OCCURRED,
        payload: error.response.data.message,
      });
    } else {
      dispatch({ type: BLOG_ERROR_OCCURRED, payload: "Blog not found!" });
    }
  }
};

// POST Blogs
export const createNewBlog = (formInput) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await createBlog(formInput, user.token);
    dispatch({ type: CREATE_BLOGS, payload: data });
    //   router({ pathname: `/purchased/${data.stock}`, state: { updated: true } },  {replace: true});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: BLOG_ERROR_OCCURRED,
        payload: error.response.data.message,
      });
    } else {
      dispatch({ type: BLOG_ERROR_OCCURRED, payload: "Blog Not Created!" });
    }
  }
};

// UPDATE :/id
export const updateBlogData = (id, formInput, router) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await updateBlog(id, formInput, user.token);
    dispatch({ type: UPDATE_BLOG, payload: data });
    router({ pathname: `/blogs`, state: { updated: true } },  {replace: true});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: BLOG_ERROR_OCCURRED,
        payload: error.response.data.message,
      });
    } else {
      dispatch({ type: BLOG_ERROR_OCCURRED, payload: "Blog Not Updated!" });
    }
  }
};

// DELETE Blogs
export const deleteBlog = (id, router) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    await removeBlog(id, user.token);
    dispatch({ type: REMOVE_BLOGS, payload: id });
    router({ pathname: "/blogs" }, { replace: true });
  } catch (error) {
    console.log(error.response.data.message);
    if (error.response) {
      dispatch({
        type: BLOG_ERROR_OCCURRED,
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: BLOG_ERROR_OCCURRED,
        payload: "Blog is not deleted!",
      });
    }
  }
};

