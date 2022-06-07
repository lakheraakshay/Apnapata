import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { servicesActions } from "../../store/reducers/services-slice";
import Radio from "../../components/Radio";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";

export const typeList = [
  { value: "Loan", title: "Loan" },
  { value: "Vastu", title: "Vastu" },
  { value: "Interior Design", title: "Interior Design" },
  { value: "Architect", title: "Architect" },
  { value: "Construction", title: "Construction" }
];

const incomeProofList = [
  { value: 'Latest Salary Slip', title: 'Latest Salary Slip' },
  { value: 'I. T. R.', title: 'I. T. R.' },
  { value: 'Form-16', title: 'Form-16' },
  { value: 'Last 6 Months Bank Statement', title: 'Last 6 Months Bank Statement' }
];

const documentsProofList = [
  { value: 'Agreement TO Sale', title: 'Agreement TO Sale' },
  { value: 'Allotment LETTER', title: 'Allotment LETTER' },
  { value: 'Sale Deed', title: 'Sale Deed' },
  { value: 'Possession LETTER', title: 'Possession LETTER' },
  { value: 'MCD TAX Receipt', title: 'MCD TAX Receipt' },
  { value: 'Convenance Deed', title: 'Convenance Deed' },
  { value: 'Builder Buyer Agreement', title: 'Builder Buyer Agreement' },
  { value: 'Power of Attorney', title: 'Power of Attorney' },
  { value: 'Approval Map', title: 'Approval Map' }
];

const validationSchema = yup.object({
  bankName: yup.string().required('Bank Name is required.'),
  bankLogo: yup.string().required('Bank Logo is required.'),
  rate_interest: yup
    .number()
    .positive('Rate of Interest must be a Positive Number.')
    .required('Rate of Interest is required.'),
  loanAmount: yup
    .number()
    .positive('Loan Amount must be a Positive Number.')
    .integer('Loan Amount must be an Integer.')
    .required('Loan Amount is required.'),
  minLoanTime: yup
    .number()
    .positive('Minimum Loan Time must be a Positive Number.')
    .integer('Minimum Loan Time must be an Integer.')
    .required('Minimum Loan Time is required.'),
  maxLoanTime: yup
    .number()
    .positive('Maximum Loan Time must be a Positive Number.')
    .integer('Maximum Loan Time must be an Integer.')
    .required('Maximum Loan Time is required.'),
  approx_emi: yup
    .number()
    .positive('Approximation of EMI must be a Positive Number.')
    .integer('Approximation of EMI must be an Integer.')
    .required('Approximation of EMI per month is required.'),
  loanApprovalTime: yup
    .number()
    .positive('Approval Time must be a Positive Number.')
    .integer('Approval Time must be an Integer.')
    .required('Approval Time is required.'),
  processingTime: yup
    .number()
    .positive('Processing Fee must be a Positive Number.')
    .integer('Processing Fee must be an Integer.')
    .required('Processing Fee is required.'),
  proof_of_income: yup.string().required('Income Proof is required.'),
  property_document: yup.string().required('Document Proof is required.'),
});

const Loan = ({ setShowForm }) => {

  const dispatch = useDispatch();
  const classes = globalStyles();
  const details = useSelector((state) => state.services.values);
  const [identityProof, setIdentityProof] = useState(details.proof_of_Identity || 'pan-card')
  const [addressProof, setAddressProof] = useState(details.proof_of_Address || 'aadhar-card')

  const formik = useFormik({
    initialValues: {
      bankName: details.bankName ? details.bankName : '',
      bankLogo: details.bankLogo ? details.bankLogo : '',
      rate_interest: details.rate_interest ? details.rate_interest : 0,
      loanAmount: details.loanAmount ? details.loanAmount : 0,
      minLoanTime: details.minLoanTime ? details.minLoanTime : 0,
      maxLoanTime: details.maxLoanTime ? details.maxLoanTime : 0,
      approx_emi: details.approx_emi ? details.approx_emi : 0,
      loanApprovalTime: details.loanApprovalTime ? details.loanApprovalTime : 0,
      processingTime: details.processingTime ? details.processingTime : 0,
      proof_of_income: details.proof_of_income ? details.proof_of_income : '',
      property_document: details.property_document ? details.property_document : '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const newDetails = {
        ...details,
        bankName: values.bankName,
        bankLogo: values.bankLogo,
        rate_interest: values.rate_interest,
        loanAmount: values.loanAmount,
        minLoanTime: values.minLoanTime,
        maxLoanTime: values.maxLoanTime,
        approx_emi: values.approx_emi,
        loanApprovalTime: values.loanApprovalTime,
        processingTime: values.processingTime,
        proof_of_Identity: identityProof,
        proof_of_Address: addressProof,
        proof_of_income: values.proof_of_income,
        property_document: values.property_document,
      }
      console.log('New Details: ', newDetails)
      dispatch(servicesActions.update(newDetails))
      setShowForm('photos/videos')
    }
  });

  return (
    <Card className={classes.card}>
      <CardContent>
        <form className={classes.form}>

          {/* Bank Name */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="bankName">Bank Name</label>
            <TextField
              variant="outlined"
              placeholder="Enter Bank Name"
              id="bankName"
              name="bankName"
              value={formik.values.bankName}
              onChange={formik.handleChange}
              error={formik.touched.bankName && Boolean(formik.errors.bankName)}
              helperText={formik.touched.bankName && formik.errors.bankName}
            />
          </div>

          {/* Bank Logo */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="bankLogo">Bank Logo</label>
            <TextField
              variant="outlined"
              placeholder="Select Bank Logo"
              id="bankLogo"
              name="bankLogo"
              value={formik.values.bankLogo}
              onChange={formik.handleChange}
              error={formik.touched.bankLogo && Boolean(formik.errors.bankLogo)}
              helperText={formik.touched.bankLogo && formik.errors.bankLogo}
            />
          </div>

          {/* Rate of Interest */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="rate_interest">Rate of Interest</label>
            <TextField
              variant="outlined"
              placeholder="Enter rate"
              id="rate_interest"
              name="rate_interest"
              value={formik.values.rate_interest}
              onChange={formik.handleChange}
              error={formik.touched.rate_interest && Boolean(formik.errors.rate_interest)}
              helperText={formik.touched.rate_interest && formik.errors.rate_interest}
            />
          </div>

          {/* Loan Amount */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="loanAmount">Loan Amount</label>
            <TextField
              variant="outlined"
              placeholder="Enter amount in Rs."
              id="loanAmount"
              name="loanAmount"
              value={formik.values.loanAmount}
              onChange={formik.handleChange}
              error={formik.touched.loanAmount && Boolean(formik.errors.loanAmount)}
              helperText={formik.touched.loanAmount && formik.errors.loanAmount}
            />
          </div>

          {/* Minimum Loan Time */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="minLoanTime">Minimum Loan Time</label>
            <TextField
              variant="outlined"
              placeholder="Enter time in year"
              id="minLoanTime"
              name="minLoanTime"
              value={formik.values.minLoanTime}
              onChange={formik.handleChange}
              error={formik.touched.minLoanTime && Boolean(formik.errors.minLoanTime)}
              helperText={formik.touched.minLoanTime && formik.errors.minLoanTime}
            />
          </div>

          {/* Maximum Loan Time */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="maxLoanTime">Maximum Loan Time</label>
            <TextField
              variant="outlined"
              placeholder="Enter time in year"
              id="maxLoanTime"
              name="maxLoanTime"
              value={formik.values.maxLoanTime}
              onChange={formik.handleChange}
              error={formik.touched.maxLoanTime && Boolean(formik.errors.maxLoanTime)}
              helperText={formik.touched.maxLoanTime && formik.errors.maxLoanTime}
            />
          </div>

          {/* Approx. EMI per month */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="approx_emi">Approx. EMI per lakh</label>
            <TextField
              variant="outlined"
              placeholder="Enter EMI per lakh"
              id="approx_emi"
              name="approx_emi"
              value={formik.values.approx_emi}
              onChange={formik.handleChange}
              error={formik.touched.approx_emi && Boolean(formik.errors.approx_emi)}
              helperText={formik.touched.approx_emi && formik.errors.approx_emi}
            />
          </div>

          {/* Loan Approval Time */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="loanApprovalTime">Loan approval time</label>
            <TextField
              variant="outlined"
              placeholder="Enter time in day"
              id="loanApprovalTime"
              name="loanApprovalTime"
              value={formik.values.loanApprovalTime}
              onChange={formik.handleChange}
              error={formik.touched.loanApprovalTime && Boolean(formik.errors.loanApprovalTime)}
              helperText={formik.touched.loanApprovalTime && formik.errors.loanApprovalTime}
            />
          </div>

          {/* Processing Fee */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="processingTime">Processing Fee</label>
            <TextField
              variant="outlined"
              placeholder="Enter processing fee"
              id="processingTime"
              name="processingTime"
              value={formik.values.processingTime}
              onChange={formik.handleChange}
              error={formik.touched.processingTime && Boolean(formik.errors.processingTime)}
              helperText={formik.touched.processingTime && formik.errors.processingTime}
            />
          </div>

          <Typography className={classes.formGroupColumn}>Document Required</Typography>

          {/* Proof of Identity */}
          <div className={classes.formGroupColumn}>
            <label>Proof of Identity -</label>
            <ul className={classes.options}>

              {/* Pan Card */}
              <li className={identityProof === 'pan-card' && 'active'}>
                <label htmlFor="pan-card">Pan Card</label>
                <input
                  type="radio"
                  id="pan-card"
                  checked={identityProof === 'pan-card'}
                  onChange={() => setIdentityProof('pan-card')}
                />
              </li>

              {/* Driving License */}
              <li className={identityProof === 'driving-license' && 'active'}>
                <label htmlFor="driving-license">Driving License</label>
                <input
                  type="radio"
                  id="driving-license"
                  checked={identityProof === 'driving-license'}
                  onChange={() => setIdentityProof('driving-license')}
                />
              </li>

              {/* Voter ID */}
              <li className={identityProof === 'voter-id' && 'active'}>
                <label htmlFor="voter-id">Voter ID</label>
                <input
                  type="radio"
                  id="voter-id"
                  checked={identityProof === 'voter-id'}
                  onChange={() => setIdentityProof('voter-id')}
                />
              </li>

              {/* Aadhar Card */}
              <li className={identityProof === 'aadhar-card' && 'active'}>
                <label htmlFor="aadhar-card-identity">Aadhar Card</label>
                <input
                  type="radio"
                  id="aadhar-card-identity"
                  checked={identityProof === 'aadhar-card'}
                  onChange={() => setIdentityProof('aadhar-card')}
                />
              </li>

              {/* Passport */}
              <li className={identityProof === 'passport' && 'active'}>
                <label htmlFor="passport-identity">Passport</label>
                <input
                  type="radio"
                  id="passport-identity"
                  checked={identityProof === 'passport'}
                  onChange={() => setIdentityProof('passport')}
                />
              </li>

              {/* G. S. T. */}
              <li className={identityProof === 'gst' && 'active'}>
                <label htmlFor="gst-identity">G. S. T.</label>
                <input
                  type="radio"
                  id="gst-identity"
                  checked={identityProof === 'gst'}
                  onChange={() => setIdentityProof('gst')}
                />
              </li>
            </ul>
          </div>

          {/* Proof of Address */}
          <div className={classes.formGroupColumn}>
            <label>Proof of Address -</label>
            <ul className={classes.options}>

              {/* Electricity Bill */}
              <li className={addressProof === 'electricity-bill' && 'active'}>
                <label htmlFor="electricity-bill">Electricity Bill</label>
                <input
                  type="radio"
                  id='electricity-bill'
                  checked={addressProof === 'electricity-bill'}
                  onChange={() => setAddressProof('electricity-bill')}
                />
              </li>

              {/* Passport */}
              <li className={addressProof === 'passport' && 'active'}>
                <label htmlFor="passport">Passport</label>
                <input
                  type="radio"
                  id='passport'
                  checked={addressProof === 'passport'}
                  onChange={() => setAddressProof('passport')}
                />
              </li>

              {/* Aadhar Card */}
              <li className={addressProof === 'aadhar-card' && 'active'}>
                <label htmlFor="aadhar-card">Aadhar Card</label>
                <input
                  type="radio"
                  id='aadhar-card'
                  checked={addressProof === 'aadhar-card'}
                  onChange={() => setAddressProof('aadhar-card')}
                />
              </li>

              {/* Phone Bill */}
              <li className={addressProof === 'phone-bill' && 'active'}>
                <label htmlFor="phone-bill">Phone Bill</label>
                <input
                  type="radio"
                  id='phone-bill'
                  checked={addressProof === 'phone-bill'}
                  onChange={() => setAddressProof('phone-bill')}
                />
              </li>
            </ul>
          </div>

          {/* Proof of Income */}
          <div className={classes.formGroupColumn}>
            <label>Proof of Income -</label>
            <ul className={classes.options}>
              {incomeProofList.map((item, i) => (
                <Radio
                  key={i}
                  formikName={formik.values.proof_of_income}
                  value={item.value}
                  title={item.title}
                  fieldName="proof_of_income"
                  handleChange={formik.handleChange}
                />
              ))}
            </ul>
            {
              formik.errors.proof_of_income && (
                <p className={classes.errorMessage}>{formik.errors.proof_of_income}</p>
              )
            }
          </div>

          {/* Property of Documents */}
          <div className={classes.formGroupColumn}>
            <label>Property Documents -</label>
            <ul className={classes.options}>
              {documentsProofList.map((item, i) => (
                <Radio
                  key={i}
                  formikName={formik.values.property_document}
                  value={item.value}
                  title={item.title}
                  fieldName="property_document"
                  handleChange={formik.handleChange}
                />
              ))}
            </ul>
            {
              formik.errors.property_document && (
                <p className={classes.errorMessage}>{formik.errors.property_document}</p>
              )
            }
          </div>

          <Button
            type="submit"
            variant="contained"
            className={classes.button}
            onClick={e => {
              e.preventDefault()
              formik.handleSubmit()
            }}
          >
            Save &amp; Next
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Loan
