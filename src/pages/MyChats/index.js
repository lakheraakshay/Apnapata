import React, { useState, useEffect } from "react";
import { Container, makeStyles, Grid, InputBase, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";

import Chat from "./Chat";
import Conversation from "./Conversation";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import { base_url, socket } from "../../socket";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "#FCFCFC",
    border: "2px solid #CECECE",
    "& .left": {
      borderRight: "2px solid #CECECE"
    },
    height: "74vh"
  },
  chat: {
    overflowY: "scroll",
    height: "100%"
  },
  title: {
    minHeight: 90,
    display: "flex",
    alignItems: "center",
    background: "#E3E3E3",
    borderBottom: "2px solid #CECECE",
    padding: 20,
    "& h2": {
      display: "flex",
      alignItems: "center"
    },
    "& span": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 25,
      width: 25,
      marginLeft: 7,
      background: "#F4C48F",
      fontSize: "0.9rem",
      borderRadius: "50%"
    },
    "& .icons": {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
    }
  },
  filters: {
    padding: 20,
    "& > p": {
      fontWeight: 500,
      marginBottom: 10
    },
    "& .filters": {
      display: "flex",
      gap: 15,

      [theme.breakpoints.down("md")]: {
        gap: 5,
        flexWrap: "wrap",

        "& p": {
          fontSize: "12px"
        }
      }, 

      "& p": {
        background: "#F9E4CD",
        padding: "5px 15px",
        borderRadius: 20,
        cursor: "pointer",
      },
      "& .active": {
        background: "#F4C48F"
      }
    }
  },
  chats: {
    maxHeight: "90vh",
    overflow: "auto"
  },
  search: {
    padding: ".5rem 1rem",
    background: "#fff",
  }
}));

export default function MyChats() {
  const classes = useStyles();
  localStorage.setItem("userId", "6135b00bc86886091b6f8d85");
  // eslint-disable-next-line
  const [user, setUser] = useState(localStorage.getItem("userId"));
  // eslint-disable-next-line
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.emit("addUser", user);
    socket.on("getUsers", data => {
      console.log(data);
      setUsers(data);
    });

    return () => {
      socket.off("getUsers");
    };
  }, [user]);

  useEffect(() => {
    let mounted = true;
    axios.get(`${base_url}/conversation/${user}`).then(res => {
      if (mounted) {
        console.log("conversations", res.data);
        setConversations(res.data);
      }
    });

    return () => {
      mounted = false;
    };
  }, [user]);

  // ** Change Tabs
  const [tab, setTab] = useState("all");
  const handleChange = (event, newValue) => {
    setTab(newValue);
  }

  return (
    <Container maxWidth="lg" component="main">
      <Grid container className={classes.container}>
        <Grid item xs={5} className="left">
          <div className={classes.title}>
            <Typography variant="h2">
              INBOX <span>1</span>
            </Typography>
            <div className="icons">
              {/* <SearchIcon /> */}
              <InputBase
                className={classes.search}
                placeholder="Search chats..."
              // onKeyPress={handleEnter}
              />
              <MoreIcon htmlColor="#C4C4C4" style={{ marginLeft: 5 }} />
            </div>
          </div>
          <div className={classes.filters}>
            <Typography variant="body2">QUICK FILTERS</Typography>
            <div className="filters">
              <Typography variant="body2" className={tab === "all" && "active"} onClick={(e) => handleChange(e, "all")}>
                All
              </Typography>
              <Typography variant="body2" className={tab === "unread" && "active"} onClick={(e) => handleChange(e, "unread")}>Unread Chats</Typography>
              <Typography variant="body2" className={tab === "important" && "active"} onClick={(e) => handleChange(e, "important")}>Important</Typography>
            </div>
          </div>
          <div className={classes.chats}>
            {conversations?.map(c => {
              return c.members
                ?.filter(m => {
                  return m.id !== user;
                })
                .map(m => {
                  return (
                    <NavLink
                      key={m.id}
                      activeClassName=""
                      to={`/mychats/${m.name}/${c._id}/${m.id}`}
                      className="p-3 font-medium border-b border-gray-300"
                    >
                      <Chat m={m} />
                    </NavLink>
                  );
                });
            })}
          </div>
        </Grid>

        <Switch>
          <Route path="/mychats/:name/:id/:receiverId">
            <Grid className={classes.chat} item xs={7}>
              <Conversation />
            </Grid>
          </Route>
        </Switch>
      </Grid>
    </Container>
  );
}
