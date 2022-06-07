import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";

import bg from "../../assets/invoice/bg.png";
import PackageDetails from "./PackageDetails";

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: 100,
    height: "100%"
  },
  body: {
    height: "100%"
  },
  tabs: {
    display: "flex",
    "& div": {
      padding: "10px 20px",
      fontWeight: 700,
      borderBottom: "2px solid #ADADAD",
      color: "#9F9F9F",
      cursor: "pointer",
      "&.active": {
        color: "#000",
        borderBottom: "4px solid " + theme.palette.primary.main
      }
    }
  },
  nothing: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& p": {
      color: "#9F9F9F"
    }
  },
  expired: {
    marginTop: 30,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 15
  }
}));

export default function Packages() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  return (
    <div className={classes.container}>
      <header className={classes.tabs}>
        <div className={tab === 0 ? "active" : null} onClick={() => setTab(0)}>
          Active
        </div>
        <div className={tab === 1 ? "active" : null} onClick={() => setTab(1)}>
          Scheduled
        </div>
        <div className={tab === 2 ? "active" : null} onClick={() => setTab(2)}>
          Expired
        </div>
      </header>
      <div className={classes.body}>
        {tab !== 2 ? (
          <div className={classes.nothing}>
            <div className="img">
              <img src={bg} alt="empty bag" />
            </div>
            <Typography variant="body1">Nothing here</Typography>
            <Typography variant="body1">
              You don't have any active packages
            </Typography>
          </div>
        ) : (
          <div className={classes.expired}>
            {new Array(8).fill("").map((_, i) => (
              <PackageDetails key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
