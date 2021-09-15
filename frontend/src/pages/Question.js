import React from "react";
import styles from "../components/Question/index.module.scss";
import Sortable from "../components/Question/Sortable";
import Sorted from "../components/Question/Sorted";

export default function Question() {
  return (
    <div className={styles.container}>
      <div className={styles.top_progress}>
        <div className={styles.top_progress_bar}></div>
      </div>
      <div className={styles.question_header}>
        <h3 className={styles.question_num}>Question 1</h3>
        <h2 className={styles.question_text}>
          Rank these players from best to worst
        </h2>
      </div>
      <Sortable />
      {/* <Sorted /> */}
      <div className={styles.action_btn_container}>
        <div className={styles.next_btn}>next</div>
        <div className={styles.reset_btn}>reset</div>
      </div>
    </div>
  );
}
