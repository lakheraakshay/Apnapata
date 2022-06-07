import React from "react";
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  Button
} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles({
  container: {
    flexWrap: "nowrap"
  },
  summary: {
    marginTop: 15,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "'... read more'",
    fontWeight: 400,
    color: "#474747",
    cursor: "pointer",
    "&.show": {
      overflow: "unset",
      whiteSpace: "unset",
      textOverflow: "unset"
    }
  },
  wrapper: {
    padding: "10px 20px"
  },
  builderCard: {
    display: "flex",
    gap: 15,
    "& svg": {
      fontSize: "3.4rem"
    },
    "& p": {
      fontWeight: 500,
      color: "#727272"
    },
    "& button": {
      color: "#fff",
      marginTop: 7
    }
  }
});

export default function FinalSection() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={8}>
        <Card style={{ height: "100%" }}>
          <CardContent>
            <div className={classes.wrapper}>
              <Typography variant="h4">Description</Typography>
              <Typography
                variant="body1"
                className={classes.summary}
                onClick={e => e.target.classList.toggle("show")}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto aut facilis iure, cupiditate quis ex ipsa doloribus
                unde aperiam omnis.
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} style={{ marginLeft: 20 }}>
        <Card>
          <CardContent className={classes.builderCard}>
            <PersonIcon htmlColor="#777" />
            <div className={classes.builderInfo}>
              <Typography variant="body1">BUILDER</Typography>
              <Typography variant="body1">Narendra Singh</Typography>
              <Typography
                variant="body1"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                +91 98xxxxx789
              </Typography>
              <Button variant="contained">Contact Builder</Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
