import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authActions } from "../store/reducers/auth-slice";
import Header from "../components/Header/Navbar";
import Logout from "../components/Logout";
import Home from "../pages/Home";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import MyPosts from "../pages/MyPosts";
import PostPage from "../pages/MyPosts/PostPage";
import Profile from "../pages/Profile";
import ProfileEdit from "../pages/ProfileEdit";
import BuyPlan from "../pages/BuyPlan";
import MyFavourites from "../pages/MyFavourites";
import MyChats from "../pages/MyChats";
import PostProperty from "../pages/PostProperty";
import PostServices from "../pages/PostServices";
import Invoice from "../pages/Invoice";
import ManageAlert from "../pages/ManageAlert";
import OurServices from "../pages/OurServices";
import Buy from "../pages/Buy";
import BuyHome from "../pages/Buy/BuyHome";
import TopAgents from "../pages/Buy/TopAgents";
import useScrollToTop from "../hooks/useScrollToTop";
import Footer from "../components/Footer";
import BuyOne from "../pages/Buy/BuyOne";

const Routes = () => {
  const dispatch = useDispatch();
  useScrollToTop();
  useEffect(() => {
    dispatch(authActions.loginOnLoad());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/myposts/:id">
          <PostPage />
        </Route>
        <Route path="/myposts">
          <MyPosts />
        </Route>
        <Route path="/profile/edit">
          <ProfileEdit />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/buy/property/:id" exact>
          <BuyOne />
        </Route>
        <Route path="/buy/:name">
          <Buy />
        </Route>
        <Route path="/buy" exact>
          <BuyHome />
        </Route>
        <Route path="/topagents">
          <TopAgents />
        </Route>
        <Route path="/buyplan">
          <BuyPlan />
        </Route>
        <Route path="/myfavourites">
          <MyFavourites />
        </Route>
        <Route path="/mychats">
          <MyChats />
        </Route>
        <Route path="/chatmsg/:id">
          <h1>hi</h1>
        </Route>
        <Route exact path="/postproperty">
          <PostProperty />
        </Route>
        <Route exact path="/postservices">
          <PostServices />
        </Route>
        <Route path="/invoice">
          <Invoice />
        </Route>
        <Route path="/managealerts">
          <ManageAlert />
        </Route>
        <Route path="/ourservices">
          <OurServices />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route>
          <h1>invalid route</h1>
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default Routes;
