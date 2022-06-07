import { makeStyles, Grid, Typography, Link, Divider } from "@material-ui/core";
import React from "react";
// import Logo from "../../Components/UI/Logo";
import { NavLink } from "react-router-dom";
import Social from "./Social";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: "2rem 0 1rem 0",
    background: theme.palette.primary.main,
    "& p": {
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
  },

  head: {
    fontWeight: "600",
  },

  container: {
    width: "95%",
    margin: "auto",
  },

  branding: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& > div": {
      [theme.breakpoints.down("sm")]: {
        width: "fit-content",
        margin: "auto",
      },
    },
    [theme.breakpoints.down("sm")]: {
      height: "9rem",
    },
  },

  whatsapp: {
    "& span": {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      },
    },
  },

  active: {
    color: "#e4e4e4",
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div>
        <Grid container spacing={4} className={classes.container}>
          <Grid item xs={12} sm={6} md={3} className={classes.branding}>
            {/* <Logo /> */}
            <h1>Apna Pata.com</h1>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              component={NavLink}
              to="/about"
              activeClassName={classes.active}
            >
              <Typography gutterBottom>About Us</Typography>
            </Link>
            <Link
              component={NavLink}
              to="/contact"
              activeClassName={classes.active}
            >
              <Typography gutterBottom>Career</Typography>
            </Link>
            <Link component={NavLink} to="/" activeClassName={classes.active}>
              <Typography gutterBottom>Contact Us</Typography>
            </Link>
            <Link component={NavLink} to="/" activeClassName={classes.active}>
              <Typography gutterBottom>Feedback</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link
              component={NavLink}
              to="/terms"
              activeClassName={classes.active}
            >
              <Typography gutterBottom>Grievances</Typography>
            </Link>
            <Link
              component={NavLink}
              to="/terms"
              activeClassName={classes.active}
            >
              <Typography gutterBottom>Help Center</Typography>
            </Link>
            <Link
              component={NavLink}
              to="/terms"
              activeClassName={classes.active}
            >
              <Typography gutterBottom>Privacy Policy</Typography>
            </Link>
            <Link
              component={NavLink}
              to="/terms"
              activeClassName={classes.active}
            >
              <Typography gutterBottom>Terms &amp; Conditions</Typography>
            </Link>
            <Link
              component={NavLink}
              to="/terms"
              activeClassName={classes.active}
            >
              <Typography gutterBottom>FAQs</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography gutterBottom>Follow Us On</Typography>
            <Social />
            <Typography>Reach us at : 7210000350</Typography>
            <Typography>Feedback/Query</Typography>
            <Typography>feedback@apnapata.com</Typography>
            <Typography>Sales/Services Enquiries</Typography>
            <Typography>service@apnapata.com</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Typography align="center" style={{ marginTop: "1rem" }}>
          Apnapata.com Powered by PIJN International 2019
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
