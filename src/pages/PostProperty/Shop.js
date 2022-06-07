import React, { useState } from "react";
import { Button, Typography, Card, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useFormik } from "formik";

import { postPropertyActions } from "../../store/reducers/property-slice";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import {
  conditionList,
  furnishingList,
  faceList,
} from "../../components/FormLists/PostPropLists";
import GroupedButton from "../../components/GroupedButton";
import Radio from "../../components/Radio";
import Checkbox from "../../components/Checkbox";
import InputBox from "../../components/InputBox";

const bestForList = [
  { value: "Bank", title: "Bank" },
  { value: "Retail", title: "Retail" },
  { value: "Clothes", title: "Clothes" },
  { value: "Chemist", title: "Chemist" },
  { value: "Office", title: "Office" },
  { value: "Gems", title: "Gems" },
  { value: "Restaurant", title: "Restaurant" },
];
const washroomList = [
  { value: "Private", title: "Private" },
  { value: "Public", title: "Public" },
  { value: "Not Available", title: "Not Available" },
];
const parkingList = [
  { value: "yes", title: "Yes" },
  { value: "no", title: "No" },
];

export default function Shop() {
  const [totalAreaErr, setTotalAreaErr] = useState("");
  const [coveredAreaErr, setCoveredAreaErr] = useState("");
  const [sizeFrontErr, setSizeFrontErr] = useState("");
  const [sizeLengthErr, setSizeLengthErr] = useState("");
  const classes = globalStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const propertyDetails = useSelector((state) => state.property);
  const units = useSelector((state) => state.property.areaUnits);
  const [_units, setUnits] = useState({
    totalAreaUnit: "",
    coveredAreaUnit: "",
    frontUnit: "",
    lengthUnit: "",
  });

  // if (propertyDetails.values.next < 2 || !propertyDetails.values.next) {
  //   history.push("/postproperty")
  // }

  const formik = useFormik({
    initialValues: {
      totalArea: { value: "", unit: "" },
      coveredArea: { value: "", unit: "" },
      size: {
        front: { value: "", unit: "" },
        length: { value: "", unit: "" },
      },
      totalFloors: "",
      ourFloors: "",
      condition: "",
      furnishing: "",
      face: "",
      best_for: [],
      washroom: "",
      parking: "",
    },
    onSubmit: (values) => {
      if (
        values.totalArea.value &&
        values.coveredArea.value &&
        values.size.front.value &&
        values.size.length.value
      ) {
        const modValues = {
          ...values,
          total_area: {
            value: parseFloat(values.totalArea.value),
            unit: _units.totalAreaUnit,
          },
          covered_area: {
            value: parseFloat(values.coveredArea.value),
            unit: _units.coveredAreaUnit,
          },
          size: {
            front: {
              value: parseFloat(values.size.front.value),
              unit: _units.frontUnit,
            },
            length: {
              value: parseFloat(values.size.length.value),
              unit: _units.lengthUnit,
            },
          },
          totalFloors: parseInt(values.totalFloors),
          ourFloor: parseInt(values.ourFloors),
          parking: values.parking === "yes" ? true : false,
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

      if (values.size.length.value === "") {
        setSizeLengthErr("*required");
      }
      if (values.size.front.value === "") {
        setSizeFrontErr("*required");
      }
    },
  });

  const handleUnitChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "totalArea.unit":
        setUnits({ ..._units, totalAreaUnit: value });
        break;
      case "coveredArea.unit":
        setUnits({ ..._units, coveredAreaUnit: value });
        break;
      case "size.front.unit":
        setUnits({ ..._units, frontUnit: value });
        break;
      default:
        setUnits({ ..._units, lengthUnit: value });
    }
  };

  return (
    <>
      {/* <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        Shop/Society/Office
      </Typography> */}
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.formGroup}>
              <label htmlFor="area">Total Area</label>
              <GroupedButton
                inputId="area"
                inputName="totalArea.value"
                selectName="totalArea.unit"
                values={units}
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
                values={units}
                handleChange={formik.handleChange}
                error={coveredAreaErr}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="size">Size</label>
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
            </div>
            <div className={classes.formGroup}>
              <label>Total Floors</label>
              <InputBox
                name="totalFloors"
                inputId="totalFloors"
                value={formik.values.totalFloors}
                handleChange={formik.handleChange}
              />
              <label>Our Floors</label>
              <InputBox
                name="ourFloors"
                inputId="ourFloors"
                value={formik.values.ourFloors}
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
              <label>Furnishing</label>
              <ul className={classes.options}>
                {furnishingList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.furnishing}
                    fieldName="furnishing"
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
            <div className={classes.formGroupColumn}>
              <label>Best For</label>
              <ul className={classes.options}>
                {bestForList.map((item, i) => (
                  <Checkbox
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikList={formik.values.best_for}
                    fieldName="best_for"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>Washroom</label>
              <ul className={classes.options}>
                {washroomList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.washroom}
                    fieldName="washroom"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroup}>
              <label>Parking</label>
              <ul className={classes.options}>
                {parkingList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.parking}
                    fieldName="parking"
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
