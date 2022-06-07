import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import LocationIcon from "@material-ui/icons/LocationOn";
import Share from "@material-ui/icons/Share";

import house from "../../../assets/my-favourites/house.png";
import building from "../../../assets/my-favourites/building.png";
import lift from "../../../assets/buy/lift.svg";
import playground from "../../../assets/buy/playground.svg";
import pool from "../../../assets/buy/pool.svg";
import shop from "../../../assets/buy/shop.svg";

const useStyles = makeStyles(theme => ({
  card: {
    background: "#fff",
    padding: 30,
    display: "flex",
    gap: 20
  },
  image: {
    width: 150,
    position: "relative",
    "& .description": {
      position: "absolute",
      bottom: 0,
      left: 0,
      color: "#fff",
      padding: "2px 5px",
      fontSize: "0.8rem",
      background: "#000"
    }
  },
  left: {
    width: "30%",
    fontFamily: "'Work Sans', sans-serif",
    "& .prices": {
      display: "flex",
      paddingTop: 7,
      "& h5": {
        marginTop: 15,
        fontFamily: "'Roboto', sans-serif",
        "& span": {
          color: "#777777"
        },
        fontWeight: 500
      },
      "& .price": {
        color: theme.palette.primary.main
      }
    }
  },
  right: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    width: "70%",
    color: "#808080",
    "& .title": {
      display: "flex",
      alignItems: "center",
      gap: 7,
      color: "#777777",
      "& p": {
        fontWeight: 500
      },
      "& span": {
        fontWeight: 600
      }
    },
    "& .fav-summary": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "'... read more'",
      fontWeight: 400,
      fontSize: "0.9rem",
      color: "#474747",
      cursor: "pointer",
      "&.show": {
        overflow: "unset",
        whiteSpace: "unset",
        textOverflow: "unset"
      }
    }
  },
  tags: {
    display: "flex",
    gap: 15,
    "& p": {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 400,
      background: "#F0F0F0",
      padding: "3px 7px",
      borderRadius: 6
    }
  },
  properties: {
    display: "flex",
    alignItems: "center",
    borderRadius: 4,
    fontSize: "0.9rem",
    borderBottom: "1px solid #E4E4E4",
    paddingBottom: 10,
    "& .prop-grp": {
      paddingRight: 20,
      color: "#808080",
      fontWeight: 500,
      borderRight: "2px solid #A8A8A8",
      "& .prop-val": {
        color: "#000",
        marginTop: 5,
        fontFamily: "'Roboto', sans-serif"
      }
    }
  },
  facilities: {
    display: "flex",
    alignItems: "center",
    gap: 25,
    "& p": {
      color: "#696767",
      fontWeight: 500
    }
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    "& .contained": {
      color: "#fff",
      padding: "10px 30px"
    },
    "& .normal": {
      color: "#8F8E8E",
      textTransform: "none"
    }
  },
  posted: {
    fontSize: "0.8rem",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    color: "#8F8E8E"
  }
}));

export default function FavCard() {
  const classes = useStyles();

  return (
    <Grid item container spacing={4}>
      <Grid item xs={9}>
        <div className={classes.card}>
          <div className={classes.left}>
            <div className={classes.image}>
              <img src={building} alt="building" />
              <div className="description">3 Photos</div>
            </div>
            <div className="prices">
              <Typography variant="h5" className="price">
                Rs 11,300 <span>onwards</span>
              </Typography>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.tags}>
              <Typography variant="body1">For boys</Typography>
              <Typography variant="body1">All preferred</Typography>
            </div>
            <div className="title">
              <Typography variant="body1">
                Stanza living PG in <span>Vijay Nagar</span>, Indore
              </Typography>
              <LocationIcon htmlColor="#000" />
            </div>
            <div className={classes.properties}>
              <div className="prop-grp">
                <p className="prop-title">Single Room</p>
                <p className="prop-val">Rs. 11,000</p>
              </div>
              <div
                className="prop-grp"
                style={{ border: "none", paddingLeft: 20 }}
              >
                <p className="prop-title">Twin Sharing</p>
                <p className="prop-val">Rs. 8,699</p>
              </div>
            </div>
            <div className={classes.facilities}>
              <Typography variant="body1">Key Facilities:</Typography>
              <div className="svg">
                <img src={pool} alt="pool" />
              </div>
              <div className="svg">
                <img src={shop} alt="shop" />
              </div>
              <div className="svg">
                <img src={playground} alt="playground" />
              </div>
              <div className="svg">
                <img src={lift} alt="lift" />
              </div>
            </div>
            <Typography
              variant="body1"
              className="fav-summary"
              onClick={e => e.target.classList.toggle("show")}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto aut facilis iure, cupiditate quis ex ipsa doloribus
              unde aperiam omnis.
            </Typography>
            <div className={classes.buttons}>
              <Button variant="contained" className="contained">
                Contact
              </Button>
              <Button variant="contained" className="contained">
                Feedback
              </Button>
              <Button className="normal">
                <Share style={{ marginRight: 7 }} /> Share
              </Button>
              <Typography className={classes.posted} variant="body1">
                Posted : May 13, 2021
              </Typography>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div>
          <img src={house} alt="house" />
        </div>
      </Grid>
    </Grid>
  );
}
