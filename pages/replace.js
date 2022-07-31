import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect, useRef } from "react";
import RepairRow from "../components/RepairRow/RepairRow";
import styles from "../styles/bulk.module.css";
import Web3 from "web3";

const Replace = () => {
  const web3Ref = useRef(null);
  const nftContractRef = useRef(null);

  useEffect(() => {
    // useEffect hook call to initialise the Web3Provider and to connect with the smart contract
    const temp = async () => {
      let provider = window.ethereum;
      const web3 = new Web3(provider);
      web3Ref.current = web3;
      // the second argument to the below function call represents the contract address
      let nftContract = new web3.eth.Contract(
        FlipCard.abi,
        "0xd9eB2B39b8A3e2d4319fa3EbCCb95648f3EbaE85"
      );
      nftContractRef.current = nftContract;
      try {
        // just to test whether connection to smart contract is succesful or not
        let res = await nftContract.methods.heartbeat().call();
        console.log(res === 1 ? "Connected" : "Not Connected");
      } catch (err) {}
    };
    temp();
  }, []);

  const repairNFT = async () => {
    /* function to repair the product and update nft
    from the woner to the buyer of the product based
    on the serial number of the product */
    let tokenId;
    let serialNumber = "";
    try {
      // access the nft Token id from the serial number
      tokenId = await nftContractRef.current.methods.getURIToken(serialNumber);
      console.log(tokenId);
    } catch (err) {
      console.error(err);
    }

    try {
      // method to update the warranty information of the product
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
