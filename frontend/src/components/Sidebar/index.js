import React, { useState } from "react";

import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarLink,
  SidebarMenu,
} from "./SidebarElements";

import { Link } from "react-router-dom";
import styles from "./sidebar.module.scss";
const Sidebar = ({ isOpen, toggle }) => {
  const sideMenus = [
    {
      title: "home",
      path: "/",
    },
    {
      title: "blog",
      path: "/blog",
    },
    {
      title: "trade calculator",
      path: "/trade_calculator",
    },
    {
      title: "rankings",
      path: "/rankings",
    },
    {
      title: "login",
      path: "/login",
    },
  ];
  const [leagueFormat, setLeagueFormat] = useState("ON");
  const changeTab = (tab) => async () => {
    setLeagueFormat(tab);
  };
  return (
    <nav className={`${styles.nav_menu} ${isOpen ? styles.active : ""}`}>
      <ul className={styles.nav_menu_items} onClick={toggle}>
        {sideMenus.map((item, index) => {
          return (
            <li key={index} className={styles.nav_text}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          );
        })}
        <li className={styles.nav_text}>
          <div className={styles.tab__btn__container}>
            <div
              className={`${styles.tab__btn} ${
                leagueFormat === "ON" ? styles.tab__active : ""
              }`}
              onClick={changeTab("ON")}
            >
              ON
            </div>
            <div
              className={`${styles.tab__btn} ${
                leagueFormat === "OFF" ? styles.tab__active : ""
              }`}
              onClick={changeTab("OFF")}
            >
              OFF
            </div>
          </div>
          <p>Dark Mode</p>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
