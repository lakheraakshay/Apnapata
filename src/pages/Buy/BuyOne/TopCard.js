import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import clsx from "clsx";
import PersonIcon from "@material-ui/icons/Person";
import Share from "@material-ui/icons/Share";

import building from "../../../assets/buy/building.png";

import { capitalize } from '../../../utils'

const useStyles = makeStyles(theme => ({
  roboto: {
    fontFamily: "'Roboto', sans-serif"
  },
  card: {
    marginTop: 20
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 20,
    borderBottom: "2px solid #E6E6E6"
  },
  price: {
    fontWeight: 400,
    borderRight: "3px solid #A8A8A8",
    padding: "10px 20px",
    "& span": {
      fontWeight: 600
    }
  },
  details: {
    padding: "10px 20px",
    "& h6": {
      color: "#777777",
      "& span": {
        color: "#000",
        fontWeight: 600
      }
    },
    "& p": {
      fontWeight: 500,
      "& span": {
        color: theme.palette.primary.main
      }
    }
  },
  builder: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 7,
    background: "#EFEDED",
    padding: "10px 15px",
    borderRadius: 9,
    "& p": {
      fontWeight: 500,
      color: "#727272"
    },
    "& svg": {
      fontSize: "3rem"
    },
    "& .contact": {
      background: theme.palette.primary.main,
      color: "#fff",
      padding: "2px 10px",
      borderRadius: 21,
      marginLeft: 20
    }
  },
  body: {
    padding: "30px 10px",

    // "& .image": {
    //   width: '20%',
    //   margin: 0
    // }
  },
  group: {
    display: "flex",
    gap: 30,
    padding: "15px 0",
    borderBottom: "2px dashed #E7E7E7",
    "& .group-item": {
      display: "flex",
      flexDirection: "column",
      gap: 6
    },
    "& h3": {
      fontWeight: 500,
      color: "#808080"
    },
    "& h5": {
      fontWeight: 600,
      fontFamily: "'Roboto', sans-serif"
    }
  },
  buttons: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    gap: 20,
    "& .contained": {
      color: "#fff",
      padding: "3px 30px"
    },
    "& .normal": {
      color: "#8F8E8E",
      textTransform: "none"
    },
    "& h5": {
      marginLeft: "auto",
      fontFamily: "'Roboto', sans-serif",
      color: "#8F8E8E",
      fontWeight: 400
    }
  }
}));

export default function TopCard({ property }) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <header className={classes.header}>
          <Typography
            variant="h4"
            className={clsx(classes.roboto, classes.price)}
          >
            Rs. <span>{property?.bookingAmount?.value}</span> {property?.bookingAmount?.unit}
          </Typography>
          <div className={classes.details}>
            <Typography variant="h6">
              {property?.title} <span className={classes.roboto}>{property?.area?.value} {property?.area?.unit}</span>
            </Typography>
            <Typography variant="body1">
              <span>for Sale</span> {property?.town?.name}, {property?.city?.name}
            </Typography>
          </div>
          <div className={classes.builder}>
            <PersonIcon htmlColor="#777" />
            <div className="details">
              <Typography variant="body1">{property?.userStatus?.toUpperCase()}</Typography>
              <Typography variant="body1">
                {capitalize(property?.userId?.name)} <span className="contact">Contact</span>
              </Typography>
            </div>
          </div>
        </header>
        <Grid container className={classes.body}>
          <Grid item style={{ padding: "0 50px" }}>
            <div className="image" xs={4} md={4}>
              <img src={property?.photos[0]} alt="building" width={200} height={200} />
            </div>
          </Grid>
          <Grid item xs={8} container direction="column">
            <div className={classes.group}>
                <h2>Size: </h2>
              <div className="group-item">
                <h3>Length</h3>
                <h5>{property?.size?.length?.value} {property?.size?.length?.unit}</h5>
              </div>
              <div className="group-item">
                <h3>Front</h3>
                <h5>{property?.size?.front?.value} {property?.size?.front?.unit}</h5>
              </div>
            </div>
            <div className={classes.group}>
              <div className="group-item">
                <h3>Approved</h3>
                <h4>{property?.approved ? 'Approved' : 'Not Approved'}</h4>
              </div>
            </div>
            <div className={classes.group}>
              <div className="group-item">
                <h3>Loan</h3>
                <h5>{property?.loanAvailable ? 'Available' : 'Not Available'}</h5>
              </div>
              <div className="group-item">
                <h3>Available</h3>
                <h5>{property?.available?.toString()}</h5>
              </div>
            </div>
            <div className={classes.group} style={{ border: "none" }}>
              <div className="group-item">
                <h3>Condition</h3>
                <h5>{property?.condition}</h5>
              </div>
              <div className="group-item">
                <h3>Active</h3>
                <h5>{property?.active ? 'Active' : 'Not Active'}</h5>
              </div>
              <div className="group-item">
                <h3>Floor</h3>
                <h5>{property?.totalFloors}</h5>
              </div>
              <div className="group-item">
                <h3>Car Parking</h3>
                <h5>{property?.parking ? 'Available' : 'Not Available'}</h5>
              </div>
            </div>
            <div className={classes.buttons}>
              <Button variant="contained" className="contained">
                Contact
              </Button>
              <Button variant="contained" className="contained">
                Chat
              </Button>
              {/* <Button className="normal">
                <Share style={{ marginRight: 7 }} /> Share
              </Button> */}
              {/* <Button className="normal">Feedback</Button> */}
              <h5>Posted : {new Date(property?.createdAt).getDate()} {new Date(property?.createdAt).toLocaleString("en-us", { month: "long" })}, {new Date(property?.createdAt).getFullYear()}</h5>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
