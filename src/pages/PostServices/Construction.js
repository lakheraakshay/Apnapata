import React from "react";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { servicesActions } from "../../store/reducers/services-slice";
import Radio from "../../components/Radio";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";

export const constructionList = [
  { value: "Civil", title: "Civil" },
  { value: "Carpenter", title: "Carpenter" },
  { value: "Pest Control", title: "Pest Control" },
  { value: "Electrician", title: "Electrician" },
  { value: "Painter", title: "Painter" },
  { value: 'Pop/false Ceiling', title: 'Pop/false Ceiling' },
  { value: 'Flooring', title: 'Flooring' }
];
const serviceList = [
  { value: "Home", title: "Home" },
  { value: "Retail Store", title: "Retail Store" },
  { value: "Urban", title: "Urban" },
  { value: "Industrial", title: "Industrial" },
  { value: 'Housing', title: 'Housing' },
  { value: 'Apartment/Society', title: 'Apartment/Society' },
  { value: 'Commercial Architects', title: 'Commercial Architects' },
  { value: 'Hospital', title: 'Hospital' }
];
const yesOrNo = [
  { value: "Yes", title: "Yes" },
  { value: "No", title: "No" }
];
const workTypeList = [
  { value: 'Labour State', title: 'Labour State' },
  { value: 'With Material', title: 'With Material' },
]

const validationSchema = yup.object({
  forConstruction: yup.string().required('For Construction is required.'),
  companyName: yup.string().required('Company Name is required.'),
  constructionService: yup.string().required('Construction Service is required.'),
  totalEmploy: yup
    .number()
    .positive('Total Employ must be a Positive Number.')
    .integer('Total Employ must be an Integer.')
    .required('Total Employ is required.'),
  workingExperience: yup.string().required('Working Experience is required.'),
  govtApproved: yup.string().required('Govt. Approval is required.'),
  workType: yup.string().required('Work Type is required.'),
  ratePerSyq: yup
    .number()
    .positive('Rate must be a Positive Number.')
    .required('Rate is required.'),
});

const Construction = ({ setShowForm }) => {

  const dispatch = useDispatch();
  const classes = globalStyles();
  const details = useSelector((state) => state.services.values);

  const formik = useFormik({
    initialValues: {
      forConstruction: details.forConstruction ? details.forConstruction : '',
      companyName: details.companyName ? details.companyName : '',
      constructionService: details.constructionService ? details.constructionService : '',
      totalEmploy: details.totalEmploy ? details.totalEmploy : 0,
      workingExperience: details.workingExperience ? details.workingExperience : '',
      govtApproved: details.govtApproved ? details.govtApproved : '',
      workType: details.workType ? details.workType : '',
      ratePerSyq: details.ratePerSyq ? details.ratePerSyq : 0,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const newDetails = {
        ...details,
        for: [values.forConstruction],
        companyName: values.companyName,
        services: [values.constructionService],
        totalExp: values.totalEmploy,
        workingExp: values.workingExperience,
        approvedByGovr: values.govtApproved,
        workType: values.workType,
        ratePerSyq: values.ratePerSyq,
      }
      console.log('New Details = ', newDetails)
      dispatch(servicesActions.update(newDetails))
      setShowForm('photos/videos')
    }
  });

  return (
    <Card className={classes.card}>
      <CardContent>
        <form className={classes.form}>

          {/* For architects */}
          <div className={classes.formGroupColumn}>
            <label>For construction -</label>
            <ul className={classes.options}>
              {constructionList.map((item, i) => (
                <Radio
                  key={i}
                  formikName={formik.values.forConstruction}
                  value={item.value}
                  title={item.title}
                  fieldName="forConstruction"
                  handleChange={formik.handleChange}
                />
              ))}
            </ul>
            {
              formik.errors.forConstruction && (
                <p className={classes.errorMessage}>{formik.errors.forConstruction}</p>
              )
            }
          </div>

          {/* Company Name */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="companyName">Company Name</label>
            <TextField
              variant="outlined"
              placeholder="Enter company name"
              id="companyName"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              error={formik.touched.companyName && Boolean(formik.errors.companyName)}
              helperText={formik.touched.companyName && formik.errors.companyName}
            />
          </div>

          {/* Services */}
          <div className={classes.formGroupColumn}>
            <label>For Services -</label>
            <ul className={classes.options}>
              {serviceList.map((item, i) => (
                <Radio
                  key={i}
                  formikName={formik.values.constructionService}
                  value={item.value}
                  title={item.title}
                  fieldName="constructionService"
                  handleChange={formik.handleChange}
                />
              ))}
            </ul>
            {
              formik.errors.constructionService && (
                <p className={classes.errorMessage}>{formik.errors.constructionService}</p>
              )
            }
          </div>

          {/* Total Employ */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="totalEmploy">Total Employ</label>
            <TextField
              variant="outlined"
              placeholder="Enter total employ"
              id="totalEmploy"
              name="totalEmploy"
              value={formik.values.totalEmploy}
              onChange={formik.handleChange}
              error={formik.touched.totalEmploy && Boolean(formik.errors.totalEmploy)}
              helperText={formik.touched.totalEmploy && formik.errors.totalEmploy}
            />
          </div>

          {/* Working Experience */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="workingExperience">Working Experience</label>
            <TextField
              variant="outlined"
              placeholder="Enter experience"
              id="workingExperience"
              name="workingExperience"
              value={formik.values.workingExperience}
              onChange={formik.handleChange}
              error={formik.touched.workingExperience && Boolean(formik.errors.workingExperience)}
              helperText={formik.touched.workingExperience && formik.errors.workingExperience}
            />
          </div>

          {/* Approved by govt authority */}
          <div className={classes.formGroupColumn}>
            <label>Approved by Govt. authority -</label>
            <ul className={classes.options}>
              {yesOrNo.map((item, i) => (
                <Radio
                  key={i}
                  formikName={formik.values.govtApproved}
                  value={item.value}
                  title={item.title}
                  fieldName="govtApproved"
                  handleChange={formik.handleChange}
                />
              ))}
            </ul>
            {
              formik.errors.govtApproved && (
                <p className={classes.errorMessage}>{formik.errors.govtApproved}</p>
              )
            }
          </div>

          {/* Work Type */}
          <div className={classes.formGroupColumn}>
            <label>Work Type -</label>
            <ul className={classes.options}>
              {workTypeList.map((item, i) => (
                <Radio
                  key={i}
                  formikName={formik.values.workType}
                  value={item.value}
                  title={item.title}
                  fieldName="workType"
                  handleChange={formik.handleChange}
                />
              ))}
            </ul>
            {
              formik.errors.workType && (
                <p className={classes.errorMessage}>{formik.errors.workType}</p>
              )
            }
          </div>

          {/* Rate per syq */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="ratePerSyq">Rate per syq</label>
            <TextField
              variant="outlined"
              placeholder="Enter rate"
              id="ratePerSyq"
              name="ratePerSyq"
              value={formik.values.ratePerSyq}
              onChange={formik.handleChange}
              error={formik.touched.ratePerSyq && Boolean(formik.errors.ratePerSyq)}
              helperText={formik.touched.ratePerSyq && formik.errors.ratePerSyq}
            />
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

export default Construction
