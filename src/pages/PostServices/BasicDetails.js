import React, { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getCountry, getCity, getTowns } from '../../store/reducers/location-slice'
import { servicesActions } from "../../store/reducers/services-slice";
import Radio from "../../components/Radio";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import Message from "../../components/Message";

const typeList = [
  { value: "Loan", title: "Loan" },
  { value: "Vastu", title: "Vastu" },
  { value: "Interior Design", title: "Interior Design" },
  { value: "Architect", title: "Architect" },
  { value: "Construction", title: "Construction" }
];

const iAmList = [
  { value: "Bank Employee", title: "Bank Employee" },
  { value: "D. S. A.", title: "D. S. A." },
  { value: "Marketing Associates", title: "Marketing Associates" }
];

const loanTypeList = [
  { value: 'Home Loan', title: 'Home Loan' },
  { value: 'Construction Loan', title: 'Construction Loan' },
  { value: 'Personal Loan', title: 'Personal Loan' },
  { value: 'Car Loan', title: 'Car Loan' },
  { value: 'Education Loan', title: 'Education Loan' },
  { value: 'Business Loan', title: 'Business Loan' },
  { value: 'Loan against Property', title: 'Loan against Property' }
]

const filter = createFilterOptions()

const validationSchema = yup.object({
  post_title: yup.string().required("Post Title is required"),
  serviceType: yup.string().required("Service is required."),
  iam: yup.string(),
  loanType: yup.string(),
});

const BasicDetails = ({ setShowForm }) => {

  const dispatch = useDispatch();
  const classes = globalStyles();
  const [errorMessage, setErrorMessage] = useState('')
  const [countryList, setCountryList] = useState([])
  const [cityList, setCityList] = useState([])
  const [townList, setTownList] = useState([])
  const details = useSelector(state => state.services.values);
  const [country, setCountry] = useState(details.country || undefined)
  const [city, setCity] = useState(details.city || undefined)
  const [town, setTown] = useState(details.town || undefined)

  const formik = useFormik({
    initialValues: {
      post_title: details.post_title ? details.post_title : "",
      serviceType: details.serviceType ? details.serviceType : "",
      iam: details.iam ? details.iam : "",
      loanType: details.loanType ? details.loanType : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.country = country
      values.city = city
      values.town = town
      console.log(values)
      setShowForm(values.serviceType)
      dispatch(servicesActions.update(values))
      // setShowForm(values.serviceType)
    }
  });

  useEffect(() => {
    const getLists = async () => {
      const countries = []
      const countryResponse = await dispatch(getCountry())

      if (countryResponse.type === 'location/country/all/fulfilled') {
        countryResponse.payload.data.forEach(item => countries.push({
          data: item._id,
          name: item.name
        }))
        setCountryList(countries)
      }

      if (countryResponse.type === 'location/country/all/rejected') {
        setErrorMessage(countryResponse.error.message)
      }
    }

    getLists()
  }, [])

  useEffect(() => {

    const getLists = async () => {
      const cities = []
      const towns = []

      if (country?.data) {
        const cityResponse = await dispatch(getCity(country.data))

        if (cityResponse.type === 'location/city/all/fulfilled') {
          cityResponse.payload.data.forEach(item => cities.push({
            data: item._id,
            name: item.name
          }))
          setCityList(cities)
        }

        if (cityResponse.type === 'location/city/all/rejected') {
          setErrorMessage(cityResponse.error.message)
        }
      }

      if (city?.data) {
        const townResponse = await dispatch(getTowns(city.data))

        if (townResponse.type === 'location/towns/all/fulfilled') {
          townResponse.payload.data.forEach(item => towns.push({
            data: item._id,
            name: item.name
          }))
          setTownList(towns)
        }

        if (townResponse.type === 'location/towns/all/rejected') {
          setErrorMessage(townResponse.error.message)
        }
      }
    }

    getLists()
  }, [country, city])

  return (
    <Card className={classes.card}>

      {
        errorMessage && <Message message={errorMessage} />
      }

      <CardContent>
        <form className={classes.form} onSubmit={formik.handleSubmit}>

          {/* Country */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="country">Country</label>
            <Autocomplete
              fullWidth
              disablePortal
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

          {/* City */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="city">City/Village</label>
            <Autocomplete
              fullWidth
              disablePortal
              options={cityList}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select city" />
              )}
              onChange={(_, value) =>
                value ? setCity(value) : setCity()
              }
            />
          </div>

          {/* Colony */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="colony">Colony/Township/Area/Society</label>
            <Autocomplete
              fullWidth
              onChange={(event, newValue) => {
                if (newValue.inputValue) {
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

          {/* Post Title */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="post_title">Post Title</label>
            <TextField
              variant="outlined"
              placeholder="Enter post title"
              id="post_title"
              name="post_title"
              value={formik.values.post_title}
              onChange={formik.handleChange}
              error={formik.touched.post_title && Boolean(formik.errors.post_title)}
              helperText={formik.touched.post_title && formik.errors.post_title}
            />
          </div>

          {/* Service */}
          <div className={classes.formGroupColumn}>
            <label>Service -</label>
            <ul className={classes.options}>
              {typeList.map(item => (
                <Radio
                  key={item.value}
                  formikName={formik.values.serviceType}
                  value={item.value}
                  title={item.title}
                  fieldName="serviceType"
                  handleChange={formik.handleChange}
                />
              ))}
            </ul>
            {
              formik.errors.serviceType && (
                <p className={classes.errorMessage}>{formik.errors.serviceType}</p>
              )
            }
          </div>

          {
            formik.values.serviceType === 'loan' && (
              <>

                {/* I am */}
                <div className={classes.formGroupColumn}>
                  <label>I am -</label>
                  <ul className={classes.options}>
                    {iAmList.map((item, i) => (
                      <Radio
                        key={i}
                        formikName={formik.values.iam}
                        value={item.value}
                        title={item.title}
                        fieldName="iam"
                        handleChange={formik.handleChange}
                      />
                    ))}
                  </ul>
                </div>

                {/* Loan Type */}
                <div className={classes.formGroupColumn}>
                  <label>Loan type -</label>
                  <ul className={classes.options}>
                    {loanTypeList.map((item, i) => (
                      <Radio
                        key={i}
                        formikName={formik.values.loanType}
                        value={item.value}
                        title={item.title}
                        fieldName="loanType"
                        handleChange={formik.handleChange}
                      />
                    ))}
                  </ul>
                </div>
              </>
            )
          }
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
  )
}

export default BasicDetails
