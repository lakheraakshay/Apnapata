import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    position: "relative",
    font: "inherit",
    border: "1px solid #cacaca",
    borderRadius: 8,
    padding: "7px 5px",
    "& label": {
      position: "absolute",
      top: 0,
      fontSize: "0.85rem",
      transform: "translateY(-110%)",
    },
  },

  input: {
    border: "none",
    marginLeft: 10,
    fontSize: "1rem",
    fontFamily: "'Raleway', sans-serif",
    outline: "none",
    width: "50%",
  },
  error: {
    color: "red",
    fontWeight: 500,
    marginTop: 7,
    fontSize: "0.85rem",
  },
});

export default function InputBox({
  inputId,
  handleChange,
  inputName,
  label,
  error,
}) {
  const classes = useStyles();

  return (
    <div>
      <div
        className={
          error ? `${classes.wrapper} ${classes.redBorder}` : classes.wrapper
        }
      >
        <input
          className={classes.input}
          id={inputId}
          name={inputName}
          onChange={handleChange}
        />
      </div>
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
}
