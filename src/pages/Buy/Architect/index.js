import React, { useEffect, useState } from "react";
import { makeStyles, Grid, Button, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import { SortByPopover } from "../SortByPopover";
import FavCard from "./FavCard";
import { getAllArchitect } from "../../../api/services";
import Message from '../../../components/Message';
import ErrorBoundary from "../../../components/ErrorBoundary";

const useStyles = makeStyles({
  grid: {
    marginTop: 40,
    gap: 40
  },
  header: {
    "& .buttons": {
      display: "flex",
      "& button": {
        color: "#fff",
        "&:not(.active)": {
          background: "none",
          boxShadow: "none",
          color: "#000"
        }
      }
    }
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    background: "#fff",
    padding: "10px 25px",
    "& p": {
      fontWeight: 500
    },
    "& .sort": {
      marginLeft: "auto",
      color: "#B6B6B6",
      "& span": {
        color: "#000"
      }
    },
    "& .list": {
      display: "flex",
      alignItems: "center",
      gap: 10
    },
    "& .box": {
      border: "1px solid #DEDEDE",
      padding: "10px 15px"
    }
  }
});

export default function Architect() {

  const classes = useStyles();
  const location = useLocation();
  const [architectList, setArchitectList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);

  // Getting params from url
  const paramsArray = location.search.substring(1, location.search.length).split("&");
  let params = {};
  paramsArray.forEach(singleParams => {
    const items = singleParams.split("=");
    params[items[0]] = items[1];
  })

useEffect(() => {
  const getArchitectList = async () => {
    try {
      const response = await getAllArchitect(`city=${params.city}&town=${params.loc}&propertyType=${params.pt}`)
      setArchitectList(response.data.data)
    } catch (error) {
      setErrorMessage(error.response.data.error.message)
    }
  }

  getArchitectList()
}, [])

return (
  <>
    {
      errorMessage && <Message message={errorMessage} />
    }
    <header className={classes.header}>
      <div className="buttons">
        <Button variant="contained" className="active">
          Properties
        </Button>
        <Button variant="contained">
          <Link to="/topagents" style={{ color: "inherit" }}>
            Top Agents
          </Link>
        </Button>
      </div>
      <div className={classes.topBar}>
        <Typography variant="body1">Flats for Sale in Indore</Typography>
        <Typography variant="body1" className="sort box" onClick={(e) => setAnchorEl(e.currentTarget)} style={{ cursor: "pointer" }}>
          Sort by <span>Relevance</span>
        </Typography>
        <SortByPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </div>
    </header>
    <ErrorBoundary>
      <Grid container direction="column" className={classes.grid}>
        {architectList.map(architect => (
          <FavCard
            key={architect._id}
            architect={architect}
          />
        ))}
      </Grid>
    </ErrorBoundary>
  </>
);
}
