import { useContext, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMsg from "../WelcomeMsg";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postLists, addInitialPosts, dataFetching, setDataFetching } =
    useContext(PostListData);
  const handleOnclickFetchAPI = () => {
    setDataFetching(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setDataFetching(false);
      });
  };

  return (
    <>
      {dataFetching && <LoadingSpinner></LoadingSpinner>}

      {!dataFetching && postLists.length === 0 && (
        <WelcomeMsg handleOnclickFetchAPI={handleOnclickFetchAPI} />
      )}

      {!dataFetching &&
        postLists.map((postitem) => (
          <Post key={postitem.id} postitem={postitem} />
        ))}
    </>
  );
};
export default PostList;
