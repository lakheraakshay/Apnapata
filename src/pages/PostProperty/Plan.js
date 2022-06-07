import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Typography, Card, CardContent } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toFile from "data-uri-to-file";
import {
  postPropertyActions,
  createProperty,
} from "../../store/reducers/property-slice";
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import Radio from "../../components/Radio";
import GroupedButton from "../../components/GroupedButton";
import LoginBackdrop from "../../components/LoginBackdrop";

const loanAvailableList = [
  { value: "yes", title: "Yes" },
  { value: "no", title: "No" },
];
const ownershipList = [
  { value: "Free Hold", title: "Free Hold" },
  { value: "Lease Hold", title: "Lease Hold" },
  { value: "Cooperative Society", title: "Cooperative Society" },
  { value: "Power of Attorney", title: "Power of Attorney" },
];
const paymentPlanList = [
  { value: "Time Link", title: "Time Link" },
  { value: "Construction Link", title: "Construction Link" },
  { value: "Possion Link", title: "Possion Link" },
  { value: "Fixed Time", title: "Fixed Time" },
];
const reraApprovalList = [
  { value: "yes1", title: "Yes" },
  { value: "no1", title: "No" },
];
export default function Plan() {
  // const [err, setErr] = useState({
  //   propertyRateErr: "",
  //   brokrageErr: "",
  //   bookingAmtErr: "",
  //   monthlyMainErr: "",
  //   fullPayErr: ""
  // });
  const [propertyRateErr, setPropertyRateErr] = useState("");
  const [brokrageErr, setBrokrageErr] = useState("");
  const [bookingAmtErr, setBookingAmtErr] = useState("");
  const [monthlyMainErr, setMonthlyMainErr] = useState("");
  const [fullPayErr, setFullPayErr] = useState("");
  const [units, setUnits] = useState({
    propertyRateUnit: "",
    brokerageUnit: "",
    bookingAmountUnit: "",
    monthlyMaintenanceUnit: "",
    fullPaymentTimeUnit: "",
  });
  const [openLogin, setOpenLogin] = useState(false);
  const classes = globalStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const propertyDetails = useSelector((state) => state.property);
  const details = propertyDetails.values;

  // if (propertyDetails.values.next < 4 || !propertyDetails.values.next) {
  //   history.push("/postproperty")
  // }

  const formik = useFormik({
    initialValues: {
      loanAvailable: details.loanAvailable ? details.loanvailable : "",
      ownership: details.ownership ? details.ownership : "",
      propertyRate: details.propertyRate
        ? details.propertyRate
        : { value: "", unit: "" },
      brokerage: details.brokerage
        ? details.brokerage
        : { value: "", unit: "" },
      bookingAmount: details.bookingAmount
        ? details.bookingAmount
        : { value: "", unit: "" },
      monthlyMaintenance: details.monthlyMaintenance
        ? details.monthlyMaintenance
        : { value: "", unit: "" },
      paymentPlan: details.paymentPlan ? details.paymentPlan : "",
      fullPaymentTime: details.fullPaymentTime
        ? details.fullPaymentTime
        : { value: "", unit: "" },
      reraApproval: details.reraApproval ? details.reraApproval : "",
    },
    onSubmit: async (values) => {
      //alert(JSON.stringify(values, null, 2));
      // dispatch(update(values));
      //const response = await dispatch(createProperty(propertyDetails));
      // if (response.type === "property/create/fulfilled") {
      //   alert("Property created");
      //   history.push("/");
      // }

      if (
        values.propertyRate.value &&
        values.brokerage.value &&
        values.bookingAmount.value &&
        values.monthlyMaintenance.value &&
        values.fullPaymentTime.value
      ) {
        // alert(JSON.stringify(values, null, 2));
        const modValues = {
          ...values,
          propertyRate: {
            value: parseFloat(values.propertyRate.value),
            unit: units.propertyRateUnit,
          },
          brokerage: {
            value: parseFloat(values.brokerage.value),
            unit: units.brokerageUnit,
          },
          bookingAmount: {
            value: parseFloat(values.bookingAmount.value),
            unit: units.bookingAmountUnit,
          },
          monthlyMaintenance: {
            value: parseFloat(values.monthlyMaintenance.value),
            unit: units.monthlyMaintenanceUnit,
          },
          loanAvailable: values.loanAvailable === "yes" ? true : false,
          reraApproval: values.reraApproval === "yes1" ? true : false,
          fullPaymentTime: {
            value: parseInt(values.fullPaymentTime.value),
            unit: units.fullPaymentTimeUnit,
          },
        };
        // dispatch(postPropertyActions.update({ ...modValues }));
        if (JSON.parse(localStorage.getItem("authTokens"))) {
          const photoFormData = new FormData();
          const videoFormData = new FormData();
          photoFormData.append("foldername", "properties");
          videoFormData.append("foldername", "properties");
          propertyDetails.values.photos.length > 0 &&
            propertyDetails.values.photos.forEach((photo) =>
              photoFormData.append("photos", photo)
            );
          propertyDetails.values.videos.length > 0 &&
            propertyDetails.values.videos.forEach((video) =>
              videoFormData.append("videos", video)
            );

          const cityId = await (async () => {
            if (!propertyDetails.forSubmit.city.data) {
              const temp = await fetch(
                "https://apnapata.herokuapp.com/api/v1/cities/create",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    country: propertyDetails.forSubmit.country.data,
                    name: propertyDetails.forSubmit.city.name,
                  }),
                }
              )
                .then((res) => res.json())
                .then((data) => data.data)
                .then((data) => data._id);
              return temp;
            } else {
              return "";
            }
          })();

          const townId = await (async () => {
            if (!propertyDetails.forSubmit.town.data) {
              const temp = await fetch(
                "https://apnapata.herokuapp.com/api/v1/towns/create",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    country: propertyDetails.forSubmit.country.data,
                    city: await cityId,
                    name: propertyDetails.forSubmit.town.name,
                  }),
                }
              )
                .then((res) => res.json())
                .then((data) => data.data)
                .then((data) => data._id);
              return temp;
            } else {
              return "";
            }
          })();

          const photoIds = await (async () => {
            if (details.photos.length > 0) {
              const temp = await fetch(
                "https://apnapata.herokuapp.com/api/v1/upload/images",
                {
                  method: "POST",
                  body: photoFormData,
                }
              )
                .then((res) => res.json())
                .then((data) => data.images);
              return temp;
            } else {
              return [];
            }
          })();
          const videoIds = await (async () => {
            if (details.videos.length > 0) {
              const temp = await fetch(
                "https://apnapata.herokuapp.com/api/v1/upload/videos",
                {
                  method: "POST",
                  body: videoFormData,
                }
              )
                .then((res) => res.json())
                .then((data) => data.videos);
              return temp;
            } else {
              return [];
            }
          })();

          const modData = {
            ...details.values,
            ...details,
            ...modValues,
            city: {
              data: propertyDetails.forSubmit.city.data
                ? propertyDetails.forSubmit.city.data
                : await cityId,
              name: propertyDetails.forSubmit.city.name,
            },
            country: propertyDetails.forSubmit.country,
            town: {
              data: propertyDetails.forSubmit.town.data
                ? propertyDetails.forSubmit.town.data
                : await townId,
              name: propertyDetails.forSubmit.town.name,
            },
            propertySubType: propertyDetails.forSubmit.propertySubType,
            photos: await photoIds,
            videos: await videoIds,
            amenities: details.amenities.map((value) => {
              return { _id: value };
            }),
            nearby: details.nearby.map((value) => {
              return { _id: value };
            }),
          };
          console.log(modData);

          const response = await dispatch(createProperty({ ...modData }));

          console.log("Res; ", response);
          if (response.type === "property/create/fulfilled") {
            alert("Property created");
            history.push("/");
          }
        }
        // if (values.propertyRate.value === "") {
        //   setErr( { ...err,propertyRateErr: "*required" });
        // }
        if (values.propertyRate.value === "") {
          setPropertyRateErr("*required");
        }
        if (values.brokerage.value === "") {
          setBrokrageErr("*required");
        }
        if (values.bookingAmount.value === "") {
          setBookingAmtErr("*required");
        }
        if (values.monthlyMaintenance.value === "") {
          setMonthlyMainErr("*required");
        }
        if (values.fullPaymentTime.value === "") {
          setFullPayErr("*required");
        } else {
          setOpenLogin(true);
        }
      }
    },
  });

  const handleUnitChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "propertyRate.unit":
        setUnits({ ...units, propertyRateUnit: value });
        break;
      case "brokerage.unit":
        setUnits({ ...units, brokerageUnit: value });
        break;
      case "bookingAmount.unit":
        setUnits({ ...units, bookingAmountUnit: value });
        break;
      case "monthlyMaintenance.unit":
        setUnits({ ...units, monthlyMaintenanceUnit: value });
        break;
      default:
        setUnits({ ...units, fullPaymentTimeUnit: value });
    }
  };

  const setOpen = (v) => {
    setOpenLogin(v);
  };

  return (
    <>
      {/* <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        Rate/Payment Plan
      </Typography> */}
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <div className={classes.formGroup}>
              <label>Bank Loan Available</label>
              <ul className={classes.options}>
                {loanAvailableList.map((item, i) => (
                  <Radio
                    key={i}
                    formikName={formik.values.loanAvailable}
                    value={item.value}
                    title={item.title}
                    handleChange={formik.handleChange}
                    fieldName="loanAvailable"
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroupColumn}>
              <label>Ownership</label>
              <ul className={classes.options}>
                {ownershipList.map((item, i) => (
                  <Radio
                    key={i}
                    formikName={formik.values.ownership}
                    value={item.value}
                    title={item.title}
                    handleChange={formik.handleChange}
                    fieldName="ownership"
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="rate">Property Rate</label>
              <GroupedButton
                values={["", "₹", "$"]}
                inputId="rate"
                inputName="propertyRate.value"
                selectName="propertyRate.unit"
                handleChange={formik.handleChange}
                error={propertyRateErr}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="brokerage">Brokerage</label>
              <GroupedButton
                values={["", "₹", "$"]}
                inputId="brokerage"
                inputName="brokerage.value"
                selectName="brokerage.unit"
                handleChange={formik.handleChange}
                error={brokrageErr}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="b-amount">Advance/booking amount</label>
              <GroupedButton
                values={["", "₹", "$"]}
                inputId="b-amount"
                inputName="bookingAmount.value"
                selectName="bookingAmount.unit"
                handleChange={formik.handleChange}
                error={bookingAmtErr}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="mm">Monthly Maintenance</label>
              <GroupedButton
                values={["", "₹", "$"]}
                inputId="mm"
                inputName="monthlyMaintenance.value"
                selectName="monthlyMaintenance.unit"
                handleChange={formik.handleChange}
                error={monthlyMainErr}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroupColumn}>
              <label>Payment Plan</label>
              <ul className={classes.options}>
                {paymentPlanList.map((item, i) => (
                  <Radio
                    key={i}
                    formikName={formik.values.paymentPlan}
                    value={item.value}
                    title={item.title}
                    handleChange={formik.handleChange}
                    fieldName="paymentPlan"
                  />
                ))}
              </ul>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="full-payment">Full Payment Plan</label>
              <GroupedButton
                values={["", "days", "months", "years"]}
                inputId="full-payment"
                inputName="fullPaymentTime.value"
                selectName="fullPaymentTime.unit"
                handleChange={formik.handleChange}
                error={fullPayErr}
                handleUnitChange={handleUnitChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label>Rera approval</label>
              <ul className={classes.options}>
                {reraApprovalList.map((item, i) => (
                  <Radio
                    key={i}
                    formikName={formik.values.reraApproval}
                    value={item.value}
                    title={item.title}
                    handleChange={formik.handleChange}
                    fieldName="reraApproval"
                  />
                ))}
              </ul>
            </div>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <LoginBackdrop open={openLogin} setOpen={setOpen} />
    </>
  );
}
