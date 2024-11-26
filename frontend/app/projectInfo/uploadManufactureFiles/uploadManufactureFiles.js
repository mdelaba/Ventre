import React, { useState } from "react";
import "./UploadManufactureFiles.css";

const UploadManufactureFiles = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = React.useRef(null); // Reference to the file input

  const handleFileChange = (e) => {
    const uploadedFiles = e.target.files;
    validateFiles(uploadedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFiles = e.dataTransfer.files;
    validateFiles(uploadedFiles);
  };

  const validateFiles = (uploadedFiles) => {
    const validFiles = [];
    let isValid = true;

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      if (file.type === "application/stl" || file.name.endsWith(".stl")) {
        validFiles.push(file);
      } else {
        isValid = false;
        setError("Only .stl files are allowed.");
      }
    }

    if (isValid) {
      setFiles([...files, ...validFiles]);
      setError(""); // Clear error
    }
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Enable drop
  };

  // Open file input dialog when clicking the drop area
  const handleDropAreaClick = () => {
    fileInputRef.current.click();
  };

  // Handle the post action
  const handlePost = async () => {
    // Logic to handle the post action (e.g., send the data to a server)
  };

  return (
    <div className="upload-container">
      {/* Just a label now, no functionality */}
      <label className="upload-label">
        Upload Manufacture Files (STL only)
      </label>

      {/* Drag and Drop Area */}
      <div
        className="drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleDropAreaClick} // Open file dialog on click
      >
        <p>Drag and drop your .stl files here or click to select files</p>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        id="file-upload"
        accept=".stl"
        onChange={handleFileChange}
        multiple
        ref={fileInputRef} // Reference the input element
        style={{ display: "none" }} // Hide the file input element
      />

      {error && <p className="error-message">{error}</p>}

      <div className="file-list">
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index} className="file-item">
                {file.name}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Post Button */}
      <button className="post-button" onClick={handlePost}>
        Post &gt;
      </button>
    </div>
  );
};

export default UploadManufactureFiles;
