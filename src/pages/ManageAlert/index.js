import React, { useState } from "react";
import { makeStyles, Container } from "@material-ui/core";

import Landing from "./Landing";
import Form from "./Form";

const useStyles = makeStyles({
  container: {
    "& .wrapper": {
      background: "#fff",
      minHeight: "70vh",
      marginBottom: 30,
      padding: "10px 40px",
      display: "flex",
      flexDirection: "column"
    }
  }
});

export default function ManageAlert() {
  const classes = useStyles();
  const [part, setPart] = useState(0);

  return (
    <Container maxWidth="lg" component="main" className={classes.container}>
      <div className="wrapper">
        {part === 0 ? <Landing setPart={setPart} /> : <Form />}
      </div>
    </Container>
  );
}
