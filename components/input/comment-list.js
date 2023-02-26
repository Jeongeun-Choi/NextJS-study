import classes from "./comment-list.module.css";

function CommentList({ items, isLoading }) {
  if (isLoading) {
    return <div>댓글 등록중입니다...</div>;
  }
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items?.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
