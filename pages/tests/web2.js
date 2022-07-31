// import Moralis from "moralis";
import { useEffect, useState } from "react";
import Web3 from "web3";
import FlipCard from "../../contracts/flipCard.json";
import {
  useMoralisFile,
  useMoralis,
  useWeb3ExecuteFunction,
} from "react-moralis";

export default function web2() {
  const { saveFile } = useMoralisFile();
  const { Moralis, account, isAuthenticated, authenticate } = useMoralis();
  const [owner, setOwner] = useState();
  const contractProcessor = useWeb3ExecuteFunction();

  const providerUrl = "http://127.0.0.1:7545";
  async function connectContract() {
    let adarsh;
    let provider = window.ethereum;
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        let selectedAccount = accounts[0];
        adarsh = selectedAccount;
        setOwner(selectedAccount);
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    const web3 = new Web3(provider);
    // const networkId = await web3.eth.net.getId();
    let nftContract = new web3.eth.Contract(
      FlipCard.abi,
      "0xd9eB2B39b8A3e2d4319fa3EbCCb95648f3EbaE85"
    );
    try {
      let res = await nftContract.methods.heartbear().call();
      console.log("response", res);
    } catch (err) {
      console.error(err);
    }
    console.log("Here in connectContract");
    try {
      await mintNft(nftContract, adarsh);
    } catch (err) {
      console.log(err);
    }
  }

  async function mintNft(contract, uri) {
    console.log("mintNFT called");
    let res;
    try {
      console.log(uri);
      res = await contract.methods
        .safeMint(
          "0x3Ee50fFd5465D8e484B560cd212f283E7BdBCf90",
          "https://urlefy2.com"
        )
        .send({ from: uri });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  const autenticateMoralis = () => {
    authenticate();
  };

  const uploadToIPFS = async () => {
    const metaData = [
      {
        name: "Warranty card 0",
        description: "Warranty card by apple",
        image: "https://images.news18.com/ibnlive/uploads/2019/08/flipkart.jpg",
        issuedOn: "",
        issuedTo: "",
        serial:
          "SIN3066fd0653d7c9d5b710d41fb381152b77af511dc8c595da5769e1c64216c970",
      },
      {
        name: "Warranty card 1",
        description: "Warranty card by apple",
        image: "https://images.news18.com/ibnlive/uploads/2019/08/flipkart.jpg",
        issuedOn: "",
        issuedTo: "",
        serial:
          "SIN74e544581cf589e6d02f0bf49ff9e9446adeb543e3713e61a8a161fe31b4ffc3",
      },
      {
        name: "Warranty card 2",
        description: "Warranty card by apple",
        image: "https://images.news18.com/ibnlive/uploads/2019/08/flipkart.jpg",
        issuedOn: "",
        issuedTo: "",
        serial:
          "SIN298580cd7f4715ed7b87d41d7519680e7515b39c99c20b5203164017ab8e003f",
      },
      {
        name: "Warranty card 3",
        description: "Warranty card by apple",
        image: "https://images.news18.com/ibnlive/uploads/2019/08/flipkart.jpg",
        issuedOn: "",
        issuedTo: "",
        serial:
          "SIN22d01c738b915e5a1e47fbaddc55400e67e566b04106861db80a2652fd18b200",
      },
      {
        name: "Warranty card 4",
        description: "Warranty card by apple",
        image: "https://images.news18.com/ibnlive/uploads/2019/08/flipkart.jpg",
        issuedOn: "",
        issuedTo: "",
        serial:
          "SIN1e2766cb67ef96b25de3ac8712cca4036117adf5677ebf791856bea117042bce",
      },
      {
        name: "Warranty card 5",
        description: "Warranty card by apple",
        image: "https://images.news18.com/ibnlive/uploads/2019/08/flipkart.jpg",
        issuedOn: "",
        issuedTo: "",
        serial:
          "SIN9b9a3606b0b0acc1c9d2d591b02975d6207f0b5bd205355f33fb6b3fd8f90da9",
      },
      {
        name: "Warranty card 6",
        description: "Warranty card by apple",
        image: "https://images.news18.com/ibnlive/uploads/2019/08/flipkart.jpg",
        issuedOn: "",
        issuedTo: "",
        serial:
          "SIN797aaa0d96729bc50649fafe60d7a0da6218c4b13044b8ef3bdb8deae4c8984e",
      },
      {
        name: "Warranty card 7",
        description: "Warranty card by apple",
        image: "https://images.news18.com/ibnlive/uploads/2019/08/flipkart.jpg",
        issuedOn: "",
        issuedTo: "",
        serial:
          "SINb0713c54285b47245e24756767e191070ca9269f51d4aa061668704516635035",
      },
      {
        name: "Warranty card 8",
        description: "Warranty card by apple",
        image: "https://images.news18.com/ibnlive/uploads/2019/08/flipkart.jpg",
        issuedOn: "",
        issuedTo: "",
        serial:
          "SIN9c052e9d36ed211dcde15365d68b51f730b4545c2f4f3f342c326ff642c68527",
      },
      {
        name: "Warranty card 9",
        description: "Warranty card by apple",
        image: "https://images.news18.com/ibnlive/uploads/2019/08/flipkart.jpg",
        issuedOn: "",
        issuedTo: "",
        serial:
          "SIN3fc3f8a225432b5cc8daea9b644a21a0c02275fd6ca31cc498d1e4523c53b768",
      },
    ];

    let ans = [];
    let reqs = [];
    metaData.forEach((data, index) => {
      const metadataFile = new Moralis.File(
        `metadata${index}${parseInt(Math.random() * 1000)}.json`,
        {
          base64: btoa(JSON.stringify(data)),
        }
      );

      reqs.push(
        new Promise(async (res, reject) => {
          try {
            await metadataFile.saveIPFS();
            const metadataHash = await metadataFile.ipfs();
            ans.push(metadataHash);
            res();
          } catch (err) {
            reject();
          }
        })
      );
    });

    Promise.all(reqs)
      .then((res) => console.log(ans))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button type="button" onClick={connectContract}>
        Connect to contract
      </button>
      {/* <button type="button" onClick={mintNft}>
       mnint
      </button> */}
      <button type="button" onClick={autenticateMoralis}>
        Authenticate
      </button>

      <button type="button" onClick={uploadToIPFS}>
        Test It
      </button>

      {isAuthenticated && <div>Welcome</div>}
    </div>
  );
}
