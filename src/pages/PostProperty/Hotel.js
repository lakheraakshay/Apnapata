import React, { useState } from "react";
import { makeStyles, Button, Card, CardContent } from "@material-ui/core";
import { Rating } from '@mui/material'
import StarIcon from "@material-ui/icons/Star";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useFormik } from "formik";

import { postPropertyActions } from "../../store/reducers/property-slice";
import {
  conditionList,
  faceList,
} from "../../components/FormLists/PostPropLists";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import GroupedButton from "../../components/GroupedButton";
import Radio from "../../components/Radio";
import Checkbox from "../../components/Checkbox";
import InputBox from "../../components/InputBox";

const useStyles = makeStyles({
  stars: {
    display: "flex",
    listStyle: "none",
    color: "#C4C4C4",
    "& .active": {
      color: "#FFFF00",
    },
  },
});

const itIsList = [
  { value: "Hotel and Restaurant", title: "Hotel & Restaurant" },
  { value: "Resort", title: "Resort" },
  { value: "Water Park", title: "Water Park" },
  { value: "Theme Park", title: "Theme Park" },
];
const availableList = [
  { value: "Restaurant", title: "Restaurant" },
  { value: "Bar", title: "Bar" },
  { value: "Party Hall", title: "Party Hall" },
  { value: "Swimming Pool", title: "Swimming Pool" },
  { value: "Indoor Games", title: "Indoor Games" },
  { value: "Outdoor Games", title: "Outdoor Games" },
  { value: "Spa", title: "Spa" },
  { value: "Children Park", title: "Children Park" },
];

export default function Hotel() {
  const [totalAreaErr, setTotalAreaErr] = useState("");
  const [coveredAreaErr, setCoveredAreaErr] = useState("");
  const [openAreaErr, setOpenAreaErr] = useState("");
  const [sizeFrontErr, setSizeFrontErr] = useState("");
  const [sizeLengthErr, setSizeLengthErr] = useState("");
  const [rating, setRating] = useState(4);
  /* const [sizeHeightErr, setSizeHeightErr] = useState(""); */

  const classes = { ...useStyles(), ...globalStyles() };
  const dispatch = useDispatch();
  const history = useHistory();
  const propertyDetails = useSelector((state) => state.property);
  const areaUnits = useSelector((state) => state.property.areaUnits);
  const [units, setUnits] = useState({
    totalAreaUnit: "",
    coveredAreaUnit: "",
    openAreaUnit: "",
    frontUnit: "",
    lengthUnit: "",
  });
  // if (propertyDetails.values.next < 2 || !propertyDetails.values.next) {
  //   history.push("/postproperty")
  // }
  const formik = useFormik({
    initialValues: {
      commertial_ItIs: "",
      totalArea: { value: "", unit: "" },
      coveredArea: { value: "", unit: "" },
      openArea: { value: "", unit: "" },
      size: {
        front: { value: "", unit: "" },
        length: { value: "", unit: "" },
      },
      totalFloors: "",
      ourFloors: "",
      condition: "",
      face: "",
      available: [],
    },
    onSubmit: (values) => {
      if (
        values.totalArea.value &&
        values.coveredArea.value &&
        values.openArea.value &&
        values.size.front.value &&
        values.size.length.value
      ) {
        const modValues = {
          ...values,
          total_area: {
            value: parseFloat(values.totalArea.value),
            unit: units.totalAreaUnit,
          },
          covered_area: {
            value: parseFloat(values.coveredArea.value),
            unit: units.coveredAreaUnit,
          },
          open_area: {
            value: parseFloat(values.openArea.value),
            unit: units.openAreaUnit,
          },
          size: {
            front: {
              value: parseFloat(values.size.front.value),
              unit: units.frontUnit,
            },
            length: {
              value: parseFloat(values.size.length.value),
              unit: units.lengthUnit,
            },
          },
          totalFloors: parseInt(values.totalFloors),
          ourFloor: parseInt(values.ourFloors),
          rating: rating,
        };
        dispatch(postPropertyActions.update({ ...modValues, next: 3 }));
        // alert(JSON.stringify(values, null, 2));
        history.push("/postproperty?page=photos");
      }
      if (values.totalArea.value === "") {
        setTotalAreaErr("*required");
      }
      if (values.coveredArea.value === "") {
        setCoveredAreaErr("*required");
      }
      if (values.openArea.value === "") {
        setOpenAreaErr("*required");
      }
      if (values.size.front.value === "") {
        setSizeFrontErr("*required");
      }
      if (values.size.length.value === "") {
        setSizeLengthErr("*required");
      }
      /* if (values.size.height.value === "") {
        setSizeHeightErr("*required");
      } */
    },
  });

  const handleUnitChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "totalArea.unit":
        setUnits({ ...units, totalAreaUnit: value });
        break;
      case "coveredArea.unit":
        setUnits({ ...units, coveredAreaUnit: value });
        break;
      case "openArea.unit":
        setUnits({ ...units, openAreaUnit: value });
        break;
      case "size.front.unit":
        setUnits({ ...units, frontUnit: value });
        break;
      default:
        setUnits({ ...units, lengthUnit: value });
    }
  };

  return (
    <>
      {/* <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        For Hotel
      </Typography> */}
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <div className={classes.formGroupColumn}>
              <label>It is -</label>
              <ul className={classes.options}>
                {itIsList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.commertial_ItIs}
                    fieldName="commertial_ItIs"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="area">Total Area</label>
              <GroupedButton
                inputId="area"
                inputName="totalArea.value"
                selectName="totalArea.unit"
                values={areaUnits}
                handleChange={formik.handleChange}
                error={totalAreaErr}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="c-area">Covered Area</label>
              <GroupedButton
                inputId="c-area"
                inputName="coveredArea.value"
                selectName="coveredArea.unit"
                values={areaUnits}
                handleChange={formik.handleChange}
                error={coveredAreaErr}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="o-area">Open Area</label>
              <GroupedButton
                inputId="o-area"
                inputName="openArea.value"
                selectName="openArea.unit"
                values={areaUnits}
                handleChange={formik.handleChange}
                error={openAreaErr}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroupColumn}>
              <label htmlFor="size">Size</label>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <GroupedButton
                  inputId="size"
                  inputName="size.front.value"
                  selectName="size.front.unit"
                  values={["", "m", "ft"]}
                  label="Front"
                  handleChange={formik.handleChange}
                  error={sizeFrontErr}
                  handleUnitChange={handleUnitChange}
                />
                <GroupedButton
                  inputName="size.length.value"
                  selectName="size.length.unit"
                  values={["", "m", "ft"]}
                  label="Length"
                  handleChange={formik.handleChange}
                  error={sizeLengthErr}
                  handleUnitChange={handleUnitChange}
                />
                {/* <GroupedButton
                  inputName="size.height.value"
                  selectName="size.height.unit"
                  values={["m", "ft"]}
                  label="Height"
                  handleChange={formik.handleChange}
                  error={sizeHeightErr}
               /> */}
              </div>
            </div>
            <div
              className={classes.formGroup}
              style={{ width: "88%", gap: 5.5 }}
            >
              <label>Total Floors</label>
              <InputBox
                name="totalFloors"
                value={formik.values.totalFloors}
                inputId="totalFloors"
                handleChange={formik.handleChange}
              />
              <label>Our Floors</label>
              <InputBox
                name="ourFloors"
                value={formik.values.ourFloors}
                inputId="ourFloors"
                handleChange={formik.handleChange}
              />
            </div>
            <div className={classes.formGroupColumn}>
              <label>Condition</label>
              <ul className={classes.options}>
                {conditionList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.condition}
                    fieldName="condition"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>Face</label>
              <ul className={classes.options}>
                {faceList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.face}
                    fieldName="face"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroup}>
              <label>Rating</label>
              <Rating
                max={7}
                size='small'
                value={rating}
                onChange={(e, newValue) => {setRating(newValue)}}
              />
              {/* <ul className={classes.stars}>
                <li className="active">
                  <StarIcon />
                </li>
                <li className="active">
                  <StarIcon />
                </li>
                <li className="active">
                  <StarIcon />
                </li>
                <li>
                  <StarIcon />
                </li>
                <li>
                  <StarIcon />
                </li>
                <li>
                  <StarIcon />
                </li>
                <li>
                  <StarIcon />
                </li>
              </ul> */}
            </div>
            <div className={classes.formGroupColumn}>
              <label>Available</label>
              <ul className={classes.options}>
                {availableList.map((item, i) => (
                  <Checkbox
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikList={formik.values.available}
                    fieldName="available"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
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
    </>
  );
}
