import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Button,
  Typography,
  Hidden
} from "@material-ui/core";
import client from '../../api/client';
import { useHistory } from "react-router-dom";

import bg from "../../assets/profile/profilebg.png";
import stockImg from "../../assets/profile/stock.png";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    "& button": {
      color: "#fff",
      borderRadius: 0
    },
    "& > :not(.active)": {
      background: "none",
      color: "#000",
      boxShadow: "none"
    }
  },
  card: {
    padding: 40,
    background: "#fff",
    marginRight: 30,
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("md")]: {
      marginRight: 0
    },
    
    "& .edit-btn": {
      marginTop: 30,
      alignSelf: "center",
      color: "#fff",
      padding: "5px 50px"
    }
  },
  icon: {
    width: 175,
    height: 175,
    borderRadius: "50%",
    overflow: "hidden"
  },
  details: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    "& .detail": {
      display: "flex",
      borderBottom: "2px dashed #E7E7E7",
      paddingBottom: 10,
      "& .title": {
        width: "35%",
        color: "#808080"
      },
      "& .description": {
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 600
      }
    }
  },
  image: {
    marginTop: "40%"
  }
}));

export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const [profile, setProfile] = useState(null)
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const getProfile = async () => {
      const response = await client.get('/user/profile')

      if (response?.data?.data) {
        setProfile(response.data.data)
      }
    }

    getProfile();
  }, [])

  useEffect(() => {
    if (profile !== null) {
      const newDetails = [
        { title: "Name", desc: profile.name },
        { title: "Office Name", desc: profile.office_name },
        { title: "Phone Number", desc: profile.phonenumber },
        { title: "WhatsApp Number", desc: profile.whatsapp_no },
        { title: "Address", desc: profile.address },
        { title: "Email ID", desc: profile.email },
        { title: "PAN Number", desc: profile.pan_no },
        { title: "Aadhar Number", desc: profile.adhaar_no },
        { title: "GST Number", desc: profile.gst_no },
        { title: "Email Verified", desc: profile.isEmailVerified ? "Yes Verified" : "Not Verified" },
        { title: "Phone Verified", desc: profile.isPhoneVerified ? "Yes Verified" : "Not Verified" },
        { title: "Total Post", desc: profile.totalPost },
        { title: "Subscription", desc: profile.subscription.toString() },
        { title: "Properties", desc: profile.properties.map(property => property.title).toString() },
        { title: "Services", desc: profile.services.map(service => service.details).toString() },
      ]

      setDetails(newDetails)
    }
  }, [profile])

  return (
    <Container maxWidth="lg" component="main">
      <Grid container>
        <Grid item md={8} xs={12}>
          <div className={classes.buttons}>
            <Button variant="contained" className="active">
              Personal Details
            </Button>
            {/* <Button variant="contained">Office Details</Button> */}
          </div>
          {
            details !== null && (
              <div className={classes.card}>
                <div className={classes.icon}>
                  <img src={stockImg} alt="profile icon" />
                </div>
                <div className={classes.details}>
                  {details.map((detail, i) => (
                    <div className="detail" key={i}>
                      <Typography variant="h6" className="title">
                        {detail.title}
                      </Typography>
                      <Typography variant="h6" className="description">
                        {detail.desc}
                      </Typography>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20 }}>
                  <Typography variant="body2" style={{ fontWeight: 400 }}>
                    I, {profile?.name} from office {profile?.office_name}, certify that all
                    the details are filled by me and all of them are true.
                  </Typography>
                </div>
                <Button variant="contained" className="edit-btn" onClick={() => history.push('/profile/edit')}>
                  Edit
                </Button>
              </div>
            )
          }
        </Grid>
        <Hidden mdDown>
          <Grid item md={4}>
            <div className={classes.image}>
              <img src={bg} alt="house" />
            </div>
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
}
