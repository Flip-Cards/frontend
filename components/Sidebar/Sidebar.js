import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <h3>APPLE Inc.</h3>
      </div>
      <div className={styles.middle}>
        <div>Bulk Upload & mint</div>
        <div>Warranty Transfer</div>
        <div>Repair and Replacement</div>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.bottom}>
        <h3>Apple Inc.</h3>
        <p>The platform is developed and overseen by Flipkart.</p>
      </div>
    </div>
  );
};

export default Sidebar;
