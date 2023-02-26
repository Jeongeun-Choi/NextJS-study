import { useContext, useRef } from "react";
import NotificationContext from "../../store/NotificationContext";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const inputRef = useRef(null);
  const notification = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    notification.showNotification({
      title: "Signing Up...",
      message: "Registering for newsletter!",
      status: "pending",
    });
    const value = inputRef.current.value;
    fetch("/api/newsletter/regist", {
      method: "POST",
      body: JSON.stringify({ email: value }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notification.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        notification.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={inputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
