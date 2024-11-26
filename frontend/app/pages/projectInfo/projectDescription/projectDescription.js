import React from "react";
import "./projectDescription.css";

const ProjectDescription = ({ updateTab }) => {
  // Handle the post action
  const handleNext = () => {
    // Logic to handle the post action (e.g., send the data to a server)
    console.log("Next screen...");

    // Call the function passed from the parent to update its state
    updateTab(3);
  };

  return (
    <div className="options-container">
      <div className="project-name-container">
        <label htmlFor="project-name" className="project-name-label">
          Project Name:
        </label>
        <input
          id="project-name"
          className="project-name-input"
          type="text"
          placeholder="Type your project name here..."
        />
      </div>
      <div className="description-container">
        <label htmlFor="description" className="description-label">
          Short Description:
        </label>
        <textarea
          id="description"
          className="description-textarea"
          placeholder="Type your project description here..."
        ></textarea>
      </div>

      {/* Add in ability to upload optional additional image */}
      <div className="image-upload-container">
        <label htmlFor="project-image" className="image-upload-label">
          Additional Image (optional):
        </label>
        <input
          id="project-image"
          className="image-upload-input"
          type="file"
          accept="image/*" // This ensures only image files can be selected
        />
      </div>

      <button className="next-button" onClick={handleNext}>
        Next &gt;
      </button>
    </div>
  );
};

export default ProjectDescription;
