import React, { useState } from 'react';
import styles from '../components/PPR/index.module.scss';

export default function PPR() {
	const [selectedTab, setSelectedTab] = useState(1);

	return (
		<div className={styles.container}>
			<h2 className={styles.page_title}>PPR Rankings</h2>
			<div className={styles.tab_btn_container}>
				<div
					className={`${styles.tab_btn} ${selectedTab === 1 ? styles.tab_active : ''}`}
					onClick={() => setSelectedTab(1)}
				>
					PPR
				</div>
				<div
					className={`${styles.tab_btn} ${selectedTab === 2 ? styles.tab_active : ''}`}
					onClick={() => setSelectedTab(2)}
				>
					Superflex | TE Premium
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
					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((it, index) => (
						<div className={`${(index + 1) % 2 === 0 ? styles.odd_row : ''} ${styles.table__row}`}>
							<div className={`${styles.table__data} ${styles.rank_index}`}>
								<h3>{index + 1}</h3>
							</div>
							<div className={`${styles.table__data} ${styles.name__column}`}>jonathon taylor</div>
							<div className={`${styles.uppercase} ${styles.table__data}`}>ind</div>
							<div className={`${styles.uppercase} ${styles.table__data}`}>rb</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
