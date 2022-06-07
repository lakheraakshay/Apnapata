import React, { useEffect } from "react";
import { Container, Typography, makeStyles, Grid } from "@material-ui/core";

import FavCard from "./FavCard";

const useStyles = makeStyles({
  grid: {
    marginTop: 40,
    gap: 40
  }
});

export default function MyFavourites() {
  const classes = useStyles();
  useEffect(() => {
    const summaries = document.querySelectorAll(".fav-summary");
    summaries.forEach(summary =>
      summary.addEventListener("click", () => summary.classList.toggle("show"))
    );
  }, []);

  return (
    <Container maxWidth="lg" component="main">
      <Typography variant="h2">My Favourites</Typography>
      <Grid container direction="column" className={classes.grid}>
        {new Array(4).fill("").map((_, i) => (
          <FavCard key={i} />
        ))}
      </Grid>
    </Container>
  );
}
