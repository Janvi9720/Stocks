import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, getBlogById, deleteBlog } from "../../../actions/blog";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../Common/Modal";
import BlogForm from "./BlogForm";
import BlogSkeleton from "./BlogSkeleton";
import { getUserInfo } from "../../../actions/auth";

export default function BlogParent() {
  const { id } = useParams();
  const { blogs } = useSelector((state) => state.blogsReducer);
  const { authData } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blog, setBlog] = useState({});
  const blogsPerPage = 5;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBlog({});
  };

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getUserInfo());
    if (id) {
      dispatch(getBlogById(id));
    }
  }, [dispatch, id]);

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`);
  };

  // Calculate the blogs to display on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(blogs.length / blogsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sanitizeHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerHTML;
  };

  const handleDeleteBlog = (id) => {
    dispatch(deleteBlog(id, navigate));
  };

  return (
    <>
      <div className="p-5 sm:pe-3 overflow-y-scroll h-[100vh]">
        <div className="mx-auto flex items-center flex-col mt-[18%] md:mt-[6%]">
          <div className="text-4xl font-bold dark:text-gray-400">Blogs</div>
          <p className="dark:text-gray-400">
            Being Updated with Latest market talks
          </p>
        </div>
        <div className="container mx-auto">
          {authData && authData.userType === "admin" && (
            <div className="flex justify-end items-center my-2">
              <button
                onClick={handleOpenModal}
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-[#374151] rounded-md focus:outline-none focus:bg-gray-600"
              >
                Create Blog
              </button>
            </div>
          )}

          {blogs.length > 0 ? (
            <div>
              {currentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-2"
                >
                  <img
                    className="object-cover w-full h-96 md:h-auto md:w-48 p-2"
                    src={`${process.env.REACT_APP_STOCKS_API}?filename=${blog.image}`}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <div className="flex justify-between items-center">
                      <h5 onClick={() => handleCardClick(blog._id)} className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-400">
                        {blog.title}
                      </h5>
                      {authData && authData.userType === "admin" && (
                        <div className="flex justify-end place-content-end cursor-pointer gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg"
                            onClick={() => { setBlog(blog); handleOpenModal(); }}
                            height="20"
                            width="20"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="#111827"
                              d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleDeleteBlog(blog._id)}
                            height="20"
                            width="17.5"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="#f1250e"
                              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 text-sm text-gray-900 dark:text-gray-400">
                      {blog.tag}{" "}
                      {new Date(blog.create_at).toISOString().split("T")[0]}
                    </p>
                    <p
                      className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate-multiline"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(blog.content),
                      }}
                    ></p>
                    <div>
                      <button className="bg-transparent hover:bg-[#374151] text-[#374151] font-semibold hover:text-white py-2 px-4 border border-[#374151] hover:border-transparent rounded transition-colors duration-300 dark:text-gray-400 dark:hover:bg-[#374151] dark:text-white  dark:border-white dark:hover:bg-white dark:hover:text-black">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="dark:text-gray-400">
                  Page {currentPage} of {Math.ceil(blogs.length / blogsPerPage)}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={
                    currentPage === Math.ceil(blogs.length / blogsPerPage)
                  }
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <BlogSkeleton />
          )}
        </div>
      </div>

      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        title="Create Blog"
      >
        <BlogForm handleCloseModal={handleCloseModal} currentBlog={blog} />
      </Modal>
      <style jsx="true">{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}