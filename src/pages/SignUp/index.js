import React from "react";
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";

import OtpInput from "react-otp-input";

import bg from "../../assets/log-in/loginbg.svg";
import {
  signup,
  sendOtpToPhoneNumber,
  verifyPhoneNumber as verifyPhoneNumberOtp,
  userExists,
} from "../../store/reducers/auth-slice";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingBottom: 0,
    paddingTop: 0,

    [theme.breakpoints.down("md")]: {
      height: "auto",
      paddingBottom: theme.spacing(2),
    },
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
    alignItems: "center",
    gap: 20,
    "& label": {
      width: "100%",
    },
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
}));

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Required";
  else if (values.name.length < 3)
    errors.name = "Must be at least 3 characters";

  if (!values.phone.trim()) errors.phone = "Required";
  else if (values.phone.length > 10) errors.phone = "Must be at most 10 digits";

  if (!values.email.trim()) errors.email = "Required";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = "Invalid email address";

  if (!values.password.trim()) errors.password = "Required";
  else if (values.password.length < 8)
    errors.password = "Must be at least 8 characters";

  return errors;
}

export default function SignUp() {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const classes = useStyles();
  const history = useHistory();
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [verifyPhoneNumber, setVerifyPhoneNumber] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [phonenumber, setPhoneNumber] = React.useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const response = await dispatch(
        signup({
          name: values.name,
          email: values.email,
          phonenumber: values.phone,
          password: values.password,
        })
      );
      console.log("response from signup", response);
      if (response.type === "auth/signup/fulfilled") {
        setVerifyPhoneNumber(true);
        setPhoneNumber(values.phone);
        const response = await dispatch(
          sendOtpToPhoneNumber({
            phonenumber: values.phone,
          })
        );
        console.log("otp response", response);
      }
    },
  });

  const handleVefiryOtp = async (values) => {
    const response = await dispatch(
      verifyPhoneNumberOtp({
        phonenumber,
        code: values.code,
      })
    );
    if (response.type === "auth/verifyPhoneNumber/fulfilled") {
      history.push("/");
    }
  };

  const handleCheckEmail = async (value) => {
    if (emailRegex.test(value)) {
      const response = await dispatch(
        userExists({
          username: value,
        })
      );

      if (response.type === "auth/userExists/fulfilled") {
        if (response.payload.data.UserExist === true) {
          formik.setFieldError("email", "Email already exists");
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
              Register Your Account
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

                {!verifyPhoneNumber ? (
                  <>
                    <div className={classes.formGroup}>
                      <label htmlFor="name">Name</label>
                      <TextField
                        variant="outlined"
                        placeholder="Enter your name"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                        helperText={formik.errors.name}
                      />
                    </div>
                    <div className={classes.formGroup}>
                      <label htmlFor="email">Email</label>
                      <TextField
                        variant="outlined"
                        placeholder="Enter your email address"
                        id="email"
                        name="email"
                        onChange={(e) => {
                          formik.handleChange(e);
                          handleCheckEmail(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.errors.email}
                      />
                    </div>
                    <div className={classes.formGroup}>
                      <label htmlFor="phone">Phone</label>
                      <TextField
                        variant="outlined"
                        placeholder="Enter your phone number"
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        error={formik.touched.phone && formik.errors.phone}
                        helperText={formik.errors.phone}
                      />
                    </div>
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
                        error={
                          formik.touched.password && formik.errors.password
                        }
                        helperText={formik.errors.password}
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ marginTop: 10 }}
                      onClick={formik.handleSubmit}
                    >
                      Send OTP
                    </Button>
                    <Typography variant="body1" style={{ alignSelf: "center" }}>
                      Already have an account?&nbsp;
                      <Link
                        to="/login"
                        style={{
                          color: "#000",
                          borderBottom: "2px solid #000",
                        }}
                      >
                        Login
                      </Link>
                    </Typography>
                  </>
                ) : (
                  <div>
                    <Typography variant="h3" className={classes.subheading}>
                      {" "}
                      Verify OTP
                    </Typography>
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
                    <Button
                      variant="contained"
                      style={{ marginTop: 10 }}
                      onClick={() =>
                        handleVefiryOtp({ code: otp, phone: phonenumber })
                      }
                    >
                      Verify And Register
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
