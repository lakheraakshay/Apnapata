import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { uploadPhoto, uploadVideo } from '../../api/media'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createService } from '../../api/services'
import globalStyles from "../../components/GlobalStyles/PostPropStyles";
import PhotosComp from "../../components/Photos";
import { addTown } from "../../api/location";
import { servicesActions } from "../../store/reducers/services-slice";
import Message from "../../components/Message";

const useStyles = makeStyles({
  pics: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 15,
    "& label": {
      width: 100,
      height: 100,
      fontSize: "3.5rem",
      background: "#F7F7F7",
      color: "#9A9A9A",
      fontWeight: 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      cursor: "pointer"
    },
    "& input": {
      display: "none"
    },
    "& img": {
      width: 100,
      objectFit: "cover",
      objectPosition: "center",
      cursor: "pointer"
    },
    "& video": {
      width: "100%",
      objectFit: "cover",
      objectPosition: "center",
      cursor: "pointer"
    }
  }
});

export default function PhotosVideos() {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [details, setDetails] = useState('')
  const classes = { ...globalStyles(), ...useStyles() };
  const body = useSelector(state => state.services.values);
  console.log('Body: ', body)
  const history = useHistory();
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const [townUploadStatus, setTownUploadStatus] = useState('')
  const [photoUploadStatus, setPhotoUploadStatus] = useState('')
  const [videoUploadStatus, setVideoUploadStatus] = useState('')
  let uploadedPhotos = []
  let uploadedVideos = []

  const photoUpload = async () => {
    console.log('Photo Upload started!!')
    if (photos.length > 0) {
      const formData = new FormData()
      formData.append('foldername', 'services')
      photos.forEach(singlePhoto => {
        formData.append("photos", singlePhoto);
      })
      try {
        const response = await uploadPhoto(formData)
        setPhotoUploadStatus('Success')
        uploadedPhotos = response.data.images
        console.log(uploadedPhotos)
        const newValue = {
          ...body,
          photos: uploadedPhotos
        }
        dispatch(servicesActions.update(newValue))

      } catch (error) {
        setError(error.response.statusText)
      }
    } else {
      addService()
    }
  }

  const videoUpload = async () => {

    console.log('Video upload started!!')

    const formData = new FormData()
    formData.append('foldername', 'services')
    videos.forEach(singleVideo => {
      formData.append('videos', singleVideo)
    })
    try {
      const response = await uploadVideo(formData)
      setVideoUploadStatus('Success')
      uploadedVideos = response.data.videos
      console.log(uploadedVideos)
      const newValue = {
        ...body,
        videos: uploadedVideos
      }
      dispatch(servicesActions.update(newValue))
    } catch (error) {
      setError(error.response.statusText)
    }
  }

  useEffect(() => {

    if (townUploadStatus === 'Success' && photos.length > 0) {
      photoUpload()
    }

    if (townUploadStatus === 'Success' && photos.length === 0 && videos.length > 0) {
      videoUpload()
    }

    if (townUploadStatus === 'Success' && photos.length === 0 && videos.length === 0) {
      addService()
    }
  }, [townUploadStatus])

  useEffect(() => {
    if (photoUploadStatus === 'Success' && videos.length > 0) {
      videoUpload()
    }

    if (photoUploadStatus === 'Success' && videos.length === 0) {
      addService()
    }
  }, [photoUploadStatus])

  useEffect(() => {
    if (videoUploadStatus === 'Success') {
      addService()
    }
  }, [videoUploadStatus])

  const addService = async () => {
    // Add details field in body object
    const newBody = {
      ...body,
      details: details
    }

    try {
      const response = await createService(newBody)
      console.log(response)
      history.push('/')
    } catch (error) {
      console.log('Creation Error: ', error)
      setError(error.response.data.error.message)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(body.town)
    if (!body.town.data) {
      try {
        const response = await addTown({
          name: body.town.name,
          country: body.country.data,
          city: body.city.data
        })
        console.log(response.data.data)
        const newValue = {
          ...body,
          town: {
            name: response.data.data.name,
            data: response.data.data._id
          }
        }
        dispatch(servicesActions.update(newValue))
        setTownUploadStatus('Success')
      } catch (error) {
        setError(error.response.statusText)
      }
    } else {
      setTownUploadStatus('Success')
    }
  }

  return (
    <Card className={classes.card}>

      {error && <Message message={error} />}

      <CardContent>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.formGroupColumn}>
            <Typography variant="h2">Upload Pictures</Typography>
            <div className={classes.pics}>
              <PhotosComp photosArray={photos} setPhotos={setPhotos} />
            </div>
          </div>
          <div className={classes.formGroupColumn}>
            <Typography variant="h2">Upload Videos</Typography>
            <div className={classes.pics}>
              {videos.map((item, i) => (
                <video
                  key={i}
                  src={URL.createObjectURL(item)}
                  title="Click to remove"
                  loop
                  autoPlay
                  muted
                  onClick={() =>
                    setVideos(prev => [
                      ...prev.slice(0, i),
                      ...prev.slice(i + 1)
                    ])
                  }
                />
              ))}
              <label htmlFor="video">+</label>
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={e =>
                  setVideos(prev => [...prev, e.target.files[0]])
                }
              />
            </div>
            <div className={classes.formGroupColumn}>
              <Typography variant="h2">Detail</Typography>
              <TextField
                variant="outlined"
                multiline
                rows={4}
                placeholder="Type in 50 words min."
                value={details}
                onChange={e => setDetails(e.target.value)}
              />
            </div>
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
  )
}
