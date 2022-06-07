import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

import handshake from "../../../assets/buy/handshake.png";

const useStyles = makeStyles({
  card: {
    background: "#fff",
    borderRadius: 6,
    overflow: "hidden"
  },
  wrapper: {
    padding: "10px 20px",
    "& .title": {
      textDecoration: "underline"
    },
    "& .name": {
      color: "#989898",
      margin: "5px 0"
    },
    "& .price": {
      display: "flex",
      justifyContent: "space-between",
      "& .name": {
        fontFamily: "'Roboto', sans-serif",
        "& span": {
          color: "#000"
        }
      }
    }
  }
});

export default function PreviewCard() {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div className="image">
        <img src={handshake} alt="two people shaking hands" />
      </div>
      <div className={classes.wrapper}>
        <Typography variant="body1" className="title">
          Apollo DB City
        </Typography>
        <Typography variant="body1" className="name">
          DB Infrastructure &amp; Apollo Creations
        </Typography>
        <Typography variant="body1" className="name">
          Nipania
        </Typography>
        <div className="price">
          <Typography variant="body1" className="name">
            3, 4, 5 BHK Flats
          </Typography>
          <Typography variant="body1" className="name">
            <span>Rs 75.8 Lac</span> onwards
          </Typography>
        </div>
      </div>
    </div>
  );
}
