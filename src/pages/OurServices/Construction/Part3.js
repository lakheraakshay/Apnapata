import React from "react";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import globalStyles from "../../../components/GlobalStyles/ServicesStyles";
import { servicesActions } from "../../../store/reducers/services-slice";

const validationSchema = yup.object({
  details1: yup.string().required("This field required"),
  details2: yup.string().required("This field required")
});

export default function Part3({ setPart }) {
  const classes = globalStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      details1: "",
      details2: ""
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      dispatch(servicesActions.update(values));
      setPart(4);
    }
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      {/* <h3>Part - III</h3> */}
      <div className={classes.formGroup}>
        <label htmlFor="details1">Details</label>
        <TextField
          variant="outlined"
          multiline
          id="details1"
          name="details1"
          value={formik.values.details1}
          onChange={formik.handleChange}
          error={formik.touched.details1 && Boolean(formik.errors.details1)}
          helperText={formik.touched.details1 && formik.errors.details1}
        />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="details2">Details</label>
        <TextField
          variant="outlined"
          multiline
          id="details2"
          name="details2"
          value={formik.values.details2}
          onChange={formik.handleChange}
          error={formik.touched.details2 && Boolean(formik.errors.details2)}
          helperText={formik.touched.details2 && formik.errors.details2}
        />
      </div>
      {/* <div className={classes.formGroup}>
        <h3 className={classes.bigLabel}>Upload Pictures/Videos</h3>
        <div className={classes.photos}>
          {new Array(3).fill("").map((_, i) => (
            <React.Fragment key={i}>
              <label htmlFor={"photo" + i} className="photo">
                +
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
      <Button type="submit" variant="contained" className={classes.button}>
        Save &amp; Next
      </Button>
    </form>
  );
}
