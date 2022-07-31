import Sidebar from "../components/Sidebar/Sidebar";
import GreenButton from "../components/GreenButton/GreenButton";
import { useMoralis } from "react-moralis";
import Web3 from "web3";
import FlipCard from "../contracts/flipCard.json";
import styles from "../styles/bulk.module.css";
import { useEffect, useState, useRef } from "react";
import { parseJsonFile } from "../utils/readJsonFile";

const BulkUpload = () => {
  const [selectedFile, setSelectedFile] = useState(false);
  const [hasSelectedFile, setHasSelectedFile] = useState(false);
  const web3Ref = useRef(null);
  const nftContractRef = useRef(null);

  const { isAuthenticated, user, auth, account, logout, Moralis } =
    useMoralis();

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

  const uploadToIPFS = async () => {
    /* function which reads a JSON file from userInput accesses
       it's data field, extracts all the serial numbers, batch uploads all the
       metadata to the IPFS Storage and returns the hosted URLs as an array
    */
    const obj = await parseJsonFile(selectedFile);
    const metaData = obj["data"];
    const serialNumbers = metaData.map((each) => each["serial"]);

    let ipfsURLs = [];
    let requests = [];
    metaData.forEach((data, index) => {
      const metadataFile = new Moralis.File(
        `metadata${index}${parseInt(Math.random() * 1000)}.json`,
        {
          base64: btoa(JSON.stringify(data)),
        }
      );

      requests.push(
        new Promise(async (resolve, reject) => {
          try {
            await metadataFile.saveIPFS();
            const metadataHash = await metadataFile.ipfs();
            ipfsURLs.push(metadataHash);
            resolve();
          } catch (err) {
            reject();
          }
        })
      );
    });

    let data;
    try {
      data = await Promise.all(requests);
    } catch (err) {
      console.log(err);
    }

    return [ipfsURLs, serialNumbers];
  };

  const batchMint = async (contract, uri) => {
    // batchMint the NFTs using safeMintBatch method

    const [ipfsURLs, serialNumbers] = await uploadToIPFS();

    let res;
    try {
      res = await contract.methods
        .safeMintBatch(
          "0x617bf0Adb1e9cf317474b425507a08979Ec467cd",
          ipfsURLs,
          serialNumbers
        )
        .send({ from: account });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.right}>
        <div className={styles.top}>Welcome to your dashboard</div>
        <div className={styles.middle}>
          <h2>Bulk Upload & mint</h2>
          {!hasSelectedFile && (
            <GreenButton
              type={"file"}
              text={"UPLOAD FILE"}
              {...{
                selectedFile,
                setSelectedFile,
                hasSelectedFile,
                setHasSelectedFile,
              }}
            />
          )}
          {hasSelectedFile && (
            <button
              onClick={batchMint}
              type="button"
              className={styles.mintButton}
            >
              START MINTING
            </button>
          )}
          {hasSelectedFile && (
            <h1 style={{ marginTop: "24px" }}>
              Selected File: {selectedFile.name}
            </h1>
          )}
        </div>
        {/* <div className={styles.last}>
          <div>15%</div>
          <div>minting completed</div>
        </div> */}
      </div>
    </div>
  );
};

export default BulkUpload;
