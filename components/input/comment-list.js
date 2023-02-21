import { useCallback, useEffect, useState } from "react";
import classes from "./comment-list.module.css";

function CommentList({ items }) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((comment) => (
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
