import React, { useState } from "react";
import { makeStyles, Popover, Button } from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowDropDown";

import SearchBox from "../SearchBox";

const useStyles = makeStyles((theme) => ({
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
    },

    [theme.breakpoints.down("md")]: {
      "& span": {
        fontSize: "1rem"
      },
      minWidth: "fit-content"
    }
  },
  popover: {
    background: "none",
    marginTop: "0.5rem",
    maxWidth: 800
  }
}));

export default function Vastu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <Button
        className={`${classes.link} ${classes.buyLink}`}
        classes={{ root: classes.select }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Vastu
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
        <SearchBox additional={false} parent="vastu" handleClose={handleClose}/>
      </Popover>
    </React.Fragment>
  );
}
