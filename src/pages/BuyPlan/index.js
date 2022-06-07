import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import Tick from "@material-ui/icons/Check";
import api from '../../api/client'

import tag from "../../assets/buy-plan/tag.png";
import AdCard from "./AdCard";

const useStyles = makeStyles({
  title: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginBottom: 5
  },
  adPoints: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 7,
    paddingLeft: 50,
    "& h5": {
      display: "flex",
      alignItems: "center",
      gap: 20
    },
    "& svg": {
      color: "#00000066"
    }
  },
  divider: {
    color: "#CBCBCB66",
    width: "115%",
    transform: "translateX(-7%)",
    margin: "40px 0"
  },
  ads: {
    "& .point": {
      marginTop: 30,
      paddingLeft: 50,
      display: "flex",
      alignItems: "center",
      gap: 20,
      "& svg": {
        color: "#00000066"
      }
    }
  },
  cardGrid: {
    marginTop: 40,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
    rowGap: 40,
    columnGap: 70
  }
});

export default function BuyPlan() {
  const classes = useStyles();
  const [subscriptionList, setSubscriptionList] = React.useState([])

  React.useEffect(() => {
    (() => {
      api
        .get('/subscription/all')
        .then(res => setSubscriptionList(res.data.data))
        .catch(err => console.log(err))
    })()
  }, [])

  return (
    <Container maxWidth="lg" component="main">
      <div className="header">
        <div className={classes.title}>
          <Typography variant="h1" style={{ fontWeight: 600 }}>
            Buy Plan
          </Typography>
          <div>
            <img src={tag} alt="a price tag" />
          </div>
        </div>
        {/* <Typography variant="h3" style={{ fontWeight: 400 }}>
          Heavy discount on Packages
        </Typography> */}
      </div>
      {/* <hr className={classes.divider} />
      <div className="ads-desc">
        <Typography variant="h5">POST MORE ADS AND AUTO BOOST</Typography>
        <div className={classes.adPoints}>
          <Typography variant="h5">
            <Tick /> Post more ads and ads get boosted to the top every few days
          </Typography>
          <Typography variant="h5">
            <Tick /> Package available for 30 days
          </Typography>
        </div>
      </div>
      <hr className={classes.divider} /> */}
      <div className={classes.ads}>
        {/* <Typography variant="h5">
          Post ads &amp; auto boost every 7 days
        </Typography>
        <Typography variant="h5" className="point">
          <Tick /> Reach upto 4 times more buyers
        </Typography> */}
        <div className={classes.cardGrid}>
          {subscriptionList.map(subscription => (
            <AdCard key={subscription._id} subscription={subscription} />
          ))}
        </div>
      </div>
      {/* <hr className={classes.divider} />
      <div className="ads-desc">
        <Typography variant="h5">POST MORE ADS</Typography>
        <div className={classes.adPoints}>
          <Typography variant="h5">
            <Tick /> Package available for 30 days
          </Typography>
        </div>
      </div>
      <hr className={classes.divider} />
      <div className="ads-desc">
        <Typography variant="h5">POST MORE ADS</Typography>
        <div className={classes.adPoints}>
          <Typography variant="h5">
            <Tick /> Post 50 ads
          </Typography>
        </div>
        <div className={classes.cardGrid}>
          {new Array(5).fill("").map((_, i) => (
            <AdCard key={i} ind={i + 50} />
          ))}
        </div>
      </div> */}
    </Container>
  );
}
