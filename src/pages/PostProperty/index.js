import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAreaUnit } from "../../store/reducers/property-slice";
import bg from "../../assets/post-property/bg.png";
import BasicDetails from "./BasicDetails";
import Plot from "./Plot";
import Factory from "./Factory";
import Flat from "./Flat";
import Hotel from "./Hotel";
import Shop from "./Shop";
import Villa from "./Villa";
import Photos from "./Photos";
import Facilities from "./Facilities";
import Plan from "./Plan";
import PG from "./PG";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: "url(" + bg + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right",
  },
  card: {
    borderRadius: 21,
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.25)",
    padding: 30,
  },
  right: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    "& h1": {
      alignSelf: "flex-end",
    },
    "& .sell": {
      fontWeight: 500,
    },
    "& .buttons": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 20,
      margin: "100px 0 0 100px",

      [theme.breakpoints.down("md")]: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        margin: "10px 0 0 0",
      },

      "& a": {
        width: "100%",
        color: "inherit",

        [theme.breakpoints.down("md")]: {
          width: "auto",
        },
      },
      "& button": {
        position: "relative",
        color: "#fff",
        width: "30%",

        [theme.breakpoints.down("md")]: {
          width: "fit-content",
        },

        "& p": {
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translate(50%, -50%)",
          color: "#72D344",
        },
        "& svg": {
          background: "#fff",
          borderRadius: "50%",
        },
      },
    },
  },
}));

function page(query, setSubcat) {
  switch (query) {
    case "Plot/Land":
      return <Plot />;
    case "Project":
      return <Plot />;
    case "Free Zone":
      return <Plot />;
    case "Commercial Zone":
      return <Plot />;
    case "Industrial Zone":
      return <Plot />;
    case "Flat":
      return <Flat />;
    case "Independent Floor":
      return <Flat />;
    case "Industrial Floor/Space":
      return <Flat />;
    case "Built up Shop/SCO":
      return <Shop />;
    case "Showroom/Office/Retail Space":
      return <Shop />;
    case "Factory/Shed":
      return <Factory />;
    case "Storage/Warehouse":
      return <Factory />;
    case "House/Villa":
      return <Villa />;
    case "Farmhouse/Built up":
      return <Villa />;
    case "Hotel/Guest House":
      return <Hotel />;
    case "photos":
      return <Photos />;
    case "facilities":
      return <Facilities />;
    case "plan":
      return <Plan />;
    case "pg":
      return <PG />;
    default:
      return <BasicDetails setSubcat={setSubcat} />;
  }
}

export default function PostProperty() {
  const classes = useStyles();
  const pageQuery = new URLSearchParams(useLocation().search).get("page");
  const [subcat, setSubcat] = useState("");
  const dispatch = useDispatch();
  const nextPageIndex = useSelector((state) => state.property);
  console.log(nextPageIndex);
  const nextValue = nextPageIndex.values.next;
  useEffect(() => {
    dispatch(getAreaUnit());
  }, []);

  return (
    <div className={classes.container}>
      <Container maxWidth="lg" component="main">
        <Grid container>
          <Grid item md={5}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginBottom: 10, marginLeft: 15 }}
            >
              For Property
            </Typography>
            {page(pageQuery, setSubcat)}
          </Grid>
          <Grid item md={7} sm={12} className={classes.right}>
            <Typography variant="h1" className="sell">
              Sell or Rent your Property
            </Typography>
            <Typography variant="h1">On ApnaPata.com</Typography>
            <div className="buttons">
              <Link to="/postproperty">
                <Button variant="contained">
                  Basic Details
                  {nextValue > 1 && (
                    <p>
                      <CheckCircleIcon />
                    </p>
                  )}
                </Button>
              </Link>
              <Link to={"/postproperty?page=" + subcat}>
                <Button variant="contained">
                  Property Details
                  {nextValue > 2 && (
                    <p>
                      <CheckCircleIcon />
                    </p>
                  )}
                </Button>
              </Link>
              <Link to="/postproperty?page=photos">
                <Button variant="contained">
                  Photos/Videos
                  {nextValue > 3 && (
                    <p>
                      <CheckCircleIcon />
                    </p>
                  )}
                </Button>
              </Link>
              <Link to="/postproperty?page=facilities">
                <Button variant="contained">
                  Facilities
                  {nextValue > 4 && (
                    <p>
                      <CheckCircleIcon />
                    </p>
                  )}
                </Button>
              </Link>
              <Link to="/postproperty?page=plan">
                <Button variant="contained">Rate/Plan</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
