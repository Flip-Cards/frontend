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
          <h2>Warranty Transfer</h2>
        </div>
        <InputField
          label={"Enter Serial Number"}
          value={serialNumber}
          setValue={setSerialNumber}
          placeholder={"SBIN15451818435135"}
          error={"Enter a valid serial number"}
          action={() => {}}
        />
        <InputField
          label={"Enter Serial Number"}
          value={waalletAddress}
          setValue={setWalletAddress}
          placeholder={"SBIN15451818435135"}
          error={"Enter a valid wallet address"}
          action={() => {}}
        />
        <Button
          text={"TRANSFER WARRANT CARD"}
          click={() => console.log("TRANSFER WARRANT CARD")}
        />
      </div>
    </div>
  );
};

export default TransferNFT;
