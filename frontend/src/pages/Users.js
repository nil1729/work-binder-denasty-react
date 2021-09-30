import React, { useState } from "react";
import styles from "../components/Users/index.module.scss";
import { Backdrop, Fade, Modal } from "@material-ui/core";
import UserIcon from "../components/Users/assets/user-icon.svg";
import EditIcon from "../components/Users/assets/pencil-icon.svg";
import CrossIcon from "../components/Users/assets/cross-icon.svg";
import UserAddIcon from "../components/Users/assets/user-add-icon.svg";
import Search from "./Search";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAlert } from "../store/actions/alerts";
import querySearch from "stringquery";

function Users({ addAlert }) {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [leaueSize, setLeagueSize] = useState(null);
  const [scoringSetting, setScoringSetting] = useState(null);
  const [leagueFormat, setLeagueFormat] = useState("STANDARD");
  const [tradeType, setTradeType] = useState(null);
  const [leagueType, setLeagueType] = useState(null);
  const [give_value, set_give_value] = useState("0.0");
  const [receive_value, set_receive_value] = useState("0.0");
  const [give_players, set_give_players] = useState(Array.from({ length: 6 }));
  const [receive_players, set_receive_players] = useState(
    Array.from({ length: 6 })
  );
  const [playerType, setPlayerType] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(null);
  const [selectionType, setSelectionType] = useState(null);
  const [selectedPlayerWhenEdit, setSelectedPlayerWhenEdit] = useState(null);

  // const requiredFields = [
  // 	'league_format',
  // 	'league_size',
  // 	'league_type',
  // 	'scoring_settings',
  // 	'trade_type',
  // ];
  // const validLeagueFormat = ['STANDARD', 'SF-TE-PREMIUM'];

  // React.useEffect(() => {
  // 	let parsedSearchQuery = querySearch(history.location.search);
  // 	if (
  // 		requiredFields.every((key) => Object.keys(parsedSearchQuery).includes(key)) &&
  // 		validLeagueFormat.includes(parsedSearchQuery.league_format)
  // 	) {
  // 		setLeagueFormat(parsedSearchQuery.league_format);
  // 		setLeagueType(parsedSearchQuery.league_type);
  // 		setLeagueSize(parsedSearchQuery.league_size);
  // 		setTradeType(parsedSearchQuery.trade_type);
  // 		setScoringSetting(parsedSearchQuery.scoring_settings);
  // 	} else {
  // 		addAlert('error', 'Please choose the required option first');
  // 		history.push('/trade_calculator');
  // 	}
  // 	// eslint-disable-next-line
  // }, []);

  const changeTab = (tab) => async () => {
    //   if (selectedTab === tabIndex) return;
    //   const rankType = tabIndex === 1 ? "PPR" : "SF-TE-PREMIUM";
    //   setSelectedTab(tabIndex);
    //   setCurrentRankingType(rankType);
    //   setMyPagination({ page: 1 });
    //   fetchData(rankType);
    setLeagueFormat(tab);
  };
  const selectPlayer = (player, player_type, selectedIndex) => {
    if (player_type === "giver") {
      set_give_players(
        give_players.map((it, index) => {
          if (index === selectedIndex) return player;
          else return it;
        })
      );
      set_give_value(
        Number(parseFloat(give_value) + parseFloat(player.value)).toFixed(2)
      );
      setSelectedPlayers([...selectedPlayers, player]);
      let count = 0;
      give_players.map((it, index) => {
        if (it) {
          count++;
        }
      });
      if (count == 5) {
        set_give_players((prev) => {});
      }
      //   if (give_players) {
      //     console.log(give_players[0]);
      //     // set_give_players(Array.from({ length: 9 }));
      //   }
    } else {
      set_receive_players(
        receive_players.map((it, index) => {
          if (index === selectedIndex) return player;
          else return it;
        })
      );
      set_receive_value(
        Number(parseFloat(receive_value) + parseFloat(player.value)).toFixed(2)
      );
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const removePlayer = (player, player_type, selectedIndex) => {
    if (player_type === "giver") {
      set_give_players(
        give_players.map((it, index) => {
          if (index === selectedIndex) return undefined;
          else return it;
        })
      );
      set_give_value(
        Number(parseFloat(give_value) - parseFloat(player.value)).toFixed(2)
      );
      setSelectedPlayers(
        selectedPlayers.filter((it) => it.rank !== player.rank)
      );
    } else {
      set_receive_players(
        receive_players.map((it, index) => {
          if (index === selectedIndex) return undefined;
          else return it;
        })
      );
      set_receive_value(
        Number(parseFloat(receive_value) - parseFloat(player.value)).toFixed(2)
      );
      setSelectedPlayers(
        selectedPlayers.filter((it) => it.rank !== player.rank)
      );
    }
  };

  const editPlayer = (player, player_type, selectedIndex, old_player) => {
    if (player_type === "giver") {
      set_give_players(
        give_players.map((it, index) => {
          if (index === selectedIndex) return player;
          else return it;
        })
      );
      set_give_value(
        Number(
          parseFloat(give_value) +
            parseFloat(player.value) -
            parseFloat(old_player.value)
        ).toFixed(2)
      );
      setSelectedPlayers(
        [...selectedPlayers, player].filter((it) => it.rank !== old_player.rank)
      );
    } else {
      set_receive_players(
        receive_players.map((it, index) => {
          if (index === selectedIndex) return player;
          else return it;
        })
      );
      set_receive_value(
        Number(
          parseFloat(receive_value) +
            parseFloat(player.value) -
            parseFloat(old_player.value)
        ).toFixed(2)
      );
      setSelectedPlayers(
        [...selectedPlayers, player].filter((it) => it.rank !== old_player.rank)
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header__stat}>
        <div className={styles.header__stat__container}>
          <div className={styles.value__stat}>
            <h4>give</h4>
            <h3>{give_value}</h3>
            <h5>val</h5>
          </div>
          <div className={styles.value__stat}>
            <h4>receive</h4>
            <h3>{receive_value}</h3>
            <h5>val</h5>
          </div>
        </div>
        <div className={`${styles.tab__container}`}>
          <h3>league format</h3>
          <div className={styles.tab__btn__container}>
            <div
              className={`${styles.tab__btn} ${
                leagueFormat === "STANDARD" ? styles.tab__active : ""
              }`}
              onClick={changeTab("STANDARD")}
            >
              1QB PPR
            </div>
            <div
              className={`${styles.tab__btn} ${
                leagueFormat === "SF-TE-PREMIUM" ? styles.tab__active : ""
              }`}
              onClick={changeTab("SF-TE-PREMIUM")}
            >
              SF TE PREM
            </div>
          </div>
        </div>
      </div>
      <div className={styles.user_player_wrapper}>
        <div className={styles.give_players}>
          <h3 className={styles.user__container__title}>GIVE</h3>
          <div className={styles.user__container}>
            {give_players.map((item, index) =>
              item ? (
                <div className={styles.user__item} key={index}>
                  <div
                    className={styles.cross__icon__container}
                    onClick={() => {
                      removePlayer(item, "giver", index);
                    }}
                  >
                    <img src={CrossIcon} alt="" />
                  </div>
                  <div className={styles.top__user__name}>
                    <img src={UserIcon} alt="" />
                    <h4>{item && item.name}</h4>
                  </div>
                  <div className={styles.middle_container}>
                    <div className={styles.image__container}>
                      <img
                        src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.value__container}>
                      <h2>{item && item.value}</h2>
                      <h3>val</h3>
                    </div>
                  </div>
                  <div className={styles.bottom__container}>
                    <div className={styles.badge__container}>
                      <div className={styles.btn__tag}>{item && item.team}</div>
                      <div className={styles.btn__tag}>
                        {item && item.position}
                      </div>
                    </div>
                    <div
                      className={styles.edit__icon__container}
                      onClick={() => {
                        setCurrentSelectedIndex(index);
                        setPlayerType("giver", index);
                        handleOpen();
                        setSelectionType("edit");
                        setSelectedPlayerWhenEdit(item);
                      }}
                    >
                      <img src={EditIcon} alt="" />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.user__item} ${styles.blank__item}`}
                  key={index}
                  onClick={() => {
                    setCurrentSelectedIndex(index);
                    setPlayerType("giver", index);
                    setSelectionType("insert");
                    handleOpen();
                  }}
                >
                  <img src={UserAddIcon} alt="" />
                </div>
              )
            )}
          </div>
        </div>
        <div className={styles.give_players}>
          <h3 className={styles.user__container__title}>RECEIVE</h3>
          <div className={styles.user__container}>
            {receive_players.map((item, index) =>
              item ? (
                <div className={styles.user__item} key={index}>
                  <div
                    className={styles.cross__icon__container}
                    onClick={() => {
                      removePlayer(item, "receiver", index);
                    }}
                  >
                    <img src={CrossIcon} alt="" />
                  </div>
                  <div className={styles.top__user__name}>
                    <img src={UserIcon} alt="" />
                    <h4>{item && item.name}</h4>
                  </div>
                  <div className={styles.middle_container}>
                    <div className={styles.image__container}>
                      <img
                        src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles.value__container}>
                      <h2>{item && item.value}</h2>
                      <h3>val</h3>
                    </div>
                  </div>
                  <div className={styles.bottom__container}>
                    <div className={styles.badge__container}>
                      <div className={styles.btn__tag}>{item && item.team}</div>
                      <div className={styles.btn__tag}>
                        {item && item.position}
                      </div>
                    </div>
                    <div
                      className={styles.edit__icon__container}
                      onClick={() => {
                        setCurrentSelectedIndex(index);
                        setPlayerType("receiver", index);
                        handleOpen();
                        setSelectionType("edit");
                        setSelectedPlayerWhenEdit(item);
                      }}
                    >
                      <img src={EditIcon} alt="" />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.user__item} ${styles.blank__item}`}
                  key={index}
                  onClick={() => {
                    setCurrentSelectedIndex(index);
                    setPlayerType("receiver", index);
                    setSelectionType("insert");
                    handleOpen();
                  }}
                >
                  <img src={UserAddIcon} alt="" />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={styles.form_wrapper}>
            <Search
              handleClose={handleClose}
              leagueFormat={leagueFormat}
              selectPlayer={selectPlayer}
              playerType={playerType}
              currentSelectedIndex={currentSelectedIndex}
              selectedPlayers={selectedPlayers}
              selectionType={selectionType}
              selectedPlayerWhenEdit={selectedPlayerWhenEdit}
              editPlayer={editPlayer}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default connect(null, { addAlert })(Users);
