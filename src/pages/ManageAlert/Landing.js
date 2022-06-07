import React from "react";
import { makeStyles, Typography, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 30px",
    borderBottom: "2px solid #CBCBCB"
  },
  button: {
    color: "#fff",
    borderRadius: 2
  },
  body: {
    color: "#767676",
    height: "100%",
    gap: 70,
    flex: 1,
    "& h1": {
      color: "#767676",
      fontFamily: "'Roboto', sans-serif"
    }
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: 50,

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: 20
    },

    "& .card": {
      display: "flex",
      alignItems: "center",
      gap: 20,
      background: "#E7E7E7",
      width: "25%",
      padding: "40px 20px",
      borderRadius: 14,
      fontWeight: 600,

      [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    }
  }
}));

export default function Landing({ setPart }) {
  const classes = useStyles();

  return (
    <>
      <header className={classes.header}>
        <Typography variant="h5">Property Alert</Typography>
        <Button variant="contained" className={classes.button}>
          Create Alert
        </Button>
      </header>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.body}
      >
        <Grid item className={classes.cards}>
          <div className="card">
            <Typography variant="h1">1</Typography>
            <span>Tell us your needs</span>
          </div>
          <div className="card">
            <Typography variant="h1">2</Typography>
            <span>We match properties</span>
          </div>
          <div className="card">
            <Typography variant="h1">3</Typography>
            <span>You get properties to your inbox</span>
          </div>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setPart(1)}
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
