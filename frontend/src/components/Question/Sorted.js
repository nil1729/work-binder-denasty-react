import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import ListItem from "./listItem";

function Sorted() {
  const [count, setCount] = useState(1);
  const [dis, setDis] = useState(false);
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
    console.log("all");

    setCount((prev) => prev + 1);
    setDis(true);
  }

  return (
    <div className={styles.sortable_container}>
      <ul className={styles.draggable_container}>
        {myList.map((item, index) => (
          <ListItem
            key={index}
            data={item}
            dis={dis}
            count={count}
            incr={increment}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sorted;
