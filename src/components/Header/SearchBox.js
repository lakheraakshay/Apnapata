import React, { useEffect, useState } from "react";
import { makeStyles, TextField, Grid, Button } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router";
import { typeList, choices } from "../../pages/PostProperty/BasicDetails";
import Radio from "../Radio";
import globalStyles from "../GlobalStyles/PostPropStyles";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyType } from "../../store/reducers/property-slice";
import Message from "../Message";
import { Autocomplete } from "@mui/material";

const useStyles = makeStyles({
  container: {
    background: "rgba(236, 236, 236, 0.7);",
    padding: 40,
    borderRadius: 8,
    gap: 40,
  },
  formGroup: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    "& label": {
      fontWeight: 500,
    },
    "& .text-field": {
      background: "#fff",
      padding: "7px 15px 4px",
      borderRadius: 8,
      width: "100%",
    },
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& button": {
      borderRadius: 67,
      padding: "10px 30px",
      boxShadow: "none",
    },
    "& span": {
      color: "#fff",
      letterSpacing: 3,
      fontWeight: 700,
    },
  },
  icon: {
    fontSize: "1.3rem",
    marginRight: 5,
  },
});

const validationSchema = yup.object({
  country: yup.string().required("* required"),
  city: yup.string().required("* required"),
  location: yup.string(),
});

export default function SearchBox({
  additional = true,
  parent = "",
  handleClose,
}) {
  const classes = { ...globalStyles(), ...useStyles() };
  const history = useHistory();
  const dispatch = useDispatch();
  const [propertyType, setPropertyType] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const details = useSelector((state) => state.property.values);
  const [country, setCountry] = useState("");
  const [CityList, setCityList] = useState([]);
  const [City, setCity] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const formik = useFormik({
    initialValues: {
      country: "India",
      city: details.city,
      location: "",
      propertyType: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert("submit called");
      // alert(JSON.stringify(values, null, 2));
      const { city, country, location, propertyType } = values;
      console.log(values);
      // dispatch(update({ ...values, next: 2 }));
      handleClose();
      // window.location.href = `/buy?country=${country?.name}&city=${
      //   City?.name
      // }&town=${location ? location : ""}`;
      // history.push(
      //   `/buy?country=${country?.name}&city=${City?.name}&town=${
      //     location ? location : ""
      //   }`
      // );
      // history.push(`/buy?country=${country}&city=${city}&town=${location}`);
    },
  });

  const submitForm = () => {
    handleClose();
    window.location.href = `/buy?country=${country?.name}&city=${City?.name}&town=`;
  };

  useEffect(() => {
    const countries = [];
    fetch("https://apnapata.herokuapp.com/api/v1/countries/all?status=true")
      .then((res) => res.json())
      .then((data) => data.data)
      .then((data) =>
        data.forEach((item) =>
          countries.push({ id: item._id, name: item.name })
        )
      );
    setCountryList(countries);
  }, []);

  useEffect(() => {
    const cities = [];
    formik.values.country != undefined &&
      fetch(
        `https://apnapata.herokuapp.com/api/v1/cities/all?status=true&country=${country.id}`
      )
        .then((res) => res.json())
        .then((data) => data?.data)
        .then((data) =>
          data?.forEach((item) =>
            cities?.push({ id: item._id, name: item.name })
          )
        );
    setCityList(cities);
  }, [country]);

  useEffect(() => {
    const getPropertyTypeList = async () => {
      const response = await dispatch(getPropertyType());

      if (response.type === "/propertyType/all/fulfilled") {
        setPropertyType(response.payload.data);
      }

      if (response.type === "/propertyType/all/rejected") {
        console.log(response.error.message);
        setErrorMessage(response.error.message);
      }
    };

    getPropertyTypeList();
  }, []);

  console.log(country, "<<<<< country");
  // <form onSubmit={submitForm}>
  return (
    <form>
      {errorMessage && <Message message={errorMessage} />}

      <Grid container alignItems="center" className={classes.container}>
        <Grid item className={classes.formGroup} style={{ width: "100%" }}>
          <label style={{ width: "10%" }}>Country</label>
          {/* <TextField
            size="small"
            className="text-field"
            InputProps={{ disableUnderline: true }}
            id="country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          /> */}
          <Autocomplete
            fullWidth
            disablePortal
            id="combo-box-demo"
            options={countryList}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Select country" />
            )}
            onChange={(_, value) => (value ? setCountry(value) : setCountry())}
          />
        </Grid>
        <Grid item className={classes.formGroup} style={{ width: "100%" }}>
          <label style={{ width: "10%" }}>City</label>
          <Autocomplete
            fullWidth
            disablePortal
            id="combo-box-demo"
            options={CityList}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Select City" />
            )}
            onChange={(_, value) => (value ? setCity(value) : setCity())}
          />

          {/* <TextField
            size="small"
            className="text-field"
            InputProps={{ disableUnderline: true }}
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          /> */}
        </Grid>
        <Grid item className={classes.formGroup} style={{ width: "100%" }}>
          <label style={{ width: "10%" }}>Location</label>
          <TextField
            size="small"
            className="text-field"
            InputProps={{ disableUnderline: true }}
            id="location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </Grid>

        {/* {propertyType.length !== 0 && (
                    <Grid
                        item
                        className={classes.formGroupColumn}
                        style={{ width: "100%" }}
                    >
                        <label>It is -</label>
                        <ul className={classes.options}>
                            {propertyType.map(item => (
                                <Radio
                                    key={item._id}
                                    formikName={formik.values.propertyType}
                                    value={item._id}
                                    title={item.property_type}
                                    fieldName="propertyType"
                                    handleChange={formik.handleChange}
                                />
                            ))}
                        </ul>
                    </Grid>
                )} */}

        <Grid item className={classes.button} style={{ width: "100%" }}>
          <Button variant="contained" onClick={submitForm}> 
            <SearchIcon className={classes.icon} />
            SEARCH
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
