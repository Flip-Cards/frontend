import styles from "./InputField.module.css";

const InputField = ({ label, id, value, setValue, error, setError, placeholder, action }) => {
  return (
    <div className={styles.input__field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.input}>
        <input
          type={"text"}
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
        <button type="button" onClick={action}>validate</button>
      </div>
      <div className={styles.error}>{error}</div>
    </div>
  );
};

export default InputField;
