import styles from "../styles/Options.module.css";

export type OptionProps = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: number;
}

const Options = ({onChange, value}: OptionProps) => {
  return (
    <label className={styles.label}>
      Wybierz opcję: <select className={styles.select} onChange={onChange} value={value}>
          <option value="0">Policz litery</option>
          <option value="1">Policz słowa</option>
      </select>
    </label>
  );
};

export default Options;
