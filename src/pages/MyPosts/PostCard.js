import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";

import cameron from "../../assets/my-posts/cameron.png";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "flex-start",
    gap: 20,

    [theme.breakpoints.down('sm')]: {
      flexDirection: "column"
    }
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    padding: "25px 30px",
    "& p": {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500
    },
    "& h5": {
      fontFamily: "'Montserrat', sans-serif"
    },
    "& .title": {
      fontWeight: 600,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& .hundred": {
        color: theme.palette.primary.main,
        border: "2px solid " + theme.palette.primary.main,
        padding: "3px 7px"
      }
    },
    "& .address": {
      color: "#BEBEBE",
      fontWeight: 400
    }
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    "& .group": {
      display: "flex",
      gap: 20,
      "& .name": {
        width: "35%",
        fontWeight: 400,
        color: "#273B4A"
      },
      "& .value": {
        fontWeight: 600
      }
    }
  },
  card2: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    "& p, & h5": {
      fontFamily: "'Montserrat', sans-serif"
    },
    "& .title": {
      display: "flex",
      alignItems: "center",
      gap: 15
    }
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    "& div": {
      display: "flex",
      fontWeight: 600,
      fontSize: "1.2rem"
    },
    "& .deactivate div": {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 15px",
      background: theme.palette.primary.main,
      color: "#fff"
    },
    "& .others": {
      justifyContent: "space-between",
      "& div": {
        width: "45%",
        padding: "10px 15px",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid " + theme.palette.primary.main,
        color: theme.palette.primary.main
      }
    }
  },

  detailCard: {
    maxWidth: "45%",

    [theme.breakpoints.down('sm')]: {
      maxWidth: "100%"
    }
  },

  actionCard: {
    maxWidth: "35%",

    [theme.breakpoints.down("sm")]: {
      maxWidth: '100%'
    }
  }
}));

const details = [
  { name: "Type", value: "For sale" },
  { name: "Plot Area", value: "300" },
  { name: "Breadth", value: "33" },
  { name: "Project Name", value: "Omaxe city" },
  { name: "Length", value: "85" },
  { name: "Facing", value: "East" }
];

export default function PostCard() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.detailCard}>
        <CardContent className={classes.card}>
          <Typography variant="h5" className="title">
            <span>Omaxe City</span>
            <span className="hundred">100K</span>
          </Typography>
          <Typography variant="body1" className="address">
            6391 Elgin St. Celina, Delaware 10299
          </Typography>
          <Typography variant="h5" className="title">
            Description
          </Typography>
          <Typography variant="body1" className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit
            enim varius ultrices porttitor. Tortor penatibus nec lacus cursus
            cras maecenas pharetra.
          </Typography>
          <div className={classes.details}>
            {details.map((item, i) => (
              <div className="group" key={i}>
                <Typography variant="body1" className="name">
                  {item.name}
                </Typography>
                <Typography variant="body1" className="value">
                  {item.value}
                </Typography>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className={classes.actionCard}>
        <CardContent className={classes.card2}>
          <Typography variant="h5" className="title">
            <div className="image">
              <img src={cameron} alt="person" />
            </div>
            Cameron Williamson
          </Typography>
          <Typography variant="body1" className="description">
            Your ad expires on 23/06/21
          </Typography>
          <div className={classes.buttons}>
            <div className="deactivate">
              <div className="btn">Deactivate</div>
            </div>
            <div className="others">
              <div className="edit">Edit</div>
              <div className="remove">Remove</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
