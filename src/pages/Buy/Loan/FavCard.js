import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import LocationIcon from "@material-ui/icons/LocationOn";
import Share from "@material-ui/icons/Share";

import house from "../../../assets/my-favourites/house.png";
import building from "../../../assets/my-favourites/building.png";

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
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: 600,
        "& span": {
          color: "#D9261C"
        }
      }
    }
  },
  right: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
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
    "& .detail": {
      color: "#000",
      "& span": {
        fontWeight: 600,
        fontFamily: "'Roboto', sans-serif"
      },
      "&.top": {
        borderBottom: "1px solid #E4E4E4",
        paddingBottom: 10
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
  buttons: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    "& .contained": {
      color: "#fff",
      padding: "4px 30px"
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
                <span>HDFC</span> ltd
              </Typography>
            </div>
          </div>
          <div className={classes.right}>
            <div className="title">
              <Typography variant="body1">
                Stanza living PG in <span>Vijay Nagar</span>, Indore
              </Typography>
              <LocationIcon htmlColor="#000" />
            </div>
            <Typography variant="h6" className="detail top">
              From <span>6.70%</span> p.a.
            </Typography>
            <Typography variant="h6" className="detail">
              Max Tenure <span>30 Years</span>
            </Typography>
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
                Chat
              </Button>
              <Button className="normal">
                <Share style={{ marginRight: 7 }} /> Share
              </Button>
              <Button className="normal">Feedback</Button>
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
