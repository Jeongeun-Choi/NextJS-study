import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/comments/regist/${eventId}`, {
      method: "POST",
      body: JSON.stringify({ params: commentData }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    // send data to API
  }

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
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={commentList} />}
    </section>
  );
}

export default Comments;
