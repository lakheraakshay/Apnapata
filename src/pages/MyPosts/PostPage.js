import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";

import interior from "../../assets/my-posts/interior.png";
import PostCard from "./PostCard";

const useStyles = makeStyles({
  title: {
    fontWeight: 600,
    marginBottom: 40
  },
  image: {
    marginBottom: 40
  }
});

export default function PostPage() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="main">
      <Typography variant="h5" className={classes.title}>
        My Posts
      </Typography>
      <div className={classes.image}>
        <img src={interior} alt="interior of a house" />
      </div>
      <PostCard />
    </Container>
  );
}
