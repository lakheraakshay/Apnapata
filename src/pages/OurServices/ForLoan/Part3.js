import React from "react";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import globalStyles from "../../../components/GlobalStyles/ServicesStyles";
import { servicesActions } from "../../../store/reducers/services-slice";
import Radio from "../../../components/Radio";
import Checkbox from "../../../components/Checkbox";

const validationSchema = yup.object({
  details: yup.string().required("This field is required"),
});

const proofOfIdentityList = [
  { value: "panCard", title: "PAN Card" },
  { value: "drivingLicense", title: "Driving License" },
  { value: "voterId", title: "Voter ID" },
  { value: "aadhar", title: "Aadhar" },
  { value: "passport", title: "Passport" },
];

const proofOfIncomeList = [
  { value: "latestSalarySlip", title: "Latest salary slip" },
  { value: "itr", title: "ITR" },
  { value: "form16", title: "Form-16" },
];

const proofOfAddressList = [
  { value: "electricityBill", title: "Electricity Bill" },
  { value: "passport2", title: "Passport" },
  { value: "aadhar2", title: "Aadhar" },
  { value: "phoneBill", title: "Phone Bill" },
];

const bankStatementList = [
  { value: "last3MonthsBankStatement", title: "Last 3 months bank statement" },
  { value: "last6MonthsBankPassbook", title: "Last 6 months bank passbook" },
];

const propertyDocumentsList = [
  { value: "agreementSaleCopy", title: "Agreement sale copy" },
  { value: "certificateOfPossession", title: "Certificate of possession" },
  { value: "landTaxReceipt", title: "Land tax receipt" },
  {
    value: "detailedCostOfConstruction",
    title: "Detailed cost of construction",
  },
  { value: "letterOfAllotment", title: "Letter of allotment" },
  { value: "originalNoc", title: "Original NOC" },
];

export default function Part3({ setPart }) {
  const classes = globalStyles();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      details: "",
      proofOfIdentity: "",
      proofOfAddress: "",
      proofOfIncome: "",
      bankStatement: "",
      propertyDocuments: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(servicesActions.update(values));
      setPart(4);
    },
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      {/* <h3>Part - III</h3> */}
      <div className={classes.formGroup}>
        <label htmlFor="details">Details</label>
        <TextField
          multiline
          variant="outlined"
          id="details"
          name="details"
          value={formik.values.details}
          onChange={formik.handleChange}
          error={formik.touched.details && Boolean(formik.errors.details)}
          helperText={formik.touched.details && formik.errors.details}
        />
      </div>
      {/* <div className={classes.formGroup}>
        <h3 className={classes.bigLabel}>Upload Pictures/Videos</h3>
        <div className={classes.photos}>
          {new Array(3).fill("").map((_, i) => (
            <React.Fragment key={i}>
              <label htmlFor={"photo" + i} className="photo">
                {i === 0 ? "+" : null}
              </label>
              <input
                type="file"
                id={"photo" + i}
                style={{ display: "none" }}
                accept="image/*, video/*"
              />
            </React.Fragment>
          ))}
        </div>
      </div> */}
      <div className={classes.formGroup}>
        <h3 className={classes.bigLabel}>Documents Required</h3>
      </div>
      <div
        className={classes.formGroup}
        style={{ flexDirection: "column", alignItems: "unset" }}
      >
        <label>Proof of Identity</label>
        <ul className={classes.options}>
          {proofOfIdentityList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.proofOfIdentity}
              value={item.value}
              title={item.title}
              fieldName="proofOfIdentity"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div
        className={classes.formGroup}
        style={{ flexDirection: "column", alignItems: "unset" }}
      >
        <label>Proof of Address</label>
        <ul className={classes.options}>
          {proofOfAddressList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.proofOfAddress}
              value={item.value}
              title={item.title}
              fieldName="proofOfAddress"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div
        className={classes.formGroup}
        style={{ flexDirection: "column", alignItems: "unset" }}
      >
        <label>Proof of Income</label>
        <ul className={classes.options}>
          {proofOfIncomeList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.proofOfIncome}
              value={item.value}
              title={item.title}
              fieldName="proofOfIncome"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div
        className={classes.formGroup}
        style={{ flexDirection: "column", alignItems: "unset" }}
      >
        <label>Bank Statement</label>
        <ul className={classes.options}>
          {bankStatementList.map((item, i) => (
            <Radio
              key={i}
              formikName={formik.values.bankStatement}
              value={item.value}
              title={item.title}
              fieldName="bankStatement"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <div
        className={classes.formGroup}
        style={{ flexDirection: "column", alignItems: "unset" }}
      >
        <label>Property Documents</label>
        <ul className={classes.options}>
          {propertyDocumentsList.map((item, i) => (
            <Checkbox
              key={i}
              formikList={formik.values.propertyDocuments}
              value={item.value}
              title={item.title}
              fieldName="propertyDocuments"
              handleChange={formik.handleChange}
            />
          ))}
        </ul>
      </div>
      <Button type="submit" variant="contained" className={classes.button}>
        Save &amp; Next
      </Button>
    </form>
  );
}
