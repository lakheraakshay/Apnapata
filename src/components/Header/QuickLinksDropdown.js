import {
  Button,
  makeStyles,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from "@material-ui/core";

import {
  ArrowDropDown as ArrowDropDownIcon,
  Call as CallIcon,
  WhatsApp as WhatsAppIcon,
  Mail as MailIcon,
  Menu as MenuIcon
} from "@material-ui/icons";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  select: {
    borderRadius: 3,
    padding: "0.3rem 1rem",
    paddingRight: 10,
    textTransform: "none",
    fontWeight: 400,
    "& span": {
      fontSize: "1.2rem",
      color: "white"
    },
    "& svg": {
      fontSize: "2rem"
    }
  },
  popover: {
    background: theme.palette.primary.main,
    color: "white",
    marginTop: "0.5rem",
    width: "100%",
    maxWidth: 200
  },
  listItem: {
    border: "none",
    "&.MuiListItem-divider": {
      position: "relative",
      "&::after": {
        content: "''",
        position: "absolute",
        bottom: 0,
        width: "60%",
        borderBottom: "1px solid white"
      }
    },
    "& .MuiListItemIcon-root": {
      minWidth: 35,
      marginLeft: 10
    },
    "& .MuiTypography-body1": {
      color: "#fff"
    }
  }
}));

const shortLinks = [
  { label: "Login", link: "/login" },
  { label: "Register", link: "/signup" },
  { label: "Post your Property", link: "/postproperty" },
  { label: 'Post your Services', link: '/postservices' }
];

const authedLinks = [
  { label: "My Posts", link: "/myposts" },
  { label: "My Chats", link: "/mychats" },
  { label: "My Favourites", link: "/myfavourites" },
  { label: "My Profile", link: "/profile" },
  { label: "Edit Profile", link: "/profile/edit" },
  { label: "Post property free", link: "/postproperty" },
  { label: "Post services free", link: "/postservices" },
  { label: "Manage Alerts", link: "/managealerts" },
  { label: "Bought Plan and Invoice", link: "/invoice" },
  { label: "Buy Plan", link: "/buyplan" },
  { label: "Logout", link: "/logout" },
  // { label: "Delete Profile", link: "/" }
];

const contact = [
  { label: "Call", link: "/login", icon: CallIcon },
  { label: "Whatsapp", link: "/login", icon: WhatsAppIcon },
  { label: "Mail", link: "/login", icon: MailIcon }
];

export default function QuickLinksDropdown({ style }) {
  const classes = useStyles();
  const { userName, isAuthenticated: isAuthed } = useSelector(
    state => state.auth
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const links = isAuthed ? authedLinks : shortLinks;

  const theme = useTheme()
  const smDevice = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <>
      <Button
        style={style}
        classes={{ root: classes.select }}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        {smDevice ? <MenuIcon /> : (
          <>
            {isAuthed ? "Menu" : "Login"}
          </>
        )}
        {!smDevice && <ArrowDropDownIcon />}
      </Button>
      <Popover
        className={classes.root}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        marginThreshold={10}
        PaperProps={{
          elevation: 0,
          className: classes.popover
        }}
      >
        <List component="div" dense disablePadding>
          {isAuthed && (
            <ListItem className={classes.listItem}>
              <ListItemText primary={"Hi " + userName} />
            </ListItem>
          )}
          {links.map(item => (
            <ListItem
              key={item.label}
              divider={!Boolean(item.icon)}
              className={classes.listItem}
              component={NavLink}
              button
              to={item.link}
              onClick={() => setAnchorEl(null)}
            >
              {item.icon && (
                <ListItemIcon>
                  <item.icon style={{ color: "white" }} />
                </ListItemIcon>
              )}
              {/* {item.label === "Post your Service" && <ArrowDropDownIcon />} */}
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          {/*Contacts List*/}
          {contact.map(item => {
            return (
              <ListItem
                key={item.label}
                divider={!Boolean(item.icon)}
                className={classes.listItem}
                component={NavLink}
                button
                to={item.link}
              >
                {item.icon && (
                  <ListItemIcon>
                    <item.icon style={{ color: "white" }} />
                  </ListItemIcon>
                )}
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
      </Popover>
    </>
  );
}
