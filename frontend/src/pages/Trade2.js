import React, { useState, useEffect } from "react";
import styles from "../components/Trade2/index.module.scss";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Player from "../components/Trade2/player";
function Trade2() {
  const [showEditOption, setShowEditOption] = useState(false);
  const showEdit = () => {
    setShowEditOption(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.left_column}>
        <h3>GIVE</h3>
        <div className={styles.section_total}>
          <h4>Total</h4>
          <div className={styles.total_val}>
            <h4>0.0</h4>
            <h4 className={styles.value}>VAL</h4>
          </div>
        </div>
        <div className={styles.grid_wrapper}>
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
        </div>
      </div>

      <div className={styles.right_column}>
        <h3>Receive</h3>
        <div className={styles.section_total}>
          <h4>Total</h4>
          <div className={styles.total_val}>
            <h4>0.0</h4>
            <h4 className={styles.value}>VAL</h4>
          </div>
        </div>
        <div className={styles.grid_wrapper}>
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
        </div>
      </div>
    </div>
  );
}

export default Trade2;
