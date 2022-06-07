import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Grid,
  Button,
  Typography
} from "@material-ui/core"
import { useSelector } from "react-redux"

import bg from "../../assets/post-property/bg.png"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import BasicDetails from "./BasicDetails";
import Loan from './Loan';
import Architect from './Architect';
import Vastu from './Vastu';
import InterDesigner from './InterDesigner';
import Construction from './Construction';
import PhotosVideos from "./PhotosVideos";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: "url(" + bg + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right"
  },
  card: {
    borderRadius: 21,
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.25)",
    padding: 30
  },
  right: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    "& h1": {
      alignSelf: "flex-end"
    },
    "& .sell": {
      fontWeight: 500
    },
    "& .buttons": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 20,
      margin: "100px 0 0 100px",

      [theme.breakpoints.down("md")]: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        margin: "10px 0 0 0"
      },

      "& a": {
        width: "100%",
        color: "inherit",

        [theme.breakpoints.down("md")]: {
          width: "auto"
        },
      },
      "& button": {
        position: "relative",
        color: "#fff",
        width: "30%",

        [theme.breakpoints.down("md")]: {
          width: "fit-content"
        },

        "& p": {
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translate(50%, -50%)",
          color: "#72D344"
        },
        "& svg": {
          background: "#fff",
          borderRadius: "50%"
        }
      }
    }
  }
}))

const formToShow = (showForm, setShowForm) => {
  if (showForm === 'basic-details') return <BasicDetails setShowForm={setShowForm} />
  else if (showForm === 'Loan') return <Loan setShowForm={setShowForm} />
  else if (showForm === 'Architect') return <Architect setShowForm={setShowForm} />
  else if (showForm === 'Vastu') return <Vastu setShowForm={setShowForm} />
  else if (showForm === 'Interior Design') return <InterDesigner setShowForm={setShowForm} />
  else if (showForm === 'Construction') return <Construction setShowForm={setShowForm} />
  else if (showForm === 'photos/videos') return <PhotosVideos />
}

const formName = [
  { value: 'Loan', title: 'Loan' },
  { value: 'Architect', title: 'Architect' },
  { value: 'Vastu', title: 'Vastu' },
  { value: 'Interior Design', title: 'Interior Design' },
  { value: 'Construction', title: 'Construction' },
]

const PostServices = () => {

  const classes = useStyles()
  const [showForm, setShowForm] = useState('basic-details')
  const nextPageIndex = useSelector(state => state.services.values)

  return (
    <div className={classes.container}>
      <Container maxWidth="lg" component="main">
        <Grid container>
          <Grid item md={5}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginBottom: 10, marginLeft: 15 }}
            >
              For Service
            </Typography>
            {formToShow(showForm, setShowForm)}
          </Grid>
          <Grid item md={7} sm={12} className={classes.right}>
            <Typography variant="h1" className="sell">
              Sell or Rent your Property
            </Typography>
            <Typography variant="h1">On ApnaPata.com</Typography>
            <div className="buttons">
              <Button
                variant="contained"
                onClick={e => {
                  e.preventDefault()
                  setShowForm('basic-details')
                }}
              >
                Basic Details
                {nextPageIndex.serviceType && (
                  <p>
                    <CheckCircleIcon />
                  </p>
                )}
              </Button>
              {
                formName.filter(i => i.value === nextPageIndex?.serviceType).length !== 0 && (
                  <Button variant="contained">
                    {formName?.filter(i => i.value === nextPageIndex?.serviceType)[0]?.title}
                    {Object.keys(nextPageIndex).length > 7 && (
                      <p>
                        <CheckCircleIcon />
                      </p>
                    )}
                  </Button>
                )
              }
              <Button
                variant="contained"
                onClick={e => {
                  e.preventDefault()
                  setShowForm('photos/videos')
                }}
              >
                Photos/Videos
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default PostServices
