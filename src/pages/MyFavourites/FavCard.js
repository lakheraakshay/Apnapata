import React from "react";
import { Button, Grid, makeStyles, Typography, Hidden } from "@material-ui/core";
import Heart from "@material-ui/icons/Favorite";
import Tick from "@material-ui/icons/CheckCircle";
import Share from "@material-ui/icons/Share";

import house from "../../assets/my-favourites/house.png";
import building from "../../assets/my-favourites/building.png";

const useStyles = makeStyles(theme => ({
  card: {
    background: "#fff",
    padding: 30,
    display: "flex",
    gap: 20,

    [theme.breakpoints.down("md")]: {
      width: "100%",
      flexDirection: "column"
    }
  },
  image: {
    width: 150,
    position: "relative",

    [theme.breakpoints.down("md")]: {
      width: "100%"
    },
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

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },

    "& .prices": {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      paddingTop: 7,
      "& h5": {
        fontFamily: "'Work Sans', sans-serif",
        color: "#777777",
        fontWeight: 400
      },
      "& .price": {
        color: theme.palette.primary.main
      },
      "& span": {
        fontWeight: 600
      }
    }
  },
  right: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    width: "70%",
    color: "#808080",

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    
    "& .title": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#777777",
      "& span": {
        color: theme.palette.primary.main
      }
    },
    "& .facing": {
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "#808080",
      fontWeight: 500
    },
    "& .fav-summary": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "'... read more'",
      fontWeight: 600,
      fontSize: "0.9rem",
      color: "#474747",
      cursor: "pointer",
      "& > span": {
        color: "#474747",
        fontWeight: 400
      },
      "&.show": {
        overflow: "unset",
        whiteSpace: "unset",
        textOverflow: "unset"
      }
    }
  },
  properties: {
    padding: "10px 0",
    background: "#F0F0F0",
    display: "flex",
    alignItems: "center",
    borderRadius: 4,
    fontSize: "0.9rem",

    // [theme.breakpoints.down("sm")]: {
    //   flexWrap: "wrap",
    // },

    "& .prop-grp": {
      padding: "0 30px",
      color: "#808080",
      fontWeight: 500,
      borderRight: "2px solid #A8A8A8",

      [theme.breakpoints.down("md")]: {
        padding: "0 10px"
      },

      "& .prop-val": {
        color: "#000",
        marginTop: 5
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
    <Grid item container spacing={4}>
      <Grid item xs={12} md={9}>
        <div className={classes.card}>
          <div className={classes.left}>
            <div className={classes.image}>
              <img src={building} alt="building" />
              <div className="description">3 Photos</div>
            </div>
            <div className="prices">
              <Typography variant="h5" className="price">
                Rs <span>50</span> Lac
              </Typography>
              <Typography variant="h5">
                Rs <span>14500</span> Per Sqft
              </Typography>
            </div>
          </div>
          <div className={classes.right}>
            <div className="title">
              <Typography variant="h5">
                3 BHK Flat <span>for sale</span>
              </Typography>
              <Heart htmlColor="red" />
            </div>
            <div className={classes.properties}>
              <div className="prop-grp">
                <p className="prop-title">SUPER AREA</p>
                <p className="prop-val">338 Sqft</p>
              </div>
              <div className="prop-grp">
                <p className="prop-title">STATUS</p>
                <p className="prop-val">Ready to move</p>
              </div>
              <div className="prop-grp">
                <p className="prop-title">FLOORS</p>
                <p className="prop-val">3 out of 3 floors</p>
              </div>
              <div className="prop-grp" style={{ border: "none" }}>
                <p className="prop-title">TRANSACTION</p>
                <p className="prop-val">Rescale</p>
              </div>
            </div>
            <Typography variant="body1" className="facing">
              <Tick htmlColor="#72D344" /> East Facing Property
            </Typography>
            <Typography variant="body1" className="fav-summary">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto aut facilis iure, cupiditate quis ex ipsa doloribus
                unde aperiam omnis.
              </span>
            </Typography>
            <div className={classes.buttons}>
              <Button variant="contained" className="contained">
                Contact
              </Button>
              <Button variant="contained" className="contained">
                Chat
              </Button>
              <Button className="normal">
                <Share style={{ marginRight: 7 }} /> Share
              </Button>
              <Button className="normal">Feedback</Button>
            </div>
          </div>
        </div>
      </Grid>
      <Hidden mdDown>
        <Grid item md={3}>
          <div>
            <img src={house} alt="house" />
          </div>
        </Grid>
      </Hidden>
    </Grid>
  );
}
