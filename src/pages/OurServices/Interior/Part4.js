import React, { useState } from "react";
import {
  makeStyles,
  Button,
  Typography,
  Card,
  CardContent
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { postPropertyActions } from "../../../store/reducers/property-slice";
import globalStyles from "../../../components/GlobalStyles/PostPropStyles";
import PhotosComp from "../../../components/Photos";

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

function base64Converter(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = err => reject(err);
  });
}

export default function Part4() {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const classes = { ...globalStyles(), ...useStyles() };
  const dispatch = useDispatch();
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    const base64Photos = [];
    const base64Videos = [];
    for (let i = 0; i < photos.length; i++) {
      try {
        base64Photos.push(await base64Converter(photos[i]));
      } catch (err) {
        alert(err.message);
      }
    }
    for (let i = 0; i < videos.length; i++) {
      try {
        base64Videos.push(await base64Converter(videos[i]));
      } catch (err) {
        alert(err.message);
      }
    }
    dispatch(postPropertyActions.update({ photos: base64Photos, videos: base64Videos }));
    history.push("/postproperty?page=facilities");
  }

  return (
    <>
      {/* <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: 10, marginLeft: 15 }}
      >
        Photos/Videos
      </Typography> */}
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
            </div>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
    </>
  );
}
