import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { createNewBlog, updateBlogData } from "../../../actions/blog";
import { BLOG_ERROR_OCCURRED } from "../../../constants/actions";
import { useNavigate } from "react-router-dom";

export default function Blog({ handleCloseModal, currentBlog }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: currentBlog.title,
    content: currentBlog.content,
    tag: currentBlog.title,
    media: currentBlog.image,
  });
  const [fileName, setFileName] = useState(currentBlog.image);
  const [value, setValue] = useState(currentBlog ? currentBlog.content : "");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "content") {
      setValue(e.target.value);
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      size: originalFile.size,
      lastModified: originalFile.lastModified,
    });
  }
  const handleImageChange = (e) => {
    setFileName(e.target.files[0].name);
    const newFile = renameFile(e.target.files[0], currentBlog.image);
    setForm({ ...form, [e.target.name]: currentBlog ? newFile : e.target.files[0] });
  }


  const handleSubmitBlog = (e) => {
    e.preventDefault();
    dispatch({ type: BLOG_ERROR_OCCURRED, payload: "" });
    const formData = new FormData();
    formData.append('title', form.title)
    formData.append('content', form.content)
    formData.append('tag', form.tag)
    formData.append('media', form.media)

    if (!currentBlog) {
      dispatch(createNewBlog(form));
      return;
    }
    dispatch(updateBlogData(currentBlog._id, form, navigate));
    window.location.reload();
    handleCloseModal();
  };

  return (
    <>
      <section className="max-w-4xl mx-auto bg-[#FFFFFF] mt-4">
        <form
          onSubmit={handleSubmitBlog}
          encType="multipart/form-data"
          method="post"
        >
          <div className="grid grid-cols-1 gap-6 mt-4  ">
            <div>
              <label className="" for="username">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                defaultValue={currentBlog ? currentBlog.title : ""}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#F3F4F6] border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="" for="passwordConfirmation">
                Tag
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                onChange={handleChange}
                defaultValue={currentBlog ? currentBlog.tag : ""}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <EditorProvider>
              <Editor value={value} name="content" onChange={handleChange}>
                <Toolbar>
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <BtnLink />
                  <BtnNumberedList />
                  <BtnBulletList />
                  <BtnRedo />
                  <BtnUndo />
                  <BtnStrikeThrough />
                  <BtnClearFormatting />
                </Toolbar>
              </Editor>
            </EditorProvider>

            <div>
              <label className="block text-sm font-medium">Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {currentBlog && currentBlog.image ? (
                    <>
                      {/* <img
                        className="rounded-t-lg w-full h-32 bg-cover bg-no-repeat"
                        src={`${process.env.REACT_APP_STOCKS_API}?filename=${currentBlog.image}`}
                        alt="Blog"
                      /> */}
                    </>

                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 "
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </>
                  )}

                  <div className="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="">Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        id="file-upload"
                        name="media"
                        accept="image/*,video/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1 ">or drag and drop</p>
                  </div>
                  {fileName && (
                    <p className="font-semibold">Selected file: {fileName}</p>
                  )}

                  {/* <p className="text-xs ">PNG</p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              // onClick={handleSubmitBlog}
              className="px-6 py-2 leading-5 text-white  transition-colors duration-200 transform bg-[#374151] rounded-md focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form >
      </section >
    </>
  );
}
