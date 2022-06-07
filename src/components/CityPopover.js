import {
  Box,
  makeStyles,
  Popover,
  Typography as MuiTypography,
  withStyles,
  TextField as MuiTextField,
  InputAdornment,
  styled
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { postPropertyActions } from "../store/reducers/property-slice";
const useStyles = makeStyles((theme) => ({
  root: {},
  popover: {
    marginTop: "0.5rem",
    padding: "1rem",
    width: "90vw",
    maxWidth: 790
  },
  cityContainer: {
    display: "grid",
    rowGap: "0.3rem",
    columnGap: "1rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(6rem, 1fr))"
  },
  cityName: {
    cursor: "pointer"
  }
}));

const cityNames = [
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Surat",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan",
  "Vasai",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi",
  "Allahabad",
  "Ranchi",
  "Gwalior",
  "Jabalpur",
  "Coimbatore",
  "Vijayawada",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kota",
  "Chandigarh",
  "Guwahati",
  "Solapur"
];

const TextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "gray"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#CCCCCC"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#CCCCCC"
      },
      "&:hover fieldset": {
        borderColor: "#CCCCCC"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#CCCCCC"
      }
    },
    "& .MuiInputBase-root": {
      fontSize: "0.9rem"
    }
  }
})(MuiTextField);

const GrayTypography = styled(MuiTypography)({
  color: "gray",
  fontSize: "1rem",
  marginTop: "1rem"
});

const Typography = styled(MuiTypography)({
  fontSize: "0.9rem"
});

export default function CityPopover({
  anchorEl,
  handleClose,
  countryName,
  setCountryName
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const details = useSelector((state) => state.property.values);
  return (
    <Popover
      className={classes.root}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      marginThreshold={10}
      PaperProps={{
        className: classes.popover
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gridColumnGap="1rem"
      >
        <Typography style={{ fontWeight: 800 }}>NATIONAL</Typography>
        <TextField
          label="Search City"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>

      <GrayTypography gutterBottom>Popular Cities</GrayTypography>
      <div className={classes.cityContainer}>
        {cityNames.slice(0, 10).map((name) => (
          <Typography
            onClick={(e) => {
              //setCountryName(name);
              dispatch(postPropertyActions.update({ city: name }));
              handleClose()
            }}
            key={name}
            noWrap
            className={classes.cityName}
          >
            {name}
          </Typography>
        ))}
      </div>

      <GrayTypography gutterBottom>Other Cities</GrayTypography>
      <div className={classes.cityContainer}>
        {cityNames.map((name) => (
          <Typography
            onClick={(e) => {
              //setCountryName(name);
              dispatch(postPropertyActions.update({ city: name }));
              handleClose()
            }}
            key={name}
            noWrap
            className={classes.cityName}
          >
            {name}
          </Typography>
        ))}
      </div>
    </Popover>
  );
}
