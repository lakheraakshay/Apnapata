import React, { useState } from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
//import * as yup from "yup";

import GroupedButton from "../../components/GroupedButton";
import { postPropertyActions } from "../../store/reducers/property-slice";
import {
  conditionList,
  furnishingList,
  numList,
} from "../../components/FormLists/PostPropLists";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import Radio from "../../components/Radio";
import Checkbox from "../../components/Checkbox";
import InputBox from "../../components/InputBox";

const kitchenList = [
  { value: "Fully Modular", title: "Fully Modular" },
  { value: "Semi Modular", title: "Semi Modular" },
  { value: "Non Modular", title: "Non Modular" },
];
const extraRoomList = [
  { value: "Study", title: "Study" },
  { value: "Pooja", title: "Pooja" },
  { value: "Store", title: "Store" },
  { value: "Servant", title: "Servant" },
];
const specialList = [
  { value: "Park Face", title: "Park face" },
  { value: "Club Face", title: "Club face" },
  { value: "Main Road Face", title: "Main Road face" },
];
// const validationSchema = yup.object().shape({
//   bhk: yup.object().shape({
//     room: yup.string().required("Value is required"),
//     hall: yup.string().required("Value is required"),
//     kitchen: yup.string().required("Value is required"),
//     unknown: yup.string().required("Value is required")
//   }),
//   bedroom: yup.object().shape({
//     l: yup.string().required("Value is required"),
//     b: yup.string().required("Value is required"),
//     h: yup.string().required("Value is required"),
//     unknown: yup.string().required("Value is required")
//   }),
//   bathroom: yup.object().shape({
//     l: yup.string().required("Value is required"),
//     b: yup.string().required("Value is required"),
//     h: yup.string().required("Value is required"),
//     unknown: yup.string().required("Value is required")
//   }),
//   balcony: yup.object().shape({
//     l: yup.string().required("Value is required"),
//     b: yup.string().required("Value is required"),
//     h: yup.string().required("Value is required"),
//     unknown: yup.string().required("Value is required")
//   }),
//   parkinOpen: yup.object().shape({
//     l: yup.string().required("Value is required"),
//     b: yup.string().required("Value is required"),
//     h: yup.string().required("Value is required")
//   }),
//   parkinCovered: yup.object().shape({
//     l: yup.string().required("Value is required"),
//     b: yup.string().required("Value is required"),
//     h: yup.string().required("Value is required")
//   }),
//   totalFloors: yup.object().shape({
//     fno1: yup.string().required("Value is required"),
//     fno2: yup.string().required("Value is required")
//   })
// });
// const validationSchema = yup.object().shape({
//   area: yup.object().shape({
//     value: yup.string().required("Value is required"),
//     unit: yup.string().required("Value is required")
//   })
// });
export default function Flat() {
  const [err, setErr] = useState("");
  const classes = globalStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const propertyDetails = useSelector((state) => state.property);
  const areaUnits = useSelector((state) => state.property.areaUnits);
  const [units, setUnits] = useState({
    areaUnit: "",
  });
  // if (propertyDetails.values.next < 2 || !propertyDetails.values.next) {
  //   history.push("/postproperty")
  // }
  const formik = useFormik({
    initialValues: {
      bhk: "",
      bedroom: "",
      bathroom: "",
      balcony: "",
      area: { value: "", unit: "" },
      totalFloors: "",
      ourFloors: "",
      condition: "",
      furnishing: "",
      kitchen: "",
      parkingOpen: "",
      parkingCovered: "",
      extraRooms: [],
      special: [],
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.area.value) {
        const modValues = {
          ...values,
          area: {
            value: parseFloat(values.area.value),
            unit: units.areaUnit,
          },
          bhk: parseInt(values.bhk),
          bedroom: parseInt(values.bedroom),
          bathroom: parseInt(values.bathroom),
          balcony: parseInt(values.balcony),
          parkingOpen: parseInt(values.parkingOpen),
          parkingCovered: parseInt(values.parkingCovered),
          totalFloors: parseInt(values.totalFloors),
          ourFloor: parseInt(values.ourFloors),
        };
        dispatch(postPropertyActions.update({ ...modValues, next: 3 }));
        // alert(JSON.stringify(values, null, 2));
        history.push("/postproperty?page=photos");
      } else {
        setErr("* required");
      }
    },
  });

  const handleUnitChange = (e) => {
    const { value } = e.target;
    setUnits({ areaUnit: value });
  };

  return (
    <>
      {/* <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        Flat/Floor Details
      </Typography> */}
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <div className={classes.formGroup}>
              <label>BHK</label>
              <ul className={classes.options}>
                {numList.map((num) => (
                  <Radio
                    key={num.value}
                    formikName={formik.values.bhk}
                    value={num.value}
                    title={num.title}
                    handleChange={formik.handleChange}
                    fieldName="bhk"
                  />
                ))}
              </ul>
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
              <label>Balcony</label>
              <ul className={classes.options}>
                {numList.map((num) => (
                  <Radio
                    key={num.value}
                    formikName={formik.values.balcony}
                    value={num.value}
                    title={num.title}
                    handleChange={formik.handleChange}
                    fieldName="balcony"
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="c-area">Area</label>
              <GroupedButton
                values={areaUnits}
                inputId="c-area"
                inputName="area.value"
                selectName="area.unit"
                handleChange={formik.handleChange}
                error={err}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroupColumn}>
              <label>Condition</label>
              <ul className={classes.options}>
                {conditionList.map((item, i) => (
                  <Radio
                    key={i}
                    formikName={formik.values.condition}
                    value={item.value}
                    title={item.title}
                    handleChange={formik.handleChange}
                    fieldName="condition"
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
                    formikName={formik.values.furnishing}
                    value={item.value}
                    title={item.title}
                    handleChange={formik.handleChange}
                    fieldName="furnishing"
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
                    formikName={formik.values.kitchen}
                    value={item.value}
                    title={item.title}
                    handleChange={formik.handleChange}
                    fieldName="kitchen"
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
            <div
              className={classes.formGroup}
              style={{ width: "88%", gap: 5.5 }}
            >
              <label>Total Floors</label>
              <InputBox
                inputId="totalFloors"
                name="totalFloors"
                value={formik.values.totalFloors}
                handleChange={formik.handleChange}
              />
              <label>Our Floors</label>
              <InputBox
                inputId="ourFloors"
                name="ourFloors"
                value={formik.values.ourFloors}
                handleChange={formik.handleChange}
              />
            </div>
            <div className={classes.formGroupColumn}>
              <label>Extra Rooms</label>
              <ul className={classes.options}>
                {extraRoomList.map((item, i) => (
                  <Checkbox
                    key={i}
                    formikList={formik.values.extraRooms}
                    value={item.value}
                    title={item.title}
                    handleChange={formik.handleChange}
                    fieldName="extraRooms"
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>Specials</label>
              <ul className={classes.options}>
                {specialList.map((item, i) => (
                  <Checkbox
                    key={i}
                    formikList={formik.values.special}
                    value={item.value}
                    title={item.title}
                    handleChange={formik.handleChange}
                    fieldName="special"
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
