import { PostList } from "../store/post-list-store";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(PostList);

  const Navigate = useNavigate();

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userID = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        reactions: { likes: reactions, dislikes: 0 },
        userId: userID,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
        Navigate("/");
      });
  };
  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your User Id here
        </label>
        <input
          type="text"
          className="form-control"
          id="userId"
          placeholder="Your User Id"
          ref={userIdElement}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
          ref={postTitleElement}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
          ref={postBodyElement}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of reactions
        </label>
        <input
          type="text"
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post"
          ref={reactionsElement}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          className="form-control"
          id="tags"
          placeholder="Please enter tags using space"
          ref={tagsElement}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
    // <Form method="POST" className="create-post">
    //   <div className="mb-3">
    //     <label htmlFor="userId" className="form-label">
    //       Enter your User Id here
    //     </label>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="userId"
    //       name="userId"
    //       placeholder="Your User Id"
    //     />
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="title" className="form-label">
    //       Post Title
    //     </label>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="title"
    //       placeholder="How are you feeling today..."
    //       name="title"
    //     />
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="body" className="form-label">
    //       Post Content
    //     </label>
    //     <textarea
    //       type="text"
    //       rows="4"
    //       className="form-control"
    //       id="body"
    //       placeholder="Tell us more about it"
    //       name="body"
    //     />
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="reactions" className="form-label">
    //       Number of reactions
    //     </label>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="reactions"
    //       placeholder="How many people reacted to this post"
    //       name="reactions"
    //     />
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="tags" className="form-label">
    //       Enter your hashtags here
    //     </label>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="tags"
    //       placeholder="Please enter tags using space"
    //       name="tags"
    //     />
    //   </div>

    //   <button type="submit" className="btn btn-primary">
    //     Post
    //   </button>
    // </Form>
  );
};
// export async function CreatePostActionForm(data) {
//   const formData = await data.request.formData();
//   const postData = Object.fromEntries(formData);
//   postData.tags = postData.tags.split(" ");
//   console.log(postData);

//   fetch("https://dummyjson.com/posts/add", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(postData),
//   })
//     .then((res) => res.json())
//     .then((post) => {
//       console.log(post);
//       addPost(post);
//       Navigate("/");
//     });
//   return redirect("/");
// }
export default CreatePost;
