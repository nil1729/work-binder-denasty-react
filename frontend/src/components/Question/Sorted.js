import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
function Sorted() {
  const [count, setCount] = useState(1);
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
      id: "",
      name: "Allen Lazard",
    },
    {
      id: "",
      name: "Kawaan Baker",
    },
    {
      id: "",
      name: "Kenneth Gainwell",
    },
    {
      id: "",
      name: "Logan Thomas",
    },
  ]);

  const counting = (e) => {
    console.log(e.target.value);
    setCount((prev) => prev + 1);
    // console.log(count);
    let s = myList[e.target.value];
    console.log(s);
    s = count;
  };

  return (
    <div className={styles.sortable_container}>
      <ul className={styles.draggable_container}>
        {myList.map((item, index) => (
          <li
            className={styles.draggable__item}
            value={index}
            key={index}
            onClick={(e) => counting(e)}
          >
            <div className={styles.number_column}>
              <h2>{item.id}</h2>
            </div>
            <div className={styles.three__dot}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={styles.body__text}>{item.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sorted;
