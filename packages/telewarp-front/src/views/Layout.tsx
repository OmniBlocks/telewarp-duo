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
        <div className={styles.news}>
          TeleWarp is a work-in-progress project. Please back up your projects
          as they may be deleted during rewrites.
        </div>
        <main>
          <Outlet />
        </main>
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerColumns}>
              <div className={styles.footerSection}>
                <Link to="/about">About</Link>
                <Link to="/explore">Explore Projects</Link>
                <Link to="/credits">Credits</Link>
              </div>
              <div className={styles.footerSection}>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/privacy">Privacy Policy</Link>
              </div>
            </div>
            <p className={styles.footerText}>
              © {new Date().getFullYear()} TeleWarp developers. Projects
              uploaded to TeleWarp are under a CC-BY-SA 4.0 license.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
