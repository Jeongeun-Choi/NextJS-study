import React, { MouseEvent, useCallback, useRef } from "react";

const HomePage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

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
    </div>
  );
};

export default HomePage;
