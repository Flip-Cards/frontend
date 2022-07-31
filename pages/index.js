import { useRouter } from "next/router";
import Button from "../components/Button/Button";
import styles from "../styles/login.module.css";

import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Home() {
  // Used the Moralis for Authentication purpose
  const { authenticate, isAuthenticated, user, auth } = useMoralis();
  const router = useRouter();

  const login = async (authMethod) => {
    // accepts a parameter authMethod which can have two values ["metamask", "walletconnect"]
    // after successful login redirects to the bulkupload page
    try {
      if (authMethod == "metamask") {
        await authenticate({ signingMessage: "Welcome to Flipkart Grid" });
      } else if (authMethod == "walletconnect") {
        await authenticate({
          provider: "walletconnect",
          mobileLinks: [
            "rainbow",
            "metamask",
            "argent",
            "trust",
            "imtoken",
            "pillar",
          ],
          signingMessage: "Welcome to Flipkart Grid",
        });
      }
      router.push("/bulkupload");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <main className={styles.login}>
        <div className={styles.login__left}>
          <div>
            We&apos;ve been developing the next standard of reusable cell phones
          </div>
          <div className={styles.info}>
            <h4>Apple Inc.</h4>
            <p>NFT Warranty and minting platform</p>
            <p>Next era of digital warranty cards</p>
          </div>
        </div>
        <div className={styles.login__right}>
          <h2>Login to account</h2>
          <p>Only the owners of the blockchain can access this platform</p>
          <div className={styles.buttons}>
            <Button text={"METAMASK"} click={() => login("metamask")} />
            <Button
              text={"WALLETCONNECT"}
              click={() => login("walletconnect")}
            />
          </div>
          <p>Only the owners of the blockchain can access this platform</p>
        </div>
      </main>
    </div>
  );
}
