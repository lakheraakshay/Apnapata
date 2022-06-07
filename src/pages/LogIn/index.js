import React, { useEffect, useState } from "react";
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  loginWithEmail,
  loginWithPhoneNumber,
  sendOtpToPhoneNumber,
  sendOtpToEmail,
  registerForService,
} from "../../store/reducers/auth-slice";
import bg from "../../assets/log-in/loginbg.svg";

import OtpInput from "react-otp-input";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingBottom: 0,
    paddingTop: 0,
  },
  leftPanel: {
    paddingRight: "3rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 5,

    [theme.breakpoints.down("md")]: {
      height: "20%",
    },

    "& .content": {
      height: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
  },
  heading: {
    color: "#684826",
    fontSize: "3rem",
  },
  subheading: {
    color: "#684826",
    fontWeight: 600,
  },
  description: {
    fontSize: "0.9rem",
    marginTop: 20,
  },
  image: {
    height: "50%",
    display: "flex",
    "& img": {
      alignSelf: "flex-end",
    },
  },
  card: {
    borderRadius: 21,
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.25)",
  },
  form: {
    height: "100%",
    padding: "10px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  otp: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    "& label": {
      width: "100%",
    },
  },
  method: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 40,
    "& label": {
      marginRight: 5,
    },
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },

  message: {
    color: "green",
    fontSize: "0.9rem",
  },
}));

function validate(values) {
  const errors = {};
  if (!values.emailOrPhone.trim()) errors.emailOrPhone = "Required";
  else {
    if (!isNaN(values.emailOrPhone.slice(0, 1))) {
      if (values.emailOrPhone.length !== 10)
        errors.emailOrPhone = "Invalid Phone Number";
      else if (!/^[0-9]+$/.test(values.emailOrPhone))
        errors.emailOrPhone = "Invalid Phone Number";
    } else {
      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailOrPhone)
      )
        errors.emailOrPhone = "Invalid email address";
    }
  }

  if (!values.password.trim()) errors.password = "Required";
  else if (values.password.length < 8)
    errors.password = "Must be at least 8 characters";

  return errors;
}

export default function LogIn() {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const classes = useStyles();
  const [via, setVia] = useState("pass");
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, message } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const [resendOtpLink, setResendOtpLink] = useState(false);

  const formik = useFormik({
    initialValues: {
      emailOrPhone: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      if (via === "pass") {
        if (emailRegex.test(values.emailOrPhone)) {
          const response = await dispatch(
            loginWithEmail({
              username: values.emailOrPhone,
              password: values.password,
            })
          );
          if (response.type === "auth/loginWithEmail/rejected") {
            formik.setFieldError("emailOrPhone", response.payload);
          }
          if (response.type === "auth/loginWithEmail/fulfilled") {
            history.push("/");
          }
        } else {
          const response = await dispatch(
            loginWithPhoneNumber({
              username: values.emailOrPhone,
              password: values.password,
            })
          );
          if (response.type === "auth/loginWithPhoneNumber/rejected") {
            formik.setFieldError("emailOrPhone", response.payload);
          }
          if (response.type === "auth/loginWithPhoneNumber/fulfilled") {
            history.push("/");
          }
        }
      } else {
        if (emailRegex.test(values.emailOrPhone)) {
          const response = await dispatch(
            loginWithEmail({
              username: values.emailOrPhone,
              code: otp,
            })
          );
          setResendOtpLink(false);
          if (response.type === "auth/loginWithEmail/rejected") {
            setOtp("");
            setResendOtpLink(true);
          }
          if (response.type === "auth/loginWithEmail/fulfilled") {
            history.push("/");
          }
        } else {
          const response = await dispatch(
            loginWithPhoneNumber({
              username: values.emailOrPhone,
              code: otp,
            })
          );
          setResendOtpLink(false);
          if (response.type === "auth/loginWithPhoneNumber/rejected") {
            setOtp("");
            setResendOtpLink(true);
          }
          if (response.type === "auth/loginWithPhoneNumber/fulfilled") {
            history.push("/");
          }
        }
      }
      // if (response.type === "auth/login/fulfilled") history.push("/");
    },
  });

  const handleSetVia = async (via) => {
    setVia(via);
    if (via === "otp") {
      if (!isNaN(formik.values.emailOrPhone.slice(0, 1))) {
        if (formik.values.emailOrPhone.length === 10) {
          const response = await dispatch(
            sendOtpToPhoneNumber({
              phonenumber: formik.values.emailOrPhone,
            })
          );
        }
      } else {
        if (emailRegex.test(formik.values.emailOrPhone)) {
          console.log('hello')
          const response = await dispatch(
            sendOtpToEmail({
              mail: formik.values.emailOrPhone,
            })
          );
        }
      }
    }
  };

  const handleSendOtp = async (value) => {
    if (via === "otp") {
      // firt character is number
      if (!isNaN(value.slice(0, 1))) {
        if (value.length === 10 && !isNaN(value)) {
          const response = await dispatch(
            sendOtpToPhoneNumber({
              phonenumber: value,
            })
          );
        }
      } else {
        if (emailRegex.test(value)) {
          const response = await dispatch(
            sendOtpToEmail({
              mail: value,
            })
          );
          console.log("res: ", response);
        }
      }
    }
  };

  return (
    <Container maxWidth="lg" component="main" className={classes.container}>
      <Grid container style={{ height: "100%" }}>
        <Grid item md={7} sm={12} className={classes.leftPanel}>
          <div className="content">
            <Typography variant="h1" className={classes.heading}>
              Welcome
            </Typography>
            <Typography variant="h3" className={classes.subheading}>
              Login your Account
            </Typography>
            {/* <p className={classes.description}>
              lipsum as it is sometimes known, is dummy text used in laying out
              print, graphic or web designs. The passage is attributed to an
              unknown typesetter in the 15th century who is thought to have
              scrambled parts of Cicero's De Finibus Bonorum et Malorum for use
              in a type specimen book.
            </p> */}
          </div>
          <div className={classes.image}>
            <img src={bg} alt="houses" />
          </div>
        </Grid>
        <Grid
          item
          container
          md={5}
          sm={12}
          direction="column"
          justifyContent="center"
        >
          <Card className={classes.card}>
            <CardContent>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                {error && <div className={classes.error}>{error}</div>}
                {message && <div className={classes.message}>{message}</div>}
                <div className={classes.formGroup}>
                  <label htmlFor="emailOrPhone">Email / Phone</label>
                  <TextField
                    variant="outlined"
                    placeholder="Enter"
                    id="emailOrPhone"
                    name="emailOrPhone"
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleSendOtp(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.emailOrPhone}
                    error={
                      formik.touched.emailOrPhone && formik.errors.emailOrPhone
                    }
                    helperText={formik.errors.emailOrPhone}
                  />
                </div>
                <div className={`${classes.formGroup} ${classes.method}`}>
                  <div className="via-pass">
                    <label htmlFor="via-pass">Via Password</label>
                    <input
                      type="radio"
                      name="method"
                      id="via-pass"
                      onChange={() => handleSetVia("pass")}
                      checked={via === "pass"}
                    />
                  </div>
                  <div className="via-otp">
                    <label htmlFor="via-otp">Via OTP</label>
                    <input
                      type="radio"
                      name="method"
                      id="via-otp"
                      onChange={() => handleSetVia("otp")}
                      checked={via === "otp"}
                    />
                  </div>
                </div>
                {via === "pass" ? (
                  <div className={classes.formGroup}>
                    <label htmlFor="password">Password</label>
                    <TextField
                      variant="outlined"
                      placeholder="Enter your password"
                      id="password"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      error={formik.touched.password && formik.errors.password}
                      helperText={formik.errors.password}
                    />
                  </div>
                ) : (
                  <div className={classes.otp}>
                    <Box display="flex" justifyContent="space-between">
                      <label htmlFor="otp" style={{ width: "auto" }}>
                        Verify your OTP
                      </label>
                      {resendOtpLink && (
                        <Link
                          to=""
                          onClick={() =>
                            handleSendOtp(formik.values.emailOrPhone)
                          }
                        >
                          Resend OTP
                        </Link>
                      )}
                    </Box>
                    <OtpInput
                      numInputs={4}
                      value={otp}
                      onChange={(otp) => setOtp(otp)}
                      separator={<span></span>}
                      inputStyle={{
                        width: "3rem",
                        height: "3rem",
                        margin: "0 1rem",
                        fontSize: "2rem",
                        borderRadius: 4,
                        border: "1px solid rgba(0,0,0,0.3)",
                      }}
                    />
                  </div>
                )}
                <Button
                  variant="contained"
                  style={{ marginTop: 10 }}
                  type="submit"
                >
                  Login
                </Button>
                <Typography variant="body1" style={{ alignSelf: "center" }}>
                  Don't have an account?&nbsp;
                  <Link
                    to="/signup"
                    style={{ color: "#000", borderBottom: "2px solid #000" }}
                  >
                    Signup
                  </Link>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
