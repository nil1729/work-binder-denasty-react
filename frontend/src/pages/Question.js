import React, { useState } from "react";
import styles from "../components/Question/index.module.scss";
import Sortable from "../components/Question/Sortable";
import Sorted from "../components/Question/Sorted";
import ListItem from "../components/Question/listItem";
export default function Question() {
  const [count, setCount] = useState(1);
  const [newId, setId] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [question, setQuestion] = useState(1);
  const [myList, setMyList] = useState([
    {
      id: "1",
      name: "Aaron Jones",
    },
    {
      id: "2",
      name: "David Moore",
    },
    {
      id: "3",
      name: "Allen Lazard",
    },
    {
      id: "4",
      name: "Kawaan Baker",
    },
    {
      id: "5",
      name: "Kenneth Gainwell",
    },
    {
      id: "6",
      name: "Logan Thomas",
    },
  ]);

  function increment() {
    setCount((prev) => prev + 1);
  }
  function decrement() {
    setCount((prev) => prev - 1);
  }
  const handlePrev = () => {
    if (percentage > 0.5) {
      setPercentage((prev) => prev - 100 / 150);
    }
    if (question > 1) {
      setQuestion((prev) => prev - 1);
    }
    // setCount(1);
    // setId("");
  };
  const handleNext = () => {
    if (percentage < 100) {
      setPercentage((prev) => prev + 100 / 150);
    }
    if (question < 150) {
      setQuestion((prev) => prev + 1);
    }

    // setCount(1);
    // setId("");
  };
  return (
    <div className={styles.container}>
      <div className={styles.top_progress}>
        <div
          className={styles.top_progress_bar}
          style={{ width: ` ${percentage}%` }}
        ></div>
      </div>
      <div className={styles.question_header}>
        <h3 className={styles.question_num}>Question {question}</h3>
        <h2 className={styles.question_text}>
          Rank these players from best to worst
        </h2>
      </div>
      {/* <Sortable /> */}
      {/* <Sorted /> */}
      <div className={styles.sortable_container}>
        <ul className={styles.draggable_container2}>
          {myList.map((item, index) => (
            <ListItem
              key={index}
              data={item}
              count={count}
              incr={increment}
              decre={decrement}
              id={newId}
            />
          ))}
        </ul>
      </div>
      <div className={styles.action_btn_container2}>
        <button className={styles.btn} onClick={handlePrev}>
          Prev
        </button>
        <button className={styles.btn} onClick={handleNext}>
          Next
        </button>
        {/* <div className={styles.reset_btn} onClick={handleReset}>
          prev
        </div>
        <div className={styles.next_btn}>next</div> */}
      </div>
    </div>
  );
}
