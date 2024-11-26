import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import "./bidsDisplay.css";

const BidsDisplay = ({ data }) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const currentModelRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 50);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(300, 300);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      if (currentModelRef.current) {
        currentModelRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (currentModelRef.current) {
        sceneRef.current.remove(currentModelRef.current);
        currentModelRef.current = null;
      }
      renderer.dispose();
    };
  }, []);

  const loadSTL = (filePath) => {
    const loader = new STLLoader();
    loader.load(filePath, (geometry) => {
      if (currentModelRef.current) {
        sceneRef.current.remove(currentModelRef.current);
      }
      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox;
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);

      const material = new THREE.MeshStandardMaterial({ color: 0x0055ff });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.geometry.translate(-center.x, -center.y, -center.z);

      sceneRef.current.add(mesh);
      currentModelRef.current = mesh;
    });
  };

  useEffect(() => {
    if (hoveredRowIndex !== null) {
      const filePath = `/models/model-${hoveredRowIndex + 1}.stl`;
      loadSTL(filePath);
    } else {
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
              <div className="row-box-content">
                {Object.values(row).map((value, valueIndex) => (
                  <div key={`${index}-${valueIndex}`} className="row-value">
                    {value}
                  </div>
                ))}
              </div>
              <div className="button-container">
                <button className="accept-button">Accept</button>
                <button className="message-button">Message</button>
              </div>
            </div>
          ))}
        </div>
        <div className="divider-container">
          <div className="divider" />
        </div>
        <div className="image-display">
          <canvas ref={canvasRef} />
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
