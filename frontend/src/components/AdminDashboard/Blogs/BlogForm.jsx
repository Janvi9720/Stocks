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
import { createNewBlog } from "../../../actions/blog";
import { BLOG_ERROR_OCCURRED } from "../../../constants/actions";

export default function Blog({ handleCloseModal }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(new FormData());
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "content") {
      setValue(e.target.value);
    }

    if (e.target.files && e.target.files.length > 0) {
      setForm((prevForm) => {
        const newForm = new FormData();
        for (const [key, value] of prevForm.entries()) {
          newForm.append(key, value);
        }
        newForm.append(e.target.name, e.target.files[0]);
        return newForm;
      });
    } else {
      setForm((prevForm) => {
        const newForm = new FormData();
        for (const [key, value] of prevForm.entries()) {
          newForm.append(key, value);
        }
        newForm.set(e.target.name, e.target.value);
        return newForm;
      });
    }
  };

  const handleSubmitNewBlog = (e) => {
    e.preventDefault();
    dispatch({ type: BLOG_ERROR_OCCURRED, payload: "" });
    dispatch(createNewBlog(form));
    handleCloseModal();
  };

  return (
    <>
      <section className="max-w-4xl mx-auto bg-[#FFFFFF] mt-4">
        <form
          onSubmit={handleSubmitNewBlog}
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
                        multiple
                        accept="image/*,video/*"
                        onChange={handleChange}
                      />
                    </label>
                    <p className="pl-1 ">or drag and drop</p>
                  </div>

                  {/* <p className="text-xs ">PNG</p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white  transition-colors duration-200 transform bg-[#374151] rounded-md focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
