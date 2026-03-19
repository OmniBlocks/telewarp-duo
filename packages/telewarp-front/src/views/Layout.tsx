import { Outlet, Link } from "react-router";
import styles from "./Layout.module.css";
import Logo from "../assets/logo.svg";

export default function MainLayout() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <Link to="/" className={styles.link}>
            <img src={Logo} height={40} />
          </Link>
          <Link to="/upload" className={styles.link}>
            Upload
          </Link>
        </div>
        <div className={styles.nav}>
          <button className={styles.link}>Login</button>
        </div>
      </header>

      <div className={styles.content}>
        <main>
          <Outlet />
        </main>
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerColumns}>
              <div className={styles.footerSection}>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>
            <p className={styles.footerText}>© 2026 Telewarp</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
