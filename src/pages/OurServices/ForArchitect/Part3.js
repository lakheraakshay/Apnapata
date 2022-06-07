import React from "react";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import globalStyles from "../../../components//GlobalStyles/ServicesStyles";
import { servicesActions } from "../../../store/reducers/services-slice";

const validationSchema = yup.object({
  details: yup.string().required("This Field is required")
});

export default function Part3({ setPart }) {
  const classes = globalStyles();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      details: ""
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      dispatch(servicesActions.update(values));
      setPart(4)
    }
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <div className={classes.formGroup}>
        <label htmlFor="details">Details</label>
        <TextField
          variant="outlined"
          id="details"
          name="details"
          value={formik.values.details}
          onChange={formik.handleChange}
          error={formik.touched.details && Boolean(formik.errors.details)}
          helperText={formik.touched.details && formik.errors.details}
        />
      </div>
      <div className={classes.formGroup}>
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
      </div>
      <Button type="submit" variant="contained" className={classes.button}>
        Save &amp; Next
      </Button>
    </form>
  );
}
