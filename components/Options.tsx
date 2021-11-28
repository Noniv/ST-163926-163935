import styles from "../styles/Options.module.css";

const Options = () => {
  return (
    <label className={styles.label}>
      Wybierz opcję: <select className={styles.select}>
          <option>Policz litery</option>
          <option>Policz słowa</option>
          <option>Policz litery i słowa</option>
      </select>
    </label>
  );
};

export default Options;
