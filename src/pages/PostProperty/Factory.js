import React, { useState } from "react";
import { Button, Card, CardContent } from "@material-ui/core";
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

const forList = [
  { value: "Manufacturing", title: "Manufacturing" },
  { value: "Godown", title: "Godown" },
  { value: "Cold Store", title: "Cold Store" },
  { value: "Warehouse", title: "Warehouse" },
];
const areaList = [
  { value: "Industrial Area", title: "Industrial Area" },
  { value: "Special Zone", title: "Special Zone" },
  { value: "SCZ", title: "SCZ" },
  { value: "Free Zone", title: "Free Zone" },
  { value: "Other", title: "Other" },
];
const availableList = [
  { value: "Reception", title: "Reception" },
  { value: "Office", title: "Office" },
  { value: "Meeting Hall", title: "Meeting Hall" },
  { value: "Kitchen", title: "Kitchen" },
  { value: "Guest Room", title: "Guest Room" },
  { value: "Washroom", title: "Washroom" },
  { value: "Parking", title: "Parking" },
];

export default function Factory() {
  const classes = globalStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const propertyDetails = useSelector((state) => state.property);
  const details = propertyDetails.values;
  const areaUnits = useSelector((state) => state.property.areaUnits);
  const [units, setUnits] = useState({
    totalAreaUnit: "",
    coveredAreaUnit: "",
    openAreaUnit: "",
    frontUnit: "",
    lengthUnit: "",
    roadUnit: "",
  });
  // if (propertyDetails.values.next < 2 || !propertyDetails.values.next) {
  //   history.push("/postproperty")
  // }

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
      case "size.length.unit":
        setUnits({ ...units, lengthUnit: value });
        break;
      default:
        setUnits({ ...units, roadUnit: value });
    }
  };

  const formik = useFormik({
    initialValues: {
      for: details.for ? details.for : "",
      industry_area: details.industry_area ? details.industry_area : "",
      totalArea: details?.totalArea?.value
        ? details.totalArea.value
        : { value: "", unit: "sq m" },

      coveredArea: details.coveredArea
        ? {
            value: [details.coveredArea.value],
            unit: [details.coveredArea.unit],
          }
        : { value: "", unit: "sq m" },
      openArea: details?.openArea?.value
        ? details.openArea
        : { value: "", unit: "sq m" },
      size: details.size
        ? details.size
        : {
            front: { value: "", unit: "m" },
            length: { value: "", unit: "m" },
            height: { value: "", unit: "m" },
          },
      totalFloors: details.totalFloors ? details.totalFloors : "4",
      ourFloors: details.ourFloors ? details.ourFloors : "4",
      condition: details.condition ? details.condition : "",
      face: details.face ? details.face : "",
      available: details.available ? details.available : [],
      roadSize: details.roadSize ? details.roadSize : { value: "", unit: "m" },
    },
    onSubmit: (values) => {
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
        roadSize: {
          value: parseFloat(values.roadSize.value),
          unit: units.roadUnit,
        },
      };
      dispatch(postPropertyActions.update({ ...modValues, next: 3 }));
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
        Factory/Store/Warehouse
      </Typography> */}
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
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
              <label>Area</label>
              <ul className={classes.options}>
                {areaList.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.value}
                    title={item.title}
                    formikName={formik.values.industry_area}
                    fieldName="industry_area"
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
                  handleUnitChange={handleUnitChange}
                />
                <GroupedButton
                  inputName="size.length.value"
                  selectName="size.length.unit"
                  values={["", "m", "ft"]}
                  label="Length"
                  handleChange={formik.handleChange}
                  handleUnitChange={handleUnitChange}
                />
                {/*<GroupedButton
                  inputName="size.height.value"
                  selectName="size.height.unit"
                  values={["m", "ft"]}
                  label="Height"
                  handleChange={formik.handleChange}
                />*/}
              </div>
            </div>
            {/* <div className={classes.formGroup}>
              <label>Total Floors</label>
              <FloorsDropdown
                name="totalFloors"
                value={formik.values.totalFloors}
                options={["1", "2", "3", "4", "4+"]}
                handleChange={formik.handleChange}
              />
              <label>Our Floors</label>
              <FloorsDropdown
                name="ourFloors"
                value={formik.values.ourFloors}
                options={["1", "2", "3", "4", "4+"]}
                handleChange={formik.handleChange}
              />
              </div> */}
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
            <div className={classes.formGroup}>
              <label htmlFor="road">Road</label>
              <GroupedButton
                inputId="road"
                inputName="roadSize.value"
                selectName="roadSize.unit"
                handleChange={formik.handleChange}
                values={["", "m", "ft"]}
                handleUnitChange={handleUnitChange}
              />
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
