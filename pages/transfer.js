import Sidebar from "../components/Sidebar/Sidebar";
import InputField from "../components/InputField/InputField";
import { useState, useRef, useEffect } from "react";
import Button from "../components/Button/Button";
import Web3 from "web3";
import FlipCard from "../contracts/flipCard.json";

import styles from "../styles/bulk.module.css";

const TransferNFT = () => {
  // various useState hooks call to store the input information
  const [serialNumber, setSerialNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isValidSerialNumber, setIsValidSerialNumber] = useState(true);
  const [isValidWalletAddress, setIsValidWalletAddress] = useState(true);
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

  const transferNFT = async () => {
    let tokenId;
    try {
      // access the nft Token id from the serial number
      tokenId = await nftContractRef.current.methods.getURIToken(serialNumber);
      console.log(tokenId);
    } catch (err) {
      console.error(err);
    }

    let contractAddress = "0xd9eB2B39b8A3e2d4319fa3EbCCb95648f3EbaE85";

    try {
      /* method to transfer the nft from the owner
      to the buyer of the product It takes three
      argument 
      1. Contract Address
      2. walletAddress: Address of the wallet who has bought the product
      3. NFT TokenID of the product
      and transfers the NFT
      */
      await nftContractRef.current.methods.safeTransferFrom(
        contractAddress,
        walletAddress,
        tokenId
      );
    } catch (e) {
      console.error(e);
    }

    alert("Successfully Transferred the token");
  };

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
        <Button text={"TRANSFER WARRANT CARD"} click={() => transferNFT()} />
      </div>
    </div>
  );
};

export default TransferNFT;
