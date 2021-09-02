import React, { useState, useEffect } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { clearAlerts } from '../../store/actions/auth';
import { connect } from 'react-redux';
function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const CustomSnackbar = ({ alerts }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (alerts && alerts.state && alerts.state.message) {
			setOpen(true);
		} else setOpen(false);
	}, [alerts]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		clearAlerts();
	};

	return (
		<div className={classes.root}>
			{open && (
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					{alerts.state && (
						<Alert onClose={handleClose} severity={!alerts.state.success ? 'error' : 'success'}>
							{alerts.state.message}
						</Alert>
					)}
				</Snackbar>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	alerts: state.ALERTS,
});

export default connect(mapStateToProps, { clearAlerts })(CustomSnackbar);
