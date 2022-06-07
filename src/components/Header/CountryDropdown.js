import { useEffect, useState } from "react";
import { Autocomplete, TextField } from '@mui/material'
import { getCountry, getCity } from '../../store/reducers/location-slice'
import { useDispatch } from "react-redux";
import Message from "../Message";
import { homeActions } from '../../store/reducers/home-slice'

// const useStyles = makeStyles((theme) => ({
//   select: {
//     border: "1px solid white",
//     borderRadius: 3,
//     padding: "0.3rem 1rem",
//     paddingRight: 10,
//     textTransform: "none",
//     fontWeight: 400,
//     "& span": {
//       fontSize: "1.2rem",
//       color: "white"
//     },
//     "& svg": {
//       fontSize: "2rem"
//     }
//   }
// }));
export default function CountryDropdown() {

  // const classes = useStyles();
  const dispatch = useDispatch();
  // const cityId = useSelector(state => state.home.cityId);
  const [countryList, setCountryList] = useState([])
  const [cityList, setCityList] = useState([])
  const [country, setCountry] = useState(null)
  const [city, setCity] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const details = useSelector((state) => state.property.values);

  useEffect(() => {
    const getCountryList = async () => {
      const response = await dispatch(getCountry())

      let newCountryList = []
      if (response.type === 'location/country/all/fulfilled') {
        response.payload.data.forEach(country => {
          newCountryList.push({
            label: country.name,
            value: country._id
          })
        })
        setCountryList(newCountryList)
      }

      if (response.type === 'location/country/all/rejected') {
        setErrorMessage(response.error.message)
      }
    }

    getCountryList()
  }, [dispatch])

  useEffect(() => {

    const getCityList = async (countryId) => {
      const response = await dispatch(getCity(countryId))

      let newCityList = []
      console.log(response)
      if (response.type === 'location/city/all/fulfilled') {
        response.payload.data.forEach(city => {
          newCityList.push({
            label: city.name,
            value: city._id
          })
        })
        setCityList(newCityList)
      }

      if (response.type === 'location/city/all/rejected') {
        setErrorMessage(response.error.message)
      }
    }

    if (country?.value) {
      getCityList(country.value)
    }

    if (country === null) {
      setCityList([])
      setCity(null)
    }
  }, [country, dispatch])

  useEffect(() => {
    if (city?.value) {
      dispatch(homeActions.updateSelectedCity(city.value))
    }
  }, [city, dispatch])

  return (
    <div style={{ display: 'flex' }}>

      {
        errorMessage && <Message message={errorMessage} />
      }

      <Autocomplete
        disablePortal
        id="country"
        size="small"
        options={countryList}
        sx={{ width: '180px' }}
        value={country?.value}
        onChange={(event, newValue) => {setCountry(newValue)}}
        renderInput={(params) => <TextField {...params} label="Country" size="small" />}
      />
      {
        country !== null && (
          <Autocomplete
            disablePortal
            id="city"
            size="small"
            options={cityList}
            sx={{ width: '150px', marginLeft: '10px' }}
            value={city?.value}
            onChange={(event, newValue) => { setCity(newValue) }}
            renderInput={(params) => <TextField {...params} label="City" size="small" />}
          />
        )
      }
    </div>
  );
}
