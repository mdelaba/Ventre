import { useState } from "react";
import "./acceptedJob.css";
import colours from "@/styles/colours";

const AcceptedJob = () => {
  // State for image carousel
  const [startIndex, setStartIndex] = useState(0);

  // State for rating
  const [rating, setRating] = useState(0);

  // Array of image sources (5 images)
  const images = [
    "/images/cube-placeholder.png",
    "/images/frog.png",
    "/images/rabbit.png",
    "/images/mantis.png",
    "/images/dog.png",
  ];

  // Handlers for image carousel
  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const visibleImages = [
    images[(startIndex + images.length - 1) % images.length],
    images[startIndex],
    images[(startIndex + 1) % images.length],
  ];

  // Function to handle rating
  const handleRating = (star) => {
    setRating(star);
  };

  return (
    <div className="display-container">
      {/* Rectangular box for Time and Price */}
      <div
        className="info-box"
        style={{
          borderColor: colours.acceptedJobInfoBoxBackground,
          borderColor: colours.acceptedJobInfoBoxBorder,
        }}
      >
        <span
          className="info-label"
          style={{ color: colours.acceptedJobInfoLabelText }}
        >
          Time: 48 hours
        </span>
        <span
          className="info-label"
          style={{ color: colours.acceptedJobInfoLabelText }}
        >
          Price: $20
        </span>
      </div>

      {/* Container for Product Photos label and image frames */}
      <div className="photos-container">
        {/* Label for Product Photos */}
        <div className="photos-label" style={{ color: colours.smallHeading }}>
          Product Photos
        </div>

        {/* Carousel container for images and arrows */}
        <div className="carousel-container">
          {/* Arrow buttons */}
          <button
            className="arrow-button left"
            style={{
              color: colours.acceptedJobArrowText,
              backgroundColor: colours.acceptedJobArrowBackground,
            }}
            onClick={handlePrev}
          >
            &lt;
          </button>

          {/* Image frame container */}
          <div className="image-frame-container">
            {visibleImages.map((image, index) => (
              <div
                key={index}
                className={`image-frame ${index === 1 ? "centered" : ""}`}
              >
                <img className="image" src={image} alt={`No Image Yet`} />
              </div>
            ))}
          </div>

          {/* Arrow buttons */}
          <button
            className="arrow-button right"
            style={{
              color: colours.acceptedJobArrowText,
              backgroundColor: colours.acceptedJobArrowBackground,
            }}
            onClick={handleNext}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Rating stars */}
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star-button ${rating >= star ? "filled" : ""}`}
            onClick={() => handleRating(star)}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default AcceptedJob;
