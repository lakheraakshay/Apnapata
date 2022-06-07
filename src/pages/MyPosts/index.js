import React from "react";
import {
  Container,
  Grid,
  makeStyles,
  TextField,
  InputAdornment
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import { getUserProfile } from "../../api/auth";
import Message from '../../components/Message';
import ErrorBoundary from '../../components/ErrorBoundary';
import Post from "./Post";

const useStyles = makeStyles({
  filters: {
    display: "flex",
    marginLeft: "auto",
    alignItems: "center",
    gap: 30
  },
  filter: {
    background: "#F4C48F",
    padding: "10px 25px",
    borderRadius: 30,
    opacity: 0.7,
    fontWeight: 600
  },
  activeFilter: {
    opacity: 1
  }
});

export default function MyPosts() {
  const classes = useStyles();

  const [properties, setProperties] = React.useState(null)
  const [message, setMessage] = React.useState('')

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        console.log(response.data.data.properties);
        setProperties(response.data.data.properties);
      } catch (error) {
        console.log(error.message)
        setMessage(error.message)
      }
    }

    fetchProfile();
  }, [])

  return (
    <Container maxWidth="lg" component="main">
      {
        message && <Message message={message} />
      }
      {/* search and filters */}
      {/* <Grid container alignItems="center">
        <Grid item>
          <TextField
            variant="outlined"
            placeholder="Search by City"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon htmlColor="#00000055" />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item className={classes.filters}>
          <p>Filters:</p>
          <div className={clsx(classes.filter, classes.activeFilter)}>
            View all
          </div>
          <div className={classes.filter}>Active ads</div>
          <div className={classes.filter}>Inactive ads</div>
        </Grid>
      </Grid> */}
      {
        properties !== null && <Grid container direction="column" spacing={4} style={{ marginTop: 20 }}>
          {
            properties.map(property => (
              <ErrorBoundary key={property._id}>
                <Post  property={property} />
              </ErrorBoundary>
            ))
          }
        </Grid>
      }
    </Container>
  );
}
