import React, { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { formatDistance, subDays } from "date-fns";

const useStyles = makeStyles({
  bubble: {
    maxWidth: "75%",
    wordBreak: "break-word",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
    padding: "12px 15px",
    display: "flex",
    flexDirection: "column",
    gap: 7,
    "&.my-chat": {
      alignSelf: "flex-end",
      borderRadius: "6px 6px 0px 6px",
      background: "#FEFFD5",
    },
    "&.your-chat": {
      alignSelf: "flex-start",
      background: "#FFFFFF",
      borderRadius: "6px 6px 6px 0px",
    },
    "& p": {
      fontFamily: "'Work Sans', sans-serif",
      fontWeight: 500,
      color: "#5F5F5F",
      fontSize: "1.1rem",
    },
  },
  time: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "0.75rem",
    alignSelf: "flex-end",
  },
});

export default function ChatBubble({ m }) {
  const classes = useStyles();
  const [formatedDate, setFormatedDate] = useState('')

  useEffect(() => {
    const date = m.createdAt ? Date.parse(m.createdAt) : Date.parse(new Date())
    setFormatedDate(formatDistance(subDays(date, 0), new Date(), { addSuffix: true }))
  }, [m.createdAt])

  return (
    <div
      className={clsx(
        m.sender === localStorage.getItem("userId") ? "my-chat" : "your-chat",
        classes.bubble
      )}
    >
      <Typography variant="body1" className={classes.message}>
        {m.text}
      </Typography>
      <article className={classes.time}>{formatedDate}</article>
    </div>
  );
}
