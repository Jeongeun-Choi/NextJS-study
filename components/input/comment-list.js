import { useCallback, useEffect, useState } from "react";
import classes from "./comment-list.module.css";

function CommentList({ eventId }) {
  const [commentList, setCommentList] = useState([]);
  const getCommentList = useCallback(() => {
    fetch(`/api/comments`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.comments);
        setCommentList(data.comments);
      });
  }, []);

  useEffect(() => {
    getCommentList();
  }, [getCommentList]);

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {commentList.map((comment) => (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <div>
            By <address>{comment.email}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
