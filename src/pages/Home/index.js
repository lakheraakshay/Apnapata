import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Divider,
  Button,
  InputBase,
} from "@material-ui/core";
// import InputBase from "@mui/material/InputBase";
import NewBooking from "./NewBooking";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import useScrollToTop from "../../hooks/useScrollToTop";
import Searchbar from "./Searchbar";
import client from "../../api/client";

import ArrowIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {},
  main: {
    position: "relative",
  },
  searchContainer: {
    position: "absolute",
    top: "50%",
    width: "100%",
  },
  mainImage: {
    display: "block",
    width: "55%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  textDiv: {
    position: "absolute",
    inset: 0,
    display: "flex",
    maxWidth: 1300,
    flexDirection: "column",
    justifyContent: "center",
    // marginTop: "7%",
    padding: "2rem",
    margin: "auto",
  },
  // searchBox: {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)"
  // },
  mainHeading: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: "3rem",
    alignSelf: "flex-end",
    textShadow: "0 0 4px #fdfdfd",
    fontWeight: 700,
    "& span": {
      display: "block",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem",
      color: "#fff",
    },
  },
  smallMainHeading: {
    fontSize: "2.25rem",
    fontWeight: 400,
  },
  underlinedHeading: {
    display: "inline-block",
    position: "relative",
    marginBottom: 8,
    "&::after": {
      content: "''",
      position: "absolute",
      bottom: -6,
      left: 0,
      width: "50%",
      maxWidth: 100,
      height: 4,
      borderRadius: 1,
      background: theme.palette.primary.main,
    },
  },
  propertyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
    columnGap: "1.5rem",
    rowGap: "1rem",
    marginTop: "2rem",

    [theme.breakpoints.down("sm")]: {
      display: "grid",
      overflowX: "auto",
      "-webkit-overflow-scrolling": "touch",
      gridGap: "1rem",
      gridAutoFlow: "column",
      gridAutoColumns: "max-content",
    },
  },
  propertyItem: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "1rem",
    cursor: "pointer",
    "& img": {
      width: "100%",

      [theme.breakpoints.down("sm")]: {
        width: "inherit",
        height: "inherit",
      },
    },
    "& > div": {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      color: "rgb(255 255 255 / 95%)",
      padding: "1rem",
    },
    "& p": {
      fontSize: "1.1rem",
      lineHeight: 1.3,
    },
    "& span": {
      fontSize: "0.8rem",
      marginTop: 3,
      fontWeight: 400,
    },
  },
  cardImage: {
    height: 170,
  },
  image100: {
    width: "100%",
  },
  topProperty: {
    background: "white",
    padding: "1rem",
    borderRadius: "1rem",
    width: "288px",
    "& *": {
      fontFamily: "'Montserrat'",
    },
  },
  topPropertyMoney: {
    fontSize: "1rem",
    lineHeight: 1.4,
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
    "& img": {
      width: 18,
      height: 18,
    },
  },
  longArrow: {
    width: "2rem",
    alignSelf: "center",
  },
  sectionGrid: {
    padding: "3rem",
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    columnGap: "2rem",
    rowGap: "2rem",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      paddingRight: "0",
      paddingLeft: "32px",
      // overflowX: "auto",
      // "-webkit-overflow-scrolling": "touch",
      // gridTemplateColumns: "100%, 1fr",
      // gridGap: "1rem",
      // gridAutoFlow: "column",
      // gridAutoColumns: "100%",
    },
  },
  newBooking: {
    rowGap: "2.5rem",
  },
  cityButton: {
    padding: "0.1rem 1rem",
    fontSize: "1.1rem",
    marginTop: "2rem",
  },
  topPropertyCont: {
    marginTop: "1rem",
  },
  smContainer: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      margin: 0,
      padding: 0,
      paddingLeft: "32px",
      paddingTop: "3rem",
      paddingBottom: "3rem",
    },
  },
}));

const MediaCard = ({ image, title, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ width: "288px" }}>
      <CardMedia
        className={classes.cardImage}
        image={image || require("../../assets/propertyImage.png").default}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const classes = useStyles();
  const cityId = useSelector((state) => state.home.cityId);
  const [errorMessage, setErrorMessage] = useState("");
  const [homeData, setHomeData] = useState(null);
  useScrollToTop();

  useEffect(() => {
    const getData = async () => {
      if (cityId) {
        client
          .get(`/home?city=${cityId}`)
          .then((response) => {
            // alert("we are here");
            console.log(response, "<<<<<");

            setHomeData(response.data.data);
          })
          .catch((error) => {
            console.log("Error: ", error.response.data.error.message);
            setErrorMessage(error.response.data.error.message);
          });
      } else {
        client
          .get(`/home`)
          .then((response) => {
            // alert("getting home");
            console.log(response, "<<<<response");
            setHomeData(response.data.data);
          })
          .catch((error) => {
            console.log("Error: ", error.message);
            setErrorMessage(error.message);
          });
      }
    };

    getData();
  }, [cityId]);
  console.log(cityId, "<<<city id");
  return (
    <div className={classes.root}>
      {errorMessage && <Message message={errorMessage} />}
      <section className={classes.main}>
        <img
          className={classes.mainImage}
          src={
            homeData?.banner?.url ||
            require("../../assets/cityImage.png").default
          }
          alt="Banner"
        />
        <div className={classes.textDiv}>
          <h1 className={classes.mainHeading}>
            <span>
              {homeData?.banner?.name
                ? homeData.banner.name
                : "Search your dream..."}
            </span>
            {/* <span className={classes.smallMainHeading}>
              and make it reality
            </span> */}
          </h1>
        </div>
        {/* Here is the middle Search Bar */}
        {/* <div className={classes.searchContainer}>
          <Container>
            <Searchbar />
          </Container>
        </div> */}
      </section>

      {/* Property Types */}
      {homeData?.propertyType?.length !== 0 && (
        <Container component="section" className={classes.smContainer}>
          <Typography className={classes.underlinedHeading} variant="h2">
            We’ve all type of properties
          </Typography>

          <div className={classes.propertyGrid}>
            {homeData?.propertyType.map((singleType) => (
              <Link
                key={singleType._id}
                className={classes.propertyItem}
                to={`/buy?type=${singleType._id}`}
              >
                <img
                  src={singleType.url}
                  alt="Property Type"
                  width="100%"
                  height="100%"
                />
                <div>
                  <Typography color="inherit">
                    {singleType.total_post}
                  </Typography>
                  <Typography color="inherit">
                    {singleType.property_type}
                  </Typography>
                  <Typography component="span" color="inherit">
                    Explore
                  </Typography>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      )}

      <Container component="section" className={classes.smContainer}>
        {/* Best Services */}
        {homeData?.bestService?.length !== 0 && (
          <>
            <Typography className={classes.underlinedHeading} variant="h2">
              Best Services
            </Typography>

            <div className={classes.propertyGrid}>
              {homeData?.bestService?.map((singleService) => (
                <MediaCard
                  key={singleService?._id}
                  image={singleService?.photos[0]}
                  title={singleService?.post_title}
                  description={`Posted Date: ${new Date(
                    singleService.createdAt
                  ).getDate()} ${new Date(
                    singleService.createdAt
                  ).toLocaleString("default", { month: "long" })} ${new Date(
                    singleService.createdAt
                  ).getFullYear()}`}
                />
              ))}
            </div>
          </>
        )}
        <Box mt="2rem">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Link to="/postProperty">
                <img
                  className={classes.image100}
                  src={require("../../assets/sellProperty.png").default}
                  alt=""
                />
                <Typography align="center">
                  Sell &amp; Rent your property
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} md={6}>
              <Link to="postservices">
                <img
                  className={classes.image100}
                  src={require("../../assets/postService.png").default}
                  alt=""
                />
                <Typography align="center">Post your service</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <section className={classes.sectionGrid}>
        {/* New Booking List */}
        {homeData?.newBooking?.length !== 0 && (
          <div>
            <Typography variant="h2">NEW BOOKING</Typography>
            <div className={clsx(classes.propertyGrid, classes.newBooking)}>
              {homeData?.newBooking?.map((singleBooking) => (
                <NewBooking key={singleBooking._id} booking={singleBooking} />
              ))}
            </div>
          </div>
        )}

        {/* Top Property List */}
        {homeData?.topProperty?.length !== 0 && (
          <div>
            <Typography variant="h2">Top Property</Typography>

            <Divider style={{ background: "#cccccc", margin: "1rem 0" }} />

            {homeData?.topProperty?.map((singleProperty) => (
              <Link
                to={`/buy/property/${singleProperty._id}`}
                key={singleProperty._id}
                className={clsx(classes.propertyGrid, classes.topPropertyCont)}
              >
                <div className={classes.topProperty}>
                  <Typography>{singleProperty.title}</Typography>
                  <Typography gutterBottom>
                    {singleProperty.country.name}, {singleProperty.city.name},{" "}
                    {singleProperty.town.name}
                  </Typography>
                  <Divider style={{ background: "#cccccc" }} />
                  <Box display="flex" mt="0.5rem">
                    <Typography
                      color="primary"
                      className={classes.topPropertyMoney}
                    >
                      <img
                        src={require("../../assets/priceTag.png").default}
                        alt="Property"
                      />{" "}
                      {/* ${property.price} */}
                    </Typography>
                    <Box component={NavLink} to="/" ml="auto" display="flex">
                      <Link to="/buy/buy-one">
                        <img
                          className={classes.longArrow}
                          src={require("../../assets/longArrow.png").default}
                          alt=""
                        />
                      </Link>
                    </Box>
                  </Box>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
