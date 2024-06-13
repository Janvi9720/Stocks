import {
  GET_ALL_BLOGS,
  CREATE_BLOGS,
  REMOVE_BLOGS,
  GET_BLOG_BY_ID,
  BLOG_ERROR_OCCURRED
} from "../constants/actions";

const initialState = {
  blogs: [],
  blog: null,
  error: null
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        error: null
      };
    case REMOVE_BLOGS:
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog._id !== action.payload),
        error: null
      };
    case CREATE_BLOGS:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        error: null
      };
    case GET_BLOG_BY_ID:
      return {
        ...state,
        blog: action.payload,
        error: null
      };
    case BLOG_ERROR_OCCURRED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default blogsReducer;
