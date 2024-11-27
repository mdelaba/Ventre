"use client";
import React, { useState } from "react";
import styles from "../../components/tabs/tabs.module.css";
import ManufactureType from "./manufactureType/manufactureType";
import ProjectDescription from "./projectDescription/projectDescription";
import UploadManufactureFiles from "./uploadManufactureFiles/uploadManufactureFiles";
import colours from "@/styles/colours";

const ProjectInfo = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const updateActiveTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 1 ? styles.active : ""}`}
          style={{
            backgroundColor: colours.tabBackground,
            color: colours.tabText,
          }}
          onClick={() => handleTabClick(1)}
        >
          Manufacture Type
        </div>
        <div
          className={styles.divider}
          style={{ backgroundColor: colours.tabDivider }}
        ></div>
        <div
          className={`${styles.tab} ${activeTab === 2 ? styles.active : ""}`}
          style={{
            backgroundColor: colours.tabBackground,
            color: colours.tabText,
          }}
          onClick={() => handleTabClick(2)}
        >
          Project Description
        </div>
        <div
          className={styles.divider}
          style={{ backgroundColor: colours.tabDivider }}
        ></div>
        <div
          className={`${styles.tab} ${activeTab === 3 ? styles.active : ""}`}
          style={{
            backgroundColor: colours.tabBackground,
            color: colours.tabText,
          }}
          onClick={() => handleTabClick(3)}
        >
          Upload Manufacture Files
        </div>
      </div>

      <div
        className={styles.tabContent}
        style={{
          backgroundColor: colours.tabContentBackground,
          borderColor: colours.tabContentBorder,
          color: colours.tabContentText,
        }}
      >
        {activeTab === 1 && <ManufactureType updateTab={updateActiveTab} />}
        {activeTab === 2 && <ProjectDescription updateTab={updateActiveTab} />}
        {activeTab === 3 && <UploadManufactureFiles />}
      </div>
    </div>
  );
};

export default ProjectInfo;
