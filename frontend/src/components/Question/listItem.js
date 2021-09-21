import React, { useState } from "react";
import styles from "./index.module.scss";
function ListItem(props) {
  const [id, setId] = useState(props.id);

  const counting = (e) => {
    if (!id) {
      console.log(id);
      setId(props.count);
      props.incr();
    } else if (id) {
      setId("");
      props.decre();
    }
  };
  return (
    <>
      <li
        className={styles.draggable__item}
        value={props.data.id}
        onClick={(id) => counting(id)}
      >
        <div className={styles.number_column}>
          <h2>{id}</h2>
        </div>

        <div className={styles.three__dot}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.body__text}>{props.data.name}</div>
      </li>
    </>
  );
}

export default ListItem;
