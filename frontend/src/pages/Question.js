import React, { useState, useEffect } from 'react';
import styles from '../components/Question/index.module.scss';
import Sortable from '../components/Question/Sortable';
import Sorted from '../components/Question/Sorted';
import ListItem from '../components/Question/listItem';
import { connect } from 'react-redux';
import { getAllPlayers, publishRankings } from '../store/actions/dynasty/rankings';
import styled from 'styled-components';
const Question = ({ getAllPlayers, publishRankings }) => {
	const [count, setCount] = useState(1);
	const [newId, setId] = useState('');
	const [percentage, setPercentage] = useState(0);
	const [question, setQuestion] = useState(1);
	const [allPlayers, setAllPlayers] = useState([]);

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
			}
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

	const handleSubmit = async () => {
		if (count >= 1) {
			const rankedList = allPlayers.map((it) => {
				return {
					name: it.name,
					player_id: it.player_id,
					rank: Number(it.id),
				};
			});
			await publishRankings(rankedList);
		}
	};

	const fetchData = async () => {
		const dt = await getAllPlayers();
		setAllPlayers(dt.data);
	};

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
					<div className={styles.top_progress_bar} style={{ width: ` ${percentage}%` }}></div>
				</div>
				<div className={styles.question_header}>
					<h3 className={styles.question_num}>Question {question}</h3>
					<h2 className={styles.question_text}>Rank these players from best to worst</h2>
				</div>
				<div className={styles.sortable_container}>
					<ul className={styles.draggable_container2}>
						{allPlayers.slice((question - 1) * 6, 6 * question).map((item, index) => (
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
				</div>
			</div>
		</Page>
	);
};

export default connect(null, { getAllPlayers, publishRankings })(Question);
