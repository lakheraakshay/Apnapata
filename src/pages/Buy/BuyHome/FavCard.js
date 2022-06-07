import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import Heart from "@material-ui/icons/Favorite";
import Tick from "@material-ui/icons/CheckCircle";
import Share from "@material-ui/icons/Share";

import house from "../../../assets/my-favourites/house.png";
import building from "../../../assets/my-favourites/building.png";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    background: "#fff",
    padding: 30,
    display: "flex",
    gap: 20,
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
      background: "#000",
    },
  },
  left: {
    width: "30%",
    fontFamily: "'Work Sans', sans-serif",
    "& .prices": {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      paddingTop: 7,
      "& h5": {
        fontFamily: "'Work Sans', sans-serif",
        color: "#777777",
        fontWeight: 400,
      },
      "& .price": {
        color: theme.palette.primary.main,
      },
      "& span": {
        fontWeight: 600,
      },
    },
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
      justifyContent: "space-between",
      color: "#777777",
      "& span": {
        color: theme.palette.primary.main,
      },
    },
    "& .facing": {
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "#808080",
      fontWeight: 500,
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
        textOverflow: "unset",
      },
    },
  },
  properties: {
    padding: "10px 0",
    background: "#F0F0F0",
    display: "flex",
    alignItems: "center",
    borderRadius: 4,
    fontSize: "0.9rem",
    "& .prop-grp": {
      padding: "0 30px",
      color: "#808080",
      fontWeight: 500,
      borderRight: "2px solid #A8A8A8",
      "& .prop-val": {
        color: "#000",
        marginTop: 5,
      },
    },
  },
  buttons: {
    display: "flex",
    gap: 20,
    "& .contained": {
      color: "#fff",
      padding: "0px 30px",
    },
    "& .normal": {
      color: "#8F8E8E",
      textTransform: "none",
    },
  },
}));

export default function FavCard({ property }) {
  const classes = useStyles();

  console.log("property: ", property);

  return (
    <Link to={`/buy/property/${property._id}`}>
      <Grid item container spacing={4}>
        <Grid item xs={9}>
          <div className={classes.card}>
            <div className={classes.left}>
              <div className={classes.image}>
                <img
                  src={
                    property?.photos[0] != undefined
                      ? property.photos[0]
                      : house
                  }
                  alt="building"
                />
                <div className="description">
                  {property?.photos?.length} Photos
                </div>
              </div>
              <div className="prices">
                <Typography variant="h5" className="price">
                  Rs <span>{property?.propertyRate?.value}</span>{" "}
                  {property?.propertyRate?.unit}
                </Typography>
                {/* <Typography variant="h5">
                  Rs <span>14500</span> Per Sqft
                </Typography> */}
              </div>
            </div>
            <div className={classes.right}>
              <div className="title">
                <Typography variant="h5">
                  {property?.title} <span>for sale</span>
                </Typography>
                {/* <Heart htmlColor="gray" /> */}
              </div>
              <div className={classes.properties}>
                <div className="prop-grp">
                  <p className="prop-title">SUPER AREA</p>
                  <p className="prop-val">
                    {(property?.area?.value || "") +
                      " " +
                      (property?.area?.unit || "")}
                  </p>
                </div>
                <div className="prop-grp">
                  <p className="prop-title">STATUS</p>
                  <p className="prop-val">{property?.condition}</p>
                </div>
                <div className="prop-grp">
                  <p className="prop-title">FLOORS</p>
                  <p className="prop-val">
                    {property?.totalFloors} out of {property?.totalFloors}{" "}
                    floors
                  </p>
                </div>
                <div className="prop-grp" style={{ border: "none" }}>
                  <p className="prop-title">TRANSACTION</p>
                  <p className="prop-val">Rescale</p>
                </div>
              </div>
              {property?.face && (
                <Typography variant="body1" className="facing">
                  <Tick htmlColor="#72D344" /> {property?.face} Facing Property
                </Typography>
              )}
              {/* <Typography
                variant="body1"
                className="fav-summary"
                onClick={e => e.target.classList.toggle("show")}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto aut facilis iure, cupiditate quis ex ipsa doloribus
                unde aperiam omnis.
              </Typography> */}
              <Typography className={classes.posted} variant="body1">
                Posted : {new Date(property?.createdAt).getDate()}{" "}
                {new Date(property?.createdAt).toLocaleString("en-us", {
                  month: "long",
                })}
                , {new Date(property?.createdAt).getFullYear()}
              </Typography>
              <div className={classes.buttons}>
                <Button variant="contained" className="contained">
                  Contact
                </Button>
                <Button variant="contained" className="contained">
                  Chat
                </Button>
                {/* <Button className="normal">
                  <Share style={{ marginRight: 7 }} /> Share
                </Button>
                <Button className="normal">Feedback</Button> */}
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
    </Link>
  );
}
