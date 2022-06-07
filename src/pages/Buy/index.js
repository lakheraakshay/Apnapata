import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import Rent from "./Rent";
import PG from "./PG";
import Loan from "./Loan";
import Architect from "./Architect";
import Vastu from "./Vastu";
import Interior from "./Interior";
import Construction from "./Construction";

import SearchNav from "./SearchNav";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Buy() {
  const [searchParams, setSearchParams] = useState({});
  const query = useQuery();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    // alert("at buy page");
    const params = {
      city: query.get("city"),
      location: query.get("loc"),
      propertyType: query.get("pt"),
      subcategory: query.get("sc"),
      path,
    };
    setSearchParams(params);
  }, [location]);

  return (
    <>
      <SearchNav searchParams={searchParams} />
      <Container maxWidth="lg" component="main">
        <Switch>
          <Route path="/buy/pg">
            <PG />
          </Route>
          <Route path="/buy/rent">
            <Rent />
          </Route>
          <Route path="/buy/loan">
            <Loan />
          </Route>
          <Route path="/buy/architect">
            <Architect />
          </Route>
          <Route path="/buy/vastu">
            <Vastu />
          </Route>
          <Route path="/buy/interior">
            <Interior />
          </Route>
          <Route path="/buy/construction">
            <Construction />
          </Route>
          <Route path="*">
            <Redirect to="/buy" />
          </Route>
        </Switch>
      </Container>
    </>
  );
}
