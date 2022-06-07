import React from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    flex: 1,
    padding: 25,
    display: "flex",
    flexDirection: "column",
    gap: 40,
    "& button": {
      color: "#fff",
      alignSelf: "flex-start",
      padding: "5px 40px"
    }
  },
  formGroup: {
    display: "flex",
    alignItems: "center",
    gap: 50,
    "& label": {
      color: "#808080",
      fontWeight: 500
    },
    "& input": {
      background: "#F6F6F6"
    }
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 15
  },
  button: {
    background: "#F9E4CD",
    color: "#8B8B8B",
    fontWeight: 600,
    padding: "7px 30px",
    borderRadius: 38,
    cursor: "pointer",
    "&.active": {
      background: "#F4C48F",
      color: "#000",
      border: "1px solid #EA963A"
    }
  }
});

export default function Form() {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <div className={classes.formGroup}>
        <label htmlFor="city">City</label>
        <TextField variant="outlined" size="small" id="city" />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="location">Location</label>
        <TextField variant="outlined" size="small" id="location" />
      </div>
      <div className={classes.formGroup}>
        <label>Looking For</label>
        <div className={classes.buttons}>
          <div className={`${classes.button} active`}>Buy</div>
          <div className={classes.button}>Rent</div>
          <div className={classes.button}>Pg</div>
        </div>
      </div>
      <div className={classes.formGroup}>
        <div className={classes.buttons}>
          <div className={`${classes.button} active`}>Residential</div>
          <div className={classes.button}>Commercial</div>
          <div className={classes.button}>Industrial</div>
          <div className={classes.button}>Farm House</div>
          <div className={classes.button}>Project land</div>
        </div>
      </div>
      <div className={classes.formGroup}>
        <label>For</label>
        <div className={classes.buttons}>
          <div className={`${classes.button} active`}>Flat</div>
          <div className={classes.button}>Plot</div>
        </div>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="brokerage">Brokerage</label>
        <TextField variant="outlined" size="small" id="brokerage" />
      </div>
      <div className={classes.formGroup}>
        <div className={classes.buttons}>
          <div className={`${classes.button} active`}>Re - Sell</div>
          <div className={classes.button}>New Booking</div>
        </div>
      </div>
      <div className={classes.formGroup}>
        <div className={classes.buttons}>
          <div className={`${classes.button} active`}>Under Construction</div>
          <div className={classes.button}>Ready to Move</div>
        </div>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="rate">Rate Approx</label>
        <TextField variant="outlined" size="small" id="rate" />
        To
        <TextField variant="outlined" size="small" />
      </div>
      <div className={classes.formGroup}>
        <label>Alert Frequency</label>
        <div className={classes.buttons}>
          <div className={`${classes.button} active`}>Daily</div>
          <div className={classes.button}>Weekly</div>
          <div className={classes.button}>Monthly</div>
        </div>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="email">Email</label>
        <TextField variant="outlined" size="small" id="email" />
      </div>
      <Button variant="contained">Save</Button>
    </form>
  );
}
