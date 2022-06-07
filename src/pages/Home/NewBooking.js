import { makeStyles, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    borderRadius: "0.5rem",
    position: "relative",
    "&:hover": {
      "& $textContAbs": {
        opacity: 1,
      },
    },
  },
  img: {
    width: "100%",
    display: "block",

    [theme.breakpoints.down("md")]: {
      width: "inherit",
      height: "inherit"
    }
  },
  textContAbs: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    opacity: 0,
    transition: "opacity 0.3s",
  },
  textDiv: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "auto",
    borderRadius: "0.5rem",
    width: "100%",
    padding: "0.1rem 10px",
    background: "white",
  },
  cityName: {
    fontSize: "12px",
  },
  numFont: {
    fontFamily: "serif",
    fontSize: "13px",
    lineHeight: 1.4,
  },
}));

const NewBooking = ({ booking }) => {
  const classes = useStyles();
  
  return (
    <Link className={classes.root} to={`/buy/property/${booking?._id}`}>
      <img
        className={classes.img}
        src={booking?.photos[0] || require("../../assets/properties/1.png").default}
        alt="Property"
      />
      <div className={classes.textContAbs}>
        <Box className={classes.textDiv}>
          <Typography className={classes.cityName}>{booking?.city?.name}, {booking?.town?.name}</Typography>
          <Typography className={classes.numFont} color="primary">
            {booking?.title}
          </Typography>
        </Box>
      </div>
    </Link>
  );
};

export default NewBooking;
