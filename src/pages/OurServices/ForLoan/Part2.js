import React from "react";
import { useState } from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import globalStyles from "../../../components/GlobalStyles/ServicesStyles";
import { servicesActions } from "../../../store/reducers/services-slice";

const useStyles = makeStyles({
  logo: {
    color: "#AAAAAA",
    border: "1px solid #CACACA",
    padding: "10px 30px",
    borderRadius: 8,
    cursor: "pointer",
  },
});

const validationSchema = yup.object({
  bankName: yup.string().required("Bank  name is required"),
  rate: yup.string().required("Rate is required"),
  loan: yup.string().required("This field is required"),
  min: yup.string().required("This field is required"),
  max: yup.string().required("This field is required"),
  emi: yup.string().required("This field is required"),
  approval: yup.string().required("This field is required"),
  fee: yup.string().required("This field is required"),
});

export default function Part2({ setPart }) {
  const classes = { ...globalStyles(), ...useStyles() };
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      bankName: "",
      logo: "",
      rate: "",
      loan: "",
      min: "",
      max: "",
      emi: "",
      approval: "",
      fee: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values.logo);
      alert(JSON.stringify(values, null, 2));
      dispatch(servicesActions.update(values));
      setPart(3);
    },
  });
  // formik.handleSubmit = (values) => {
  //   let data = new FormData();
  //   data.append("logo", values.logo);
  //   return fetch(
  //     {
  //       /*baseUrl*/
  //     },
  //     {
  //       method: "post",
  //       headers: new Headers({
  //         Accept: "application/json"
  //         // Authorization: "Bearer " + token
  //       }),
  //       body: data
  //     }
  //   )
  //     .then((response) => response.json())
  //     .catch((error) => console.log(error));
  // };
  const [uploadStatus, setUploadStatus] = useState("Upload");

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      {/* <h3>Part - II</h3> */}
      <div className={classes.formGroup}>
        <label htmlFor="bank">Bank name</label>
        <TextField
          variant="outlined"
          placeholder="Enter bank name"
          id="bank"
          name="bankName"
          value={formik.values.bankName}
          onChange={formik.handleChange}
          error={formik.touched.bankName && Boolean(formik.errors.bankName)}
          helperText={formik.touched.bankName && formik.errors.bankName}
        />
      </div>
      <div className={classes.formGroupRow}>
        <label htmlFor="logo">Bank logo</label>
        <label htmlFor="logo" className={classes.logo}>
          {uploadStatus}
        </label>
        <input
          type="file"
          id="logo"
          name="logo"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(event) => {
            formik.setFieldValue("logo", event.target.files[0]);
            setUploadStatus("Uploaded");
          }}
        />
      </div>
      <div className={classes.formGroupRow}>
        <label htmlFor="rate">Rate of Interest</label>
        <TextField
          variant="outlined"
          id="rate"
          size="small"
          name="rate"
          value={formik.values.rate}
          onChange={formik.handleChange}
          error={formik.touched.rate && Boolean(formik.errors.rate)}
          helperText={formik.touched.rate && formik.errors.rate}
        />
      </div>
      <div className={classes.formGroupRow}>
        <label htmlFor="loan">Loan Amount</label>
        <TextField
          variant="outlined"
          placeholder="Rs"
          id="loan"
          size="small"
          name="loan"
          value={formik.values.loan}
          onChange={formik.handleChange}
          error={formik.touched.loan && Boolean(formik.errors.loan)}
          helperText={formik.touched.loan && formik.errors.loan}
        />
      </div>
      <div className={classes.formGroupRow}>
        <label htmlFor="min">Minimum Loan Time</label>
        <TextField
          variant="outlined"
          id="min"
          size="small"
          name="min"
          value={formik.values.min}
          onChange={formik.handleChange}
          error={formik.touched.min && Boolean(formik.errors.min)}
          helperText={formik.touched.min && formik.errors.min}
        />
        <span>Year(s)</span>
      </div>
      <div className={classes.formGroupRow}>
        <label htmlFor="max">Maximum Loan Time</label>
        <TextField
          variant="outlined"
          id="max"
          size="small"
          name="max"
          value={formik.values.max}
          onChange={formik.handleChange}
          error={formik.touched.max && Boolean(formik.errors.max)}
          helperText={formik.touched.max && formik.errors.max}
        />
        <span>Year(s)</span>
      </div>
      <div className={classes.formGroupRow}>
        <label htmlFor="emi">Approx EMI Per Lakh</label>
        <TextField
          variant="outlined"
          placeholder="Rs"
          id="emi"
          size="small"
          name="emi"
          value={formik.values.emi}
          onChange={formik.handleChange}
          error={formik.touched.emi && Boolean(formik.errors.emi)}
          helperText={formik.touched.emi && formik.errors.emi}
        />
      </div>
      <div className={classes.formGroupRow}>
        <label htmlFor="approval">Loan Approval Time</label>
        <TextField
          variant="outlined"
          id="approval"
          size="small"
          name="approval"
          value={formik.values.approval}
          onChange={formik.handleChange}
          error={formik.touched.approval && Boolean(formik.errors.approval)}
          helperText={formik.touched.approval && formik.errors.approval}
        />
        <span>Day(s)</span>
      </div>
      <div className={classes.formGroupRow}>
        <label htmlFor="fee">Processing Fee</label>
        <TextField
          variant="outlined"
          placeholder="Rs"
          id="fee"
          size="small"
          name="fee"
          value={formik.values.fee}
          onChange={formik.handleChange}
          error={formik.touched.fee && Boolean(formik.errors.fee)}
          helperText={formik.touched.fee && formik.errors.fee}
        />
      </div>
      <Button variant="contained" className={classes.button} type="submit">
        Save &amp; Next
      </Button>
    </form>
  );
}
