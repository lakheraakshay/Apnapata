import { Link, makeStyles } from "@material-ui/core";
import {
  Facebook,
  Instagram,
  Mail,
  // Twitter,
  LinkedIn
  // WhatsApp,
} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    "& a": {
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "fit-content"
    }
  },

  icons: {
    color: "white"
  }
}));

const Social = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link target="_blank" href="mailto:hello@befinsavvy.com&body=Hi BeFinSavvy,  I am interested to learn more about you. Please send me information regarding... Thank you!&su=New Message for BeFinSavvy!">
        <Mail className={classes.icons} />
      </Link>
      <Link target="_blank" href="https://www.facebook.com/befinsavvynow">
        <Facebook className={classes.icons} />
      </Link>
      {/* <Link target="_blank" href="https://twitter.com/befinsavvy">
        <Twitter className={classes.icons} />
      </Link> */}
      <Link target="_blank" href="https://www.instagram.com/befinsavvynow/">
        <Instagram className={classes.icons} />
      </Link>
      <Link
        target="_blank"
        href="https://www.linkedin.com/company/befinsavvy/?viewAsMember=true"
      >
        <LinkedIn className={classes.icons} />
      </Link>
      {/* <Link
        target="_blank"
        href="https://api.whatsapp.com/send?phone=+918225835554"
      >
        <WhatsApp className={classes.icons} />
      </Link> */}
    </div>
  );
};

export default Social;
