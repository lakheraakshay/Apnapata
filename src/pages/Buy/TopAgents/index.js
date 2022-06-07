import React from "react";
import {
  makeStyles,
  Grid,
  Button,
  Typography,
  Container
} from "@material-ui/core";

import FavCard from "./FavCard";

const useStyles = makeStyles({
  grid: {
    marginTop: 40,
    gap: 40
  },
  header: {
    "& .buttons": {
      display: "flex",
      marginBottom: "1rem",
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

export default function TopAgents() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState("agentstab");

  const changeTab = (tab) => {
    setCurrentTab(tab)
  };

  return (
    <Container maxWidth="lg" component="main">
      <header className={classes.header}>
        <div className="buttons">
          <Button variant="contained" className={currentTab === "propertytab" && "active"} onClick={() => changeTab("propertytab")}>Properties (356)</Button>
          <Button variant="contained" className={currentTab === "agentstab" && "active"} onClick={() => changeTab("agentstab")}>
            Top Agents
          </Button>
        </div>
        <div className={classes.topBar}>
          <Typography variant="body1">
            Agents in Indore Who Can Help You
          </Typography>
          <span className="sort">Filters:</span>
          <Typography variant="body1" className="box">
            <span>Indore</span>
          </Typography>
          <Typography variant="body1" className="list box">
            All localities
          </Typography>
        </div>
      </header>
      <Grid container direction="column" className={classes.grid}>
        {new Array(7).fill("").map((_, i) => (
          <FavCard key={i} />
        ))}
      </Grid>
    </Container>
  );
}
