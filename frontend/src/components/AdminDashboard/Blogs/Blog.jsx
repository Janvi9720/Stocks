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
  const { authData } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getUserInfo());
    if (id) {
      dispatch(getBlogById(id));
    }
  }, [dispatch, id]);
  console.log("getUserInfo", authData);
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
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.innerHTML;
  };

  const handleDeleteBlog = (id) => {
    dispatch(deleteBlog(id, navigate));
  }

  return (
    <>
      <div className="p-[5%] pe-3 overflow-y-scroll h-[100vh]">
        <div className="mx-auto sm:p-10 md:p-16 flex items-center flex-col">
          <div className="text-4xl font-bold">Blogs</div>
          <p className="">Being Updated with Latest market talks</p>
        </div>
        <div className="container mx-auto p-4">
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
          {(blogs.length > 0) ? (
            <div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {currentBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col cursor-pointer"
                    onClick={() => handleCardClick(blog._id)}
                  >
                    <img
                      className="rounded-t-lg w-full h-48 bg-cover bg-no-repeat"
                      src={`${process.env.REACT_APP_STOCKS_API}?filename=${blog.image}`}
                      alt=""
                    />
                    <div className="p-5 flex flex-col flex-grow">
                      
                    {authData && authData.userType === "admin" && (
                      <div className="flex justify-end place-content-end">
                        <svg xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleDeleteBlog(blog._id)}
                          height="20" width="17.5"
                          viewBox="0 0 448 512">
                          <path fill="#f1250e" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </div>
                      )}
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {blog.title}
                      </h5>
                      <div className="flex-grow">
                        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate-multiline h-12" dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}></div>
                      </div>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {blog.tag}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
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
      <style jsx>
        {`
          .truncate-multiline {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}
      </style>
      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        title="Create Blog"
      >
        <BlogForm handleCloseModal={handleCloseModal} />
      </Modal>
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>

  );
}
