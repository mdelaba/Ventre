// components/Sidebar.js
import Link from "next/link";
import { useState } from "react"; // Import useState hook
import styles from "./sidebar.module.css";
import routes from "../../app/routes";
import colours from "../../styles/colours";

const Sidebar = () => {
  // State to track the active link
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update active link when a link is clicked
  };

  return (
    <div
      className={styles.sidebar}
      style={{ backgroundColor: colours.sidebar }}
    >
      {/* Wrap the button in a Link component */}
      <div className={styles.newProjectContainer}>
        <Link href={routes.newProject}>
          <button
            className={styles.newProjectButton}
            style={{
              backgroundColor: colours.sidebarButton,
              color: colours.sidebarButtonText,
            }}
          >
            + New Project
          </button>
        </Link>
      </div>
      <ul>
        <li
          className={activeLink === "home" ? styles.selected : ""}
          onClick={() => handleLinkClick("home")}
        >
          <Link href={routes.home} style={{ color: colours.sidebarText }}>
            Home
          </Link>
        </li>
        <li
          className={activeLink === "projects" ? styles.selected : ""}
          onClick={() => handleLinkClick("projects")}
        >
          <Link href={routes.myProjects} style={{ color: colours.sidebarText }}>
            My Projects
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
