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
  {
    value: "Retail Store Deign Architect",
    title: "Retail Store Deign Architect",
  },
  { value: "Hospital Design Architects", title: "Hospital Design Architects" },
  { value: "Urban Designer", title: "Urban Designer" },
  { value: "Industrial Architect", title: "Industrial Architect" },
  {
    value: "Apartment/Society Architects",
    title: "Apartment/Society Architects",
  },
  { value: "Commercial Architects", title: "Commercial Architects" },
  { value: "Housing Architects", title: "Housing Architects" },
  { value: "Architect Valuers", title: "Architect Valuers" },
];
const serviceList = [
  { value: "3D Elevation Drawing", title: "3D Elevation Drawing" },
  { value: "2D Elevation Drawing", title: "2D Elevation Drawing" },
  { value: "Landscape Design", title: "Landscape Design" },
  { value: "Architectural Plan & Design", title: "Architectural Plan & Design" },
  { value: "Structural Design", title: "Structural Design" },
  { value: "Project plan & Supervision", title: "Project plan & Supervision" },
  { value: "Architectural Model", title: "Architectural Model" },
  {
    value: "Property Consultation Services",
    title: "Property Consultation Services",
  },
];

const validationSchema = yup.object({
  forArchitect: yup.string().required("For Architect is required"),
  architectService: yup.string().required("Architect Service is required"),
  workingExperience: yup.string().required("Working Experience is required"),
});

const Architect = ({ setShowForm }) => {
  const dispatch = useDispatch();
  const classes = globalStyles();
  const details = useSelector((state) => state.services.values);

  const formik = useFormik({
    initialValues: {
      forArchitect: details.forArchitect ? details.forArchitect : "",
      architectService: details.architectService
        ? details.architectService
        : "",
      workingExperience: details.workingExperience
        ? details.workingExperience
        : "",
    },
    validationSchema: validationSchema,
    onSubmit: ({
      forArchitect,
      architectService,
      workingExperience,
    }) => {
      const newDetails = {
        ...details,
        for: [forArchitect],
        services: [architectService],
        site_visit: siteVisit,
        online_service: onlineService,
        telephonic_service: telephonicService,
        workingExp: workingExperience,
        approvedByGovr: govtApproved,
      };
      console.log("New Details = ", newDetails);
      dispatch(servicesActions.update(newDetails));
      setShowForm('photos/videos')
    },
  });

  const [siteVisit, setSiteVisit] = useState(false);
  const [onlineService, setOnlineService] = useState(false);
  const [telephonicService, setTelephonicService] = useState(false);
  const [govtApproved, setGovtApproved] = useState(false);

  return (
    <Card className={classes.card}>
      <CardContent>
        <form className={classes.form}>
          {/* For architects */}
          <div className={classes.formGroupColumn}>
            <label>For architects -</label>
            <ul className={classes.options}>
              {architectList.map((item) => (
                <Radio
                  key={item.value}
                  formikName={formik.values.forArchitect}
                  value={item.value}
                  title={item.title}
                  fieldName="forArchitect"
                  handleChange={formik.handleChange}
                />
              ))}
            </ul>
            {formik.errors.forArchitect && (
              <p className={classes.errorMessage}>
                {formik.errors.forArchitect}
              </p>
            )}
          </div>

          {/* Services */}
          <div className={classes.formGroupColumn}>
            <label>Services -</label>
            <ul className={classes.options}>
              {serviceList.map((item) => (
                <Radio
                  key={item.value}
                  formikName={formik.values.architectService}
                  value={item.value}
                  title={item.title}
                  fieldName="architectService"
                  handleChange={formik.handleChange}
                />
              ))}
            </ul>
            {formik.errors.architectService && (
              <p className={classes.errorMessage}>
                {formik.errors.architectService}
              </p>
            )}
          </div>

          {/* Site Visit */}
          <div className={classes.formGroupColumn}>
            <label>Site visit -</label>
            <ul className={classes.options}>
              <li className={siteVisit ? "active" : ""}>
                <label htmlFor="siteYes">Yes</label>
                <input
                  id="siteYes"
                  checked={siteVisit}
                  type="radio"
                  onChange={() => setSiteVisit(true)}
                />
              </li>
              <li className={!siteVisit ? "active" : ""}>
                <label htmlFor="siteNo">No</label>
                <input
                  id="siteNo"
                  checked={!siteVisit}
                  type="radio"
                  onChange={() => setSiteVisit(false)}
                />
              </li>
            </ul>
          </div>

          {/* Online Service */}
          <div className={classes.formGroupColumn}>
            <label>Online Service -</label>
            <ul className={classes.options}>
              <li className={onlineService ? "active" : ""}>
                <label htmlFor="onlineYes">Yes</label>
                <input
                  id="onlineYes"
                  checked={onlineService}
                  type="radio"
                  title="Yes"
                  className="active"
                  onChange={() => setOnlineService(true)}
                />
              </li>
              <li className={!onlineService ? "active" : ""}>
                <label htmlFor="onlineNo">No</label>
                <input
                  id="onlineNo"
                  checked={!onlineService}
                  type="radio"
                  title="No"
                  onChange={() => setOnlineService(false)}
                />
              </li>
            </ul>
          </div>

          {/* Telephonic Service */}
          <div className={classes.formGroupColumn}>
            <label>Telephonic Service -</label>
            <ul className={classes.options}>
              <li className={telephonicService ? "active" : ""}>
                <label htmlFor="telephoneYes">Yes</label>
                <input
                  id="telephoneYes"
                  checked={telephonicService}
                  type="radio"
                  title="Yes"
                  className="active"
                  onChange={() => setTelephonicService(true)}
                />
              </li>
              <li className={!telephonicService ? "active" : ""}>
                <label htmlFor="telephoneNo">No</label>
                <input
                  id="telephoneNo"
                  checked={!telephonicService}
                  type="radio"
                  title="No"
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
              error={
                formik.touched.workingExperience &&
                Boolean(formik.errors.workingExperience)
              }
              helperText={
                formik.touched.workingExperience &&
                formik.errors.workingExperience
              }
            />
          </div>

          {/* Approved by govt authority */}
          <div className={classes.formGroupColumn}>
            <label>Approved by Govt. authority -</label>
            <ul className={classes.options}>
              <li className={govtApproved ? "active" : ""}>
                <label htmlFor="govtYes">Yes</label>
                <input
                  id="govtYes"
                  checked={govtApproved}
                  type="radio"
                  title="Yes"
                  className="active"
                  onChange={() => setGovtApproved(true)}
                />
              </li>
              <li className={!govtApproved ? "active" : ""}>
                <label htmlFor="govtNo">No</label>
                <input
                  id="govtNo"
                  checked={!govtApproved}
                  type="radio"
                  title="No"
                  onChange={() => setGovtApproved(false)}
                />
              </li>
            </ul>
          </div>

          <Button
            type="submit"
            variant="contained"
            className={classes.button}
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            Save &amp; Next
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Architect;
