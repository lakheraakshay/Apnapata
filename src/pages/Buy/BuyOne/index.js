import React, { useEffect } from "react";
import { makeStyles, Typography, Button, Container, CircularProgress } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import api from '../../../api/client'

import TopCard from "./TopCard";
import Description from "./Description";
import FinalSection from "./FinalSection";
import PreviewCard from "./PreviewCard";

import { useSelector, useDispatch } from "react-redux";
import { getProperty } from "../../../store/reducers/property-slice";
import ErrorBoundary from "../../../components/ErrorBoundary";

const useStyles = makeStyles({
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
  related: {
    marginTop: 30,
    "& .posts": {
      marginTop: 15,
      display: "flex",
      gap: 20,
      flexWrap: "wrap",
    },
  },
});

export default function BuyOne() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id } = useParams();

  const property = useSelector((state) => state.property.property);

  const [response, setResponse] = React.useState(null);

  useEffect(() => {
    api
      .get(`/property/${id}`)
      .then(res => setResponse(res.data.data))
      .catch(err => console.log(err))
    // const getPropertyData = async () => {
    //   const response = await dispatch(
    //     getProperty({
    //       id,
    //     })
    //   );

    //   if (response.type === "property/get/fulfilled") {
    //     setResponse(response.payload.data);
    //   }
    // };

    // return getPropertyData();
  }, [id]);

  return (
    <>
      {response !== null ? (
        <ErrorBoundary>
          <Container maxWidth="lg" component="main">
            {/* <header className={classes.header}>
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
              <Typography variant="body1" className="sort box">
                Sort by <span>Relevance</span>
              </Typography>
              <Typography variant="body1" className="list box">
                <ListIcon htmlColor="#C4C4C4" />
                List
              </Typography>
            </div>
          </header> */}
            <TopCard property={response} />
            <Description property={response} />
            {/* <FinalSection /> */}
            {/* <div className={classes.related}>
              <Typography variant="h5">Related Posts</Typography>
              <div className="posts">
                {new Array(5).fill("").map((_, i) => (
                  <PreviewCard key={i} />
                ))}
              </div>
            </div> */}
          </Container>
        </ErrorBoundary>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
