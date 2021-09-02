import React, { useState } from 'react';
import styles from '../components/Users/index.module.scss';
import { Backdrop, Fade, Modal } from "@material-ui/core";
import UserIcon from '../components/Users/assets/user-icon.svg';
import EditIcon from '../components/Users/assets/pencil-icon.svg';
import CrossIcon from '../components/Users/assets/cross-icon.svg';
import UserAddIcon from '../components/Users/assets/user-add-icon.svg';
import Search from "./Search";
export default function Users() {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
	return (
		<div className={styles.container}>
		    <div className={styles.header__stat}>
				<div className={styles.header__stat__container}>
					<div className={styles.value__stat}>
						<h4>give</h4>
						<h3>73.9</h3>
						<h5>val</h5>
					</div>
					<div className={styles.value__stat}>
						<h4>receive</h4>
						<h3>124.3</h3>
						<h5>val</h5>
					</div>
				</div>
				<div className={`${styles.tab__container}`}>
					<h3>league format</h3>
					<div className={styles.tab__btn__container}>
						<div className={`${styles.tab__btn} ${2 === 1 ? styles.tab__active : ''}`}>1QB PPR</div>
						<div className={`${styles.tab__btn} ${2 === 2 ? styles.tab__active : ''}`}>
							SF TE PREM
						</div>
					</div>
				</div>
			</div>
			<div className={styles.user__container}>
				{[1, 2, 3, 4, 5, 6].map((item, index) =>
					index < 3 ? (
						<div className={styles.user__item} key={index}>
							<div className={styles.cross__icon__container}>
								<img src={CrossIcon} alt='' />
							</div>
							<div className={styles.top__user__name}>
								<img src={UserIcon} alt='' />
								<h4>Harold Holloway</h4>
							</div>
							<div className={styles.middle_container}>
								<div className={styles.image__container}>
									<img
										src='https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg'
										alt=''
									/>
								</div>
								<div className={styles.value__container}>
									<h2>73.9</h2>
									<h3>val</h3>
								</div>
							</div>
							<div className={styles.bottom__container}>
								<div className={styles.badge__container}>
									<div className={styles.btn__tag}>ind</div>
									<div className={styles.btn__tag}>rb</div>
								</div>
								<div className={styles.edit__icon__container}>
									<img src={EditIcon} alt='' />
								</div>
							</div>
						</div>
					) :(
						!open && (
						  <div
							className={`${styles.user__item} ${styles.blank__item}`}
							key={index}
							onClick={handleOpen}
						  >
							<img src={UserAddIcon} alt="" />
						  </div>
						)
					  )
				)}
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
            <Search handleClose={handleClose} />
          </div>
        </Fade>
      </Modal>
		</div>
	);
}
