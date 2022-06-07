import React, { useState } from "react";
import { makeStyles, Popover, Button } from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowDropDown";

import SearchBox from "./SearchBox";

const useStyles = makeStyles({
  link: {
    fontWeight: 700,
    color: "#3d3d3d"
  },
  buyLink: {
    fontSize: "inherit",
    color: "inherit",
    textTransform: "inherit",
    fontFamily: "inherit",
    padding: "0 5px",
    "& span": {
      fontSize: "1.3rem"
    }
  },
  popover: {
    background: "none",
    marginTop: "0.5rem",
    maxWidth: 800
  }
});

const buyLinks = ["Buy", "PG", "Rent", "New Booking"];

export default function BuyLinks() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  return buyLinks.map(item => (
    <React.Fragment key={item}>
      <Button
        className={`${classes.link} ${classes.buyLink}`}
        classes={{ root: classes.select }}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        {item}
        <ArrowIcon />
      </Button>
      <Popover
        className={classes.root}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        marginThreshold={10}
        PaperProps={{
          elevation: 0,
          className: classes.popover
        }}
      >
        <SearchBox />
      </Popover>
    </React.Fragment>
  ));
}
