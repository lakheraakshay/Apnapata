import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    "& p": {
      fontWeight: 400
    }
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 500,
    marginBottom: 15
  }
});

export default function PackageDetails() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body1" className={classes.title}>
          Package: SubPkg-Post 50/500 Ads (180 Days Validity)
        </Typography>
        <Typography variant="body1">Category: Properties</Typography>
        <Typography variant="body1">Location: India</Typography>
        <Typography variant="body1">
          Date of Activation: 23 February 2020 05:30
        </Typography>
        <Typography variant="body1">
          Date of Expiry: 11 October 2020 05:30
        </Typography>
        <Typography variant="body1">Order ID: 4748830</Typography>
        <Typography variant="body1">Used: 50 of 50 ads</Typography>
      </CardContent>
    </Card>
  );
}
