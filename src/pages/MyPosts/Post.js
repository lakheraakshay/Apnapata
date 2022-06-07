import React from "react";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/Visibility";
import LikeIcon from "@material-ui/icons/Favorite";
import clsx from "clsx";

import building from "../../assets/my-posts/building.png";

const useStyles = makeStyles({
  wrapper: {
    background: "#fff",
    paddingRight: 30,
    display: "flex",
    borderLeft: "10px solid #EA963A",
    borderRadius: 4,
    gap: 15,
    "& .date": {
      display: "flex",
      alignItems: "center",
      padding: "0 15px",
      background: "#FFEAD0",
      fontWeight: 600
    }
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid #CBCBCB",
    padding: "16px 0",
    gap: 40,
    "& .image": {
      borderRadius: 4,
      overflow: "hidden"
    },
    "& .title": {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textTransform: "uppercase",
      fontWeight: 600
    }
  },
  status: {
    background: "#FFEAD0",
    padding: "8px 25px",
    borderRadius: 30
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: "16px 0",
    "& > div": {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  },
  roboto: {
    fontFamily: "'Roboto', sans-serif"
  },
  button: {
    marginLeft: "auto",
    borderRadius: 30,
    color: "#fff",
    padding: "5px 20px"
  }
});

export default function Post({ property }) {
  const classes = useStyles();

  return (
    <Grid item>
      <div className={classes.wrapper}>
        <div className={clsx("date", classes.roboto)}>
          <p>
            {new Date(property?.createdAt).getDate()} {' '}
            {new Date(property?.createdAt).toLocaleString('default', { month: 'long' })}{', '}
            {new Date(property?.createdAt).getFullYear()}
          </p>
        </div>
        <div className={classes.content}>
          <div className={classes.header}>
            <div className="image">
              <img
                src={property?.photos[0] || building}
                alt="building"
              />
            </div>
            <Typography variant="h5" className="title">
              {property?.title}
            </Typography>
            <Typography variant="h5" className={classes.roboto}>
              {
                property?.propertyRate?.value ? `${property?.propertyRate?.unit} ${property?.propertyRate?.value}` : 'Not Applicable'
              }
            </Typography>
            {property?.active && <div className={clsx(classes.roboto, classes.status)}>ACTIVE</div>}
            <p className={classes.roboto}>
              {property?.town?.name}, {property?.city?.name}, {property?.country?.name}
            </p>
          </div>
          <div className={classes.footer}>
            <div className={classes.roboto}>
              <EyeIcon /> Views: 450
            </div>
            |
            <div className={classes.roboto}>
              <LikeIcon /> Likes: 450
            </div>
            <Button variant="contained" className={classes.button}>
              Sell Faster
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  );
}
