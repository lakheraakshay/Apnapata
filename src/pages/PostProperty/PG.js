import React from "react";
import { Button, Typography, Card, CardContent } from "@material-ui/core";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { postPropertyActions } from "../../store/reducers/property-slice";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import Radio from "../../components/Radio";
import Checkbox from "../../components/Checkbox";

const occupancyList = [
  { value: "Single", title: "Single" },
  { value: "Double", title: "Double" },
  { value: "Triple", title: "Triple" },
  { value: "Multi", title: "Multi" },
];
const forList = [
  { value: "Boys", title: "Boys" },
  { value: "Girls", title: "Girls" },
  { value: "Both", title: "Both" },
];
const tenantsList = [
  { value: "Professional", title: "Professional" },
  { value: "Students", title: "Students" },
];
const yesNoList = [
  { value: "yes", title: "Yes" },
  { value: "no", title: "No" },
];
const extrasList = [
  { value: "Parking", title: "Parking" },
  { value: "Washing Machine", title: "Washing Machine" },
  { value: "Air Conditioner", title: "Air Conditioner" },
  { value: "Power Backup", title: "Power Backup" },
  { value: "TV", title: "TV" },
  { value: "Laundry", title: "Laundry" },
  { value: "Room Cleaning", title: "Room Cleaning" },
  { value: "Wi-Fi", title: "Wi-Fi" },
];

export default function Shop() {
  const classes = globalStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const propertyDetails = useSelector((state) => state.property);

  // if (propertyDetails.values.next < 2 || !propertyDetails.values.next) {
  //   history.push("/postproperty");
  // }
  const formik = useFormik({
    initialValues: {
      occupancy: "",
      for: "",
      tenantsPreferred: "",
      foodProvided: "",
      nonVegAllowed: "",
      selfCooking: "",
      extras: [],
    },
    onSubmit: (values) => {
      dispatch(postPropertyActions.update({ ...values, next: 3 }));
      // alert(JSON.stringify(values, null, 2));
      history.push("/postproperty?page=photos");
    },
  });

  return (
    <>
      {/* <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        PG
      </Typography> */}
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.formGroupColumn}>
              <label>Occupancy</label>
              <ul className={classes.options}>
                {occupancyList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.occupancy}
                    fieldName="occupancy"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>For</label>
              <ul className={classes.options}>
                {forList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.for}
                    fieldName="for"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>Tenants Preferred</label>
              <ul className={classes.options}>
                {tenantsList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.tenantsPreferred}
                    fieldName="tenantsPreferred"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>Food Provided</label>
              <ul className={classes.options}>
                {yesNoList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value + "Food"}
                    title={item.title}
                    formikName={formik.values.foodProvided}
                    fieldName="foodProvided"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>Non-veg allowed</label>
              <ul className={classes.options}>
                {yesNoList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value + "Non"}
                    title={item.title}
                    formikName={formik.values.nonVegAllowed}
                    fieldName="nonVegAllowed"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>Self Cooking</label>
              <ul className={classes.options}>
                {yesNoList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value + "Self"}
                    title={item.title}
                    formikName={formik.values.selfCooking}
                    fieldName="selfCooking"
                    handleChange={formik.handleChange}
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <ul className={classes.options}>
                {extrasList.map((item, i) => (
                  <Checkbox
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikList={formik.values.extras}
                    fieldName="extras"
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
