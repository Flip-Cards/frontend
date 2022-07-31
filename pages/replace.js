import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";
import RepairRow from "../components/RepairRow/RepairRow";
import {useMoralis} from "react-moralis";

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
          <table>
            <thead>
              <th>Repair Request ID</th>
              <th>Date Initiated</th>
              <th>Serial Number</th>
              <th>Wallet Address</th>
            </thead>
            <tbody>
              <RepairRow />
              <RepairRow />
              <RepairRow />
              <RepairRow />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransferNFT;
