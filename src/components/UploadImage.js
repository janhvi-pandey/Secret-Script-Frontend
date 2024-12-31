import React, { useState } from "react";

function UploadImage() {
  const host = "http://localhost:5005";
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file && file.size > maxSize) {
        alert("File size exceeds 5 MB!");
        return;
    }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    
  };

  const handleClick = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(`${host}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setStatusMessage("Image uploaded successfully!");
      } else {
        setStatusMessage("Failed to upload the image.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("An error occurred during upload.");
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleClick}>Upload</button>
      {imagePreview && <img src={imagePreview} alt="Preview of uploaded content" />}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default UploadImage;
