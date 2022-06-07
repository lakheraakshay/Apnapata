import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    width: "74%",
    justifyContent: "space-between",
    position: "relative",
    font: "inherit",
    border: "1px solid #cacaca",
    borderRadius: 8,
    padding: "7px 5px",
    "& select": {
      border: "none",
      borderLeft: "2px solid #dddddd",
      padding: "5px 0 5px 10px",
      fontSize: "1rem",
      fontFamily: "'Raleway', sans-serif",
    },
    "& label": {
      position: "absolute",
      top: 0,
      fontSize: "0.85rem",
      transform: "translateY(-110%)",
    },
  },
  redBorder: {
    border: "2px solid red",
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

export default function Button({
  values,
  inputId,
  handleChange,
  selectName,
  inputName,
  label,
  error,
  handleUnitChange,
}) {
  const classes = useStyles();

  return (
    <div>
      <div
        className={
          error ? `${classes.wrapper} ${classes.redBorder}` : classes.wrapper
        }
      >
        {label && <label>{label}</label>}
        <input
          className={classes.input}
          placeholder="59.96"
          id={inputId}
          name={inputName}
          onChange={handleChange}
        />
        <select name={selectName} onChange={handleUnitChange}>
          {values.map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
}
