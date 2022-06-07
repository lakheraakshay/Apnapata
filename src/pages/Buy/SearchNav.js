import {
  AppBar,
  Toolbar,
  Button,
  Divider,
  makeStyles,
  InputBase,
  Popover,
  Grid,
  Chip,
} from "@material-ui/core";
import {
  ArrowDropDown as ArrowDropDownIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import Radio from "../../components/Radio";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";

import CloseIcon from "@material-ui/icons/Close";

import { Link } from "react-router-dom";
import { capitalize } from "../../utils";
const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  container: {
    display: "flex",
    alignItems: "center",
	  justifyContent: "center",
    padding: "10px 30px",
  },
  searchContainer: {
    background: "#fff",
    borderRadius: 1000,
    height: "2.5rem",
    display: "flex",
  },
  select: {
    borderRadius: "1000px 0 0 1000px",
    padding: "0.3rem 1rem",
    paddingRight: 10,
    textTransform: "none",
    fontWeight: 500,
    flexGrow: 1,
    "& span": {
      fontSize: "1rem",
    },
    "& svg": {
      fontSize: "2rem",
    },
  },
  selectItem: {
    borderRadius: "1000px",
    padding: "0.3rem 1rem",
    background: "#fff",
    justifyContent: "center",
    textTransform: "none",
    fontWeight: 500,
    flexGrow: 1,
    "& span": {
      fontSize: "1rem",
    },
    "& svg": {
      fontSize: "2rem",
    },
    "&:hover": {
      background: "#eee",
    },
  },
  locationInput: {
    margin: "0 1rem",
    flexGrow: 1,
    color: "black",
    fontWeight: 500,
  },
  searchButton: {
    // background: "#EA963A",
    background: "#fff",
    fontWeight: 600,
    boxShadow: "none",
    borderRadius: 1000,
    flexGrow: 1,
    "&:hover": {
      //   background: "#EA963A",
      boxShadow: "none",
      background: "#eee",
    },
  },
  popover: {
    background: "none",
    marginTop: "0.5rem",
    maxWidth: 300,
  },
  popoverContainer: {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    gap: 40,
  },
  chip: {
    background: theme.palette.secondary.main,
    margin: "0 0.3rem",
  },
}));

const residentialLink = ["buy", "rent", "pg"];

const SearchNav = ({ searchParams }) => {
  const classes = { ...globalStyles(), ...useStyles() };
  const [dataThing, setDataThing] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    if (searchParams.propertyType === '' && searchParams.subcategory === '') {
      setDataThing([]);
    } else {
      const data = [searchParams.propertyType, searchParams.subcategory];
      setDataThing(data);
    }
    if (dataThing.length === 0) {
      setLocation((locations) => [...locations, searchParams.location]);
    }
  }, [searchParams])

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setLocation((locations) => [...locations, e.target.value])
      e.target.value = ''
    }
  }

  return (
    <AppBar position="static" component="section" className={classes.root}>
      <Toolbar className={classes.container}>
        <div className={classes.searchContainer}>
          <Button
            disableRipple
            classes={{ root: classes.select }}
            onClick={handleClick}
          >
            {residentialLink.includes(searchParams.path)
              ? capitalize(searchParams.path)
              : "Buy"}
            <ArrowDropDownIcon />
          </Button>

          <Popover
            className={classes.root}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            marginThreshold={10}
            PaperProps={{
              elevation: 0,
              className: classes.popover,
            }}
          >
            <Grid
              container
              alignItem="center"
              className={classes.popoverContainer}
            >
              <Grid
                item
                className={classes.formGroupColumn}
                style={{ width: "100%" }}
              >
                <label>Residential</label>
                <ul className={classes.options}>
                  {residentialLink.map((item, i) => (
                    <Radio
                      key={i}
                      // formikName={formik.values.propertyType}
                      value={capitalize(item)}
                      title={capitalize(item)}
                      fieldName="propertyType"
                      // handleChange={formik.handleChange}
                    />
                  ))}
                </ul>
              </Grid>
              <Grid
                item
                className={classes.formGroupColumn}
                style={{ width: "100%" }}
              >
                <label>Commercial</label>
                <ul className={classes.options}>
                  {new Array("Buy", "Lease").map((item, i) => (
                    <Radio
                      key={i}
                      // formikName={formik.values.propertyType}
                      value={item}
                      title={item}
                      fieldName="propertyType"
                      // handleChange={formik.handleChange}
                    />
                  ))}
                </ul>
              </Grid>
            </Grid>
          </Popover>

          {/* <Divider orientation="vertical" sx={{ background: "#A8A8A8" }} /> */}
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            style={{ background: "#A8A8A8" }}
          />

          <div style={{ padding: "0.25rem 0.5rem" }}>
            {location.map((item, i) => (
              <Chip
                className={classes.chip}
                label={item}
                id={item}
                deleteIcon={<CloseIcon />}
                onDelete={(e) => {
                  setLocation((locations) => locations.filter((item) => item !== e.target.parentNode.parentNode.id))
                  console.log(e.target.parentNode.parentNode.id)
                }}
              />
            ))}
          </div>

          <InputBase
            className={classes.locationInput}
            placeholder="Location/Colony/Society"
            onKeyPress={handleEnter}
          />

          <Button
            component={Link}
            to="/buy"
            classes={{ root: classes.searchButton }}
            variant="contained"
          >
            <SearchIcon style={{ marginRight: 5 }} />
          </Button>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <ul className={classes.options}>
            {dataThing.map((item, i) => (
              <Button
                key={i}
                disableRipple
                classes={{ root: classes.selectItem }}
              >
                {item}
                <ArrowDropDownIcon />
              </Button>
            ))}
          </ul>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default SearchNav;
