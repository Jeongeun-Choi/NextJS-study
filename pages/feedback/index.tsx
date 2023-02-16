import React, { MouseEvent, useCallback, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState<any>({});
  const handleClickShowDetail = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const feedbackId = e.currentTarget.dataset.id;
      fetch(`/api/${feedbackId}`)
        .then((res) => res.json())
        .then((data) => {
          setFeedbackData(data.feedback);
        });
    },
    []
  );

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItem.map((item) => (
          <li key={item.id}>
            {item.text}
            <button data-id={item.id} onClick={handleClickShowDetail}>
              Show Detail
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItem: data,
    },
  };
}

export default FeedbackPage;
