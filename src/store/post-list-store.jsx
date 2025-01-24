import {
  createContext,
  useCallback,
  useReducer,
  useState,
  useEffect,
} from "react";

export const PostList = createContext({
  postLists: [],
  dataFetching: false,
  addInitialPosts: () => {},
  addPost: () => {},
  deletePost: () => {},
});

const PostListReducer = (currPostList, Action) => {
  let UpdatePostList = currPostList;
  if (Action.type === "Delete_Post") {
    console.log(`This Post ID is deleted ${Action.payload.PostID}`);
    UpdatePostList = currPostList.filter(
      (item) => item.id !== Action.payload.PostID
    );
  } else if (Action.type === "Add_Post") {
    console.log(`This Post ID ${Action.payload.id} is Added `);
    UpdatePostList = [Action.payload, ...currPostList];
  } else if (Action.type === "Initital_Post") {
    UpdatePostList = Action.payload.dataposts;
  }
  return UpdatePostList;
};

const PostListProvider = ({ children }) => {
  let [postLists, dispatchPostList] = useReducer(PostListReducer, []);
  const [dataFetching, setDataFetching] = useState(false);

  const addInitialPosts = (dataposts) => {
    const InititalPostsdata = { type: "Initital_Post", payload: { dataposts } };
    dispatchPostList(InititalPostsdata);
  };

  const addPost = (post) => {
    console.log(post);
    const Additem = {
      type: `Add_Post`,
      payload: post,
    };
    dispatchPostList(Additem);
  };

  // USE THIS BELOW FUNCTION THIS IS A NORMAL FUNCTION WITHOUT useCallback

  // const deletePost = (postID) => {
  //   const Deleteitem = { type: `Delete_Post`, payload: { PostID: postID } };
  //   dispatchPostList(Deleteitem);
  // };

  const deletePost = useCallback(
    (postID) => {
      const Deleteitem = { type: `Delete_Post`, payload: { PostID: postID } };
      dispatchPostList(Deleteitem);
    },
    [dispatchPostList]
  );

  useEffect(() => {
    setDataFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setDataFetching(false);
      });

    // return () => {
    //   // console.log("Cleaning up UseEffect.");
    //   controller.abort();
    // };
  }, []);

  return (
    <PostList.Provider
      value={{
        postLists,
        addPost,
        deletePost,
        addInitialPosts,
        dataFetching,
        setDataFetching,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

let DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Pune",
    body: "Hii Friends",
    reaction: 2,
    userId: "user-9",
    tags: ["Vacation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Going to Kutch",
    body: "Hii Friends",
    reaction: 2,
    userId: "user-9",
    tags: ["Vacation", "Kutch", "Enjoying"],
  },
  {
    id: "3",
    title: "Going to Ahmedabad",
    body: "Hii Friends",
    reaction: 2,
    userId: "user-9",
    tags: ["Vacation", "Ahmedabad", "Enjoying"],
  },
  {
    id: "4",
    title: "Going to Surat",
    body: "Hii Friends",
    reaction: 2,
    userId: "user-9",
    tags: ["Vacation", "Surat", "Enjoying"],
  },
];

export default PostListProvider;
