import React, { MouseEvent, useCallback, useRef, useState } from "react";

const HomePage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);

  const handleSubmitFeedback = useCallback((e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValue = emailInputRef.current?.value;
    const feedbackValue = feedbackInputRef.current?.value;

    const bodyParams = { email: emailValue, feedback: feedbackValue };
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(bodyParams),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const handleLoadFeedback = useCallback(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFeedbackList(data.feedback);
      });
  }, []);

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmitFeedback}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input ref={emailInputRef} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea ref={feedbackInputRef} id="feedback" rows={5} />
        </div>
        <button type="submit">Send Feedback</button>
      </form>
      <hr />
      <button onClick={handleLoadFeedback}>Load Feedback</button>
      <ul>
        {feedbackList.map((feedback) => (
          <li key={feedback.id}>{feedback.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
