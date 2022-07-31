import Link from "next/link";
import styles from "./Sidebar.module.css";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <h3>APPLE Inc.</h3>
      </div>
      <div className={styles.middle}>
        <Link href="/bulkupload">
          <div
            style={{
              color: router.pathname === "/bulkupload" ? "#151414" : "#AFAFAF",
            }}
          >
            Bulk Upload & mint
          </div>
        </Link>
        <Link href="/transfer">
          <div
            style={{
              color: router.pathname === "/transfer" ? "#151414" : "#AFAFAF",
            }}
          >
            Warranty Transfer
          </div>
        </Link>
        <Link href="/replace">
          <div
            style={{
              color: router.pathname === "/replace" ? "#151414" : "#AFAFAF",
            }}
          >
            Repair and Replacement
          </div>
        </Link>
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
