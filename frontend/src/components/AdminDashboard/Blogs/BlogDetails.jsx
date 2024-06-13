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

  return (
    <>
      <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
        <div
          class="bg-cover bg-center text-center overflow-hidden bg-[length:100%_300px] bg-no-repeat"
          style={{
            minHeight: "300px",
            backgroundImage: `url(${process.env.REACT_APP_STOCKS_API}?filename=${blog.image})`,
          }}
          title={blog.title}
        ></div>
        <div class="max-w-3xl mx-auto">
          <div class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
              <h1 href="#" class="text-gray-900 font-bold text-3xl mb-2">
                {blog.title}
              </h1>
              <p class="text-gray-700 text-xs mt-2">{blog.tag} {new Date(blog.create_at).toISOString().split("T")[0]}</p>
              <p class="text-base leading-8 my-5">{blog.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
