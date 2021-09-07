import { Directions } from "@material-ui/icons";
import React, { useState } from "react";
import styles from "./ReplyForm.module.scss";
function ReplyForm() {
  const [userInput, setUserInput] = useState({
    comment: "",
    author: "",
    email: "",
    url: "",
    checkbox: "",
  });
  // const onChange = (e) => {
  //   setUserInput({
  //     ...userInput,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <div className={styles.form_container}>
      <h3>LEAVE A REPLY</h3>
      <form method="post">
        <p className={styles.comment_notes}>
          <span>Your email address will not be published.</span> Required fields
          are marked <span>*</span>
        </p>
        <p className={styles.comment_form_comment}>
          <label for="comment">Comment</label>
          <textarea
            name="comment"
            cols="45"
            rows="8"
            maxlength="65525"
            required="required"
          ></textarea>
        </p>
        <div className={styles.InputContainer}>
          <p className={styles.comment_form_comment}>
            <label for="author">
              Name <span>*</span>
            </label>{" "}
            <input
              name="author"
              type="text"
              value=""
              size="30"
              maxlength="245"
              required="required"
            />
          </p>
          <p className={styles.comment_form_comment}>
            <label for="email">
              Email <span>*</span>
            </label>{" "}
            <input
              name="email"
              type="text"
              value=""
              size="30"
              maxlength="100"
              aria-describedby="email-notes"
              required="required"
            />
          </p>
          <p className={styles.comment_form_comment}>
            <label for="url">Website</label>{" "}
            <input name="url" type="text" value="" size="30" maxlength="200" />
          </p>
        </div>
        <p>
          <input name="checkbox" type="checkbox" value="yes" />{" "}
          <label>
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </p>
        <p className={styles.form_submit}>
          <button type="submit">Post Comment</button>
        </p>
      </form>
    </div>
  );
}

export default ReplyForm;
