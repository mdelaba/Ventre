"use client";
import React, { useState } from "react";
import styles from "../../components/tabs/tabs.module.css";
import "./projectBids.css";
import BidsDisplay from "./bidsDisplay/bidsDisplay";
import AcceptedJob from "./acceptedJob/acceptedJob";

const ProjectInfo = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const sampleData = [
    {
      printer: "Elegoo Neptune 3 Max",
      rating: "4.5",
      estimatedTime: "48 hours",
      price: "$30",
    },
    {
      printer: "Elegoo Neptune 3 Max",
      rating: "4.5",
      estimatedTime: "48 hours",
      price: "$30",
    },
    {
      printer: "Elegoo Neptune 3 Max",
      rating: "4.5",
      estimatedTime: "48 hours",
      price: "$30",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 1 ? styles.active : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Project 1
        </div>
        <div className={styles.divider}></div>
        <div
          className={`${styles.tab} ${activeTab === 2 ? styles.active : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Project 2
        </div>
        <div className={styles.divider}></div>
        <div
          className={`${styles.tab} ${activeTab === 3 ? styles.active : ""}`}
          onClick={() => handleTabClick(3)}
        >
          Project 3
        </div>
      </div>

      <div className="project-content">
        {activeTab === 1 && <AcceptedJob />}
        {activeTab === 2 && <BidsDisplay data={sampleData} />}
        {activeTab === 3 && <p />}
      </div>
    </div>
  );
};

export default ProjectInfo;
