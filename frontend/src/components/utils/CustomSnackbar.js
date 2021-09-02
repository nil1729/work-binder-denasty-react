import React, { useState, useEffect } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { clearAlers } from "../../store/actions/auth";
import { connect } from "react-redux";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackbar = ({ alerts }) => {
  console.log(alerts);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alerts) {
      setOpen(true);
    } else setOpen(false);
  }, [alerts]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    clearAlers();
  };

  return (
    <div className={classes.root}>
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          {alerts.state === undefined || null ? (
            <Alert onClose={handleClose} severity="error">
              Error__Disconnected__Internet !
            </Alert>
          ) : (
            <Alert
              onClose={handleClose}
              severity={!alerts.state.success ? "error" : "success"}
            >
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

export default connect(mapStateToProps, { clearAlers })(CustomSnackbar);
