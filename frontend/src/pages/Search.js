import React from 'react';
import styles from '../components/Search/index.module.scss';
import SearchIcon from '../components/Search/assets/search-icon.svg';
import CrossIcon from '../components/Users/assets/cross-icon.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import sendRequest from '../store/utils/axios-setup';
import styled from 'styled-components';
function Search({
	handleClose,
	leagueFormat,
	selectPlayer,
	playerType,
	currentSelectedIndex,
	selectedPlayers,
	selectionType,
	selectedPlayerWhenEdit,
	editPlayer,
}) {
	const [playerList, setPlayerList] = React.useState([]);
	const [hasMore, setHasMore] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(0);
	let selectedRanks = selectedPlayers.map((player) => player.rank);

	React.useEffect(() => {
		fetchMoreData();
		// eslint-disable-next-line
	}, []);

	const fetchMoreData = async (given_page, last_data = []) => {
		try {
			const res = await sendRequest.get(
				`/dynasty/list_players/${leagueFormat}?page=${
					Number(given_page) || currentPage + 1
				}&limit=${25}`
			);
			setCurrentPage(Number(given_page + 1) || currentPage + 1);

			let excludedList = [];
			if (selectionType === 'edit') {
				selectedRanks = selectedRanks.filter((it) => it !== selectedPlayerWhenEdit.rank);
				excludedList = [...playerList, ...res.data].filter(
					(player) => !selectedRanks.includes(player.rank)
				);
			} else {
				excludedList = [...playerList, ...res.data].filter(
					(player) => !selectedRanks.includes(player.rank)
				);
			}

			if (excludedList.length >= 15) {
				setPlayerList(last_data.concat(excludedList));
			} else {
				let curPage = Number(given_page) || currentPage;
				await fetchMoreData(curPage + 1, excludedList);
			}
		} catch (e) {
			console.log(e);
			setHasMore(false);
		}
	};
	const handleClick = (selectedItem) => {
		if (selectionType === 'edit') {
			editPlayer(selectedItem, playerType, currentSelectedIndex, selectedPlayerWhenEdit);
		} else {
			selectPlayer(selectedItem, playerType, currentSelectedIndex);
		}
		handleClose();
	};
	const Page = styled.div`
		background-color: ${(props) => props.theme.pageBackground};
		transition: all 1.5s ease;
		position: relative;
		color: ${(props) => props.theme.textColor};
		width: 800px;
		margin: auto;
		padding-top: 15px;
		font-family: 'Nunito Sans', sans-serif;
		overflow: hidden;
		@media (max-width: 600px) {
			width: 95%;
			margin-top: 1.5rem;
			margin-top: 10px;
		}
		max-height: 550px;
	`;
	return (
		<Page>
			{/* <div className={styles.container}> */}
			<div className={styles.cross__icon__container} onClick={handleClose}>
				<img src={CrossIcon} alt='' />
			</div>
			<h2 className={styles.page_title}>Select Player</h2>
			<div className={styles.tab_input_container}>
				<div className={styles.search__icon__container}>
					<div className={styles.search__icon}>
						<img src={SearchIcon} alt='search' />
						<input type='text' placeholder='Search player' name='player' />
					</div>
				</div>
			</div>
			<div className={styles.table}>
				<div className={styles.table__content}>
					{playerList.length >= 0 ? (
						<InfiniteScroll
							dataLength={playerList.length}
							next={fetchMoreData}
							hasMore={hasMore}
							loader={<LinearProgress />}
							height={425}
							endMessage={
								<p style={{ textAlign: 'center' }}>
									<b>Yay! You have seen it all</b>
								</p>
							}
						>
							{playerList.map((item, index) => (
								<div
									className={styles.table__row}
									key={index}
									onClick={() => {
										handleClick(item);
									}}
								>
									<div className={`${styles.table__data} ${styles.rank_index}`}>
										<h3>{item && item.rank}</h3>
									</div>
									<div className={`${styles.table__data} ${styles.name__column}`}>
										{item && item.name}
									</div>
									<div className={`${styles.uppercase} ${styles.table__data}`}>
										{item && item.team}
									</div>
									<div className={`${styles.uppercase} ${styles.table__data}`}>
										{item && item.position}
									</div>
									<div className={`${styles.table__data} ${styles.rank_index}`}>
										<h3>{item && item.value}</h3>
									</div>
								</div>
							))}
						</InfiniteScroll>
					) : (
						<LinearProgress />
					)}
				</div>
			</div>
			{/* </div> */}
		</Page>
	);
}

export default Search;
