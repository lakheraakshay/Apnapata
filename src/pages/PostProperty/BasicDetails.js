import React, { useEffect, useState } from "react";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { postPropertyActions } from "../../store/reducers/property-slice";
import Radio from "../../components/Radio";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import LoginBackdrop from "../../components/LoginBackdrop";

export const typeList = [
  { value: "Residential", title: "Residential" },
  { value: "Commercial", title: "Commercial" },
  { value: "Industrial", title: "Industrial" },
  { value: "Farm", title: "Farm" },
  { value: "Project Land", title: "Project Land" },
];
export const choices = {
  residential: [
    { value: "Flat", title: "Flat" },
    { value: "Independent Floor", title: "Independent Floor" },
    { value: "House/Villa", title: "House/Villa" },
    { value: "Plot/Land", title: "Plot/Land" },
  ],
  commercial: [
    { value: "Plot/Land", title: "Plot/Land" },
    { value: "Built up Shop/SCO", title: "Built up Shop/SCO" },
    {
      value: "Showroom/Office/Retail Space",
      title: "Showroom/Office/Retail Space",
    },
    { value: "Hotel/Guest House", title: "Hotel/Guest House" },
  ],
  industrial: [
    { value: "Plot/Land", title: "Plot/Land" },
    { value: "Factory/Shed", title: "Factory/Shed" },
    { value: "Industrial Floor/Space", title: "Industrial Floor/Space" },
    { value: "Storage/Warehouse", title: "Storage/Warehouse" },
  ],
  farm: [
    { value: "Plot/Land", title: "Plot/Land" },
    { value: "Farmhouse/Built up", title: "Farmhouse/Built up" }, // not found
  ],
  projectLand: [
    { value: "Project", title: "Project" }, // not found
    { value: "Free Zone", title: "Free Zone" }, // not found
    { value: "Commercial Zone", title: "Commercial Zone" }, // not found
    { value: "Industrial Zone", title: "Industrial Zone" }, // not found
  ],
};
const forList = [
  { value: "NEW BOOKING", title: "New Booking" },
  { value: "SALE", title: "Sale" },
  { value: "RENT", title: "Rent" },
  { value: "PG", title: "PG" },
];
const userStatusList = [
  { value: "OWNER", title: "Owner" },
  { value: "BUILDER", title: "Builder" },
  { value: "AGENT", title: "Agent" },
];

const validationSchema = yup.object({
  country: yup.object().required("Country name is required"),
  city: yup.object().required("City/Village name is required"),
  colony: yup
    .object()
    .required("Colony/Township/Area/Society name is required"),
  title: yup.object().required("Property Title is required"),
});

const filter = createFilterOptions();

export default function BasicDetails({ setSubcat }) {
  const dispatch = useDispatch();
  const classes = globalStyles();
  const history = useHistory();
  const details = useSelector((state) => state.property.values);
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState();
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState();
  const [townList, setTownList] = useState([]);
  const [town, setTown] = useState();
  const [propertyType, setPropertyType] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [selectedSub, setSelectedSub] = useState();

  const formik = useFormik({
    initialValues: {
      country: details.country ? details.country : {},
      city: details.city ? details.city : {},
      colony: details.colony ? details.colony : {},
      title: details?.values?.title ? details.values.title : "",
      propertyFor: details?.values?.propertyFor
        ? details.values.propertyFor
        : "",
      userType: details?.values?.userType ? details.values.userType : "",
      propertyType: details.propertyType ? details.propertyType : "",
      subcategory: details.subcategory ? details.subcategory : "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      setSubcat(values.subcategory);
      history.push("/postproperty?page=" + values.subcategory);
      dispatch(
        postPropertyActions.updateLocationsForSubmit({
          country: { data: country.id, name: country.name },
          city: { data: city.id, name: city.name },
          town: { data: town.id ? town.id : null, name: town.name },
          propertySubType: selectedSub,
        })
      );
      dispatch(postPropertyActions.update({ values, next: 2 }));
    },
  });

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
    country &&
      fetch(
        `https://apnapata.herokuapp.com/api/v1/cities/all?status=true&country=${country.id}`
      )
        .then((res) => res.json())
        .then((data) => data.data)
        .then((data) =>
          data.forEach((item) => cities.push({ id: item._id, name: item.name }))
        );
    setCityList(cities);
  }, [country]);

  useEffect(() => {
    const towns = [];
    if (city?.id) {
      fetch(
        `https://apnapata.herokuapp.com/api/v1/towns/all?status=true&city=${city.id}`
      )
        .then((res) => res.json())
        .then((data) => data.data)
        .then((data) =>
          data.forEach((item) => towns.push({ id: item._id, name: item.name }))
        );
      setTownList(towns);
    } else {
      setTownList([]);
    }
  }, [city]);

  useEffect(() => {
    (async () => {
      const temp = [];
      await fetch(
        "https://apnapata.herokuapp.com/api/v1/propertytype/all?status=true"
      )
        .then((res) => res.json())
        .then((data) => data.data)
        .then((data) =>
          data.forEach((item) =>
            temp.push({
              subtype: item.property_subtype,
              name: item.property_type,
              id: item._id,
            })
          )
        );
      setPropertyType(temp);
    })();
  }, []);

  return (
    <>
      {/* <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        Basic Details
      </Typography> */}
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.formGroupColumn}>
              <label htmlFor="country">Country</label>
              {/* <TextField
                variant="outlined"
                placeholder="Enter country name"
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
                onChange={(_, value) =>
                  value ? setCountry(value) : setCountry()
                }
              />
            </div>
            <div className={classes.formGroupColumn}>
              <label htmlFor="city">City/Village</label>
              {/* <TextField
                variant="outlined"
                placeholder="Enter city/village name"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              /> */}
              {/* <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={cityList}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Select city" />
                )}
                onChange={(_, value) => (value ? setCity(value) : setCity())}
              /> */}
              <Autocomplete
                fullWidth
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setCity({
                      name: newValue.name,
                      id: newValue._id,
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setCity({
                      name: newValue.inputValue,
                    });
                  } else {
                    setCity(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some(
                    (option) => inputValue === option.name
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      name: `Add "${inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="city-dropdown"
                options={cityList}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.name;
                }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Select or add" />
                )}
              />
            </div>
            <div className={classes.formGroupColumn}>
              <label htmlFor="colony">Colony/Township/Area/Society</label>
              {/* <TextField
                variant="outlined"
                placeholder="Enter area details"
                id="colony"
                name="colony"
                value={formik.values.colony}
                onChange={formik.handleChange}
                error={formik.touched.colony && Boolean(formik.errors.colony)}
                helperText={formik.touched.colony && formik.errors.colony}
              /> */}
              <Autocomplete
                fullWidth
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setTown({
                      name: newValue.name,
                      id: newValue._id,
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setTown({
                      name: newValue.inputValue,
                    });
                  } else {
                    setTown(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some(
                    (option) => inputValue === option.name
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      name: `Add "${inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={townList}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.name;
                }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Select or add" />
                )}
              />
            </div>
            <div className={classes.formGroupColumn}>
              <label htmlFor="title">Property Title</label>
              <TextField
                variant="outlined"
                placeholder="Enter property title"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </div>
            <div className={classes.formGroupColumn}>
              <label>For -</label>
              <ul className={classes.options}>
                {forList.map((item, i) => (
                  <Radio
                    key={i}
                    formikName={formik.values.propertyFor}
                    value={item.value}
                    title={item.title}
                    fieldName="propertyFor"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>I am -</label>
              <ul className={classes.options}>
                {userStatusList.map((item, i) => (
                  <Radio
                    key={i}
                    formikName={formik.values.userType}
                    value={item.value}
                    title={item.title}
                    fieldName="userType"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>It is -</label>
              <ul className={classes.options}>
                {propertyType.map((item) => (
                  <Radio
                    key={item.id}
                    formikName={formik.values.propertyType}
                    value={item.id}
                    title={item.name}
                    fieldName="propertyType"
                    handleChange={(e) => {
                      formik.handleChange(e);
                      setSelectedProperty(item.subtype);
                    }}
                  />
                ))}
              </ul>
            </div>
            {selectedProperty && (
              <div className={classes.formGroupColumn}>
                <ul className={classes.options}>
                  {selectedProperty.map((item) => (
                    <Radio
                      key={item._id}
                      formikName={formik.values.subcategory}
                      value={item.property_subtype}
                      title={item.property_subtype}
                      fieldName="subcategory"
                      handleChange={(e) => {
                        formik.handleChange(e);
                        setSelectedSub(item._id);
                      }}
                    />
                  ))}
                </ul>
              </div>
            )}
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Save &amp; Next
            </Button>
          </form>
        </CardContent>
      </Card>
      <LoginBackdrop />
    </>
  );
}
