import React from "react";
import {
  makeStyles,
  Grid,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import { Link, Redirect, useLocation } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import FavCard from "./FavCard";
import api from "../../../api/client";
import ErrorBoundary from "../../../components/ErrorBoundary";
import "../../../components/GlobalStyles/display.css";
import "../../../components/GlobalStyles/measurement.css";

// ** Redux
import { useSelector, useDispatch } from "react-redux";

import { getProperties } from "../../../store/reducers/property-slice";
import { SortByPopover } from "../SortByPopover";

const useStyles = makeStyles({
  grid: {
    marginTop: 40,
    gap: 40,
  },
  header: {
    "& .buttons": {
      display: "flex",
      "& button": {
        color: "#fff",
        "&:not(.active)": {
          background: "none",
          boxShadow: "none",
          color: "#000",
        },
      },
    },
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    background: "#fff",
    padding: "10px 25px",
    "& p": {
      fontWeight: 500,
    },
    "& .sort": {
      marginLeft: "auto",
      color: "#B6B6B6",
      "& span": {
        color: "#000",
      },
    },
    "& .list": {
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    "& .box": {
      border: "1px solid #DEDEDE",
      padding: "10px 15px",
    },
  },
});

export default function Buy() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const [propertyList, setPropertyList] = React.useState([]);
  const [responseStatus, setResponseStatus] = React.useState(false);
  const properties = useSelector((state) => state.property.properties);

  React.useEffect(() => {
    const allParams = location.search.substring(1).split("&");
    const params = {};
    alert("home buy");
    allParams.forEach((param) => {
      const [key, value] = param.split("=");
      params[key] = value;
    });

    if (params.hasOwnProperty("type")) {
      alert("if")(() => {
        api
          .get(`/property/all?propertyType=${params.type}`)
          .then((res) => {
            setPropertyList(res.data.data);
            // console.log(res, "<<<<< ");
            setResponseStatus(true);
          })
          .catch((err) => console.log(err));
      })();
    } else {
      //------------------------

      (() => {
        api
          .get(`/property/all?city=${params?.city}&town=${params?.town}`)
          .then((res) => {
            console.log(res, "<<<<<<");
            setPropertyList(res.data.data);
            setResponseStatus(true);
          })
          .catch((err) => console.log(err));
      })();
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Container maxWidth="lg" component="main">
      {propertyList?.length === 0 ? (
        // <Redirect to="/" />
        <div className="dflex justbetween w100 textcenter ">
          <div className="mauto">No Data Found</div>
        </div>
      ) : (
        <>
          {" "}
          <header className={classes.header}>
            <div className="buttons">
              <Button variant="contained" className="active">
                Properties (356)
              </Button>
              <Button variant="contained">
                <Link to="/topagents" style={{ color: "inherit" }}>
                  Top Agents
                </Link>
              </Button>
            </div>
            <div className={classes.topBar}>
              <Typography variant="body1">Flats for Sale in Indore</Typography>
              <Typography
                variant="body1"
                className="sort box"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                style={{ cursor: "pointer" }}
              >
                Sort by <span>Relevance</span>
              </Typography>
              <SortByPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            </div>
          </header>
          <Grid container direction="column" className={classes.grid}>
            {propertyList.map((property) => (
              <ErrorBoundary key={property._id}>
                <FavCard property={property} />
              </ErrorBoundary>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
