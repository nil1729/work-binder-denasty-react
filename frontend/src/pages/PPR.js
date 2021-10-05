import React, { useState, useEffect } from "react";
import styles from "../components/PPR/index.module.scss";
import { connect } from "react-redux";
import { getRankings } from "../store/actions/dynasty/rankings";
import LinearProgress from "@material-ui/core/LinearProgress";
import InfiniteScroll from "react-infinite-scroll-component";
function PPR({ getRankings }) {
  const [leagFormat, setLeagueFormat] = useState("PPR");
  const [rankingList, setRankingList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(
    (leagFormat) => {
      fetchMoreData(leagFormat);
      // eslint-disable-next-line
    },
    [leagFormat]
  );

  const changeTab = (tabIndex) => async () => {
    setLeagueFormat(tabIndex);

    setRankingList([]);
    setCurrentPage(0);
  };

  const fetchMoreData = async (page = currentPage + 1) => {
    try {
      const res = await getRankings(leagFormat, page);
      console.log(res);
      setCurrentPage(currentPage + 1);
      setRankingList([...rankingList, ...res]);
    } catch (e) {
      console.log(e);
      setHasMore(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.page_title}>PPR Rankings</h2>
      <div className={styles.tab_btn_container}>
        <div
          className={`${styles.tab_btn} ${
            leagFormat === "PPR" ? styles.tab_active : ""
          }`}
          onClick={changeTab("PPR")}
        >
          PPR
        </div>
        <div
          className={`${styles.tab_btn} ${
            leagFormat === "SF-TE-PREMIUM" ? styles.tab_active : ""
          }`}
          onClick={changeTab("SF-TE-PREMIUM")}
        >
          SuperFlex | TE Premium
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.table__header}>
          <div className={styles.header__item}>rank</div>
          <div className={`${styles.header__item} ${styles.name__column}`}>
            name
          </div>
          <div className={styles.header__item}>team</div>
          <div className={styles.header__item}>pos</div>
        </div>
        <div className={styles.table__content}>
          {rankingList.length >= 0 ? (
            <InfiniteScroll
              dataLength={rankingList.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<LinearProgress />}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {rankingList.map((player, index) => (
                <div
                  className={`${(index + 1) % 2 === 0 ? styles.odd_row : ""} ${
                    styles.table__row
                  }`}
                >
                  <div className={`${styles.table__data} ${styles.rank_index}`}>
                    <h3>{player.rank}</h3>
                  </div>
                  <div
                    className={`${styles.table__data} ${styles.name__column}`}
                  >
                    {player.name}
                  </div>
                  <div className={`${styles.uppercase} ${styles.table__data}`}>
                    {player.team}
                  </div>
                  <div className={`${styles.uppercase} ${styles.table__data}`}>
                    {player.position}
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          ) : (
            <LinearProgress />
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(null, { getRankings })(PPR);
