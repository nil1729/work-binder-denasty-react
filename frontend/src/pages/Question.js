import React, { useState, useEffect } from "react";
import styles from "../components/Question/index.module.scss";
import Sortable from "../components/Question/Sortable";
import Sorted from "../components/Question/Sorted";
import ListItem from "../components/Question/listItem";
import { connect } from "react-redux";
import { getAllPlayers } from "../store/actions/dynasty/rankings";
import styled from "styled-components";
const Question = ({ getAllPlayers }) => {
  const [count, setCount] = useState(1);
  const [newId, setId] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [question, setQuestion] = useState(1);
  const [allPlayers, setAllPlayers] = useState([]);
  const [myList, setMyList] = useState([
    // {
    //   id: "1",
    //   name: "Aaron Jones",
    // },
    // {
    //   id: "2",
    //   name: "David Moore",
    // },
    // {
    //   id: "3",
    //   name: "Allen Lazard",
    // },
    // {
    //   id: "4",
    //   name: "Kawaan Baker",
    // },
    // {
    //   id: "5",
    //   name: "Kenneth Gainwell",
    // },
    // {
    //   id: "6",
    //   name: "Logan Thomas",
    // },
  ]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function increment() {
    if (count < 7) {
      setCount((prev) => prev + 1);
    }
  }
  function decrement() {
    setCount((prev) => prev - 1);
  }
  function settingCount(id) {
    setCount(id);
  }
  const handlePrev = () => {
    if (count == 1 || count == 7) {
      if (percentage > 0.5) {
        setPercentage((prev) => prev - 100 / 150);
      }
      if (question > 1) {
        setQuestion((prev) => prev - 1);
        // setCount(6);
      }
      // pageData(question);

      // setId("");
    }
  };
  const handleNext = () => {
    if (count == 1 || count == 6) {
      if (percentage < 100) {
        setPercentage((prev) => prev + 100 / 150);
      }
      if (question < 150) {
        setQuestion((prev) => prev + 1);
      }
      // pageData(question);
      setCount(1);
      // setId("");
    }
  };
  const handleSubmit = () => {
    if (count >= 1) {
      console.log(allPlayers);
    }
  };
  const fetchData = async () => {
    // setFetchingList(true);
    const dt = await getAllPlayers();
    // console.log(dt.data);
    setAllPlayers(dt.data);
    // const x = [];
    // for (let index = 0; index < 6; index++) {
    //   x.push(allPlayers[index]);
    // }

    // setFetchingList(false);
  };
  // const pageData = (q) => {
  //   const x = [];
  //   for (let index = q * 6; index < 6; index++) {
  //     x.push(allPlayers[index]);
  //   }
  //   console.log(x);
  //   setMyList(x);
  // };
  const Page = styled.div`
    color: ${(props) => props.theme.textColor};
    transition: all 1.5s ease;
    width: 800px;
    margin: auto;
    margin-top: 2rem;
    @media (max-width: 600px) {
      width: 95%;
      margin-top: 1.5rem;
    }
  `;
  return (
    <Page>
      <div className={styles.container}>
        <div className={styles.top_progress}>
          <div
            className={styles.top_progress_bar}
            style={{ width: ` ${percentage}%` }}
          ></div>
        </div>
        <div className={styles.question_header}>
          <h3 className={styles.question_num}>Question {question}</h3>
          <h2 className={styles.question_text}>
            Rank these players from best to worst
          </h2>
        </div>
        {/* <Sortable /> */}
        {/* <Sorted /> */}
        <div className={styles.sortable_container}>
          <ul className={styles.draggable_container2}>
            {allPlayers
              .slice((question - 1) * 6, 6 * question)
              .map((item, index) => (
                <ListItem
                  key={index}
                  data={item}
                  count={count}
                  incr={increment}
                  decre={decrement}
                  counts={settingCount}
                  id={newId}
                />
              ))}
          </ul>
        </div>
        <div className={styles.action_btn_container2}>
          {question !== 1 && (count == 7 || count == 1) && (
            <button className={styles.btn} onClick={handlePrev}>
              Prev
            </button>
          )}

          {question !== 150 && count == 1 && (
            <button className={styles.btn} onClick={handleNext}>
              Next
            </button>
          )}
          {question == 150 && count == 1 && (
            <button className={styles.btn} onClick={handleSubmit}>
              Submit
            </button>
          )}

          {/* <div className={styles.reset_btn} onClick={handleReset}>
          prev
        </div>
        <div className={styles.next_btn}>next</div> */}
        </div>
      </div>
    </Page>
  );
};

export default connect(null, { getAllPlayers })(Question);
