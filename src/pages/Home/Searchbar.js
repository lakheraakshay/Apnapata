import { Button, Divider, makeStyles, InputBase } from "@material-ui/core";
import {
  ArrowDropDown as ArrowDropDownIcon,
  Search as SearchIcon
} from "@material-ui/icons";
import { useState } from "react";
import CityPopover from "../../components/CityPopover";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.main,
    borderRadius: 1000,
    height: "4rem",
    display: "flex",
    marginTop: "3rem"
  },
  select: {
    borderRadius: "1000px 0 0 1000px",
    padding: "0.3rem 1rem",
    paddingRight: 10,
    textTransform: "none",
    fontWeight: 500,
    flexGrow: 1,
    "& span": {
      fontSize: "1rem"
    },
    "& svg": {
      fontSize: "2rem"
    }
  },
  locationInput: {
    margin: "0 1rem",
    flexGrow: 1,
    color: "black",
    fontWeight: 500
  },
  searchButton: {
    background: "#EA963A",
    fontWeight: 600,
    boxShadow: "none",
    borderRadius: 1000,
    flexGrow: 1,
    "&:hover": {
      background: "#EA963A",
      boxShadow: "none"
    }
  }
}));

const Searchbar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className={classes.root}>
        <Button
          disableRipple
          classes={{ root: classes.select }}
          onClick={handleClick}
        >
          All India
          <ArrowDropDownIcon />
        </Button>

        <Divider orientation="vertical" />

        <InputBase
          className={classes.locationInput}
          placeholder="Location/Colony/Society"
        />
        <Divider orientation="vertical" />

        <Button
          disableRipple
          style={{ borderRadius: 0 }}
          classes={{ root: classes.select }}
          onClick={() => {}}
        >
          Type
          <ArrowDropDownIcon />
        </Button>
        <Button
          component={Link}
          to="/buy"
          classes={{ root: classes.searchButton }}
          variant="contained"
        >
          <SearchIcon style={{ marginRight: 5 }} />
          Search
        </Button>
      </div>
      <CityPopover anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

export default Searchbar;
