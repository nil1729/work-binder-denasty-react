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
const Sidebar = ({ isOpen, toggle, ...props }) => {
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
  const [leagueFormat, setLeagueFormat] = useState("OFF");
  const changeTab = (tab) => async () => {
    // setLeagueFormat(tab);
    if (tab === "ON") {
      props.setTheme("dark");
    } else {
      props.setTheme("light");
    }
  };
  return (
    <nav
      className={`${styles.nav_menu} ${isOpen ? styles.active : ""} ${
        props.theme === "light" ? styles.dark : styles.light
      }`}
    >
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
                props.theme === "dark" ? styles.tab__active_dark : ""
              }`}
              onClick={changeTab("ON")}
            >
              ON
            </div>
            <div
              className={`${styles.tab__btn} ${
                props.theme === "light" ? styles.tab__active : ""
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
