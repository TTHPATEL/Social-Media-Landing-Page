import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostList } from "../store/post-list-store";
const Post = ({ postitem }) => {
  const { deletePost } = useContext(PostList);
  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {postitem.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(postitem.id)}
          >
            <AiFillDelete />
          </span>
        </h5>
        <p className="card-text">{postitem.body}</p>
        {postitem.tags.map((tag_item) => (
          <span className="badge text-bg-primary hastag" key={tag_item}>
            {tag_item}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          This post has been reacted by{" "}
          {Number(postitem.reactions.likes) +
            Number(postitem.reactions.dislikes)}{" "}
          people.
        </div>
      </div>
    </div>
  );
};

export default Post;
