import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../../actions/blog";

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blogsReducer.blog);
  const error = useSelector((state) => state.blogsReducer.error);

  useEffect(() => {
    if (!blog || blog._id !== id) {
      dispatch(getBlogById(id));
    }
  }, [dispatch, id, blog]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  const sanitizeHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.innerHTML;
  };

  // const handleDeleteBlog = () => {
  //   dispatch(removeBlog(blog._id));
  // }

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
        <div
          className="bg-cover bg-center text-center overflow-hidden bg-[length:100%_300px] bg-no-repeat"
          style={{
            minHeight: "300px",
            backgroundImage: `url(${process.env.REACT_APP_STOCKS_API}?filename=${blog.image})`,
            }}
            title={blog.title}
            ></div>
        <div className="max-w-3xl mx-auto">
          <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            {/* <button>Update</button> */}
            {/* <button onClick={handleDeleteBlog} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-[#374151] rounded-md focus:outline-none focus:bg-gray-600">Delete</button> */}
              <h1 href="#" className="text-gray-900 font-bold text-3xl mb-2">
                {blog.title}
              </h1>
              <p className="text-gray-700 text-xs mt-2">{blog.tag} {new Date(blog.create_at).toISOString().split("T")[0]}</p>
              <div className="text-base leading-8 my-5" dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
