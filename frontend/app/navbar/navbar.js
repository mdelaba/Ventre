import React from "react";
import styles from "./navbar.module.css"; // Import the CSS file

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <span className={styles.brand}>Ventre</span>
      </div>
      <div className={styles.navbarRight}>
        <a href="#contact" className={styles.navLink}>
          Contact us
        </a>
        <span className={styles.divider}>|</span>
        <a href="#maker" className={styles.navLink}>
          I'm a maker
        </a>
      </div>
    </div>
  );
};

export default Navbar;
