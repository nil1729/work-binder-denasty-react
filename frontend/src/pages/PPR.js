import React, { useState, useEffect } from 'react';
import styles from '../components/PPR/index.module.scss';
import { connect } from 'react-redux';
import { getRankings } from '../store/actions/dynasty/rankings';
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from '@material-ui/lab/Pagination';

function PPR({ getRankings }) {
	const [selectedTab, setSelectedTab] = useState(1);
	const [fetchingList, setFetchingList] = useState(true);
	const [rankingList, setRankingList] = useState([]);
	const [currentRankingType, setCurrentRankingType] = useState('PPR');
	const [myPagination, setMyPagination] = useState({ page: 1 });

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	const changeTab = (tabIndex) => async () => {
		if (selectedTab === tabIndex) return;
		const rankType = tabIndex === 1 ? 'PPR' : 'SF-TE-PREMIUM';
		setSelectedTab(tabIndex);
		setCurrentRankingType(rankType);
		setMyPagination({ page: 1 });
		fetchData(rankType);
	};

	const pageChange = (event, value) => {
		setMyPagination({ page: value });
		fetchData(currentRankingType, value);
	};

	const fetchData = async (rankType = 'PPR', pageNum = 1) => {
		setFetchingList(true);
		const dt = await getRankings(rankType, pageNum);
		setRankingList(dt);
		setFetchingList(false);
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.page_title}>PPR Rankings</h2>
			<div className={styles.tab_btn_container}>
				<div
					className={`${styles.tab_btn} ${selectedTab === 1 ? styles.tab_active : ''}`}
					onClick={changeTab(1)}
				>
					PPR
				</div>
				<div
					className={`${styles.tab_btn} ${selectedTab === 2 ? styles.tab_active : ''}`}
					onClick={changeTab(2)}
				>
					SuperFlex | TE Premium
				</div>
			</div>
			<div className={styles.table}>
				<div className={styles.table__header}>
					<div className={styles.header__item}>rank</div>
					<div className={`${styles.header__item} ${styles.name__column}`}>name</div>
					<div className={styles.header__item}>team</div>
					<div className={styles.header__item}>pos</div>
				</div>
				<div className={styles.table__content}>
					{fetchingList ? (
						<LinearProgress style={{ marginTop: '1rem' }} />
					) : (
						<>
							{rankingList.map((player, index) => (
								<div
									className={`${(index + 1) % 2 === 0 ? styles.odd_row : ''} ${styles.table__row}`}
								>
									<div className={`${styles.table__data} ${styles.rank_index}`}>
										<h3>{player.rank}</h3>
									</div>
									<div className={`${styles.table__data} ${styles.name__column}`}>
										{player.name}
									</div>
									<div className={`${styles.uppercase} ${styles.table__data}`}>{player.team}</div>
									<div className={`${styles.uppercase} ${styles.table__data}`}>
										{player.position}
									</div>
								</div>
							))}
							<div className={styles.pagination_container}>
								<Pagination
									count={10}
									color='primary'
									onChange={pageChange}
									page={myPagination.page}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default connect(null, { getRankings })(PPR);
