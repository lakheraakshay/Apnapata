import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { servicesActions } from "../../store/reducers/services-slice";
import Radio from "../../components/Radio";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";

export const architectList = [
  { value: "Home Architects", title: "Home Architects" },
  { value: "Retail Store Deign Architect", title: "Retail Store Deign Architect" },
  { value: "Hospital Design Architects", title: "Hospital Design Architects" },
  { value: "Urban Designer", title: "Urban Designer" },
  { value: "Industrial Architect", title: "Industrial Architect" },
  { value: 'Apartment/Society Architects', title: 'Apartment/Society Architects' },
  { value: 'Commercial Architects', title: 'Commercial Architects' },
  { value: 'Housing Architects', title: 'Housing Architects' },
  { value: 'Architect Valuers', title: 'Architect Valuers' }
];
const serviceList = [
  { value: "Home Vastu", title: "Home Vastu" },
  { value: "Retail Store Vastu", title: "Retail Store Vastu" },
  { value: "Hospital Vastu", title: "Hospital Vastu" },
  { value: "Office Vastu", title: "Office Vastu" },
  { value: 'Commercial Vastu', title: 'Commercial Vastu' },
  { value: 'Industrial Vastu', title: 'Industrial Vastu' },
  { value: 'Apartment/Society Vastu', title: 'Apartment/Society Vastu' }
];

const validationSchema = yup.object({
  services: yup.string().required('Services is required.'),
  workingExperience: yup.string().required('Working Experience is required.'),
  serviceCharge: yup
    .number()
    .positive('Service Charge must be a Positive Number.')
    .integer('Service Charge must be an Integer.')
    .required('Service Charge is required.'),
});

const Vastu = ({ setShowForm }) => {

  const dispatch = useDispatch();
  const classes = globalStyles();
  const details = useSelector((state) => state.services.values);
  const [siteVisit, setSiteVisit] = useState(false);
  const [onlineService, setOnlineService] = useState(false)
  const [telephonicService, setTelephonicService] = useState(false)
  const [govtApproval, setGovtApproval] = useState(false)

  const formik = useFormik({
    initialValues: {
      services: details.services ? details.services : '',
      workingExperience: details.workingExperience ? details.workingExperience : '',
      serviceCharge: details.serviceCharge ? details.serviceCharge : 0,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const newDetails = {
        ...details,
        services: [values.services],
        site_visit: siteVisit,
        online_service: onlineService,
        telephonic_service: telephonicService,
        workingExp: values.workingExperience,
        approvedByGovr: govtApproval,
        service_charge: values.serviceCharge,
      }
      console.log('New Values = ', newDetails)
      dispatch(servicesActions.update(newDetails))
      setShowForm('photos/videos')
    }
  });

  return (
    <Card className={classes.card}>
      <CardContent>
        <form className={classes.form}>

          {/* Services */}
          <div className={classes.formGroupColumn}>
            <label>Services -</label>
            <ul className={classes.options}>
              {serviceList.map((item, i) => (
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
            {
              formik.errors.services && (
                <p className={classes.errorMessage}>{formik.errors.services}</p>
              )
            }
          </div>

          {/* Site Visit */}
          <div className={classes.formGroupColumn}>
            <label>Site visit -</label>
            <ul className={classes.options}>
              <li className={siteVisit && 'active'}>
                <label htmlFor="siteYes">Yes</label>
                <input
                  type="radio"
                  id='siteYes'
                  checked={siteVisit}
                  onChange={() => setSiteVisit(true)}
                />
              </li>
              <li className={!siteVisit && 'active'}>
                <label htmlFor="siteNo">No</label>
                <input
                  type="radio"
                  id='siteNo'
                  checked={!siteVisit}
                  onChange={() => setSiteVisit(false)}
                />
              </li>
            </ul>
          </div>

          {/* Online Service */}
          <div className={classes.formGroupColumn}>
            <label>Online Service -</label>
            <ul className={classes.options}>
              <li className={onlineService && 'active'}>
                <label htmlFor="onlineYes">Yes</label>
                <input
                  type="radio"
                  id='onlineYes'
                  checked={onlineService}
                  onClick={() => setOnlineService(true)}
                />
              </li>
              <li className={!onlineService && 'active'}>
                <label htmlFor="onlineNo">No</label>
                <input
                  type="radio"
                  id="onlineNo"
                  checked={!onlineService}
                  onClick={() => setOnlineService(false)}
                />
              </li>
            </ul>
          </div>

          {/* Telephonic Service */}
          <div className={classes.formGroupColumn}>
            <label>Telephonic Service -</label>
            <ul className={classes.options}>
              <li className={telephonicService && 'active'}>
                <label htmlFor="telYes">Yes</label>
                <input
                  type="radio"
                  id='telYes'
                  checked={telephonicService}
                  onChange={() => setTelephonicService(true)}
                />
              </li>
              <li className={!telephonicService && 'active'}>
                <label htmlFor="telNo">No</label>
                <input
                  type="radio"
                  id='telNo'
                  checked={telephonicService}
                  onChange={() => setTelephonicService(false)}
                />
              </li>
            </ul>
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
              <li className={govtApproval && 'active'}>
                <label htmlFor="govtYes">Yes</label>
                <input
                  type="radio"
                  id='govtYes'
                  checked={govtApproval}
                  onChange={() => setGovtApproval(true)}
                />
              </li>
              <li className={!govtApproval && 'active'}>
                <label htmlFor="govtNo">No</label>
                <input
                  type="radio"
                  id="govtNo"
                  checked={govtApproval}
                  onChange={() => setGovtApproval(false)}
                />
              </li>
            </ul>
          </div>

          {/* Service Charge */}
          <div className={classes.formGroupColumn}>
            <label htmlFor="serviceCharge">Service Charge</label>
            <TextField
              variant="outlined"
              placeholder="Enter charge"
              id="serviceCharge"
              name="serviceCharge"
              value={formik.values.serviceCharge}
              onChange={formik.handleChange}
              error={formik.touched.serviceCharge && Boolean(formik.errors.serviceCharge)}
              helperText={formik.touched.serviceCharge && formik.errors.serviceCharge}
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

export default Vastu
