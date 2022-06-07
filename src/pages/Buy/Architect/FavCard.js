import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import Share from "@material-ui/icons/Share";
import Tick from "@material-ui/icons/CheckCircle";
import client from '../../../api/client'

import house from "../../../assets/my-favourites/house.png";
import building from "../../../assets/my-favourites/building.png";
import lift from "../../../assets/buy/lift.svg";
import playground from "../../../assets/buy/playground.svg";
import pool from "../../../assets/buy/pool.svg";
import shop from "../../../assets/buy/shop.svg";
import Message from "../../../components/Message";

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
    "& .title": {
      display: "flex",
      alignItems: "center",
      gap: 7,
      color: "#777777",
      "& p": {
        fontWeight: 500
      },
      "& span": {
        fontWeight: 600,
        fontSize: "0.9rem",
        fontFamily: "'Roboto', sans-serif",
        color: "#000",
        marginLeft: 10
      }
    },
    "& .facing": {
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "#808080",
      fontWeight: 500,
      textTransform: "capitalize",
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
        marginTop: 5
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
      padding: "7px 30px"
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

export default function FavCard({ architect }) {
  const classes = useStyles();
  const [facilities, setFacilities] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getAmenitiesNearbyList = async () => {
      try {
        const response = await client.get('amenities_nearBy/all')
        const data = response.data.data

        data?.forEach(facility => {
          if (architect?.amenities?.includes(facility._id) || architect?.nearby?.includes(facility._id)) {
            setFacilities(prevState => [...prevState, facility.name])
          }
        })
      } catch (error) {
        setErrorMessage(error.response.data.error.message)
      }
    }

    getAmenitiesNearbyList()
  }, [])

  return (
    <Grid item container spacing={4}>

      {
        errorMessage && <Message message={errorMessage} />
      }

      <Grid item xs={9}>
        <div className={classes.card}>
          <div className={classes.left}>
            <div className={classes.image}>
              <img src={architect.photos[0]} alt="building" />
              <div className="description">{architect.photos.length} {`${architect.photos.length < 2 ? 'Photo' : 'Photos'}`}</div>
            </div>
            <div className="prices">
              <Typography variant="h5" className="price">
                <span>{architect?.userId?.name}</span>
              </Typography>
              <Typography variant="h5">
                Road Size: <span>{architect?.roadSize?.value}</span> {architect?.roadSize?.unit}
              </Typography>
            </div>
          </div>
          <div className={classes.right}>
            <div className="title">
              <Typography variant="h5">
                {architect?.title} <span>Front: {architect?.size?.front?.value} {architect?.size?.front?.unit}, Length: {architect?.size?.length?.value} {architect?.size?.length?.unit}</span>
              </Typography>
            </div>
            <div className={classes.properties}>
              <div className="prop-grp">
                <p className="prop-title">TOTAL FLOORS</p>
                <p className="prop-val">{architect?.totalFloors}</p>
              </div>
              <div className="prop-grp">
                <p className="prop-title">PROPERTY TYPE</p>
                <p className="prop-val">{architect?.propertyType?.property_type}</p>
              </div>
              <div className="prop-grp">
                <p className="prop-title">CONDITION</p>
                <p className="prop-val">{architect?.condition}</p>
              </div>
              <div className="prop-grp" style={{ border: "none" }}>
                <p className="prop-title">PROPERTY FOR</p>
                <p className="prop-val">{architect?.propertyFor}</p>
              </div>
            </div>
            <Typography variant="body1" className="facing">
              <Tick htmlColor="#72D344" /> {architect?.face} Facing Property
            </Typography>
            <div className={classes.facilities}>
              <Typography variant="body1">Key Facilities:</Typography>
              <Typography>{facilities.toString()}</Typography>
              {/* <div className="svg">
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
              </div> */}
            </div>
            <div className={classes.facilities}>
              <Typography variant="body1">Available:</Typography>
              <Typography>{architect?.available?.toString()}</Typography>
            </div>
            {/* <Typography
              variant="body1"
              className="fav-summary"
              onClick={e => e.target.classList.toggle("show")}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto aut facilis iure, cupiditate quis ex ipsa doloribus
              unde aperiam omnis.
            </Typography> */}
            <div className={classes.buttons}>
              <Button variant="contained" className="contained">
                Contact
              </Button>
              <Button variant="contained" className="contained">
                Chat
              </Button>
              <Button variant="contained" className="contained">
                Share 
              </Button>
              <Button className="normal">
                <Share style={{ marginRight: 7 }} /> Share
              </Button>
              <Typography className={classes.posted} variant="body1">
                Posted : {new Date(architect?.createdAt).getDate()} {new Date(architect?.createdAt).toLocaleString("en-us", { month: "long" })}, {new Date(architect?.createdAt).getFullYear()}
              </Typography>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div>
          <img src={architect?.videos[0]} alt="house" />
        </div>
      </Grid>
    </Grid>
  );
}
