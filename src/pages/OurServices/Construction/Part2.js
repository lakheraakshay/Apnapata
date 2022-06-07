import React from "react";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import globalStyles from "../../../components/GlobalStyles/ServicesStyles";
import { servicesActions } from "../../../store/reducers/services-slice";
import Radio from "../../../components/Radio";

const civilList = [
  { value: "civil", title: "civil" },
  { value: "lorem1", title: "lorem" },
  { value: "lorem2", title: "Lorem" },
  { value: "lorem3", title: "Lorem" },
  { value: "lorem4", title: "Lorem " }
];

const servicesList = [
  { value: "home", title: "Home" },
  { value: "lorem5", title: "lorem" },
  { value: "lorem6", title: "Lorem" },
  { value: "lorem7", title: "Lorem" },
  { value: "lorem8", title: "Lorem " },
  { value: "lorem9", title: "Lorem " },
  { value: "lorem10", title: "Lorem " }
];

const employeeList = [
  { value: "lorem11", title: "lorem" },
  { value: "lorem12", title: "Lorem" }
];

const govtAuthList = [
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
      civil: "",
      services: "",
      totalEmployee: "",
      workExp: "",
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
      {/* <h3>Part - II</h3> */}
      <div className={classes.formGroup}>
        <ul className={classes.options}>
          {civilList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.civil}
              value={item.value}
              title={item.title}
              fieldName="civil"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div
        className={classes.formGroup}
        style={{ flexDirection: "column", alignItems: "unset" }}
      >
        <label>For Services</label>
        <ul className={classes.options}>
          {servicesList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.services}
              value={item.value}
              title={item.title}
              fieldName="services"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div className={classes.formGroup}>
        <label>Total Employees</label>
        <ul className={classes.options}>
          {employeeList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.totalEmployee}
              value={item.value}
              title={item.title}
              fieldName="totalEmployee"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="workExp">Working Experience</label>
        <TextField
          variant="outlined"
          id="workExp"
          size="small"
          name="workExp"
          value={formik.values.workExp}
          onChange={formik.handleChange}
          error={formik.touched.workExp && Boolean(formik.errors.workExp)}
          helperText={formik.touched.workExp && formik.errors.workExp}
        />
      </div>
      <div className={classes.formGroup}>
        <label>Approved by govt authority</label>
        <ul className={classes.options}>
          {govtAuthList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.approvedByGovtAuth}
              value={item.value}
              title={item.title}
              fieldName="approvedByGovtAuth"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <Button
        variant="contained"
        className={classes.button}
        type="submit"
        //onClick={() => setPart(3)}
      >
        Save &amp; Next
      </Button>
    </form>
  );
}
