import React from "react";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import globalStyles from "../../../components//GlobalStyles/ServicesStyles";
import { servicesActions } from "../../../store/reducers/services-slice";
import Radio from "../../../components/Radio";
import Checkbox from "../../../components/Checkbox";

const forList = [
  { value: "homeArchitects", title: "Home Architects" },
  { value: "retailStoreDesigns", title: "Retail Store Designs" },
  { value: "hospitalDesignArchitects", title: "Hospital Design Architects" },
  { value: "urbanDesigners", title: "Urban Designers" },
  { value: "industrialArchitects", title: "Industrial Architects" },
  { value: "housingArchitects", title: "Housing Architects" },
  {
    value: "apartmentSocietyArchitects",
    title: "Apartment/Society Architects"
  },
  { value: "commercial", title: "Commercial" },
  { value: "architectValuers", title: "Architect Valuers" }
];
const servicesList = [
  { value: "architecturalModel", title: "Architectural Model" },
  { value: "3dElevation", title: "3D Elevation" },
  { value: "2dElevationDrawing", title: "2D Elevation Drawing" },
  { value: "projectPlanAndSupervision", title: "Project plan & Supervision" },
  {
    value: "architecturalPlanAndDesign",
    title: "Architectural Plan & Design"
  },
  { value: "structuralDesign", title: "Structural Design" },
  { value: "propertyConsultation", title: "Property Consultation" },
  { value: "landscapeDesign", title: "Landscape Design" }
];
const yesNoList = [
  { value: "yes", title: "Yes" },
  { value: "no", title: "No" }
];
const validationSchema = yup.object({
  workExp: yup.string().required("Work experience is required")
});

export default function Part2({ setPart }) {
  const classes = globalStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      for: "",
      services: [],
      onlineServices: "",
      telephoneServices: "",
      workExperience: "",
      approvedByGovtAuth: ""
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      dispatch(servicesActions.update(values));
      setPart(3);
    }
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <div
        className={classes.formGroup}
        style={{ flexDirection: "column", alignItems: "unset" }}
      >
        <label>For</label>
        <ul className={classes.options}>
          {forList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.for}
              value={item.value}
              title={item.title}
              fieldName="for"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div className={classes.formGroup}>
        <label>Services</label>
        <ul className={classes.options}>
          {servicesList.map((item, i) => (
            <Checkbox
              key={i}
              formikList={formik.values.services}
              value={item.value}
              title={item.title}
              fieldName="services"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div className={classes.formGroupRow}>
        <label>Online Services</label>
        <ul className={classes.options}>
          {yesNoList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.onlineServices}
              value={item.value + "1"}
              title={item.title}
              fieldName="onlineServices"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div className={classes.formGroupRow}>
        <label>Telephone Services</label>
        <ul className={classes.options}>
          {yesNoList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.telephoneServices}
              value={item.value + "2"}
              title={item.title}
              fieldName="telephoneServices"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div className={classes.formGroupRow}>
        <label htmlFor="workExp">Working Experience</label>
        <TextField
          variant="outlined"
          id="workExp"
          size="small"
          name="workExperience"
          value={formik.values.workExperience}
          onChange={formik.handleChange}
          error={
            formik.touched.workExperience &&
            Boolean(formik.errors.workExperience)
          }
          helperText={
            formik.touched.workExperience && formik.errors.workExperience
          }
        />
      </div>
      <div className={classes.formGroupRow}>
        <label>Approved by govt authority</label>
        <ul className={classes.options}>
          {yesNoList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.approvedByGovtAuth}
              value={item.value + "3"}
              title={item.title}
              fieldName="approvedByGovtAuth"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <Button variant="contained" className={classes.button} type="submit">
        Save &amp; Next
      </Button>
    </form>
  );
}
