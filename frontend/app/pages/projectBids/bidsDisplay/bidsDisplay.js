import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import "./bidsDisplay.css";

const BidsDisplay = ({ data }) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const canvasRef = useRef(null); // Reference for the canvas element
  const sceneRef = useRef(null); // Reference for the 3D scene
  const currentModelRef = useRef(null); // Reference for the current model

  const placeholderImages = data.map(
    (_, index) => `/images/cube-placeholder.png` // Path to the placeholder image
  );

  // Initialize the 3D scene, camera, and renderer once on component mount
  useEffect(() => {
    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set background to white
    sceneRef.current = scene;

    // Set the camera's field of view (FOV) and position
    const camera = new THREE.PerspectiveCamera(75, 300 / 200, 0.1, 1000); // Adjust the aspect ratio as needed
    camera.position.set(0, 0, 50); // Move camera further back
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(300, 200); // Size of the canvas (you can adjust)

    // Add lighting to make the model visible against the white background
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Add ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (currentModelRef.current) {
        // currentModelRef.current.rotation.x += 0.01;
        currentModelRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Clean up function for unmounting
    return () => {
      if (currentModelRef.current) {
        scene.remove(currentModelRef.current); // Remove the current model from the scene
        currentModelRef.current = null; // Reset the model reference
      }
      // Dispose of the renderer
      renderer.dispose();
    };
  }, []);

  // Function to load the STL model
  const loadSTL = (filePath) => {
    const loader = new STLLoader();
    loader.load(filePath, (geometry) => {
      // Remove previous model if it exists
      if (currentModelRef.current) {
        sceneRef.current.remove(currentModelRef.current);
      }

      // Compute bounding box to center the model
      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox;
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);

      // Create the new mesh and center it
      const material = new THREE.MeshStandardMaterial({ color: 0x0055ff });
      const mesh = new THREE.Mesh(geometry, material);

      // Translate the model so its center is at the origin
      mesh.geometry.translate(-center.x, -center.y, -center.z);

      // Add the centered model to the scene
      sceneRef.current.add(mesh);
      currentModelRef.current = mesh;
    });
  };

  useEffect(() => {
    if (hoveredRowIndex !== null) {
      const filePath = `/models/model-${hoveredRowIndex + 1}.stl`; // Path to the .stl file
      loadSTL(filePath); // Load the STL file when a row is hovered
    } else {
      // Remove the STL model if no row is hovered
      if (currentModelRef.current) {
        sceneRef.current.remove(currentModelRef.current);
        currentModelRef.current = null;
      }
    }
  }, [hoveredRowIndex]);

  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className="bids-display-container">
      <h2 className="table-label">Available Printers</h2>

      <div className="bids-container">
        <div className="table-container">
          {data.map((row, index) => (
            <div
              key={index}
              className="row-box"
              onMouseEnter={() => setHoveredRowIndex(index)}
              onMouseLeave={() => setHoveredRowIndex(null)}
            >
              {Object.values(row).map((value, valueIndex) => (
                <div key={`${index}-${valueIndex}`} className="row-value">
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="divider-container">
          <div className="divider" />
        </div>
        <div className="image-display">
          <canvas ref={canvasRef} />
          {hoveredRowIndex === null}
        </div>
      </div>
    </div>
  );
};

BidsDisplay.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      input1: PropTypes.string.isRequired,
      input2: PropTypes.string.isRequired,
      input3: PropTypes.string.isRequired,
      input4: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BidsDisplay;
