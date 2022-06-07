import React from "react";
import { makeStyles, Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";

import FavCard from "./FavCard";
import { SortByPopover } from "../SortByPopover";

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

export default function Rent() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
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
        {new Array(7).fill("").map((_, i) => (
          <FavCard key={i} />
        ))}
      </Grid>
    </>
  );
}
