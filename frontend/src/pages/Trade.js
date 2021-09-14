import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styles from "../components/Trade/index.module.scss";

function Trade() {
  const [selectedTab, setSelectedTab] = useState("");
  const [size, setSize] = useState(false);
  const [settings, setSettings] = useState(false);
  const [format, setFormat] = useState(false);
  const [trade, setTrade] = useState(false);
  const [type, setType] = useState(false);
  const changeTab = (tabIndex) => async () => {
    if (selectedTab === tabIndex) return;
    setSelectedTab(tabIndex);
    setFormat(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.page_title}>LEAGUE SIZE</h2>
        <div
          className={`${styles.tab_btn_container} ${
            size === true ? styles.tab_active : ""
          }`}
          onClick={() => setSize(true)}
        >
          <div className={styles.tab_btn}>12</div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <h2 className={styles.page_title}>SCORING SETTINGS</h2>
        <div
          className={`${styles.tab_btn_container} ${
            settings === true ? styles.tab_active : ""
          }`}
          onClick={() => setSettings(true)}
        >
          <div className={styles.tab_btn}>PPR</div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <h2 className={styles.page_title}>LEAGUE FORMAT</h2>
        <div className={styles.tab_btn_container}>
          <div
            className={`${styles.tab_btn} ${
              selectedTab === 1 ? styles.tab_active : ""
            }`}
            onClick={changeTab(1)}
          >
            STANDARD
          </div>
          <div
            className={`${styles.tab_btn} ${
              selectedTab === 2 ? styles.tab_active : ""
            }`}
            onClick={changeTab(2)}
          >
            SF TE PREM
          </div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <h2 className={styles.page_title}>TYPE OF TRADE</h2>
        <div
          className={`${styles.tab_btn_container} ${
            trade === true ? styles.tab_active : ""
          }`}
          onClick={() => setTrade(true)}
        >
          <div className={styles.tab_btn}>NORMAL TRADE</div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <h2 className={styles.page_title}>LEAGUE TYPE</h2>
        <div
          className={`${styles.tab_btn_container} ${
            type === true ? styles.tab_active : ""
          }`}
          onClick={() => setType(true)}
        >
          <div className={styles.tab_btn}>DYNASTY</div>
        </div>
      </div>
      {size && settings && format && trade && type && <button>Next</button>}
    </div>
  );
}

export default Trade;
