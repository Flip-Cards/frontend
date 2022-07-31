import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect, useRef } from "react";
import RepairRow from "../components/RepairRow/RepairRow";
import styles from "../styles/bulk.module.css";

const Replace = () => {
  const web3Ref = useRef(null);
  const nftContractRef = useRef(null);

  useEffect(() => {
    const temp = async () => {
      let provider = window.ethereum;
      const web3 = new Web3(provider);
      web3Ref.current = web3;
      let nftContract = new web3.eth.Contract(
        FlipCard.abi,
        "0xd9eB2B39b8A3e2d4319fa3EbCCb95648f3EbaE85"
      );
      nftContractRef.current = nftContract;
      try {
        let res = await nftContract.methods.heartbeat().call();
        console.log(res === 1 ? "Connected" : "Not Connected");
      } catch (err) {}
    };
    temp();
  }, []);

  const transferNFT = async () => {
    let tokenId;
    let serialNumber = "";
    try {
      tokenId = await nftContractRef.current.methods.getURIToken(serialNumber);
      console.log(tokenId);
    } catch (err) {
      console.error(err);
    }

    try {
      await nftContractRef.current.methods.updateCompanyWarranty(tokenId);
    } catch (e) {
      console.error(e);
    }

    alert("Successfully Added Repairment into warranty");
  };

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

export default Replace;
