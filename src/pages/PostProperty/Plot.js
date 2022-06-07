import React, { useState, useEffect } from "react";
import { Button, Typography, Card, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useFormik } from "formik";

import {
  postPropertyActions,
  getAreaUnit,
} from "../../store/reducers/property-slice";
import {
  faceList,
  specialList,
  connectionList,
} from "../../components/FormLists/PostPropLists";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import Checkbox from "../../components/Checkbox";
import Radio from "../../components/Radio";
import GroupedButton from "../../components/GroupedButton";
import FloorsDropdown from "../../components/FloorsDropdown";

export default function PropertyDetails() {
  const [ploatErr, setPloatErr] = useState("");
  const [sizeLengthErr, setSizeLengthErr] = useState("");
  const [sizeBreadthErr, setSizeBreadthErr] = useState("");
  const [roadSizeErr, setRoadSizeErr] = useState("");
  const [_units, setUnits] = useState({
    areaUnit: "",
    lengthUnit: "",
    breadthUnit: "",
    roadSizeUnit: "",
  });
  const classes = globalStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const propertyDetails = useSelector((state) => state.property);
  const units = useSelector((state) => state.property.areaUnits);

  // if (propertyDetails.values.next < 2 || !propertyDetails.values.next) {
  //   history.push("/postproperty")
  // }
  const formik = useFormik({
    initialValues: {
      area: { value: "", unit: "" },
      size: {
        length: { value: "", unit: "" },
        breadth: { value: "", unit: "" },
      },
      face: "",
      special: [],
      total_floors: "G",
      basementAllow: "",
      available: [],
      boundaryWalls: "",
      roadSize: { value: "", unit: "m" },
    },
    onSubmit: (values) => {
      if (
        values.area.value &&
        values.size.length.value &&
        values.size.breadth.value &&
        values.roadSize.value
      ) {
        const modValues = {
          ...values,
          area: { value: parseFloat(values.area.value), unit: _units.areaUnit },
          size: {
            length: {
              value: parseFloat(values.size.length.value),
              unit: _units.lengthUnit,
            },
            breadth: {
              value: parseFloat(values.size.breadth.value),
              unit: _units.breadthUnit,
            },
          },
          roadSize: {
            value: parseFloat(values.roadSize.value),
            unit: _units.roadSizeUnit,
          },
          basement: values.basement === "yes" ? true : false,
          boundaries: values.boundaries === "yes" ? true : false,
        };
        dispatch(postPropertyActions.update({ ...modValues, next: 3 }));
        // alert(JSON.stringify(values, null, 2));
        history.push("/postproperty?page=photos");
      }
      if (values.area.value === "") {
        setPloatErr("*required");
      }
      if (values.size.length.value === "") {
        setSizeLengthErr("*required");
      }
      if (values.size.breadth.value === "") {
        setSizeBreadthErr("*required");
      }
      if (values.roadSize.value === "") {
        setRoadSizeErr("*required");
      }
    },
  });
  useEffect(() => {
    dispatch(getAreaUnit());
  }, []);

  const handleUnitChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "area.unit":
        setUnits({ ..._units, areaUnit: value });
        break;
      case "size.length.unit":
        setUnits({ ..._units, lengthUnit: value });
        break;
      case "size.breadth.unit":
        setUnits({ ..._units, breadthUnit: value });
        break;
      default:
        setUnits({ ..._units, roadSizeUnit: value });
    }
  };

  useEffect(() => {
    console.log(_units);
  }, [_units]);

  return (
    <>
      {/* <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        Plot/Land
      </Typography> */}
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.formGroup}>
              <label htmlFor="area">Plot Area</label>
              <GroupedButton
                inputId="area"
                inputName="area.value"
                handleChange={formik.handleChange}
                values={units}
                selectName="area.unit"
                error={ploatErr}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroupColumn}>
              <label htmlFor="size">Size</label>
              <div style={{ display: "flex" }}>
                <GroupedButton
                  inputId="size"
                  inputName="size.length.value"
                  selectName="size.length.unit"
                  values={["", "m", "ft"]}
                  handleChange={formik.handleChange}
                  label="Length"
                  error={sizeLengthErr}
                  handleUnitChange={handleUnitChange}
                />
                <GroupedButton
                  inputName="size.breadth.value"
                  selectName="size.breadth.unit"
                  values={["", "m", "ft"]}
                  handleChange={formik.handleChange}
                  label="Breadth"
                  error={sizeBreadthErr}
                  handleUnitChange={handleUnitChange}
                />
              </div>
            </div>
            <div className={classes.formGroupColumn}>
              <label>Face</label>
              <ul className={classes.options}>
                {faceList.map((item, i) => (
                  <Radio
                    key={i}
                    formikName={formik.values.face}
                    value={item.value}
                    title={item.title}
                    handleChange={formik.handleChange}
                    fieldName="face"
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
            <div className={classes.formGroup}>
              <label>Number of floors allowed for construction</label>
              <FloorsDropdown
                value={formik.values.total_floors}
                name="total_floors"
                options={["G", "G+1", "G+2", "G+3", "G+4", "G+MORE"]}
                handleChange={formik.handleChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="floors">Basement allowed</label>
              <div className={classes.radio}>
                <div className="radio">
                  <input
                    type="radio"
                    id="b-yes"
                    name="basementAllow"
                    checked={formik.values.basementAllow === "yes"}
                    value="yes"
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="b-yes">Yes</label>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    id="b-no"
                    name="basementAllow"
                    checked={formik.values.basementAllow === "no"}
                    value="no"
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="b-no">No</label>
                </div>
              </div>
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
            <div className={classes.formGroup}>
              <label htmlFor="floors">Boundaries wall</label>
              <div className={classes.radio}>
                <div className="radio">
                  <input
                    type="radio"
                    id="w-yes"
                    name="boundaryWalls"
                    checked={formik.values.boundaryWalls === "yes"}
                    value="yes"
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="w-yes">Yes</label>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    id="w-no"
                    name="boundaryWalls"
                    checked={formik.values.boundaryWalls === "no"}
                    value="no"
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="w-no">No</label>
                </div>
              </div>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="road">Road Size</label>
              <GroupedButton
                inputId="road"
                inputName="roadSize.value"
                selectName="roadSize.unit"
                values={["", "m", "ft"]}
                handleChange={formik.handleChange}
                error={roadSizeErr}
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
