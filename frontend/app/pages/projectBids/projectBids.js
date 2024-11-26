import React, { useState } from "react";
import styles from "../../components/tabs/tabs.module.css";
import "./projectBids.css";
import BidsDisplay from "./bidsDisplay/bidsDisplay";

const ProjectInfo = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const sampleData = [
    {
      input1: "Value 1A",
      input2: "Value 2A",
      input3: "Value 3A",
      input4: "Value 4A",
    },
    {
      input1: "Value 1B",
      input2: "Value 2B",
      input3: "Value 3B",
      input4: "Value 4B",
    },
    {
      input1: "Value 1C",
      input2: "Value 2C",
      input3: "Value 3C",
      input4: "Value 4C",
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
        {activeTab === 1 && <BidsDisplay data={sampleData} />}
        {activeTab === 2 && <p />}
        {activeTab === 3 && <p />}
      </div>
    </div>
  );
};

export default ProjectInfo;
