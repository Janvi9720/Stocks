// import { jwtDecode } from "jwt-decode";
import { fetchBlogs,fetchBlogsId, createBlog } from "../api/index";
import {
  BLOG_ERROR_OCCURRED,
  CREATE_BLOGS,
  GET_ALL_BLOGS,
  GET_BLOG_BY_ID,
  REMOVE_BLOGS,
} from "../constants/actions";

// GET Blogs
export const getBlogs = () => async (dispatch) => {
  try {
    const { data } = await fetchBlogs();
    console.log("data blog", data);
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
  try {
    const { data } = await createBlog(formInput);
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

// DELETE Blogs
export const removeBlog = (id) => async (dispatch) => {
  try {
    await removeBlog(id);
    dispatch({ type: REMOVE_BLOGS, payload: null });
    // router("/", { replace: true });
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

// export default function Utils() {
//   const [blogData, setBlogData] = useState(null);

//   // Fetch blog data from backend
//   //   async function fetchBlogData() {
//   //     try {
//   //       const response = await axios.get("http://localhost:5000/api/blog");
//   //       setBlogData(response.data);
//   //     } catch (error) {
//   //       console.error("Error fetching blog data:", error);
//   //     }
//   //   }

//   async function postBlog(event) {
//     event.preventDefault(); // Prevent the default form submission behavior
//     const formData = new FormData(event.target);
//     try {
//       const token = localStorage.getItem("token");
//       const decodedToken = jwtDecode(token);
//       const email = decodedToken.email;
//       formData.append("email", email);
//       const blogReq = await fetch("http://localhost:5000/api/blog", {
//         method: "POST",
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//         body: formData,
//       });

//       const data = await blogReq.json();
//       return data;
//     } catch (err) {
//       console.log("error", err);
//     }
//   }

//   async function updateBlog(event, blogId) {
//     event.preventDefault(); // Prevent the default form submission behavior
//     const formData = new FormData(event.target);

//     try {
//       const token = localStorage.getItem("token");
//       const decodedToken = jwtDecode(token);
//       const email = decodedToken.email;
//       formData.append("email", email);

//       const blogReq = await fetch(`http://localhost:5000/api/blog/${blogId}`, {
//         method: "PUT",
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//         body: formData,
//       });

//       if (!blogReq.ok) {
//         const errorData = await blogReq.json();
//         throw new Error(errorData.error || "Something went wrong");
//       }

//       const data = await blogReq.json();
//       // Update the UI with the updated blog post data
//       console.log("Blog post updated successfully:", data);
//       return data;
//     } catch (err) {
//       // Display an error message to the user
//       console.error("Error updating blog post:", err);
//       // You can also show an error message to the user using a UI library or custom code
//     }
//   }

//   async function DeleteBlog(id) {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/blog/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       fetchBlogData();
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching blog data:", error);
//     }
//   }

//   return { fetchBlogData, postBlog, DeleteBlog, updateBlog, blogData };
// }
