import { useCallback, useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/NotificationContext";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "등록 중",
      message: "댓글을 등록하고 있습니다.",
      status: "pending",
    });
    setIsLoading(true);
    fetch(`/api/comments/regist/${eventId}`, {
      method: "POST",
      body: JSON.stringify({ params: commentData }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || "댓글 등록 실패");
        });
      })
      .then(() => {
        notificationCtx.showNotification({
          title: "등록 성공",
          message: "댓글을 등록하였습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "등록 실패",
          message: error.message || "댓글 등록 실패",
          status: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const getCommentList = useCallback(() => {
    fetch(`/api/comments/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setCommentList(data.comments);
      });
  }, [eventId]);

  useEffect(() => {
    getCommentList();
  }, [getCommentList]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && (
        <CommentList items={commentList} isLoading={isLoading} />
      )}
    </section>
  );
}

export default Comments;
