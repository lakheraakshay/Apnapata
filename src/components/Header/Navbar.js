import {
  AppBar,
  Toolbar,
  makeStyles,
  // Typography,
  Container,
  // Popover,
  // Button,
  Hidden,
} from "@material-ui/core";

import { useHistory, Link } from "react-router-dom";

import CountryDropdown from "./CountryDropdown";
import Buy from "./NavComponents/Buy";
import Pg from "./NavComponents/Pg";
import Rent from "./NavComponents/Rent";
import NewBooking from "./NavComponents/NewBooking";
import Loan from "./NavComponents/Loan";
import Architect from "./NavComponents/Architect";
import Vastu from "./NavComponents/Vastu";
import InteriorDesign from "./NavComponents/InteriorDesign";
import Construction from "./NavComponents/Construction";

import QuickLinksDropdown from "./QuickLinksDropdown.js";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  logo: {
    height: "3rem",
    margin: "0.7rem 0",
    marginRight: "1rem",
    [theme.breakpoints.down("sm")]: {
      height: "1.75rem",
    },
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    columnGap: "2rem",
    margin: "auto",
  },
  hamburger: {
    color: "white",
    marginLeft: "auto",
  },
  loginSelect: {
    marginLeft: "auto",
    padding: "0.3rem 1rem",
    paddingRight: 10,
    textTransform: "none",
    fontWeight: 400,
    "& span": {
      fontSize: "1.1rem",
      color: "white",
    },
    "& svg": {
      fontSize: "2rem",
    },
  },
  postPropertyBtn: {
    marginLeft: "auto",
    marginRight: 10,
    display: "flex",
    alignItems: "center",
    background: "#fff",
    padding: "10px 5px 10px 15px",
    borderRadius: 30,
    "& a": {
      color: "#000",
      fontWeight: 500,
    },
    "& span": {
      background: "#FFFF00",
      padding: 7,
      borderRadius: 30,
      fontSize: "0.9rem",
    },
  },
  linksCont: {
    display: "flex",
    alignItems: "center",
    // columnGap: "1.5rem",
    justifyContent: "space-between",
    maxWidth: "95%",
    padding: "1rem 0 0 0",
    marginBottom: "1rem",

    [theme.breakpoints.down("md")]: {
      overflowX: "auto",
      maxWidth: "400%",
    },
  },
  link: {
    fontWeight: 700,
    color: "#3d3d3d",
  },
  divider: {
    width: "115%",
    transform: "translateX(-7%)",
    opacity: 0.3,
    marginBottom: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  nav: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "space-between"
    }
  },
  smContainer: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      margin: 0,
      padding: 0,
      paddingLeft: "32px",
      paddingTop: "3rem",
      paddingBottom: "3rem"
    }
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <AppBar position="static" component="header" className={classes.root}>
        <Toolbar className={classes.nav}>
          <img
            className={classes.logo}
            onClick={() => history.push("/")}
            src={require("../../assets/logo.png").default}
            alt="apnapata logo"
            style={{ width: "unset" }}
          />
          <Hidden xsDown>
            <CountryDropdown />
          </Hidden>
          <Hidden xsDown>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              <div className={classes.postPropertyBtn}>
                <Link to="/postproperty">
                  Post Property <span>FREE</span>
                </Link>
              </div>
              <div className={classes.postPropertyBtn}>
                <Link to="/postservices">
                  Post Service <span>FREE</span>
                </Link>
              </div>
            </div>
          </Hidden>
          <QuickLinksDropdown />
        </Toolbar>
      </AppBar>
      <div style={{ width: "100%" }}>
        <Container
          maxWidth="lg"
          style={{ paddingTop: 0, paddingBottom: 0, px: 0 }}
          className={classes.smContainer}
        >
          <div className={classes.linksCont}>
            <Buy />
            <Pg />
            <Rent />
            <NewBooking />
            <Loan />
            <Architect />
            <Vastu />
            <InteriorDesign />
            <Construction />
          </div>
          <hr className={classes.divider} />
        </Container>
      </div>
    </>
  );
}
