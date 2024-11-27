import React from "react";
import styles from "./navbar.module.css"; // Import the CSS file
import colours from "@/styles/colours";

const Navbar = () => {
  return (
    <div style={{ backgroundColor: colours.navbar }} className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <span className={styles.brand} style={{ color: colours.navText }}>
          Ventre
        </span>
      </div>
      <div className={styles.navbarRight}>
        <a
          href="#contact"
          className={styles.navLink}
          style={{ color: colours.navText }}
        >
          Contact us
        </a>
        <span className={styles.divider} style={{ color: colours.navText }}>
          |
        </span>
        <a
          href="#maker"
          className={styles.navLink}
          style={{ color: colours.navText }}
        >
          I'm a maker
        </a>
      </div>
    </div>
  );
};

export default Navbar;
