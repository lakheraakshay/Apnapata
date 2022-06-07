import React, { useState } from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useFormik } from "formik";

import { postPropertyActions } from "../../store/reducers/property-slice";
import {
  numList,
  specialList,
  connectionList,
  faceList,
  conditionList,
  furnishingList,
  kitchenList,
} from "../../components/FormLists/PostPropLists";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import GroupedButton from "../../components/GroupedButton";
import Radio from "../../components/Radio";
import FloorsDropdown from "../../components/FloorsDropdown";
import Checkbox from "../../components/Checkbox";

export default function Villa() {
  const [totalAreaErr, setTotalAreaErr] = useState("");
  const [coveredAreaErr, setCoveredAreaErr] = useState("");
  const [openAreaErr, setOpenAreaErr] = useState("");
  const [sizeLengthErr, setSizeLengthErr] = useState("");
  const [sizeBreadthErr, setsizeBreadthErr] = useState("");

  const classes = globalStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const propertyDetails = useSelector((state) => state.property);
  const areaUnits = useSelector((state) => state.property.areaUnits);
  const [units, setUnits] = useState({
    totalAreaUnit: "",
    coveredAreaUnit: "",
    openAreaUnit: "",
    lengthUnit: "",
    breadthUnit: "",
  });

  // if (propertyDetails.values.next < 2 || !propertyDetails.values.next) {
  //   history.push("/postproperty")
  // }
  const formik = useFormik({
    initialValues: {
      totalArea: { value: "", unit: "" },
      coveredArea: { value: "", unit: "" },
      openArea: { value: "", unit: "" },
      size: {
        length: { value: "", unit: "" },
        breadth: { value: "", unit: "" },
      },
      bedroom: "",
      bathroom: "",
      parkingOpen: "",
      parkingCovered: "",
      totalFloors: "G",
      face: "",
      condition: "",
      special: [],
      available: [],
      furnishing: "",
      kitchen: "",
    },
    onSubmit: (values) => {
      if (
        values.totalArea.value &&
        values.coveredArea.value &&
        values.openArea.value &&
        values.size.length.value &&
        values.size.breadth.value
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
            length: {
              value: parseFloat(values.size.length.value),
              unit: units.lengthUnit,
            },
            breadth: {
              value: parseFloat(values.size.breadth.value),
              unit: units.breadthUnit,
            },
          },
          bedroom: parseInt(values.bedroom),
          bathroom: parseInt(values.bathroom),
          parkingOpen: parseInt(values.parkingOpen),
          parkingCovered: parseInt(values.parkingCovered),
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
      if (values.size.length.value === "") {
        setSizeLengthErr("*required");
      }
      if (values.size.breadth.value === "") {
        setsizeBreadthErr("*required");
      }
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
      case "size.length.unit":
        setUnits({ ...units, lengthUnit: value });
        break;
      default:
        setUnits({ ...units, breadthUnit: value });
    }
  };

  return (
    <>
      {/* <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        Home/Villa
      </Typography> */}
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
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
                  inputName="size.length.value"
                  selectName="size.length.unit"
                  values={["", "m", "ft"]}
                  label="Length"
                  handleChange={formik.handleChange}
                  error={sizeLengthErr}
                  handleUnitChange={handleUnitChange}
                />
                <GroupedButton
                  inputName="size.breadth.value"
                  selectName="size.breadth.unit"
                  values={["", "m", "ft"]}
                  label="Breadth"
                  handleChange={formik.handleChange}
                  error={sizeBreadthErr}
                  handleUnitChange={handleUnitChange}
                />
              </div>
            </div>
            <div className={classes.formGroup}>
              <label>Total Floors</label>
              <FloorsDropdown
                name="total_floors"
                value={formik.values.total_floors}
                options={["G", "G+1", "G+2", "G+3", "G+4", "G+MORE"]}
                handleChange={formik.handleChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label>Bedroom</label>
              <ul className={classes.options}>
                {numList.map((num) => (
                  <Radio
                    key={num.value}
                    formikName={formik.values.bedroom}
                    value={num.value}
                    title={num.title}
                    handleChange={formik.handleChange}
                    fieldName="bedroom"
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroup}>
              <label>Bathroom</label>
              <ul className={classes.options}>
                {numList.map((num) => (
                  <Radio
                    key={num.value}
                    formikName={formik.values.bathroom}
                    value={num.value}
                    title={num.title}
                    handleChange={formik.handleChange}
                    fieldName="bathroom"
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroup}>
              <label>Parking open</label>
              <ul className={classes.options}>
                {numList
                  .map((num) => (
                    <Radio
                      key={num.value}
                      formikName={formik.values.parkingOpen}
                      value={num.value}
                      title={num.title}
                      handleChange={formik.handleChange}
                      fieldName="parkingOpen"
                    />
                  ))
                  .slice(0, 3)}
              </ul>
            </div>
            <div className={classes.formGroup}>
              <label>Parking covered</label>
              <ul className={classes.options}>
                {numList
                  .map((num) => (
                    <Radio
                      key={num.value}
                      formikName={formik.values.parkingCovered}
                      value={num.value}
                      title={num.title}
                      handleChange={formik.handleChange}
                      fieldName="parkingCovered"
                    />
                  ))
                  .slice(0, 3)}
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
              <label>Special</label>
              <ul className={classes.options}>
                {specialList.map((item, i) => (
                  <Checkbox
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikList={formik.values.special}
                    handleChange={formik.handleChange}
                    fieldName="special"
                  />
                ))}
              </ul>
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
              <label>Kitchen</label>
              <ul className={classes.options}>
                {kitchenList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.kitchen}
                    fieldName="kitchen"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>Connection Available</label>
              <ul className={classes.options}>
                {connectionList.map((item, i) => (
                  <Checkbox
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikList={formik.values.available}
                    handleChange={formik.handleChange}
                    fieldName="available"
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
