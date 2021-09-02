import React from "react";
import styles from "../components/Search/index.module.scss";
import SearchIcon from "../components/Search/assets/search-icon.svg";
import CrossIcon from "../components/Users/assets/cross-icon.svg";
function Search({ handleClose }) {
  return (
    <div className={styles.container}>
      <div className={styles.cross__icon__container} onClick={handleClose}>
        <img src={CrossIcon} alt="" />
      </div>
      <h2 className={styles.page_title}>Select Player</h2>
      <div className={styles.tab_input_container}>
        <div className={styles.search__icon__container}>
          <div className={styles.search__icon}>
            <img src={SearchIcon} alt="search" />
            <input type="text" placeholder="Search player" name="player" />
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.table__content}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
            <div className={styles.table__row}>
              <div className={`${styles.table__data} ${styles.rank_index}`}>
                <h3>{item}</h3>
              </div>
              <div className={`${styles.table__data} ${styles.name__column}`}>
                jonathon taylor
              </div>
              <div className={`${styles.uppercase} ${styles.table__data}`}>
                ind
              </div>
              <div className={`${styles.uppercase} ${styles.table__data}`}>
                rb
              </div>
              <div className={`${styles.table__data} ${styles.rank_index}`}>
                <h3>88.9</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
