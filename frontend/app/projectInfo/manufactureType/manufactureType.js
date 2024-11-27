import React, { useState, useEffect, useRef } from "react";
import "./manufactureType.css";
import colours from "@/styles/colours";

const ManufactureType = ({ updateTab }) => {
  // State for the first dropdown (Type)
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Select Option");

  // State for the second dropdown (Material)
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState("Select Option");

  // State for the additional material description
  const [materialDescription, setMaterialDescription] = useState("");

  // Refs for the dropdown containers
  const typeDropdownRef = useRef(null);
  const materialDropdownRef = useRef(null);

  const toggleTypeDropdown = () => setIsTypeOpen(!isTypeOpen);
  const toggleMaterialDropdown = () => setIsMaterialOpen(!isMaterialOpen);

  const handleTypeOptionClick = (option) => {
    setSelectedType(option);
    setIsTypeOpen(false); // Close the Type dropdown
  };

  const handleMaterialOptionClick = (option) => {
    setSelectedMaterial(option);
    setIsMaterialOpen(false); // Close the Material dropdown
  };

  const handleMaterialDescriptionChange = (event) => {
    setMaterialDescription(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (
      typeDropdownRef.current &&
      !typeDropdownRef.current.contains(event.target)
    ) {
      setIsTypeOpen(false); // Close Type dropdown if clicked outside
    }
    if (
      materialDropdownRef.current &&
      !materialDropdownRef.current.contains(event.target)
    ) {
      setIsMaterialOpen(false); // Close Material dropdown if clicked outside
    }
  };

  // Handle the post action
  const handleNext = () => {
    // Logic to handle the post action (e.g., send the data to a server)
    console.log("Next screen...");

    // Call the function passed from the parent to update its state
    updateTab(2);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="options-container">
      {/* Type Dropdown */}
      <div className="dropdown-container type-dropdown" ref={typeDropdownRef}>
        <label
          htmlFor="type-dropdown"
          className="dropdown-label"
          style={{ color: colours.smallHeading }}
        >
          Type:
        </label>
        <div className="dropdown">
          <button
            id="type-dropdown"
            className="dropdown-button"
            style={{
              backgroundColor: colours.dropdownBackground,
              color: colours.dropdownText,
            }}
            onClick={toggleTypeDropdown}
          >
            {selectedType}
            <span className="dropdown-arrow">▼</span>
          </button>
          {isTypeOpen && (
            <ul
              className="dropdown-menu"
              style={{
                backgroundColor: colours.dropdownMenuBackground,
                borderColor: colours.dropdownMenuBorder,
              }}
            >
              <li
                className="dropdown-item"
                onClick={() => handleTypeOptionClick("3D Printing")}
              >
                3D Printing
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleTypeOptionClick("Casting")}
              >
                Casting
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Material Dropdown */}
      <div
        className="dropdown-container material-dropdown"
        ref={materialDropdownRef}
      >
        <label
          htmlFor="material-dropdown"
          className="dropdown-label"
          style={{ color: colours.smallHeading }}
        >
          Material:
        </label>
        <div className="dropdown">
          <button
            id="material-dropdown"
            className="dropdown-button"
            style={{
              backgroundColor: colours.dropdownBackground,
              color: colours.dropdownText,
            }}
            onClick={toggleMaterialDropdown}
          >
            {selectedMaterial}
            <span className="dropdown-arrow">▼</span>
          </button>
          {isMaterialOpen && (
            <ul
              className="dropdown-menu"
              style={{
                backgroundColor: colours.dropdownMenuBackground,
                borderColor: colours.dropdownMenuBorder,
              }}
            >
              <li
                className="dropdown-item"
                onClick={() => handleMaterialOptionClick("ABS")}
              >
                ABS
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleMaterialOptionClick("PLA")}
              >
                PLA
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleMaterialOptionClick("Silicone")}
              >
                Silicone
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleMaterialOptionClick("Polyurethane")}
              >
                Polyurethane
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Material Description Input */}
      <div className="material-description-container">
        <label
          htmlFor="material-description"
          className="material-description-label"
          style={{ color: colours.smallHeading }}
        >
          Additional Material Description (optional):
        </label>
        <textarea
          id="material-description"
          className="material-description-textarea"
          style={{
            borderColor: colours.textareaBorder,
            color: colours.textareaText,
          }}
          placeholder="Add more specific information about the material you need..."
          value={materialDescription}
          onChange={handleMaterialDescriptionChange}
        />
      </div>

      <button
        className="next-button"
        style={{
          backgroundColor: colours.nextButtonBackground,
          color: colours.nextButtonText,
        }}
        onClick={handleNext}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default ManufactureType;
