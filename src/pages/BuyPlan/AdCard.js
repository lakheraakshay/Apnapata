import React from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  header: {
    // display: "flex",
    gap: 20,
    alignItems: "center",
    padding: "0 20px 10px",
    borderBottom: "2px solid #D7D7D7",
    "& label": {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "1.3rem"
    }
  },
  price: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    padding: "30px 20px",
    "& h5": {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 600,
      textAlign: "center"
    },
    "& .old": {
      opacity: 0.4,
      // textDecoration: "line-through"
    }
  },
  sale: {
    position: "absolute",
    top: "40%",
    left: "-10%",
    background: "#EA963A",
    color: "#fff",
    padding: "2px 5px",
    fontFamily: "'Roboto', sans-serif",
    "&::before": {
      content: "''",
      display: "inline-block",
      transform: "skew(60deg)",
      position: "absolute",
      background: "#EA963A",
      top: "99%",
      left: "42%",
      width: "100%",
      height: "100%",
      zIndex: -1
    }
  }
});

export default function AdCard({ subscription }) {
  const classes = useStyles();

  return (
    <Card style={{ position: "relative", overflow: "unset" }}>
      <CardContent style={{ padding: "10px 0" }}>
        <div className={classes.header}>
          <label style={{ textTransform: 'capitalize' }}>{subscription?.plan_title}</label>
          <p style={{ fontSize: '12px' }}>{subscription?.city?.name}</p>
        </div>
        <div className={classes.price}>
          <div className="new">
            <Typography variant="h5">₹{subscription?.price}</Typography>
          </div>
          <div className="old">
            <Typography variant="body1">Limit: {subscription?.post_limit}, Validity: {subscription?.plan_validity}</Typography>
          </div>
        </div>
        {
          subscription?.active && <div className={classes.sale}>Active</div>
        }
      </CardContent>
    </Card>
  );
}
