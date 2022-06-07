import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

import globalStyles from "../../../components/GlobalStyles/ServicesStyles";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";

export default function ForLoan() {
  const [part, setPart] = useState(1);
  const classes = globalStyles();

  return (
    <Container maxWidth="lg" component="main">
      <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        For Loan
      </Typography>
      <Grid container>
        <Grid item md={5} sm={12} xs={12}>
          <Card className={classes.card}>
            <CardContent>
              {part === 1 ? (
                <Part1 setPart={setPart} />
              ) : part === 2 ? (
                <Part2 setPart={setPart} />
              ) : part === 3 ? (
                <Part3 setPart={setPart} />
              ) : (
                <Part4 />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={7} className={classes.right}>
          <Typography variant="h1" className="sell">
            Our Services
          </Typography>
          <Typography variant="h1">On ApnaPata.com</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
