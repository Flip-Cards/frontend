import Sidebar from "../components/Sidebar/Sidebar";
import InputField from "../components/InputField/InputField";
import { useState } from "react";
import Button from "../components/Button/Button";

import styles from "../styles/bulk.module.css";

const TransferNFT = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [waalletAddress, setWalletAddress] = useState("");

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.right}>
        <div className={styles.top}>Welcome to your dashboard</div>
        <div className={styles.middle}>
          <h2>Repair & Replacement</h2>
        </div>
      </div>
    </div>
  );
};

export default TransferNFT;
