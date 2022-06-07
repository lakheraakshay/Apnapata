import React from "react";
import {
  makeStyles,
  Button,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { postPropertyActions } from "../../store/reducers/property-slice";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import img1 from "../../assets/post-property/image 1.png";
import img2 from "../../assets/post-property/image 2.png";
import img3 from "../../assets/post-property/image 3.png";
import img4 from "../../assets/post-property/image 4.png";
import img5 from "../../assets/post-property/image 5.png";
import img6 from "../../assets/post-property/image 6.png";
import img7 from "../../assets/post-property/image 7.png";
import img8 from "../../assets/post-property/image 8.png";
import img9 from "../../assets/post-property/image 9.png";
import img10 from "../../assets/post-property/image 10.png";
import img11 from "../../assets/post-property/image 11.png";
import img12 from "../../assets/post-property/image 12.png";
import Checkbox from "../../components/Checkbox";

const useStyles = makeStyles({
  pics: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    "& img": {
      width: 100,
    },
    "& li": {
      margin: "auto",
    },
  },
});

// const amenities = [
//   { title: img1, value: "lift" },
//   { title: img2, value: "swimming" },
//   { title: img3, value: "security" },
//   { title: img4, value: "dining" },
//   { title: img5, value: "badminton" },
//   { title: img6, value: "park" }
// ];
// const nearby = [
//   { title: img7, value: "shop" },
//   { title: img8, value: "busStand" },
//   { title: img9, value: "airport" },
//   { title: img10, value: "houses" },
//   { title: img11, value: "railwayStation" },
//   { title: img12, value: "petrolPump" }
// ];

export default function Facilities() {
  const classes = { ...globalStyles(), ...useStyles() };

  const dispatch = useDispatch();
  const history = useHistory();
  const propertyDetails = useSelector((state) => state.property);
  const { amenities, nearby } = useSelector((state) => state.property);
  const details = propertyDetails.values;

  // if (propertyDetails.values.next < 4 || !propertyDetails.values.next) {
  //   history.push("/postproperty")
  // }
  const formik = useFormik({
    initialValues: {
      amenities: details.amenities ? details.amenities : [],
      nearby: details.nearby ? details.nearby : [],
    },
    onSubmit: (values) => {
      dispatch(postPropertyActions.update({ ...values, next: 5 }));
      // alert(JSON.stringify(values, null, 2));
      history.push("/postproperty?page=plan");
    },
  });

  return (
    <>
      {/* <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        Facilities
      </Typography> */}
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.formGroupColumn}>
              <div className={classes.formGroupColumn}>
                <Typography variant="h2">Amenities</Typography>
                <ul className={`${classes.options} ${classes.pics}`}>
                  {amenities.map((item) => (
                    <Checkbox
                      key={item._id}
                      formikList={formik.values.amenities}
                      value={item._id}
                      title={item.name}
                      handleChange={formik.handleChange}
                      fieldName="amenities"
                    />
                  ))}
                </ul>
              </div>
              <div className={classes.formGroupColumn}>
                <Typography variant="h2">Nearby</Typography>
                <ul className={`${classes.options} ${classes.pics}`}>
                  {nearby.map((item) => (
                    <Checkbox
                      key={item._id}
                      formikList={formik.values.nearby}
                      value={item._id}
                      title={item.name}
                      handleChange={formik.handleChange}
                      fieldName="nearby"
                    />
                  ))}
                </ul>
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Save &amp; Next
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
