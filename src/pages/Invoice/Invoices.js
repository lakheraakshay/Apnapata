import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  invoices: {
    display: "flex",
    flexDirection: "column",
    border: "2px solid #858585",
    borderRadius: 4,
    background: "#fff",
    marginLeft: 40,
    fontFamily: "'Roboto', sans-serif",
    "& article": {
      color: "#575757"
    },
    "& p": {
      fontWeight: 600
    }
  },
  invoice: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "20px 40px",
    borderBottom: "2px solid #858585"
  },
  invoiceDetails: {
    borderBottom: "2px solid #858585",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    background: "#EAEAEA"
  }
});

export default function Invoices() {
  const classes = useStyles();

  return (
    <div className={classes.invoices}>
      <div className={classes.invoice}>
        <p>ORDER ID: #4758300</p>
        <article>24/12/19</article>
      </div>
      <div className={classes.invoiceDetails}>
        <p>INVOICE</p>
        <p>OLXINI1900609091</p>
        <article>24/12/19</article>
        <p>₹ 8,999</p>
      </div>
      <div className={classes.invoice}>
        <p>ORDER ID: #4758300</p>
        <article>24/12/19</article>
      </div>
      <div className={classes.invoice}>
        <p>ORDER ID: #4758300</p>
        <article>24/12/19</article>
      </div>
      <div className={classes.invoice}>
        <p>ORDER ID: #4758300</p>
        <article>24/12/19</article>
      </div>
      <div className={classes.invoice}>
        <p>ORDER ID: #4758300</p>
        <article>24/12/19</article>
      </div>
    </div>
  );
}
