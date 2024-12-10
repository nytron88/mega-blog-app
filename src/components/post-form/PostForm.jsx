import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/appwriteService";
import { RTE, Button, Input, Loader } from "../index";

function PostForm({ post }) {
  const { register, control, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.auth.userData);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    setShowError(false);
    try {
      let file = null;
      if (data.image?.[0]) {
        file = await appwriteService.uploadFile(data.image[0]);
        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }

      if (post) {
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        if (!file) throw new Error("File upload failed. Please try again.");
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: file.$id,
          userId: currentUserData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    if (!post) {
      const subscription = watch((value, { name }) => {
        if (name === "title") {
          setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [watch, slugTransform, setValue, post]);

  const closeError = () => {
    setShowError(false);
  };

  return (
    <>
      {showError && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 text-center z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={closeError}
              className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close error message"
            >
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-md">
          <Input
            label="Title"
            placeholder="Enter post title"
            className="w-full bg-white focus:bg-white text-black"
            labelColor="text-black"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="post-slug"
            className="w-full bg-white focus:bg-white text-black"
            labelColor="text-black"
            disabled={post ? true : false}
            {...register("slug", { required: true })}
            onInput={(e) => {
              if (!post) {
                setValue(
                  "slug",
                  slugTransform(e.currentTarget.value),
                  { shouldValidate: true }
                );
              }
            }}
          />
          <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
          <Input
            label="Featured Image"
            type="file"
            className="w-full bg-white focus:bg-white text-black"
            labelColor="text-black"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("status", { required: true })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full">
            {post ? "Update" : "Create"}
          </Button>
        </form>
      )}
    </>
  );
}

export default PostForm;
