import React, { useState } from "react";
import styles from "./index.module.scss";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

function Player() {
  const [showEditOption, setShowEditOption] = useState(false);
  const showEdit = () => {
    setShowEditOption(true);
  };
  const closeEdit = () => {
    setShowEditOption(false);
  };

  return (
    <div className={styles.grid}>
      <h4>ADD PLAYER/PICK</h4>
      <div className={styles.grid_body}>
        <div>
          <PersonIcon className={styles.person_icon} />
        </div>
        <div>
          {showEditOption ? (
            <div className={styles.editable_component}>
              <p>VAL</p>
              <div>
                <CloseIcon className={styles.close_icon} onClick={closeEdit} />
                <EditIcon />
              </div>
            </div>
          ) : (
            <AddIcon className={styles.plus_icon} onClick={showEdit} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Player;
