import React from "react";
import {
  makeStyles,
  Grid,
  Button,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

import house from "../../../assets/my-favourites/house.png";
import PreviewCard from "./PreviewCard";

import { capitalize } from '../../../utils'
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  container: {
    margin: "20px 0",
    flexWrap: "nowrap"
  },
  wrapper: {
    padding: "10px 20px"
  },
  summary: {
    marginTop: 15,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "'... read more'",
    fontWeight: 400,
    color: "#474747",
    cursor: "pointer",
    "&.show": {
      overflow: "unset",
      whiteSpace: "unset",
      textOverflow: "unset"
    }
  },
  details: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    "& .detail": {
      display: "flex",
      borderBottom: "2px dashed #E7E7E7",
      paddingBottom: 10,
      "& .title": {
        width: "25%",
        color: "#808080"
      },
      "& .description": {
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 600
      }
    }
  },
  buttons: {
    marginTop: 30,
    display: "flex",
    alignItems: "center",
    "& button": {
      color: "#fff",
      marginLeft: 30
    },
    "& p": {
      marginLeft: "auto",
      color: "#727171",
      fontWeight: 500
    }
  }
});


export default function Description({ property }) {
  const classes = useStyles();

  // const property = useSelector(state => state.property.property)

  const details = [
    { title: "Price Breakup", desc: `${property?.brokerage?.unit || ''} ${property?.brokerage?.value || '0'} ` },
    { title: "Booking Amount", desc: `${property?.bookingAmount?.unit || ''} ${property?.bookingAmount?.value || '0'} ` },
    { title: "Address", desc: `${property?.town?.name},  ${property?.city?.name},  ${property?.country?.name}` },
    { title: "It is", desc: property?.commertial_ItIs },
    // { title: "Ownership", desc: capitalize(property?.ownership) },
    // { title: "Furnishing", desc: capitalize(property?.furnishing) },
    // { title: "Loan Offered By", desc: property?.loanAvailable },
    // { title: "Amenities", desc: property?.amenities?.map(item => `${capitalize(item)}, `) },
    // { title: "Extra Rooms", desc: property?.extraRooms?.map(item => `${capitalize(item)}, `)},
    // { title: "Nearby", desc: property?.nearby?.map(item => `${capitalize(item)}, `)}
  ];

  return (
    <Grid container className={classes.container}>
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <div className={classes.wrapper}>
              <Typography variant="h4">Description</Typography>
              {/* <Typography
                variant="body1"
                className={classes.summary}
                onClick={e => e.target.classList.toggle("show")}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto aut facilis iure, cupiditate quis ex ipsa doloribus
                unde aperiam omnis.
              </Typography> */}
              <div className={classes.details}>
                {details.map((detail, i) => (
                  <div className="detail" key={i}>
                    <Typography
                      variant="body1"
                      className="title"
                      style={{ fontWeight: 500 }}
                    >
                      {detail?.title}
                    </Typography>
                    <Typography variant="body1" className="description">
                      {detail?.desc}
                    </Typography>
                  </div>
                ))}
              </div>
              {/* <div className={classes.buttons}>
                <Button variant="contained">Contact Builder</Button>
                <Typography variant="body1">Sold Out</Typography>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} style={{ marginLeft: 20 }}>
        <div className="image" style={{ marginBottom: 20 }}>
          <img src={house} alt="house" />
        </div>
        {/* <PreviewCard /> */}
      </Grid>
    </Grid>
  );
}
