import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { servicesActions } from "../../store/reducers/services-slice";
import Radio from "../../components/Radio";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";

export const architectList = [
  { value: "Home", title: "Home" },
  { value: "Retail Store", title: "Retail Store" },
  { value: "Hospital", title: "Hospital" },
  { value: "Front Elevation", title: "Front Elevation" },
  { value: "Industrial", title: "Industrial" },
  { value: 'Office', title: 'Office' },
  { value: 'Apartment/Society', title: 'Apartment/Society' },
  { value: 'Commercial Architects', title: 'Commercial Architects' },
  { value: 'School Designer', title: 'School Designer' },
  { value: 'Kitchen', title: 'Kitchen' },
  { value: 'Project Plan & Supervision', title: 'Project Plan & Supervision' }
];

const validationSchema = yup.object({
  for: yup.string().required('For is required.'),
  workingExperience: yup.string().required('Working Experience is required.'),
});

const InterDesigner = ({ setShowForm }) => {

  const dispatch = useDispatch();
  const classes = globalStyles();
  const details = useSelector((state) => state.services.values);
  const [siteVisit, setSiteVisit] = useState(false)
  const [onlineService, setOnlineService] = useState(false)
  const [telephonicService, setTelephonicService] = useState(false)
  const [govtApproval, setGovtApproval] = useState(false)

  const formik = useFormik({
    initialValues: {
      for: details.for ? details.for : '',
      workingExperience: details.workingExperience ? details.workingExperience : '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const newDetails = {
        ...details,
        for: [values.for],
        site_visit: siteVisit,
        online_service: onlineService,
        telephonic_service: telephonicService,
        workingExp: values.workingExperience,
        approvedByGovr: govtApproval,
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
            <label>For -</label>
            <ul className={classes.options}>
              {architectList.map((item, i) => (
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
            {
              formik.errors.for && (
                <p className={classes.errorMessage}>{formik.errors.for}</p>
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

export default InterDesigner
