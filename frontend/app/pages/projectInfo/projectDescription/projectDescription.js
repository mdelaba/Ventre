import React from "react";
import "./projectDescription.css";

const ProjectDescription = () => {
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
    </div>
  );
};

export default ProjectDescription;
