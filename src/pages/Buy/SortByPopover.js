import {
    List,
    ListItemText,
    Popover,
    ListItem,
    makeStyles,
} from "@material-ui/core";
import React from "react";

const links = ["Test1", "Demo1", "Demo Test"];

const useStyles = makeStyles((theme) => ({
    select: {
        borderRadius: 3,
        padding: "0.3rem 1rem",
        paddingRight: 10,
        textTransform: "none",
        fontWeight: 400,
        "& span": {
            fontSize: "1.2rem",
            color: "white",
        },
        "& svg": {
            fontSize: "2rem",
        },
    },
    popover: {
        background: theme.palette.primary.main,
        color: "white",
        marginTop: "0.5rem",
        width: "100%",
        maxWidth: 200,
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
                borderBottom: "1px solid white",
            },
        },
        "& .MuiListItemIcon-root": {
            minWidth: 35,
            marginLeft: 10,
        },
        "& .MuiTypography-body1": {
            color: "#fff",
        },
    },
}));

export const SortByPopover = ({ anchorEl, setAnchorEl }) => {
    const classes = useStyles();
    return (
        <div>
            <Popover
                className={classes.root}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                marginThreshold={10}
                PaperProps={{
                    elevation: 0,
                    className: classes.popover,
                }}
            >
                <List component="div" dense disablePadding>
                    {links.map((item) => (
                        <ListItem
                            key={item}
                            //   divider={!Boolean(item.icon)}
                            className={classes.listItem}
                            //   component={NavLink}
                            button
                            //   to={item.link}
                            onClick={() => setAnchorEl(null)}
                        >
                            {/* {item.icon && (
                <ListItemIcon>
                  <item.icon style={{ color: "white" }} />
                </ListItemIcon>
              )} */}
                            {/* {item.label === "Post your Service" && <ArrowDropDownIcon />} */}
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </div>
    );
};