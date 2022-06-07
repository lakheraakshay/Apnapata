import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";

import person from "../../../assets/buy/person.png";

const useStyles = makeStyles(theme => ({
  card: {
    background: "#fff",
    gap: 40
  },
  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  left: {
    fontFamily: "'Work Sans', sans-serif",
    width: "30%"
  },
  right: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    color: "#808080",
    "& .title": {
      display: "flex",
      flexDirection: "column",
      color: "#000",
      "& .work": {
        color: "#646464"
      }
    }
  },
  details: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
    "& .group": {
      display: "flex",
      gap: 30,
      "& .name": {
        fontWeight: 400,
        minWidth: "20%"
      },
      "& .val": {
        fontFamily: "'Roboto', sans-serif"
      },
      "&.properties": {
        flexDirection: "column",
        gap: 10,
        "& .val": {
          display: "flex",
          alignItems: "center",
          gap: 30,
          color: "#000"
        },
        "& .sale": {
          background: "#EAEAEA",
          padding: "5px 15px",
          borderRadius: 18
        },
        "& .btn": {
          marginLeft: "auto",
          color: "#fff",
          padding: "5px 15px"
        }
      }
    }
  },
  buttons: {
    display: "flex",
    gap: 20,
    "& .contained": {
      color: "#fff",
      padding: "0px 30px"
    },
    "& .normal": {
      color: "#8F8E8E",
      textTransform: "none"
    }
  }
}));

export default function FavCard() {
  const classes = useStyles();

  return (
    <Grid container className={classes.card}>
      <Grid item xs={3} className={classes.left}>
        <div className={classes.image}>
          <img src={person} alt="person" />
        </div>
      </Grid>
      <Grid item xs={8} className={classes.right}>
        <div className="title">
          <Typography variant="h6">Irfan Ahmed</Typography>
          <Typography variant="h6" className="work">
            Indore Property Consultant
          </Typography>
        </div>
        <div className={classes.details}>
          <div className="group">
            <Typography variant="body1" className="name">
              Operating in
            </Typography>
            <Typography variant="body1" className="val">
              Shri Nagar
            </Typography>
          </div>
          <div className="group">
            <Typography variant="body1" className="name">
              Operating Since
            </Typography>
            <Typography variant="body1" className="val">
              2005
            </Typography>
          </div>
          <div className="properties group">
            <Typography variant="body1" className="name">
              Properties
            </Typography>
            <div className="val">
              <div className="sale">
                For sale <span>2</span>
              </div>
              <div className="price">
                Price range: <span>Rs 28 lac - 30 Lac</span>
              </div>
              <Button variant="contained" className="btn">
                Contact Agent
              </Button>
              <p>Know more</p>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
