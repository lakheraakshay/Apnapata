import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    marginBottom: 20,
    borderBottom: "2px solid #000000",
    paddingBottom: 5,
    fontWeight: 700
  },
  paragraphs: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    "& p": {
      fontWeight: 400,
      fontSize: "1.1rem"
    },
    "& ul": {
      listStyle: "none"
    }
  }
});

export default function About() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="main">
      <Typography variant="h3" className={classes.title}>
        About Us
      </Typography>
      <div className={classes.paragraphs}>
        <Typography variant="body1">
          Launched in 2005, 99acres.com, India’s No. 1 property portal, deals
          with every aspect of the consumers’ needs in the real estate industry.
          It is an online forum where buyers, sellers and brokers/agents can
          exchange information about real estate properties quickly, effectively
          and inexpensively. At 99acres.com, you can advertise a property,
          search for a property, browse through properties, build your own
          property microsite, and keep yourself updated with the latest news and
          trends making headlines in the realty sector.
        </Typography>
        <Typography variant="body1">
          Why 99acres.com?
          <br /> At present, 99acres.com prides itself for having around nine
          lakh property listings spanning across 600+ cities in India. Of all,
          the website held over 5.7 lakh paid listings at the end of FY 2018-19.
          In addition to providing an online platform to real estate developers,
          brokers and property owners for listing their property for sale,
          purchase or rent, 99acres.com offers advertisement stints such as
          microsites, banners, home page links and project pages to the clients
          for better visibility and branding in the market.
        </Typography>
        <Typography variant="body1">
          With the ever-evolving online search behaviour, 99acres.com shares
          updated information pertinent to real estate activities, assisting
          prospective buyers to make informed buying decision. We make online
          property search easier, quicker and smarter!
        </Typography>
        <Typography variant="body1">
          Awards and Recognitions
          <ul>
            <li>PropTech Mobile App of the Year Award 2019</li>
            <li>99acres.com won the award for ‘Personalized User Journey’</li>
            <li>Best Mobile Appies Award 2015</li>
            <li>
              99acres.com won the award for having the ‘Most Innovative Mobile
              App’ in the real estate category.
            </li>
            <li>CMO ASIA Awards 2012</li>
            <li>
              99acres.com was awarded the ‘Most Admired Real Estate Website of
              the Year’ at the 3rd CMO Asia Awards for excellence in the real
              estate segment.
            </li>
            <li>BCI Awards 2012</li>
            <li>
              99acres.com was recognised as the ‘Best Real Estate Portal’ in
              2012.
            </li>
            <li>Accommodation Times Awards 2012</li>
            <li>
              99acres.com was announced the ‘Best Online Realty Portal’ by the
              Accommodation Times in 2012.
            </li>
            <li>
              Please write to us at services@99acres.com or call us at 1800 41
              99099 (09:00 AM to 07:00 PM, Monday to Friday)
            </li>
          </ul>
        </Typography>
      </div>
    </Container>
  );
}
