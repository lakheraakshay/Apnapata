import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles({
  chat: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: 20,
    borderTop: "2px solid #CECECE",
    cursor: "pointer",
    "& *": {
      pointerEvents: "none", // to select a chat id
    },
    "& .image": {
      width: 45,
      height: 45,
      background: "#C4C4C4",
    },
    "& .message": {
      fontWeight: 400,
      "& span": {
        fontFamily: "'Roboto', sans-serif",
        color: "#757575",
        fontSize: "0.9rem",
        marginLeft: 10,
      },
    },
  },
  icons: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    "& .unread": {
      background: "#F4C48F",
      height: 25,
      width: 25,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      fontWeight: 500,
      marginRight: 20,
    },
  },
});

export default function Chat({ m }) {
  const classes = useStyles();

  return (
    <div className={`${classes.chat} convo-box`}>
      <div className="image">{/* <img src="" alt="" /> */}</div>
      <div className="description">
        <Typography variant="body2">{m.name}</Typography>
        <Typography variant="body2" className="message">
          Plot in Omax City <span>13:01</span>
        </Typography>
      </div>
      <div className={classes.icons}>
        <div className="unread">2</div>
        <MoreIcon htmlColor="#C4C4C4" />
      </div>
    </div>
  );
}
