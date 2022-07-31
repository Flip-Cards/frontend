import { useEffect, useRef, useState } from "react";
import styles from "./GreenButton.module.css";

const Button = ({
  text,
  type,
  selectedFile,
  setSelectedFile,
  hasSelectedFile,
  setHasSelectedFile,
}) => {
  const fileRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setHasSelectedFile(true);
  };

  return (
    <>
      <input
        type="file"
        accept="application/JSON"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
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
