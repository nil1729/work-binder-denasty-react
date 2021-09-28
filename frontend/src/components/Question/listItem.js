import React, { useState } from "react";
import styles from "./index.module.scss";
function ListItem(props) {
  const [id, setId] = useState(props.data.id);

  const counting = (e) => {
    if (!props.data.id) {
      // setId(props.count);

      props.incr();
      props.data.id = props.count;
      if (props.count == 6) {
        props.counts(1);
      }
    } else if (props.data.id + 1 === props.count) {
      // setId("");
      props.data.id = "";
      props.decre();
    } else if (props.data.id == 6) {
      props.counts(props.data.id);
      props.data.id = "";
    }
  };
  return (
    <>
      <li
        className={styles.draggable__item}
        value={props.data.player_id}
        onClick={() => counting()}
      >
        <div className={styles.number_column}>
          <h2>{props.data.id}</h2>
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
