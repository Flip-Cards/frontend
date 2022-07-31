import Sidebar from "../components/Sidebar/Sidebar";
import InputField from "../components/InputField/InputField";
import { useState } from "react";
import Button from "../components/Button/Button";

import styles from "../styles/bulk.module.css";

const TransferNFT = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isValidSerialNumber, setIsValidSerialNumber] = useState(false);
  const [isValidWalletAddress, setIsValidWalletAddress] = useState(false);

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
          errorMsg={"Enter a valid serial number"}
          action={() => {}}
          isValidValue={isValidSerialNumber}
          setIsValidValue={setIsValidSerialNumber}
        />
        <InputField
          label={"Enter receiver’s wallet address"}
          value={walletAddress}
          setValue={setWalletAddress}
          placeholder={"0x16749405958590"}
          errorMsg={"Enter a valid wallet address"}
          action={() => {}}
          isValidValue={isValidWalletAddress}
          setIsValidValue={setIsValidWalletAddress}
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
