import React from "react";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import globalStyles from "../../../components/GlobalStyles/ServicesStyles";
import { servicesActions } from "../../../store/reducers/services-slice";
import Radio from "../../../components/Radio";

const forList = [
  { value: "homeVastu", title: "Home Vastu" },
  { value: "retailStoreVastu", title: "Retail Store Vastu" },
  { value: "hospitalVastu", title: "Hospital Vastu" },
  { value: "urbanVastu", title: "Urban Vastu" },
  { value: "industrialVastu", title: "Industrial Vastu" },
  { value: "housingVastu", title: "Housing Vastu" },
  { value: "apartmentSocietyVastu", title: "Apartment/Society Vastu" },
  { value: "commercial", title: "Commercial" }
];

const yesNoList = [
  { value: "yes", title: "Yes" },
  { value: "no", title: "No" }
];

const validationSchema = yup.object({
  workExp: yup.string().required("Working Experience is required")
});

export default function Part2({ setPart }) {
  const classes = globalStyles();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      for: "homeVastu",
      services: [],
      onlineServices: "yes1",
      telephoneServices: "yes2",
      workExperience: "",
      approvedByGovtAuth: "yes3"
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
      <div className={classes.formGroup}>
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
        <label htmlFor="work-exp">Working Experience</label>
        <TextField
          variant="outlined"
          id="work-exp"
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
        <label>Telephone Services</label>
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
