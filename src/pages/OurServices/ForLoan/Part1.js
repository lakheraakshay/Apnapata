import React from "react";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import globalStyles from "../../../components/GlobalStyles/ServicesStyles";
import { servicesActions } from "../../../store/reducers/services-slice";
import Radio from "../../../components/Radio";

const iAmList = [
  { value: "bankEmployee", title: "Bank Employee" },
  { value: "dsa", title: "DSA" },
  { value: "marketingAssociate", title: "Marketing Associate" },
];

const loanTypeList = [
  { value: "homeLoan", title: "Home Loan" },
  { value: "constructionLoan", title: "Construction Loan" },
  { value: "personalLoan", title: "Personal Loan" },
  { value: "carLoan", title: "Car Loan" },
  { value: "educationLoan", title: "Education Loan" },
  { value: "businessLoan", title: "Business Loan" },
  { value: "loanAgainstProperty", title: "Loan Against Property" },
];

const validationSchema = yup.object({
  country: yup.string().required("Country name is required"),
  city: yup.string().required("City/Village name is required"),
  area: yup.string().required("Colony/Township/Area/Society name is required"),
  title: yup.string().required("Property Title is required"),
});

export default function Part1({ setPart }) {
  const classes = globalStyles();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      country: "",
      city: "",
      area: "",
      iAm: "",
      title: "",
      loanType: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(servicesActions.update(values));
      setPart(2);
    },
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      {/* <h3>Part - I</h3> */}
      <div className={classes.formGroup}>
        <label htmlFor="country">Country</label>
        <TextField
          variant="outlined"
          placeholder="Enter country name"
          id="country"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="city">City/Village</label>
        <TextField
          variant="outlined"
          placeholder="Enter city/village name"
          id="city"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="area">Colony/Township/Area/Society</label>
        <TextField
          variant="outlined"
          placeholder="Enter area details"
          id="area"
          name="area"
          value={formik.values.area}
          onChange={formik.handleChange}
          error={formik.touched.area && Boolean(formik.errors.area)}
          helperText={formik.touched.area && formik.errors.area}
        />
      </div>
      <div
        className={classes.formGroup}
        style={{ flexDirection: "column", alignItems: "unset" }}
      >
        <label>I am -</label>
        <ul className={classes.options}>
          {iAmList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.iAm}
              value={item.value}
              title={item.title}
              fieldName="iAm"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="title">Property Title</label>
        <TextField
          variant="outlined"
          placeholder="Enter property title"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
      </div>
      <div
        className={classes.formGroup}
        style={{ flexDirection: "column", alignItems: "unset" }}
      >
        <label>Loan Type</label>
        <ul className={classes.options}>
          {loanTypeList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.loanType}
              value={item.value}
              title={item.title}
              fieldName="loanType"
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
