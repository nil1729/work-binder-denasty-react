import React from 'react';
import styles from '../components/Search/index.module.scss';
import SearchIcon from '../components/Search/assets/search-icon.svg';
import CrossIcon from '../components/Users/assets/cross-icon.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import sendRequest from '../store/utils/axios-setup';

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

	const fetchMoreData = async () => {
		try {
			const res = await sendRequest.get(
				`/dynasty/list_players/${leagueFormat}?page=${currentPage + 1}&limit=${25}`
			);
			setCurrentPage(currentPage + 1);
			if (selectionType === 'edit') {
				selectedRanks = selectedRanks.filter((it) => it !== selectedPlayerWhenEdit.rank);
				setPlayerList(
					[...playerList, ...res.data].filter((player) => !selectedRanks.includes(player.rank))
				);
			} else {
				setPlayerList(
					[...playerList, ...res.data].filter((player) => !selectedRanks.includes(player.rank))
				);
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

	return (
		<div className={styles.container}>
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
		</div>
	);
}

export default Search;
