import Sidebar from "../components/Sidebar/Sidebar";
import GreenButton from "../components/GreenButton/GreenButton";

import styles from "../styles/bulk.module.css";

const BulkUpload = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.right}>
        <div className={styles.top}>Welcome to your dashboard</div>
        <div className={styles.middle}>
          <h2>Bulk Upload & mint</h2>
          <GreenButton type={"file"} text={"UPLOAD FILE"} />
        </div>
        <div className={styles.last}>
          <div>15%</div>
          <div>minting completed</div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
