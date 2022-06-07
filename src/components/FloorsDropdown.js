import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  dropdown: {
    background: "none",
    border: "1px solid #CACACA",
    fontFamily: "inherit",
    fontSize: "1rem",
    textAlign: "center",
    padding: 7,
    borderRadius: 8
  }
});

export default function FloorsDropdown({ name, value, options, handleChange }) {
  const classes = useStyles();

  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className={classes.dropdown}
    >
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
