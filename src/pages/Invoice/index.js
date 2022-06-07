import React from "react";
import { Container, makeStyles, Grid, Button } from "@material-ui/core";

import Packages from "./Packages";
import Billing from "./Billing";
import Invoices from "./Invoices";

const useStyles = makeStyles((theme) => ({
  drawer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,

    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 20,
    },

    "& button": {
      fontWeight: 600,
      color: "#fff",
      "&:not(.active)": {
        background: "none",
        boxShadow: "none",
        color: "#000",
      },
    },
  },
}));

export default function Invoice() {
  const classes = useStyles();
  const [currentMenu, setCurrentMenu] = React.useState("bought-packages");

  const handleSelectMenu = (event, menu) => {
    setCurrentMenu(menu);
    const menuItems = ["bought-packages", "billing-info", "invoice"];

    menuItems.forEach((m) => {
      const item = document.getElementById( m);
      item.classList.remove("active");
    });

    const newActiveMenu = document.getElementById(menu);
    newActiveMenu.classList.add("active");
  };

  return (
    <Container maxWidth="lg" component="main">
      <Grid container spacing={3}>
        <Grid item xs={12} md={2} className={classes.drawer}>
          <Button
            variant="contained"
            className="active"
            id="bought-packages"
            onClick={(e) => handleSelectMenu(e, "bought-packages")}
          >
            Bought Packages
          </Button>
          <Button
            variant="contained"
            id="billing-info"
            onClick={(e) => handleSelectMenu(e, "billing-info")}
          >
            Billing Information
          </Button>
          <Button
            variant="contained"
            id="invoice"
            onClick={(e) => handleSelectMenu(e, "invoice")}
          >
            Invoice
          </Button>
        </Grid>
        <Grid item xs={12} md={10} style={{ minHeight: "80vh" }}>
          {currentMenu === "bought-packages" ? (
            <Packages />
          ) : currentMenu === "billing-info" ? (
            <Billing />
          ) : currentMenu === "invoice" ? (
            <Invoices />
          ) : (
            <Packages />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
