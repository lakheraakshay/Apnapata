import React from "react";
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Grid,
  makeStyles,
  Button,
  Typography,
  TextField,
  Hidden
} from "@material-ui/core";
import { getUserProfile } from '../../api/auth'
import Message from '../../components/Message'
import bg from "../../assets/profile/profilebg.png";
import stockImg from "../../assets/profile/stock.png";
import * as yup from 'yup'
import { updateUserProfile } from "../../api/auth";
import { uploadPhoto } from "../../api/media";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    "& button": {
      color: "#fff",
      borderRadius: 0
    },
    "& > :not(.active)": {
      background: "none",
      color: "#000",
      boxShadow: "none"
    }
  },
  card: {
    padding: 40,
    background: "#fff",
    marginRight: 30,
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("md")]: {
      marginRight: 0
    },

    "& .edit-btn": {
      marginTop: 30,
      alignSelf: "center",
      color: "#fff",
      padding: "5px 50px"
    }
  },
  icon: {
    width: 175,
    height: 175,
    borderRadius: "50%",
    overflow: "hidden"
  },
  details: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    "& .detail": {
      display: "flex",
      alignItems: "center",
      paddingBottom: 10,
      "& .title": {
        width: "100%",
        color: "#808080"
      }
    }
  },
  textField: {
    width: "100%",
    background: "#F6F6F6"
  },
  uploads: {
    margin: "20px 0 30px",
    display: "flex",
    flexDirection: "column",
    gap: 30,
    "& > div": {
      display: "flex",
      alignItems: "center"
    },
    "& .title": {
      width: "50%",
      color: "#808080"
    },
    "& label": {
      width: 150,
      height: 150,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "5rem",
      color: "#9A9A9A",
      background: "#F7F7F7",
      borderRadius: 20,
      cursor: "pointer"
    }
  },
  image: {
    marginTop: "40%"
  }
}));

const details = [
  { title: "Name", name: "name" },
  { title: "Office Name", name: "officeName" },
  { title: "Phone Number", name: "phoneNumber" },
  { title: "Whatsapp Number", name: "whatsappNumber" },
  { title: "Address", name: "address" },
  { title: "Email ID", name: "email" },
  { title: "PAN Number", name: "panNumber" },
  { title: "Aadhar Number", name: "aadharNumber" },
  { title: "GST Number", name: "gstNumber" }
];

const validation = yup.object({
  name: yup.string().required('Name is required.').trim(),
  officeName: yup.string().required('Office Name is required.').trim(),
  phoneNumber: yup
    .string()
    .required('Phone Number is required.')
    .length(10, 'Phone Number must be of 10 digit.')
    .trim(),
  whatsappNumber: yup
    .string()
    .required('WhatsApp Number is required.')
    .length(10, 'WhatsApp Number must be of 10 digit.')
    .trim(),
  address: yup
    .string()
    .required('Address is required.')
    .min(10, 'Address must contain 10 characters.')
    .trim(),
  email: yup
    .string()
    .required('Email is required.')
    .email('Email must be a valid email address.')
    .trim(),
  panNumber: yup
    .string()
    .required('PAN Number is required.')
    .length(10, 'PAN Number must have a length of 10.')
    .uppercase('Alphabets must be in Capital Letters.')
    .matches('[A-Z]{5}[0-9]{4}[A-Z]{1}', 'Enter a valid PAN Number.')
    .trim(),
  aadharNumber: yup
    .string()
    .required('Aadhar Number is required.')
    .length(14, 'Aadhar number must have 12 digits with 2 spaces as provided in Aadhar Card.')
    .matches('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$', 'Enter a valid Aadhar Number.'),
  gstNumber: yup
    .string()
    .required('GST Number is required.')
    .length(15, 'GST Number must have a length of 15.')
    .uppercase('Alphabets must be in Capital Letters.')
    .matches('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$', 'Enter a valid GST Number.')
    .trim()
})

export default function ProfileEdit() {

  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false)
  const [profile, setProfile] = React.useState(null)
  const [message, setMessage] = React.useState('')
  const [officeImage, setOfficeImage] = React.useState(null)
  const [aadharImage, setAadharImage] = React.useState(null)
  const [panImage, setPanImage] = React.useState(null)



  React.useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await getUserProfile()
        console.log(response.data.data)
        setProfile(response.data.data)
      } catch (error) {
        setMessage(error.message)
      }
    }

    getProfileData()
  }, [])

  React.useEffect(() => {
    if (profile?.office_img[0]) setOfficeImage(profile.office_img[0])
    if (profile?.adhaar_img[0]) setAadharImage(profile.adhaar_img[0])
    if (profile?.pan_img[0]) setPanImage(profile.pan_img[0])
  }, [profile])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile?.name ? profile?.name : '',
      officeName: profile?.office_name ? profile.office_name : '',
      phoneNumber: profile?.phonenumber ? profile.phonenumber : '',
      whatsappNumber: profile?.whatsapp_no ? profile.whatsapp_no : '',
      address: profile?.address ? profile.address : '',
      email: profile?.email ? profile.email : '',
      panNumber: profile?.pan_no ? profile.pan_no : '',
      aadharNumber: profile?.adhaar_no ? profile.adhaar_no : '',
      gstNumber: profile?.gst_no ? profile.gst_no : '',
    },
    validationSchema: validation,
    onSubmit: async values => {
      setLoading(true)
      const body = {
        name: values.name,
        office_name: values.officeName,
        phonenumber: values.phoneNumber,
        whatsapp_no: values.whatsappNumber,
        address: values.address,
        email: values.email,
        pan_no: values.panNumber,
        adhaar_no: values.aadharNumber,
        gst_no: values.gstNumber
      }

      if (officeImage === null && aadharImage === null && panImage === null) updateUserProfile(body)

      uploadOfficeImage(body)
    }
  })

  const uploadOfficeImage = async body => {
    if (typeof officeImage === 'object') {
      const formData = new FormData()
      formData.append('foldername', 'office')
      formData.append('photos', officeImage)

      try {
        const response = await uploadPhoto(formData)
        body['office_img'] = response.data.images
        uploadAadharImage(body)
      } catch (error) {
        setMessage(error.message)
      }
    } else {
      uploadAadharImage(body)
    }
  }

  const uploadAadharImage = async body => {
    if (typeof aadharImage === 'object') {
      const formData = new FormData()
      formData.append('foldername', 'aadhar')
      formData.append('photos', aadharImage)

      try {
        const response = await uploadPhoto(formData)
        body['adhaar_img'] = response.data.images
        uploadPanImage(body)
      } catch (error) {
        setMessage(error.message)
      }
    } else {
      uploadPanImage(body)
    }
  }

  const uploadPanImage = async body => {
    if (typeof panImage === 'object') {
      const formData = new FormData()
      formData.append('foldername', 'pan')
      formData.append('photos', panImage)

      try {
        const response = await uploadPhoto(formData)
        body['pan_img'] = response.data.images
        editProfile(body)
      } catch (error) {
        setMessage(error.message)
      }
    } else {
      editProfile(body)
    }
  }

  const editProfile = async body => {
    try {
      const response = await updateUserProfile(body)
      history.push('/profile')
    } catch (error) {
      setMessage(error.message)
    }
    setLoading(false)
  }

  return (
    <Container maxWidth="lg" component="main">
      {message && <Message message={message} />}
      <Grid container>
        <Grid item md={8} xs={12}>
          <div className={classes.buttons}>
            <Button variant="contained" className="active">
              Personal Details
            </Button>
            <Button variant="contained">Office Details</Button>
          </div>
          <div className={classes.card}>
            <div className={classes.icon}>
              <img src={stockImg} alt="profile icon" />
            </div>
            <div className={classes.details}>
              {details.map((detail, i) => (
                <div className="detail" key={i}>
                  <Typography variant="h6" className="title">
                    {detail.title}
                  </Typography>
                  <TextField
                    id={detail.name}
                    name={detail.name}
                    variant="outlined"
                    className={classes.textField}
                    value={formik.values[detail.name]}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors[detail.name])}
                    helperText={formik.errors[detail.name]}
                  />
                  
                </div>
              ))}
              <div className={classes.uploads}>
                <div className="office">
                  <Typography variant="h6" className="title">
                    Upload Office Image
                  </Typography>
                  {
                    officeImage !== null ? (
                      <img
                        src={typeof officeImage === 'object' ? URL.createObjectURL(officeImage) : officeImage}
                        alt='Office'
                        height='150px'
                        style={{
                          width: '150px',
                          objectFit: 'cover',
                          borderRadius: '20px'
                        }}
                        onClick={() => setOfficeImage(null)}
                      />
                    ) : (
                      <>
                        <label htmlFor="officeImage">+</label>
                        <input
                          type="file"
                          id="officeImage"
                          accept=".png,.jpg,.jpeg"
                          style={{ display: "none" }}
                          onChange={e => setOfficeImage(e.target.files[0])}
                        />
                      </>
                    )
                  }
                </div>
                <div className="aadhar">
                  <Typography variant="h6" className="title">
                    Upload Aadhar Image
                  </Typography>
                  {
                    aadharImage !== null ? (
                      <img
                        src={typeof aadharImage === 'object' ? URL.createObjectURL(aadharImage) : aadharImage}
                        alt='Aadhar'
                        height='150'
                        style={{
                          width: '150px',
                          objectFit: 'cover',
                          borderRadius: '20px'
                        }}
                        onClick={() => setAadharImage(null)}
                      />
                    ) : (
                      <>
                        <label htmlFor="aadhar-image">+</label>
                        <input
                          type="file"
                          id="aadhar-image"
                          accept=".png,.jpg,.jpeg"
                          style={{ display: "none" }}
                          onChange={e => setAadharImage(e.target.files[0])}
                        />
                      </>
                    )
                  }
                </div>
                <div className="pan">
                  <Typography variant="h6" className="title">
                    Upload PAN Image
                  </Typography>
                  {
                    panImage !== null ? (
                      <img
                        src={typeof panImage === 'object' ? URL.createObjectURL(panImage) : panImage}
                        alt='PAN'
                        height='150'
                        style={{
                          width: '150px',
                          objectFit: 'cover',
                          borderRadius: '20px'
                        }}
                        onClick={() => setPanImage(null)}
                      />
                    ) : (
                        <>
                          <label htmlFor="pan-image">+</label>
                          <input
                            type="file"
                            id="pan-image"
                            accept=".png,.jpg,.jpeg"
                            style={{ display: "none" }}
                            onChange={e => setPanImage(e.target.files[0])}
                          />
                        </>
                    )
                  }
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Typography variant="body2" style={{ fontWeight: 400 }}>
                I, {profile?.name} from office {profile?.office_name}, certify that all
                the details are filled by me and all of them are true.
              </Typography>
            </div>
            {
              loading ? (
                <CircularProgress
                  sx={{
                    color: '#DA8E3B',
                    margin: '10px auto',
                  }}
                />
              ) : (
                  <Button variant="contained" className="edit-btn" onClick={formik.handleSubmit}>
                    Save
                  </Button>
              )
            }
          </div>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={4}>
            <div className={classes.image}>
              <img src={bg} alt="house" />
            </div>
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
}
