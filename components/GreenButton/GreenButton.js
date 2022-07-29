import { useRef } from "react";
import styles from "./GreenButton.module.css";

const Button = ({ text, type }) => {
  const fileRef = useRef(null);

  return (
    <>
      <input type="file" ref={fileRef} style={{ display: "none" }} />
      <button
        type={type}
        className={styles.button}
        onClick={() => fileRef.current.click()}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
