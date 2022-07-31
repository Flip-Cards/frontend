import styles from "./RepairRow.module.css";

const RepairRow = ({
  click = () => {},
  repair_req_id,
  date_initiated,
  serial_number,
  wallet_address,
}) => {
  return (
    <tr className={styles.row}>
      <td>{"RIN90384759A24"}</td>
      <td>{"31 August 2022"}</td>
      <td>{"SIN894857A4858"}</td>
      <td>{"0x65a97459585..."}</td>
      <button type="button" onClick={click} className={styles.initiate}>
        initiate
      </button>
    </tr>
  );
};

export default RepairRow;
