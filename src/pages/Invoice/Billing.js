import React from "react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  billing: {
    marginLeft: 40,
    background: "#fff",
    border: "2px solid #858585",
    borderRadius: 4,
    "& header": {
      padding: "20px 40px"
    },
    "& .form": {
      padding: "20px 40px"
    }
  },
  divider: {
    color: "#858585",
    border: "1px solid #858585"
  },
  form: {
    marginTop: 20,
    display: "flex",
    flexWrap: "wrap",
    columnGap: 30,
    rowGap: 30,
    justifyContent: "space-between",
    paddingBottom: 30
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    width: "45%",
    "& label": {
      fontWeight: 500
    }
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 40px",
    "& button": {
      color: "#fff"
    }
  }
});

export default function Billing() {
  const classes = useStyles();

  return (
    <div className={classes.billing}>
      <header>
        <Typography variant="h3">Billing Information</Typography>
      </header>
      <hr className="divider" />
      <div className="form">
        <Typography style={{ fontSize: "1.5rem", fontWeight: 400 }}>
          Customer Information
        </Typography>
        <form className={classes.form}>
          <div className={classes.formGroup}>
            <label htmlFor="gst">Do you have a GST Number?</label>
            <TextField
              id="gst"
              defaultValue="No"
              variant="outlined"
              size="small"
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              placeholder="Enter email address"
              variant="outlined"
              size="small"
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="customer">Customer Name</label>
            <TextField
              id="customer"
              placeholder="Enter Customer Name"
              variant="outlined"
              size="small"
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="business">Business Name</label>
            <TextField
              id="business"
              placeholder="Enter Business Name"
              variant="outlined"
              size="small"
            />
          </div>
        </form>
      </div>
      <hr className="divider" />
      <div className="form">
        <Typography style={{ fontSize: "1.5rem", fontWeight: 400 }}>
          Customer Address
        </Typography>
        <form className={classes.form}>
          <div className={classes.formGroup}>
            <label htmlFor="line-1">Address Line 1</label>
            <TextField
              id="line-1"
              placeholder="Enter address"
              variant="outlined"
              size="small"
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="line-2">Address Line 2</label>
            <TextField
              id="line-2"
              placeholder="Enter address"
              variant="outlined"
              size="small"
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="state">State</label>
            <TextField
              id="state"
              placeholder="Haryana"
              variant="outlined"
              size="small"
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="city">City</label>
            <TextField
              id="city"
              placeholder="Enter City Name"
              variant="outlined"
              size="small"
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="pin">Pincode</label>
            <TextField
              id="pin"
              placeholder="Enter Pincode"
              variant="outlined"
              size="small"
            />
          </div>
        </form>
      </div>
      <hr className="divider" />
      <div className={classes.btnContainer}>
        <Button variant="contained">Save Changes</Button>
      </div>
    </div>
  );
}
