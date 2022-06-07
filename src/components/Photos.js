import React from "react";

export default function PhotosContainer({ photosArray, setPhotos }) {
  return (
    <>
      {photosArray.map((item, i) => (
        <img
          key={i}
          src={URL.createObjectURL(item)}
          title="Click to remove"
          alt="uploaded pic"
          onClick={() =>
            setPhotos((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)])
          }
        />
      ))}
      <label htmlFor="pic">+</label>
      <input
        type="file"
        id="pic"
        accept="image/*"
        onChange={(e) => setPhotos((prev) => [...prev, e.target.files[0]])}
      />
    </>
  );
}
