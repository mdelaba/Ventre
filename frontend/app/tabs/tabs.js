import React, { useState } from "react";
import styles from "./tabs.module.css";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 1 ? styles.active : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Manufacture Type
        </div>
        <div className={styles.divider}></div>
        <div
          className={`${styles.tab} ${activeTab === 2 ? styles.active : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Project Description
        </div>
        <div className={styles.divider}></div>
        <div
          className={`${styles.tab} ${activeTab === 3 ? styles.active : ""}`}
          onClick={() => handleTabClick(3)}
        >
          Upload Manufacture Files
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 1 && <p>Content for Manufacture Type</p>}
        {activeTab === 2 && <p>Content for Project Description</p>}
        {activeTab === 3 && <p>Content for Upload Manufacture Files</p>}
      </div>
    </div>
  );
};

export default Tabs;
