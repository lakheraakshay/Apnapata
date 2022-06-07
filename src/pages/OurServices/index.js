import React from "react";
import { makeStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import bg from "../../assets/post-property/bg.png";
import ForLoan from "./ForLoan";
import ForArchitect from "./ForArchitect";
import Interior from "./Interior";
import Vastu from "./Vastu";
import Construction from "./Construction";

const useStyles = makeStyles({
  container: {
    backgroundImage: "url(" + bg + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right",
    minHeight: "100vh"
  }
});

export default function OurServices() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Switch>
        <Route path="/ourservices/loan">
          <ForLoan />
        </Route>
        <Route path="/ourservices/construction">
          <Construction />
        </Route>
        <Route path="/ourservices/architect">
          <ForArchitect />
        </Route>
        <Route path="/ourservices/interior">
          <Interior />
        </Route>
        <Route path="/ourservices/vastu">
          <Vastu />
        </Route>
      </Switch>
    </div>
  );
}
